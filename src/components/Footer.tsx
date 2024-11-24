import React from 'react';
import { Github, Twitter, Sprout } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-[#00c6ff]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">
              FarmLogik
            </span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-500 hover:text-[#00c6ff] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-[#00c6ff] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-[#00c6ff] transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#00c6ff] transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#00c6ff] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FarmLogik. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;