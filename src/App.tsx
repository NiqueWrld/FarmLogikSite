import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import GreenhousePrototype from './pages/GreenhousePrototype';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial load
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/greenhouse" element={<GreenhousePrototype />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;