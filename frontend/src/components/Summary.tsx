import React, { useState } from 'react';
import { Course } from '../types';
import { generateSchedule } from '../utils/dateUtils';
import { generateCSV } from '../utils/csv';
import { Download, Calendar } from 'lucide-react';
import { AuthModal } from './AuthModal';

interface SummaryProps {
  course: Course;
}

export const Summary: React.FC<SummaryProps> = ({ course }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const schedule = generateSchedule(course);
  
  const downloadSchedule = () => {
    const csvContent = generateCSV(schedule, course);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.code}-schedule.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLogin = (user: { email: string; password: string }) => {
    // Here you would typically handle the authentication
    console.log('Login attempted:', user);
    setShowAuthModal(false);
    // After successful login, you would handle calendar integration
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Course Schedule Summary</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Course Duration</h3>
          <p className="text-gray-300">Total Weeks: {Math.ceil(schedule.length / course.selectedDays.length)}</p>
          <p className="text-gray-300">Teaching Days: {schedule.length}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Schedule Details</h3>
          <p className="text-gray-300">Selected Days: {course.selectedDays.join(', ')}</p>
          <p className="text-gray-300">Excluded Dates: {course.excludedDates.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={downloadSchedule}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          <Download size={20} />
          Download Schedule (CSV)
        </button>
        
        <button
          onClick={() => setShowAuthModal(true)}
          className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600"
        >
          <Calendar size={20} />
          Add to Calendar
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-white mb-2">Teaching Schedule</h3>
        <div className="bg-gray-900 p-4 rounded-lg">
          {schedule.map((date, index) => (
            <div key={date} className="text-gray-300">
              Week {Math.floor(index / course.selectedDays.length) + 1}: {date}
            </div>
          ))}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};