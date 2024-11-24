import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, BarChart2, Settings, Home } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-[#00c6ff]" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">
                FarmLogik
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {[
              { path: '/', icon: Home, label: 'Dashboard' },
              { path: '/greenhouse', icon: Sprout, label: 'Greenhouse' },
              { path: '/insights', icon: BarChart2, label: 'Insights' },
              { path: '/settings', icon: Settings, label: 'Settings' }
            ].map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                  isActive(path)
                    ? 'text-[#00c6ff]'
                    : 'text-gray-600 hover:text-[#00c6ff]'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;