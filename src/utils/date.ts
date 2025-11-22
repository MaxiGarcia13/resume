import type { Schedule } from '@/types/experiences';

export function formatSechedule(schedule: Schedule) {
  const startDate = new Date(schedule.startDate);
  const endDate = schedule.endDate ? new Date(schedule.endDate) : null;

  return {
    startDate: formatDate(startDate),
    endDate: endDate ? formatDate(endDate) : null,
  };
};

export function formatDate(date: Date) {
  const monthName = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);

  return `${monthName}. ${date.getFullYear()}`;
};

export function diffDates(schedule: Schedule) {
  const startDate = new Date(schedule.startDate);
  const endDate = schedule.endDate ? new Date(schedule.endDate) : new Date();

  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months };
};
