import React from 'react';
import { Course } from '../types';

interface DateRangeSelectorProps {
  course: Course;
  onUpdate: (course: Course) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ course, onUpdate }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Select Date Range</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Start Date</label>
          <input
            type="date"
            value={course.startDate}
            onChange={(e) => onUpdate({ ...course, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">End Date</label>
          <input
            type="date"
            value={course.endDate}
            onChange={(e) => onUpdate({ ...course, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};