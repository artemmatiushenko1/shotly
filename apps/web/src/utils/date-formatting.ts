import dayjs from 'dayjs';

/**
 * Formats a date as "19th Mar 2025" with ordinal suffix
 */
export function formatDateWithOrdinal(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const ordinal = getOrdinalSuffix(day);
  const month = dayjs(d).format('MMM');
  const year = d.getFullYear();

  return `${day}${ordinal} ${month} ${year}`;
}

/**
 * Returns the ordinal suffix for a day (st, nd, rd, th)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
