import { generateSupabasePath, httpRequest, url } from '../lib/utils';
import { supabase } from '../supabase/supabase';

export async function createPetition(values) {
  const { filePath, fileName } = generateSupabasePath(
    values.petition_poster[0]
  );
  const { error } = await supabase.storage
    .from('uploads')
    .upload(fileName, values.petition_poster[0]);

  if (error) throw new Error(error.message);

  values.petition_poster = filePath;

  try {
    await httpRequest(url + '/petitions', 'POST', JSON.stringify(values));
  } catch (error) {
    throw new Error(error.message);
  }
}
