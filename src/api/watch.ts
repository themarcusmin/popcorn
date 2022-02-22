import { supabase } from '$supabase/supabaseClient';
import type {
  MediaType,
  MediaIDType,
  UserIDType,
  WatchStatusType,
  WatchedCountType
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
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase
    .from('watch')
    .insert([{ media_type, media_id, user_id, status: 'towatch' }], { returning: 'minimal' });

  if (error) {
    throw error;
  }
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

  if (error) {
    throw error;
  }
  return true;
}

export async function removeWatched(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase.from('watch').delete().match({ media_type, media_id, user_id });

  if (error) {
    throw error;
  }
  return true;
}

/**
 * Description: Reload schema whenever a new function is added
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
