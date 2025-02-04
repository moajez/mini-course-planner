import React from 'react';
import { Course } from '../types';

interface CourseFormProps {
  course: Course;
  onUpdate: (course: Course) => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, onUpdate }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Course Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Course Name</label>
          <input
            type="text"
            value={course.name}
            onChange={(e) => onUpdate({ ...course, name: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Course Code</label>
          <input
            type="text"
            value={course.code}
            onChange={(e) => onUpdate({ ...course, code: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Notes</label>
          <textarea
            value={course.notes}
            onChange={(e) => onUpdate({ ...course, notes: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};