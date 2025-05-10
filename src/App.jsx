import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import AboutUs from './AboutUs/AboutUs';
import ContactUs from './ContactUs/ContactUs';
import Appointment from './Appointment/Appointment';
import Inventory from './Inventory/Inventory';
import AdminLogin from './components/AdminLogin';
import BloodBank from './BloodBank/BloodBank';

const App = () => {

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check for existing login on app load
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const name = localStorage.getItem('adminName') || '';
    setIsAdminLoggedIn(loggedIn);
    setAdminName(name);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    localStorage.setItem('adminName', username);
    setIsAdminLoggedIn(true);
    setAdminName(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminName');
    setIsAdminLoggedIn(false);
    setAdminName('');
  };
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-20">
        <Header 
          isAdminLoggedIn={isAdminLoggedIn} 
          adminName={adminName} 
          onAdminLogout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bloodbank" element={<BloodBank />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route 
            path="/admin-login" 
            element={<AdminLogin onLogin={handleLogin} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
