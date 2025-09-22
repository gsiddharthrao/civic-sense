
import React from 'react';
import { Report, User, ReportStatus, View } from '../../types';
import Card, { CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { PlusCircleIcon } from '../../components/icons/IconComponents';

interface CitizenDashboardProps {
  user: User;
  reports: Report[];
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

const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ user, reports, navigateTo }) => {
  const stats = {
    total: reports.length,
    resolved: reports.filter(r => r.status === ReportStatus.Resolved).length,
    inProgress: reports.filter(r => r.status === ReportStatus.InProgress).length,
    assigned: reports.filter(r => r.status === ReportStatus.Assigned).length,
  };
  
  const statusColorMap: { [key in ReportStatus]: string } = {
    [ReportStatus.New]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [ReportStatus.Assigned]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    [ReportStatus.InProgress]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    [ReportStatus.Resolved]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
        <Button onClick={() => navigateTo({ page: 'new-report' })}>
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Submit New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Reports" value={stats.total} />
        <StatCard title="Resolved" value={stats.resolved} />
        <StatCard title="In Progress" value={stats.inProgress} />
        <StatCard title="Assigned" value={stats.assigned} />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">My Reports</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">{report.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{report.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(report.submittedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[report.status]}`}>
                            {report.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" onClick={(e) => { e.preventDefault(); navigateTo({ page: 'report-detail', id: report.id }); }} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CitizenDashboard;
