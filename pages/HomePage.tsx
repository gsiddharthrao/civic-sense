import React from 'react';
import Button from '../components/Button';
import { View } from '../types';
import Card, { CardContent } from '../components/Card';
import { TargetIcon, CameraIcon, TrendingUpIcon, CheckCircleIcon } from '../components/icons/IconComponents';

interface HomePageProps {
  navigateTo: (view: View) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <Card className="text-left transform hover:-translate-y-1 transition-transform duration-300">
        <CardContent>
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
    </Card>
);

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
        <div className="text-center py-16 sm:py-24">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Report, <span className="text-indigo-600 dark:text-indigo-400">Track,</span> Resolve.
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                CivicLens empowers you to be an active part of your community. Report civic issues, track their progress, and help make your neighborhood a better place.
                </p>
                <div className="mt-8">
                <Button size="lg" onClick={() => navigateTo({ page: 'login' })}>
                    Go to Dashboard
                </Button>
                </div>
            </div>
        </div>

        <div className="py-16 sm:py-24 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">Features</h2>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
                        A Better Way to Engage with Your City
                    </p>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <FeatureCard 
                        icon={<TargetIcon className="h-6 w-6" />}
                        title="Pinpoint Accuracy"
                        description="Use your device's GPS to accurately report the location of an issue, or select it manually on the map."
                    />
                    <FeatureCard 
                        icon={<CameraIcon className="h-6 w-6" />}
                        title="Visual Reporting"
                        description="A picture is worth a thousand words. Attach photos to your report to provide clear visual context."
                    />
                     <FeatureCard 
                        icon={<TrendingUpIcon className="h-6 w-6" />}
                        title="Real-Time Tracking"
                        description="Stay informed with a visual timeline of your report's progress, from submission to resolution."
                    />
                     <FeatureCard 
                        icon={<CheckCircleIcon className="h-6 w-6" />}
                        title="Community Impact"
                        description="See all resolved issues on the map and be a part of the positive change in your community."
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;