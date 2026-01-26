
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Attendee, RegistrationStatus } from './types';
import { INITIAL_ATTENDEES } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import UserProfilePage from './pages/UserProfilePage';
import TicketPage from './pages/TicketPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RiddleRushPage from './pages/RiddleRushPage';
import CarnivalJourneyPage from './pages/CarnivalJourneyPage';
import ThankYouPage from './pages/ThankYouPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentUser, setCurrentUser] = useState<Attendee | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshData = useCallback(() => {
    const saved = localStorage.getItem('hyundai_carnival_db');
    let latestAttendees: Attendee[] = [];
    
    if (saved) {
      latestAttendees = JSON.parse(saved);
    } else {
      latestAttendees = INITIAL_ATTENDEES;
      localStorage.setItem('hyundai_carnival_db', JSON.stringify(latestAttendees));
    }
    
    setAttendees(latestAttendees);

    // Sync current user with their latest data in the DB
    if (currentUser) {
      const updatedUser = latestAttendees.find((a: Attendee) => a.id === currentUser.id);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    refreshData();
  }, []);

  const handleRegister = (newAttendee: Attendee) => {
    // Explicitly set the new user and jump to success
    setCurrentUser(newAttendee);
    // Refresh to pull the new user into the local attendees list
    const saved = localStorage.getItem('hyundai_carnival_db');
    if (saved) {
      setAttendees(JSON.parse(saved));
    }
    setCurrentPage(Page.PAYMENT_SUCCESS);
  };

  const handleGuestLogin = (code: string) => {
    // Refresh data first to ensure we are looking at latest DB
    const saved = localStorage.getItem('hyundai_carnival_db');
    const latest = saved ? JSON.parse(saved) : INITIAL_ATTENDEES;
    setAttendees(latest);

    const user = latest.find((a: Attendee) => a.id.toUpperCase() === code.toUpperCase());
    if (user) {
      setCurrentUser(user);
      setCurrentPage(Page.USER_PROFILE);
      return true;
    }
    return false;
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    refreshData();
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LANDING: return <LandingPage onNavigate={navigateTo} onGuestLogin={handleGuestLogin} />;
      case Page.REGISTRATION: return <RegistrationPage onSubmit={handleRegister} onNavigate={navigateTo} />;
      case Page.PAYMENT_SUCCESS: return <PaymentSuccessPage user={currentUser} onNavigate={navigateTo} />;
      case Page.USER_PROFILE: return <UserProfilePage user={currentUser} attendees={attendees} onNavigate={navigateTo} />;
      case Page.TICKET: return <TicketPage user={currentUser} onNavigate={navigateTo} />;
      case Page.ADMIN_LOGIN: return <AdminLoginPage onLogin={(s) => { if(s) { setIsAdmin(true); navigateTo(Page.ADMIN_DASHBOARD); } }} onNavigate={navigateTo} />;
      case Page.ADMIN_DASHBOARD: return <AdminDashboardPage attendees={attendees} setAttendees={setAttendees} onNavigate={navigateTo} />;
      case Page.RIDDLE_RUSH: return <RiddleRushPage user={currentUser} onNavigate={navigateTo} onUpdate={refreshData} />;
      case Page.CARNIVAL_JOURNEY: return <CarnivalJourneyPage user={currentUser} onNavigate={navigateTo} onUpdate={refreshData} />;
      case Page.THANK_YOU: return <ThankYouPage user={currentUser} onNavigate={navigateTo} />;
      default: return <LandingPage onNavigate={navigateTo} onGuestLogin={handleGuestLogin} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} isAdmin={isAdmin} onLogout={() => { setIsAdmin(false); navigateTo(Page.LANDING); }} />
      <main className="flex-grow">{renderPage()}</main>
      <footer className="bg-gray-100 py-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/1024px-Hyundai_Motor_Company_logo.svg.png" alt="Hyundai" className="h-5 opacity-80" />
              <p className="text-sm text-gray-500 max-w-xs text-pretty">Celebrating the spirit of adventure with the Hyundai Explorers community.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#002C5F] uppercase tracking-widest">Support</h4>
              <a href="tel:18001022026" className="flex items-center text-gray-600 hover:text-[#00AAD2] transition-colors font-bold text-lg">1800 102 2026</a>
              <p className="text-xs text-gray-400 italic">Available 24/7 for event queries</p>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-sm font-bold text-[#002C5F] uppercase tracking-widest">Quick Links</h4>
              <button onClick={() => navigateTo(Page.ADMIN_LOGIN)} className="text-sm text-gray-500 hover:text-blue-900 transition-colors text-left font-medium">Admin Access</button>
              <button onClick={() => navigateTo(Page.THANK_YOU)} className="text-sm text-gray-500 hover:text-blue-900 transition-colors text-left font-medium">Feedback / Post-Event</button>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center md:text-left text-xs text-gray-400">
            <span>&copy; 2026 Hyundai Motor India Limited. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
