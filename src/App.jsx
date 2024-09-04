import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import StockManagerPanel from './components/StockManagerPanel';
import Login from './components/Login';
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/stock-manager" element={<StockManagerPanel />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
