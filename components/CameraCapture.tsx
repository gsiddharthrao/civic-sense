import React, { useRef, useState, useEffect } from 'react';
import Button from './Button';
import { CameraIcon, XIcon } from './icons/IconComponents';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please ensure you have granted permission in your browser settings.");
      }
    };

    startCamera();

    return () => {
      // Cleanup: stop all tracks on component unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
            onCapture(file);
            handleClose();
          }
        }, 'image/png');
      }
    }
  };

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
          aria-label="Close camera"
        >
          <XIcon className="h-6 w-6" />
        </button>
        
        <div className="p-4">
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <Button onClick={handleClose} variant="secondary" className="mt-4">Close</Button>
            </div>
          ) : (
            <div>
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-md bg-gray-900 aspect-video object-cover"></video>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleCapture} size="lg" disabled={!stream}>
                  <CameraIcon className="h-6 w-6 mr-2" />
                  Capture Photo
                </Button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
