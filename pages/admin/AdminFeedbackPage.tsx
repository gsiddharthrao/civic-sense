
import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/Card';

const AdminFeedbackPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Feedback Submissions</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">User Feedback</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">This page will display feedback submitted by users. The feature is currently under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFeedbackPage;
