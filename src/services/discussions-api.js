import { url, httpRequest } from '../lib/utils';
import { supabase, supabaseUrl } from '../supabase/supabase';

export async function getDiscussions() {
  try {
    const response = await httpRequest(`${url}/discussions`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDiscussionById(id) {
  try {
    const response = await httpRequest(`${url}/discussions/${id}`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDiscussionResponses(id) {
  try {
    const response = await httpRequest(
      `${url}/discussions/${id}/discussion_replies`
    );

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createDiscussion(values) {
  let filePath;
  const hasResource = values.file.length > 0;
  if (hasResource) {
    const fileName = `${Math.random()}-${values.file[0].name}`.replaceAll(
      '/',
      ''
    );
    filePath = `${supabaseUrl}/storage/v1/object/public/uploads/${fileName}`;
    const { error } = await supabase.storage
      .from('uploads')
      .upload(fileName, values.file[0]);

    if (error) throw new Error(error.message);
  }
  // const dateTime = new Date(`${values.date} ${values.time}`);
  delete values.file;
  try {
    await httpRequest(
      url + '/discussions',
      'POST',
      JSON.stringify({
        ...values,
        discussion_resources: hasResource ? filePath : null,
      })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postResponse(values) {
  try {
    await httpRequest(
      url + `/discussions/${values.discussion_id}/discussion_replies`,
      'POST',
      JSON.stringify({
        content: values.content,
        user_id: values.id,
        upvotes: null,
      })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getChats(id) {
  try {
    const chats = await httpRequest(url + `/discussions/${id}/chats`);

    return chats;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function chat({ message, id }) {
  try {
    await httpRequest(
      url + `/discussions/${id}/chat`,
      'POST',
      JSON.stringify({ message })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
