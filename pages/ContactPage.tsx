import React from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo and the form is not connected.');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="text-sm text-gray-500">Have a question or need assistance? Drop us a line.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input id="name" label="Your Name" type="text" required />
            <Input id="email" label="Your Email" type="email" required />
            <div>
              <label htmlFor="problem_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Describe your problem</label>
              <textarea id="problem_description" required rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Please describe the issue you're facing or the question you have..."
              ></textarea>
            </div>
          </CardContent>
          <CardFooter className="text-right">
            <Button type="submit">Send Message</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ContactPage;