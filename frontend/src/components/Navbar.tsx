import React from 'react';
import { Home, Calendar, Clock, Filter, List, LogOut } from 'lucide-react';
import { Step, StepProgress, User } from '../types';

interface NavbarProps {
  currentStep: string;
  onNavigate: (step: Step) => void;
  stepProgress: StepProgress;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentStep, 
  onNavigate, 
  stepProgress,
  user,
  onLogout 
}) => {
  return (
    <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
      <div className="text-blue-600 font-semibold text-xl">Course Planner</div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-2 ${
              currentStep === 'home' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home size={20} />
            <span className="hidden md:inline">Home</span>
          </button>
          <button
            onClick={() => onNavigate('dateRange')}
            className={`flex items-center gap-2 ${
              !stepProgress.dateRange 
                ? 'text-gray-300 cursor-not-allowed' 
                : currentStep === 'dateRange'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
            disabled={!stepProgress.dateRange}
          >
            <Calendar size={20} />
            <span className="hidden md:inline">Date Range</span>
          </button>
          <button
            onClick={() => onNavigate('weekdays')}
            className={`flex items-center gap-2 ${
              !stepProgress.weekdays
                ? 'text-gray-300 cursor-not-allowed'
                : currentStep === 'weekdays'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
            disabled={!stepProgress.weekdays}
          >
            <Clock size={20} />
            <span className="hidden md:inline">Weekdays</span>
          </button>
          <button
            onClick={() => onNavigate('filter')}
            className={`flex items-center gap-2 ${
              !stepProgress.filter
                ? 'text-gray-300 cursor-not-allowed'
                : currentStep === 'filter'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
            disabled={!stepProgress.filter}
          >
            <Filter size={20} />
            <span className="hidden md:inline">Filter</span>
          </button>
          <button
            onClick={() => onNavigate('summary')}
            className={`flex items-center gap-2 ${
              !stepProgress.summary
                ? 'text-gray-300 cursor-not-allowed'
                : currentStep === 'summary'
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
            disabled={!stepProgress.summary}
          >
            <List size={20} />
            <span className="hidden md:inline">Summary</span>
          </button>
        </div>

        {user && (
          <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};