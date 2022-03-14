export type MediaType = 'movie' | 'tv' | 'person';

export type MediaIDType = number;

export type UserIDType = string;

export interface UserType {
  id: string;
  email: string;
  fullname: string;
  username: string;
}

export type WatchStatusType = 'unwatched' | 'watched' | 'towatch';

export interface WatchedCountType {
  date: string;
  media_count: number;
}

interface WatchedDataType {
  id: number;
  created_at: string;
  date: string;
  media_type: 'movie' | 'tv';
  media_id: number;
  poster_path: string;
  title: string;
  rating?: number;
  review?: string;
  status: 'watched';
  user_id: string;
}

export interface WatchedDataByMonthType {
  [key: string]: WatchedDataType[];
}
