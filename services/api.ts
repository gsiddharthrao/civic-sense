import { Report, User, Worker, ReportStatus } from '../types';

// The base path for our API endpoints, which we created in the /api folder.
const API_BASE_PATH = '/api';

// Helper to handle fetch responses and errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An API error occurred');
  }
  return response.json();
}

// Helper to parse dates from API responses
const reviveReportDates = (reports: Report[]): Report[] => {
  return reports.map(report => ({
    ...report,
    submittedAt: new Date(report.submittedAt),
    statusHistory: report.statusHistory.map(h => ({
      ...h,
      timestamp: new Date(h.timestamp)
    }))
  }));
};


export const getReports = async (): Promise<Report[]> => {
  const response = await fetch(`${API_BASE_PATH}/reports`);
  const reports = await handleResponse<Report[]>(response);
  return reviveReportDates(reports).sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_PATH}/users`);
  return handleResponse<User[]>(response);
};

export const getWorkers = async (): Promise<Worker[]> => {
  const response = await fetch(`${API_BASE_PATH}/workers`);
  return handleResponse<Worker[]>(response);
};

export const addUser = async (userData: { username: string; email: string; }): Promise<User> => {
  const response = await fetch(`${API_BASE_PATH}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse<User>(response);
};

export const addReport = async (reportData: Omit<Report, 'id' | 'submittedAt' | 'status' | 'statusHistory' | 'eta'>): Promise<Report> => {
    const response = await fetch(`${API_BASE_PATH}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
    });
    const report = await handleResponse<Report>(response);
    // Revive dates for the single returned report
    return reviveReportDates([report])[0];
};

export const updateReportStatus = async (reportId: string, status: ReportStatus, assignedTo: string | undefined, updatedBy: string): Promise<Report> => {
    const response = await fetch(`${API_BASE_PATH}/reports/${reportId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedTo, updatedBy })
    });
    const report = await handleResponse<Report>(response);
    return reviveReportDates([report])[0];
};

export const addWorker = async (workerData: Omit<Worker, 'id'>): Promise<Worker> => {
    const response = await fetch(`${API_BASE_PATH}/workers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workerData)
    });
    return handleResponse<Worker>(response);
};
