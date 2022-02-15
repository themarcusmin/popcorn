import { supabase } from '$supabase/supabaseClient';

export const session = supabase.auth.session();
