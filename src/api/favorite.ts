import { supabase } from '$supabase/supabaseClient';
import type { MediaType, MediaIDType, UserIDType } from '$models/supabase.interface';

export async function checkFavorite(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  if (typeof user_id === 'undefined') return false;
  const { data, error } = await supabase
    .from('favorites')
    .select('media_type, media_id')
    .eq('media_type', media_type)
    .eq('media_id', media_id)
    .eq('user_id', user_id);
  if (error) {
    console.error(error);
    return false;
  }
  if (!data.length) return false;
  return true;
}

export async function addFavorite(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .insert([{ media_type, media_id, user_id }], { returning: 'minimal' });

  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

export async function removeFavorite(
  media_type: MediaType,
  media_id: MediaIDType,
  user_id: UserIDType
): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ media_type, media_id, user_id });

  if (error) {
    console.error(error);
    return false;
  }
  return true;
}
