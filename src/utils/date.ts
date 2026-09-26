import type { Schedule } from '@/types/schedule';

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

export function formatScheduleDuration(schedule: Schedule) {
  const { startDate, endDate } = formatSechedule(schedule);
  const { years, months } = diffDates(schedule);

  const duration
    = years > 0
      ? `${years} years${months > 0 ? ` and ${months} months` : ''}`
      : `${months} months`;

  return `${startDate} - ${endDate ?? 'now'}. ${duration}`;
}
