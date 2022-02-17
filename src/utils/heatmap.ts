import type { monthType } from '$models/profile.interface';

const allMonths: monthType[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

/**
 * Calculate and return the array of previous months
 *
 * @param num               number of previous months including the currentMonth
 * @param currentMonth      0 - Jan ... 11 - Dec
 * @returns
 */
export function getPreviousMonths(num: number, currentMonth: number): monthType[] {
  // Invalid Month
  if (currentMonth < 0 || currentMonth > 11) return [];
  const l = allMonths.length;
  // Month is within Dec less number of previous months and Dec
  if (num - 1 <= currentMonth && currentMonth <= 11) {
    return allMonths.slice(currentMonth - num + 1, currentMonth + 1);
  }
  const arr2 = allMonths.slice(0, currentMonth + 1);
  const l_arr2 = arr2.length;
  const arr1 = allMonths.slice(l - num + l_arr2, l);
  return arr1.concat(arr2);
}

// Message string for tooltop on hover
export function tooltipMessage({
  value,
  month,
  day
}: {
  value: number;
  month: string;
  day: string;
}): string {
  return `${value} content${value > 0 ? 's' : ''}<br> between ${day} of ${month}`;
}
