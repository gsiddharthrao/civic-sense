
import React from 'react';
import { Report, User } from '../../types';
import Card, { CardContent, CardHeader } from '../../components/Card';
import ProgressTracker from '../../components/ProgressTracker';

interface ReportDetailPageProps {
  report: Report;
  currentUser: User | null;
}

const ReportDetailPage: React.FC<ReportDetailPageProps> = ({ report }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">{report.title}</h1>
          <p className="text-sm text-gray-500">Report ID: {report.id}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Category</h3>
                <p>{report.category}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Location</h3>
                <p>{report.location.address}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Description</h3>
                <p className="whitespace-pre-wrap">{report.description}</p>
              </div>
               <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Submitted By</h3>
                <p>{report.submittedBy} on {new Date(report.submittedAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="md:col-span-1">
              <img src={report.imageUrl} alt={report.title} className="rounded-lg shadow-md w-full h-auto object-cover" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {report.eta && (
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">AI-Powered Estimated Resolution Time</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{report.eta}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <ProgressTracker currentStatus={report.status} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Status History</h2>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
            {report.statusHistory.map((history, index) => (
              <div key={index} className="mb-8 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-indigo-200 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-indigo-900">
                  <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {history.status}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {new Date(history.timestamp).toLocaleString()}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Status updated by: {history.updatedBy}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetailPage;
