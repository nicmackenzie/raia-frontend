import { httpRequest, url } from '../lib/utils';
import { supabase, supabaseUrl } from '../supabase/supabase';

export async function createEvent(details) {
  const fileName = `${Math.random()}-${details.poster[0].name}`.replaceAll(
    '/',
    ''
  );
  const filePath = `${supabaseUrl}/storage/v1/object/public/events/${fileName}`;
  const { error } = await supabase.storage
    .from('events')
    .upload(fileName, details.poster[0]);
  if (error) throw new Error(error.message);
  const formFields = {
    ...details,
    poster_url: filePath,
  };
  delete formFields.poster;
  try {
    await httpRequest(url + '/events', 'POST', JSON.stringify(formFields));
  } catch (error) {
    throw new Error(error.message);
  }
}
