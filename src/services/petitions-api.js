import { supabase } from '../supabase/supabase';
import { generateSupabasePath, httpRequest, url } from '../lib/utils';

export async function getPetitions() {
  try {
    return await httpRequest(url + '/petitions');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPetition(id) {
  try {
    return await httpRequest(url + '/petitions/' + id);
  } catch (error) {
    throw new Error(error.message);
  }
}

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

export async function signPetition({ reason, id }) {
  try {
    await httpRequest(
      `${url}/petitions/${id}/sign`,
      'POST',
      JSON.stringify({ reason_for_signing: reason })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
