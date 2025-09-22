import React, { useState, useRef } from 'react';
import { User, Report, ReportCategory, View } from '../../types';
import { addReport } from '../../services/api';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/Card';
import { MapPinIcon, CameraIcon, UploadIcon, TargetIcon } from '../../components/icons/IconComponents';
import CameraCapture from '../../components/CameraCapture';

interface NewReportPageProps {
  user: User;
  addReport: (report: Report) => void;
  navigateTo: (view: View) => void;
}

const NewReportPage: React.FC<NewReportPageProps> = ({ user, addReport: addReportToState, navigateTo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>(ReportCategory.Pothole);
  const [location, setLocation] = useState({ lat: 0, lng: 0, address: '' });
  const [markerPosition, setMarkerPosition] = useState<{x: number, y: number} | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoTaken = (file: File) => {
    if (file) {
      setImage(file);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mapRef.current) {
      setLocationError(null);
      const rect = mapRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMarkerPosition({ x, y });

      // Simulate reverse geocoding
      const mockLat = 40.7128 + (y - 50) / 1000;
      const mockLng = -74.0060 + (x - 50) / 1000;
      const mockAddress = `Approx. location at ${x.toFixed(2)}, ${y.toFixed(2)} on map`;
      
      setLocation({ lat: mockLat, lng: mockLng, address: mockAddress });
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsFetchingLocation(true);
    setLocationError(null);
    setMarkerPosition(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mockAddress = `Location at Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
        setLocation({
          lat: latitude,
          lng: longitude,
          address: mockAddress,
        });
        setIsFetchingLocation(false);
      },
      (error) => {
        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable it in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsFetchingLocation(false);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !location.address) {
        alert("Please provide an image and select a location.");
        return;
    }
    setIsSubmitting(true);
    
    // In a real app, you would upload the image and get a URL.
    // Here we'll just use the object URL for display simulation.
    const newReportData = {
        title,
        description,
        category,
        location,
        imageUrl: imagePreview!,
        submittedBy: user.username,
    };

    try {
        const createdReport = await addReport(newReportData);
        addReportToState(createdReport);
        navigateTo({ page: 'report-detail', id: createdReport.id });
    } catch (error) {
        console.error("Failed to submit report", error);
        alert("There was an error submitting your report. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Submit a New Report</h1>
            <p className="text-sm text-gray-500">Help us improve your community by reporting issues.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input id="title" label="Title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g., Large pothole on Elm Street" />
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Provide as much detail as possible about the issue."
              ></textarea>
            </div>

            <Select id="category" label="Category" value={category} onChange={e => setCategory(e.target.value as ReportCategory)}>
              {Object.values(ReportCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </Select>
            
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <Button type="button" variant="ghost" size="sm" onClick={handleUseCurrentLocation} disabled={isFetchingLocation}>
                        <TargetIcon className={`h-4 w-4 mr-2 ${isFetchingLocation ? 'animate-spin' : ''}`} />
                        {isFetchingLocation ? 'Getting Location...' : 'Use Current Location'}
                    </Button>
                </div>
                <p className="text-sm text-gray-500 mb-2">Use your device's location or click on the map to pinpoint the issue.</p>
                {locationError && (
                    <p className="text-sm text-red-500 mb-2">{locationError}</p>
                )}
                <div 
                    ref={mapRef}
                    className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner relative cursor-pointer"
                    onClick={handleMapClick}
                >
                    <img src="https://picsum.photos/seed/mapbg/800/400" alt="Map background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    {markerPosition && (
                        <div className="absolute transform -translate-x-1/2 -translate-y-full" style={{ left: `${markerPosition.x}%`, top: `${markerPosition.y}%` }}>
                           <MapPinIcon className="h-8 w-8 text-red-600" />
                        </div>
                    )}
                    {isFetchingLocation && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <p className="text-white">Getting your precise location...</p>
                        </div>
                    )}
                </div>
                {location.address && (
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                        Selected Address: <span className="font-normal text-indigo-600 dark:text-indigo-400">{location.address}</span>
                    </p>
                )}
            </div>

             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image (Required)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-lg" />
                        ) : (
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center gap-4 mt-4">
                            <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                                <UploadIcon className="h-5 w-5 mr-2" />
                                Upload Image
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => setIsCameraOpen(true)}>
                                <CameraIcon className="h-5 w-5 mr-2" />
                                Take Photo
                            </Button>
                            <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>

          </CardContent>
          <CardFooter>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
      {isCameraOpen && (
        <CameraCapture 
          onCapture={handlePhotoTaken}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </div>
  );
};

export default NewReportPage;