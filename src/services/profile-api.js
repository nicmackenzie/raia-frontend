import { httpRequest, url } from '../lib/utils';
import { supabase, supabaseUrl } from '../supabase/supabase';

export async function uploadLeaderCertificate(values) {
  const fileName = `${Math.random()}-${values.certificate[0].name}`.replaceAll(
    '/',
    ''
  );
  const filePath = `${supabaseUrl}/storage/v1/object/public/uploads/${fileName}`;
  const { error } = await supabase.storage
    .from('uploads')
    .upload(fileName, values.certificate[0]);

  if (error) throw new Error(error.message);

  try {
    await httpRequest(
      url + '/certificate-upload',
      'POST',
      JSON.stringify({
        upload_url: filePath,
        county_id: values.county,
        elected_position: values.position,
      })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTopVoicesAndLeaders() {
  try {
    const followers = await httpRequest(url + '/users/top_influencers');
    const leaders = await httpRequest(url + '/users/leaders');

    return { followers, leaders };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProfile(username) {
  try {
    const profile = await httpRequest(
      `${url}/users/find_by_username/${username}`
    );

    return profile;
  } catch (error) {
    throw new Error(error.message);
  }
}
