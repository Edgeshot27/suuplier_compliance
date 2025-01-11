import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Supplier from './pages/Supplier';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/supplier/:id" element={<Supplier />} />
      </Routes>
    </Router>
  );
};

export default App;
