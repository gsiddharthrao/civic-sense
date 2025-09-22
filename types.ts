export enum ReportStatus {
  New = 'New',
  Assigned = 'Assigned',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum ReportCategory {
  Pothole = 'Pothole',
  StreetlightOut = 'Streetlight Out',
  Graffiti = 'Graffiti',
  Trash = 'Trash Overflow',
  DamagedSign = 'Damaged Sign',
  Other = 'Other',
}

export interface StatusHistory {
  status: ReportStatus;
  timestamp: Date;
  updatedBy: string; // 'system' or admin username
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl: string;
  submittedBy: string; // citizen username
  submittedAt: Date;
  status: ReportStatus;
  assignedTo?: string; // worker name
  statusHistory: StatusHistory[];
  eta?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'citizen' | 'admin';
}

export interface Worker {
  id: string;
  name: string;
  contact: string; // phone or email
  specializations: ReportCategory[];
}


export type View =
  | { page: 'home' }
  | { page: 'login' }
  | { page: 'live-map' }
  | { page: 'feedback' }
  | { page: 'contact' }
  | { page: 'citizen-dashboard' }
  | { page: 'new-report' }
  | { page: 'report-detail'; id: string }
  | { page: 'admin-dashboard' }
  | { page: 'admin-users' }
  | { page: 'admin-workers' }
  | { page: 'admin-feedback' }
  | { page: 'admin-contact' };