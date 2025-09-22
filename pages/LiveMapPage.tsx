
import React, { useState } from 'react';
import { Report, ReportStatus, View } from '../types';
import Card, { CardHeader, CardContent } from '../components/Card';
import Button from '../components/Button';

interface LiveMapPageProps {
  reports: Report[];
  navigateTo: (view: View) => void;
}

const statusColors: { [key in ReportStatus]: string } = {
  [ReportStatus.New]: 'bg-yellow-400',
  [ReportStatus.Assigned]: 'bg-blue-500',
  [ReportStatus.InProgress]: 'bg-orange-500',
  [ReportStatus.Resolved]: 'bg-green-500',
};

const MapMarker: React.FC<{ report: Report; onClick: () => void; }> = ({ report, onClick }) => {
  // Simple hashing to get a "random" but consistent position for mock data
  const x = (report.location.lng + 180) % 100;
  const y = (report.location.lat + 90) % 100;

  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={report.title}
    >
      <div className={`w-4 h-4 rounded-full ${statusColors[report.status]} border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-125 transition-transform`}></div>
      <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {report.title}
      </div>
    </button>
  );
};


const LiveMapPage: React.FC<LiveMapPageProps> = ({ reports, navigateTo }) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showResolved, setShowResolved] = useState(false);

  const filteredReports = reports.filter(r => showResolved || r.status !== ReportStatus.Resolved);

  return (
    <div className="flex h-full flex-col lg:flex-row gap-4">
      <div className="flex-1 relative bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner">
        {/* This is a simulated map background */}
        <img src="https://picsum.photos/seed/mapbg/1600/1200" alt="Map background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        {filteredReports.map(report => (
          <MapMarker key={report.id} report={report} onClick={() => setSelectedReport(report)} />
        ))}
      </div>
      <div className="w-full lg:w-96 flex-shrink-0">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <h2 className="text-xl font-bold">Reported Issues</h2>
            <div className="flex items-center justify-between mt-2">
              <label htmlFor="show-resolved" className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  id="show-resolved"
                  checked={showResolved}
                  onChange={e => setShowResolved(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Show Resolved</span>
              </label>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {selectedReport ? (
              <div>
                <h3 className="font-bold text-lg">{selectedReport.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedReport.location.address}</p>
                <div className="flex items-center mt-2">
                  <span className={`w-3 h-3 rounded-full mr-2 ${statusColors[selectedReport.status]}`}></span>
                  <span className="text-sm font-medium">{selectedReport.status}</span>
                </div>
                <p className="mt-2 text-sm">{selectedReport.description.substring(0, 100)}...</p>
                 <img src={selectedReport.imageUrl} alt={selectedReport.title} className="mt-4 rounded-lg w-full h-40 object-cover" />
                <Button className="w-full mt-4" onClick={() => navigateTo({ page: 'report-detail', id: selectedReport.id })}>
                  View Full Details
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 pt-10">
                <p>Click a marker on the map to see details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMapPage;
