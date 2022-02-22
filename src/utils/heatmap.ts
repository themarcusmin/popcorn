import type { MonthType, DayType, HeatMapDataType } from '$models/profile.interface';
import type { WatchedCountType } from '$models/supabase.interface';

const allMonths: MonthType[] = [
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
 * Calculate and return the array of previous months (Heatmap x-axis)
 *
 * @param num               number of previous months including the currentMonth
 * @param currentMonth      0 - Jan ... 11 - Dec
 * @returns                 array of previous "num" months in order
 */
export function getPreviousMonths(num: number, currentMonth: number): MonthType[] {
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

/**
 * Message string for tooltop on hover
 */
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

const dayRanges: DayType[] = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-31'];

/**
 * Hydrate empty heatmap data with watched data from DB
 *
 * @param watchedData         data array from supabase DB
 * @param heatmapData         intial data from heatmap.json
 * @returns                   updated heatmap data for d3 template
 */
export function hydrateWatchedData(
  watchedData: WatchedCountType[],
  heatmapData: HeatMapDataType[]
): HeatMapDataType[] {
  for (const data of watchedData) {
    // Extract day, month and count from each element
    const date = new Date(data.date);
    const day = date.getDate();
    const month = date.getMonth();
    const count = data.media_count;

    // Map day to day ranges
    let dayIndex: number;
    switch (true) {
      case 1 <= day && day <= 5:
        dayIndex = 0;
        break;
      case 6 <= day && day <= 10:
        dayIndex = 1;
        break;
      case 11 <= day && day <= 15:
        dayIndex = 2;
        break;
      case 16 <= day && day <= 20:
        dayIndex = 3;
        break;
      case 21 <= day && day <= 25:
        dayIndex = 4;
        break;
      case 26 <= day && day <= 31:
        dayIndex = 5;
        break;
    }

    // Increment count after month equality check and day range check
    heatmapData.map((data) => {
      if (data.month === allMonths[month] && data.day === dayRanges[dayIndex]) {
        data.value += count;
      }
    });
  }
  return heatmapData;
}
