
import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/Card';

const AdminContactPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Form Submissions</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Contact Messages</h2>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">This page will display messages from the public "Contact Us" form. The feature is currently under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContactPage;
