import 'dayjs/locale/uk';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { Locale } from '@/_i18n/config';

dayjs.extend(advancedFormat);

/**
 * Formats a date as "19th Mar 2025" with ordinal suffix
 */
export function formatDateWithOrdinal(
  date: Date | string,
  locale: Locale,
): string {
  const d = dayjs(date);
  const formattedDate = d.locale(locale).format('Do MMM YYYY');
  return formattedDate;
}
