import React from 'react';
import { X } from 'lucide-react';

interface NotificationCenterProps {
  notifications: string[];
  isOpen: boolean;
  onClose: () => void;
  onClear: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  isOpen,
  onClose,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">الإشعارات</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <ul className="space-y-2">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded transition-all"
          >
            {notification}
          </li>
        ))}
      </ul>
      <button
        onClick={onClear}
        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-all"
      >
        مسح الكل
      </button>
    </div>
  );
};