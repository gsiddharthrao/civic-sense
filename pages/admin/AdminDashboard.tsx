import React, { useState } from 'react';
import { Report, ReportStatus, View, Worker } from '../../types';
import { updateReportStatus } from '../../services/api';
import Card, { CardContent, CardHeader } from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

interface AdminDashboardProps {
  reports: Report[];
  workers: Worker[];
  updateReport: (report: Report) => void;
  navigateTo: (view: View) => void;
}

const StatCard: React.FC<{ title: string; value: number; }> = ({ title, value }) => (
    <Card className="text-center">
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </CardContent>
    </Card>
  );

const AdminDashboard: React.FC<AdminDashboardProps> = ({ reports, workers, updateReport, navigateTo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  const stats = {
    total: reports.length,
    new: reports.filter(r => r.status === ReportStatus.New).length,
    inProgress: reports.filter(r => r.status === ReportStatus.InProgress).length,
    resolved: reports.filter(r => r.status === ReportStatus.Resolved).length,
  };
  
  const statusColorMap: { [key in ReportStatus]: string } = {
    [ReportStatus.New]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [ReportStatus.Assigned]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ReportStatus.InProgress]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    [ReportStatus.Resolved]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (reportId: string, newStatus: ReportStatus, assignedTo?: string) => {
    try {
        const updated = await updateReportStatus(reportId, newStatus, assignedTo, 'siddx');
        updateReport(updated);
        setEditingReport(null);
    } catch(error) {
        console.error("Failed to update status", error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={stats.total} />
        <StatCard title="New" value={stats.new} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Resolved" value={stats.resolved} />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">All Reports</h2>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Input id="search" placeholder="Search by title or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <Select id="status-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
              <option value="all">All Statuses</option>
              {Object.values(ReportStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4">
                      <img src={report.imageUrl} alt={report.title} className="h-12 w-12 rounded-md object-cover" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{report.id}</td>
                    <td className="px-6 py-4 text-sm">{report.title}</td>
                    <td className="px-6 py-4 text-sm">{report.submittedBy}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[report.status]}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{report.assignedTo || 'N/A'}</td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                       <a href="#" onClick={(e) => { e.preventDefault(); navigateTo({ page: 'report-detail', id: report.id }); }} className="text-indigo-600 hover:text-indigo-900">View</a>
                       <a href="#" onClick={(e) => { e.preventDefault(); setEditingReport(report); }} className="text-green-600 hover:text-green-900">Update</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {editingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h3 className="text-lg font-bold">Update Report: {editingReport.id}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <img src={editingReport.imageUrl} alt={editingReport.title} className="rounded-lg w-full h-48 object-cover mb-4" />
              <div>
                <label className="text-sm font-medium">New Status</label>
                <Select id="new-status" value={editingReport.status} onChange={e => setEditingReport({...editingReport, status: e.target.value as ReportStatus})}>
                    {Object.values(ReportStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </Select>
              </div>
               <div>
                <label className="text-sm font-medium">Assign To</label>
                <Select id="assign-to" value={editingReport.assignedTo || ''} onChange={e => setEditingReport({...editingReport, assignedTo: e.target.value})}>
                    <option value="">Unassigned</option>
                    {workers.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
                </Select>
              </div>
            </CardContent>
            <CardContent className="flex justify-end gap-2 bg-gray-50 dark:bg-gray-800/50">
                <Button variant="secondary" onClick={() => setEditingReport(null)}>Cancel</Button>
                <Button onClick={() => handleUpdateStatus(editingReport.id, editingReport.status, editingReport.assignedTo)}>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;