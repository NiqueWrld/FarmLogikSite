import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ACCENT_COLORS = [
  { name: 'Ocean Blue', value: '#00c6ff' },
  { name: 'Forest Green', value: '#00b894' },
  { name: 'Sunset Orange', value: '#ff7675' },
  { name: 'Royal Purple', value: '#6c5ce7' },
  { name: 'Rose Pink', value: '#fd79a8' },
];

function Settings() {
  const { isDark, accentColor, toggleTheme, setAccentColor } = useThemeStore();

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Customize your FarmLogik experience</p>
      </div>

      <div className="grid gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Theme Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                </button>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Accent Color
              </label>
              <div className="grid grid-cols-5 gap-4">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${
                      accentColor === color.value ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Push Notifications</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Critical Alerts</span>
            </label>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Data Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Update Frequency</label>
              <select className="form-select w-full">
                <option>Real-time</option>
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every 30 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Temperature Unit</label>
              <select className="form-select w-full">
                <option>Celsius (°C)</option>
                <option>Fahrenheit (°F)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;