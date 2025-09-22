
import { Report, User, ReportStatus, ReportCategory, Worker } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', username: 'john_doe', email: 'john.doe@example.com', role: 'citizen' },
  { id: '2', username: 'jane_smith', email: 'jane.smith@example.com', role: 'citizen' },
  { id: '3', username: 'siddx', email: 'sidd@example.com', role: 'admin' },
];

export const INITIAL_WORKERS: Worker[] = [
    { id: 'WKR001', name: 'Public Works Team A', contact: '555-0101', specializations: [ReportCategory.Pothole, ReportCategory.DamagedSign] },
    { id: 'WKR002', name: 'Electrical Department', contact: '555-0102', specializations: [ReportCategory.StreetlightOut] },
    { id: 'WKR003', name: 'Sanitation Crew', contact: '555-0103', specializations: [ReportCategory.Trash, ReportCategory.Graffiti] },
    { id: 'WKR004', name: 'Road Maintenance Unit', contact: '555-0104', specializations: [ReportCategory.Pothole] },
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'RPT001',
    title: 'Massive Pothole on Main St',
    description: 'A very large and dangerous pothole near the corner of Main and 1st Ave. It has damaged my tire.',
    category: ReportCategory.Pothole,
    location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' },
    imageUrl: 'https://picsum.photos/seed/pothole1/800/600',
    submittedBy: 'john_doe',
    submittedAt: new Date('2024-07-20T10:00:00Z'),
    status: ReportStatus.InProgress,
    assignedTo: 'Road Maintenance Unit',
    statusHistory: [
      { status: ReportStatus.New, timestamp: new Date('2024-07-20T10:00:00Z'), updatedBy: 'john_doe' },
      { status: ReportStatus.Assigned, timestamp: new Date('2024-07-20T14:30:00Z'), updatedBy: 'siddx' },
      { status: ReportStatus.InProgress, timestamp: new Date('2024-07-21T09:00:00Z'), updatedBy: 'siddx' },
    ],
    eta: '2 days',
  },
  {
    id: 'RPT002',
    title: 'Streetlight out at Elm Park',
    description: 'The streetlight at the entrance of Elm Park is completely out. It\'s very dark and feels unsafe at night.',
    category: ReportCategory.StreetlightOut,
    location: { lat: 40.730610, lng: -73.935242, address: '456 Elm St, Brooklyn, NY' },
    imageUrl: 'https://picsum.photos/seed/light1/800/600',
    submittedBy: 'jane_smith',
    submittedAt: new Date('2024-07-21T19:45:00Z'),
    status: ReportStatus.Assigned,
    assignedTo: 'Electrical Department',
    statusHistory: [
        { status: ReportStatus.New, timestamp: new Date('2024-07-21T19:45:00Z'), updatedBy: 'jane_smith' },
        { status: ReportStatus.Assigned, timestamp: new Date('2024-07-22T11:00:00Z'), updatedBy: 'siddx' },
    ],
    eta: '5 days',
  },
  {
    id: 'RPT003',
    title: 'Graffiti on library wall',
    description: 'Someone spray-painted graffiti on the side of the public library.',
    category: ReportCategory.Graffiti,
    location: { lat: 40.7549, lng: -73.9840, address: '789 Broadway, New York, NY' },
    imageUrl: 'https://picsum.photos/seed/graffiti1/800/600',
    submittedBy: 'john_doe',
    submittedAt: new Date('2024-07-22T08:15:00Z'),
    status: ReportStatus.New,
    statusHistory: [
        { status: ReportStatus.New, timestamp: new Date('2024-07-22T08:15:00Z'), updatedBy: 'john_doe' },
    ],
    eta: '7 days',
  },
  {
    id: 'RPT004',
    title: 'Park trash can overflowing',
    description: 'The main trash can near the playground at Central Park is overflowing with garbage.',
    category: ReportCategory.Trash,
    location: { lat: 40.7829, lng: -73.9654, address: 'Central Park West, New York, NY' },
    imageUrl: 'https://picsum.photos/seed/trash1/800/600',
    submittedBy: 'jane_smith',
    submittedAt: new Date('2024-07-19T12:00:00Z'),
    status: ReportStatus.Resolved,
    assignedTo: 'Sanitation Crew',
    statusHistory: [
        { status: ReportStatus.New, timestamp: new Date('2024-07-19T12:00:00Z'), updatedBy: 'jane_smith' },
        { status: ReportStatus.Assigned, timestamp: new Date('2024-07-19T13:00:00Z'), updatedBy: 'siddx' },
        { status: ReportStatus.Resolved, timestamp: new Date('2024-07-20T11:00:00Z'), updatedBy: 'siddx' },
    ],
  }
];