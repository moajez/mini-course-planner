import React from 'react';
import { Course } from '../types';

interface FilterDatesProps {
  course: Course;
  onUpdate: (course: Course) => void;
}

export const FilterDates: React.FC<FilterDatesProps> = ({ course, onUpdate }) => {
  const addExcludedDate = (date: string) => {
    if (!course.excludedDates.includes(date)) {
      onUpdate({
        ...course,
        excludedDates: [...course.excludedDates, date].sort()
      });
    }
  };

  const removeExcludedDate = (date: string) => {
    onUpdate({
      ...course,
      excludedDates: course.excludedDates.filter(d => d !== date)
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Filter Dates</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={course.excludeHolidays}
            onChange={(e) => onUpdate({ ...course, excludeHolidays: e.target.checked })}
            className="rounded bg-gray-700 border-gray-600"
          />
          <label className="ml-2 text-gray-300">Remove National Holidays</label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300">Add Date to Exclude</label>
          <input
            type="date"
            onChange={(e) => addExcludedDate(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Excluded Dates</label>
          <div className="space-y-2">
            {course.excludedDates.map(date => (
              <div key={date} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                <span className="text-white">{date}</span>
                <button
                  onClick={() => removeExcludedDate(date)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};