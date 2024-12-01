import React from 'react';
import { StatCard as StatCardType } from '../types';

export const StatCard: React.FC<StatCardType> = ({ title, icon, color, value }) => (
  <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg transition-all">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div className="mr-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);