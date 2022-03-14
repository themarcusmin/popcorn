import { supabase } from '$supabase/supabaseClient';
import type {
  MediaType,
  MediaIDType,
  UserIDType,
  WatchStatusType,
  WatchedCountType,
  WatchedDataByMonthType
} from '$models/supabase.interface';

export async function checkWatch(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<WatchStatusType> {
  if (typeof user_id === 'undefined') throw 'user is undefined';

  const { data, error } = await supabase
    .from('watch')
    .select('status')
    .eq('media_type', media_type)
    .eq('media_id', media_id)
    .eq('user_id', user_id);
  if (error) {
    throw error;
  }

  if (!data.length) {
    return 'unwatched';
  }
  return data[0].status;
}

export async function addToWatch(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType,
  poster_path: string,
  title: string
): Promise<boolean> {
  // Insert data into table 'watch'
  const { error } = await supabase
    .from('watch')
    .insert([{ media_type, media_id, user_id, status: 'towatch' }], { returning: 'minimal' });

  if (error) throw error;

  // Upsert data into table 'media'
  const { error: error2 } = await supabase
    .from('media')
    .upsert({ media_id, media_type, poster_path, title });

  if (error2) throw error2;

  return true;
}

export async function updateToWatched(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase
    .from('watch')
    .update({ status: 'watched' })
    .match({ media_type, media_id, user_id });

  if (error) throw error;
  return true;
}

export async function removeWatched(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase.from('watch').delete().match({ media_type, media_id, user_id });

  if (error) throw error;

  return true;
}

import { Search } from '$api/api';

/**
 * Profile: Query for watched media grouped by month
 * @param user_id
 * @returns
 */
export async function getWatched(user_id: UserIDType): Promise<WatchedDataByMonthType> {
  const { data, error } = await supabase
    .from('watch')
    .select('*')
    .match({ user_id, status: 'watched' })
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Add poster_path, title + transform date into the format "month year"
  const formattedData = await Promise.all(
    data.map(async (d) => {
      const date = new Date(d.created_at).toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });
      if (d.media_type === 'movie') {
        const { title, poster_path } = await Search.getMoviePosterAndTitle(d.media_id);
        return {
          title,
          poster_path,
          date,
          ...d
        };
      } else if (d.media_type === 'tv') {
        const { name, poster_path } = await Search.getTVPosterAndTitle(d.media_id);
        return { title: name, poster_path, date, ...d };
      }
      return d;
    })
  );

  // Group data by date
  const groupedData = formattedData.reduce(function (r, a) {
    r[a.date] = r[a.date] || [];
    r[a.date].push(a);
    return r;
  }, Object.create(null));

  return groupedData;
}

/**
 * Profile: Query for to watch media grouped by month
 * @param user_id
 * @returns
 */
export async function getToWatch(user_id: UserIDType): Promise<WatchedDataByMonthType> {
  const { data, error } = await supabase
    .from('watch')
    .select('*')
    .match({ user_id, status: 'towatch' })
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Add poster_path, title + transform date into the format "month year"
  const formattedData = await Promise.all(
    data.map(async (d) => {
      const date = new Date(d.created_at).toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });
      if (d.media_type === 'movie') {
        const { title, poster_path } = await Search.getMoviePosterAndTitle(d.media_id);
        return {
          title,
          poster_path,
          date,
          ...d
        };
      } else if (d.media_type === 'tv') {
        const { name, poster_path } = await Search.getTVPosterAndTitle(d.media_id);
        return { title: name, poster_path, date, ...d };
      }
      return d;
    })
  );

  // Group data by date
  const groupedData = formattedData.reduce(function (r, a) {
    r[a.date] = r[a.date] || [];
    r[a.date].push(a);
    return r;
  }, Object.create(null));

  return groupedData;
}

/**
 * Profile: Query for the number of watched media content
 * @param user_id
 * @returns
 */
export async function getWatchedCount(user_id: UserIDType): Promise<number> {
  const { count, error } = await supabase
    .from('watch')
    .select('*', { count: 'exact' })
    .match({ user_id, status: 'watched' });

  if (error) throw error;

  return count;
}

/**
 * Profile: Query for the number of towatch media content
 * @param user_id
 * @returns
 */
export async function getToWatchCount(user_id: UserIDType): Promise<number> {
  const { count, error } = await supabase
    .from('watch')
    .select('*', { count: 'exact' })
    .match({ user_id, status: 'towatch' });

  if (error) throw error;

  return count;
}

/**
 * Description: Reload schema whenever a new function is added or schema is updated
 *
 * NOTIFY pgrst, 'reload schema'
 */

/**
 * Description: Function to retrieve the number of media consumed by the user
 * 
 * CREATE OR REPLACE FUNCTION countWatchedMedia(USERID text, TZNAME text, MONTHS int)
    RETURNS TABLE (
      dte timestamp,
      media_count bigint
    )
  AS $$
  BEGIN
   RETURN QUERY
    select
    date_trunc('day', created_at at time zone TZNAME)::timestamp, count(id)
    from watch
    where status = 'watched'
    and user_id::text = USERID
    and created_at > current_date - (MONTHS || ' months')::interval
    group by date_trunc('day', created_at::timestamptz at time zone TZNAME);
  END;
  $$ LANGUAGE plpgsql
 */

export async function countWatched(user_id: UserIDType): Promise<WatchedCountType[]> {
  if (typeof user_id === 'undefined') throw 'user is undefined';

  const { data, error } = await supabase.rpc('countwatchedmedia', {
    userid: user_id,
    tzname: 'Australia/Melbourne',
    months: 5
  });

  if (error) {
    throw error;
  }
  return data;
}
