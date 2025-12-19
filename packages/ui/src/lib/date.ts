import 'dayjs/locale/uk';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';

dayjs.extend(advancedFormat);

export enum DateFormat {
  ORDINAL = 'Do MMM YYYY', // 19th Mar 2025
  SHORT = 'DD/MM/YYYY', // 19/03/2025
  LONG = 'DD MMMM YYYY', // 19 March 2025
  FULL = 'DD MMMM YYYY HH:mm', // 19 March 2025 10:00
  MONTH_DAY_YEAR = 'MMMM D, YYYY', // March 19, 2025
  DAY_MONTH_YEAR = 'dd, DD MMM YYYY', // Sat, 19 Mar 2025
}

/**
 * Formats a date.
 */
export function formatDate(
  date: Date | string,
  locale: string,
  format: DateFormat | string = DateFormat.ORDINAL,
): string {
  const d = dayjs(date);
  const formattedDate = d.locale(locale).format(format);
  return formattedDate;
}
