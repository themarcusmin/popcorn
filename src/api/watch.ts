import { supabase } from '$supabase/supabaseClient';
import type {
  MediaType,
  MediaIDType,
  UserIDType,
  WatchStatusType
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
