export interface FriendType {
  name: string;
  friends_count: number;
}

export type MonthType =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';

export type DayType = '26-31' | '21-25' | '16-20' | '11-15' | '6-10' | '1-5';
export interface HeatMapDataType {
  month: MonthType;
  day: DayType;
  value: number;
}
