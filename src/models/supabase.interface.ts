export type MediaType = 'movie' | 'tv' | 'person';

export type MediaIDType = number;

export type UserIDType = string;

export type WatchStatusType = 'unwatched' | 'watched' | 'towatch';

export interface WatchedCountType {
  date: string;
  media_count: number;
}
