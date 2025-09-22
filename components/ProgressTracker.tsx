
import React from 'react';
import { ReportStatus } from '../types';

interface ProgressTrackerProps {
  currentStatus: ReportStatus;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStatus }) => {
  const statuses = [ReportStatus.New, ReportStatus.Assigned, ReportStatus.InProgress, ReportStatus.Resolved];
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Progress</h3>
      <div className="flex items-center">
        {statuses.map((status, index) => (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  index <= currentIndex ? 'bg-indigo-600 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {index <= currentIndex ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                ) : (
                  <div className="w-3 h-3 bg-white dark:bg-gray-400 rounded-full"></div>
                )}
              </div>
              <p className={`mt-2 text-xs text-center ${index <= currentIndex ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>{status}</p>
            </div>
            {index < statuses.length - 1 && (
              <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${
                index < currentIndex ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
