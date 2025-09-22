
import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addWorker as apiAddWorker } from '../../services/api';
import { Worker, ReportCategory } from '../../types';

interface AdminWorkersPageProps {
  workers: Worker[];
  addWorker: (worker: Worker) => void;
}

const AdminWorkersPage: React.FC<AdminWorkersPageProps> = ({ workers, addWorker }) => {
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerContact, setNewWorkerContact] = useState('');
  const [newWorkerSpecs, setNewWorkerSpecs] = useState<ReportCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSpecChange = (spec: ReportCategory) => {
    setNewWorkerSpecs(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName.trim() || !newWorkerContact.trim()) return;
    setIsSubmitting(true);
    try {
        const newWorkerData = {
          name: newWorkerName,
          contact: newWorkerContact,
          specializations: newWorkerSpecs,
        }
        const createdWorker = await apiAddWorker(newWorkerData);
        addWorker(createdWorker);
        setNewWorkerName('');
        setNewWorkerContact('');
        setNewWorkerSpecs([]);
    } catch (error) {
        alert(error instanceof Error ? error.message : 'Failed to add worker');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Workers</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <h2 className="text-xl font-bold">Current Workers/Teams</h2>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specializations</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {workers.map((worker) => (
                        <tr key={worker.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{worker.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{worker.contact}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex flex-wrap gap-1">
                            {worker.specializations.map(spec => (
                                <span key={spec} className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                                {spec}
                                </span>
                            ))}
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </CardContent>
            </Card>
        </div>
        <div>
            <Card>
            <form onSubmit={handleAddWorker}>
                <CardHeader>
                <h2 className="text-xl font-bold">Add New Worker</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                <Input
                    id="new-worker-name"
                    label="Worker/Team Name"
                    value={newWorkerName}
                    onChange={e => setNewWorkerName(e.target.value)}
                    placeholder="e.g., Parks Department"
                    required
                />
                <Input
                    id="new-worker-contact"
                    label="Contact Info"
                    value={newWorkerContact}
                    onChange={e => setNewWorkerContact(e.target.value)}
                    placeholder="e.g., 555-1234"
                    required
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specializations</label>
                    <div className="space-y-2">
                    {Object.values(ReportCategory).map(cat => (
                        <label key={cat} className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={newWorkerSpecs.includes(cat)}
                            onChange={() => handleSpecChange(cat)}
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                        </label>
                    ))}
                    </div>
                </div>
                </CardContent>
                <CardFooter className="text-right">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Worker'}
                </Button>
                </CardFooter>
            </form>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkersPage;