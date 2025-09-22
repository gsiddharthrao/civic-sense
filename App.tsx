import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import LiveMapPage from './pages/LiveMapPage';
import NewReportPage from './pages/citizen/NewReportPage';
import ReportDetailPage from './pages/citizen/ReportDetailPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminWorkersPage from './pages/admin/AdminWorkersPage';
import AdminFeedbackPage from './pages/admin/AdminFeedbackPage';
import AdminContactPage from './pages/admin/AdminContactPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import { User, Report, View, Worker } from './types';
import { getReports, getUsers, getWorkers, addUser as apiAddUser } from './services/api';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Modal from './components/Modal';
import AdminAuth from './components/AdminAuth';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>({ page: 'home' });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'user' | 'admin' | null>(null);

  // Data states
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [reportsData, usersData, workersData] = await Promise.all([
        getReports(),
        getUsers(),
        getWorkers(),
      ]);
      setReports(reportsData);
      setUsers(usersData);
      setWorkers(workersData);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveModal(null);
    if (user.role === 'admin') {
      setCurrentView({ page: 'admin-dashboard' });
    } else {
      setCurrentView({ page: 'citizen-dashboard' });
    }
  };

  const handleSignUp = async (newUserInfo: { username: string; email: string; }) => {
    try {
        const newUser = await apiAddUser(newUserInfo);
        setUsers(prevUsers => [...prevUsers, newUser]);
        handleLogin(newUser); // Automatically log in after sign up
    } catch(error) {
        alert(error instanceof Error ? error.message : "An unknown sign up error occurred.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView({ page: 'home' });
  };

  const navigateTo = (view: View) => {
    if (view.page === 'login') {
        setActiveModal('user');
    } else {
        setCurrentView(view);
    }
    setSidebarOpen(false);
  };
  
  const updateReport = (updatedReport: Report) => {
    setReports(prevReports => 
      prevReports.map(r => r.id === updatedReport.id ? updatedReport : r)
    );
  };
  
  const addReport = (newReport: Report) => {
    setReports(prevReports => [newReport, ...prevReports]);
  };

  const addWorker = (newWorker: Worker) => {
    setWorkers(prevWorkers => [...prevWorkers, newWorker]);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-full">Loading...</div>;
    }
    
    switch (currentView.page) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'login': // Fallback to keep app from crashing if called, opens modal.
         if (!activeModal) setActiveModal('user');
         return <HomePage navigateTo={navigateTo} />;
      case 'live-map':
        return <LiveMapPage reports={reports} navigateTo={navigateTo} />;
      case 'feedback':
        return <FeedbackPage />;
      case 'contact':
        return <ContactPage />;
      case 'citizen-dashboard':
        return currentUser && <CitizenDashboard user={currentUser} reports={reports.filter(r => r.submittedBy === currentUser.username)} navigateTo={navigateTo} />;
      case 'new-report':
        return currentUser && <NewReportPage user={currentUser} addReport={addReport} navigateTo={navigateTo} />;
      case 'report-detail':
        const report = reports.find(r => r.id === currentView.id);
        return report && <ReportDetailPage report={report} currentUser={currentUser} />;
      case 'admin-dashboard':
        return <AdminDashboard reports={reports} workers={workers} updateReport={updateReport} navigateTo={navigateTo} />;
      case 'admin-users':
        return <AdminUsersPage users={users} />;
      case 'admin-workers':
        return <AdminWorkersPage workers={workers} addWorker={addWorker} />;
      case 'admin-feedback':
        return <AdminFeedbackPage />;
      case 'admin-contact':
        return <AdminContactPage />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <Sidebar 
        currentUser={currentUser} 
        navigateTo={navigateTo} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen} 
        setIsOpen={setSidebarOpen} 
        openLoginModal={setActiveModal}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          openLoginModal={setActiveModal}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      <Modal isOpen={activeModal === 'user'} onClose={() => setActiveModal(null)} title="Citizen Portal">
        <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
      </Modal>

      <Modal isOpen={activeModal === 'admin'} onClose={() => setActiveModal(null)} title="Administrator Sign In">
        <AdminAuth onLogin={handleLogin} />
      </Modal>
    </div>
  );
};

export default App;
