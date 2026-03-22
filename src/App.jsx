import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPageOld';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedPage from './components/ProtectedPage';
import Footer from './components/Footer';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import BookConsultation from './pages/dashboard/BookConsultation';
import ConsultationHistory from './pages/dashboard/ConsultationHistory';
import Settings from './pages/dashboard/Settings';
import ActiveConsultations from './pages/dashboard/ActiveConsultations';

export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedPage>
            <DashboardLayout />
          </ProtectedPage>
        }
      >
        <Route index element={<Navigate to="book" replace />} />
        <Route path="book" element={<BookConsultation />} />
        <Route path="active" element={<ActiveConsultations />} />
        <Route path="history" element={<ConsultationHistory />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  );
}
