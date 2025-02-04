import { Course } from '../types';

export const generateSchedule = (course: Course): string[] => {
  const start = new Date(course.startDate);
  const end = new Date(course.endDate);
  const schedule: string[] = [];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const selectedDayIndices = course.selectedDays.map(day => dayNames.indexOf(day));
  
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    if (selectedDayIndices.includes(d.getDay()) && 
        !course.excludedDates.includes(d.toISOString().split('T')[0])) {
      schedule.push(d.toISOString().split('T')[0]);
    }
  }
  
  return schedule;
};