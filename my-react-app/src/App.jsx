import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import Compliance from './pages/Compliance';
import WeatherImpactCheck from './pages/WeatherImpactCheck'; // import new page component

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-7">
                  <div className="flex items-center py-4">
                    <Link to="/" className="text-xl font-semibold">Dashboard</Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link to="/suppliers" className="py-4 px-2 hover:text-blue-500">Suppliers</Link>
                    <Link to="/compliance" className="py-4 px-2 hover:text-blue-500">Compliance</Link>
                    <Link to="/weather-impact" className="py-4 px-2 hover:text-blue-500">Weather Impact Check</Link> {/* New Link */}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/weather-impact" element={<WeatherImpactCheck />} /> {/* New Route */}
              <Route path="/We" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
