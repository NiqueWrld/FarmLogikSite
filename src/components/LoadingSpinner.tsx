import React from 'react';
import { Sprout } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Sprout className="h-16 w-16 text-[#00c6ff] animate-bounce" />
        <div className="text-2xl font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent">
          FarmLogik
        </div>
        <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#00c6ff] animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;