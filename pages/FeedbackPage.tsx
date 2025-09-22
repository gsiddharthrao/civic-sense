import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { FrownIcon, MehIcon, SmileIcon, LaughIcon, StarStruckIcon } from '../components/icons/IconComponents';

const ratings = [
    { value: 1, icon: FrownIcon, label: 'Unhappy' },
    { value: 2, icon: MehIcon, label: 'Neutral' },
    { value: 3, icon: SmileIcon, label: 'Satisfied' },
    { value: 4, icon: LaughIcon, label: 'Happy' },
    { value: 5, icon: StarStruckIcon, label: 'Very Happy' },
];

const FeedbackPage: React.FC = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your feedback! This is a demo and the form is not connected.');
    };

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <h1 className="text-2xl font-bold">Submit Feedback</h1>
                        <p className="text-sm text-gray-500">We'd love to hear your thoughts on how we can improve CivicLens.</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input id="name" label="Your Name" type="text" required />
                            <Input id="email" label="Your Email" type="email" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How would you rate your experience?</label>
                            <div className="flex justify-around items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                {ratings.map(({ value, icon: Icon, label }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setSelectedRating(value)}
                                        className="flex flex-col items-center space-y-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                        aria-label={label}
                                    >
                                        <Icon className={`h-8 w-8 ${selectedRating === value ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                                        <span className={`text-xs font-medium ${selectedRating === value ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Feedback</label>
                            <textarea id="feedback" required rows={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="What's on your mind? Tell us what you liked or what could be improved."
                            ></textarea>
                        </div>
                    </CardContent>
                    <CardFooter className="text-right">
                        <Button type="submit">Submit Feedback</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default FeedbackPage;