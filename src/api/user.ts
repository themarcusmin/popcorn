/**
 * Description: Function to create user profile on user registration
 * 
 * create table users (
    id uuid references auth.users not null primary key,
    email varchar(40) unique,
    fullname varchar(40),
    username varchar(40) unique
   );

   create or replace function public.handle_new_user()
    returns trigger as $$
    begin
    insert into public.users (id, email, username)
    values (new.id, new.email, new.email);
    return new;
   end;
   $$ language plpgsql security definer;

   create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
 */

import type { UserType } from '$models/supabase.interface';
import { supabase } from '$supabase/supabaseClient';

export async function getUserInfo(username: string): Promise<UserType> {
  const { data, error } = await supabase.from('users').select('*').match({ username });

  if (error) throw error;

  return data[0];
}
