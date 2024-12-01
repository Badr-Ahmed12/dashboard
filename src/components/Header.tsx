import React from 'react';
import { Bell, Moon } from 'lucide-react';

interface HeaderProps {
  notificationCount: number;
  onNotificationClick: () => void;
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  notificationCount,
  onNotificationClick,
  onThemeToggle,
}) => (
  <header className="bg-white dark:bg-gray-800 shadow-md transition-all">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        لوحة التحكم المتقدمة والتفاعلية
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={onNotificationClick}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative transition-all"
        >
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}
        </button>
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <Moon className="h-6 w-6" />
        </button>
      </div>
    </div>
  </header>
);