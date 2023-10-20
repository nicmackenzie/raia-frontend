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

export async function updateProfile(values){
  try {
    await httpRequest(
      url + `/users/${values.id}`,
      'PATCH',
      JSON.stringify({
        full_name: values.full_name,
        occupation: values.occupation,
        county: values.county === '' ? null: values.county,
        elected_position: values.elected_position === '' ? null : values.elected_position,
        interests: values.interests === '' ? null : values.interests,
        email: values.email === '' ? null : values.email,
        contact: values.contact === '' ? null : values.contact,
        date_of_birth: values.date_of_birth === '' ? null : values.date_of_birth,
        gender: values.gender === '' ? null : values.gender,
        national_id: values.national_id === '' ? null : values.national_id,
        location: values.address === '' ? null : values.address,
        profile_image: values.profile_image === '' ? null : values.profile_image
  })
    )
  } catch (error) {
    
  }
}
