import { url, httpRequest, secUrl, generateSupabasePath } from '../lib/utils';
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
    const response = await httpRequest(`${secUrl}/discussions/${id}`);

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

  delete values.file;
  try {
    await httpRequest(
      secUrl + '/discussions',
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
  if (!id)
    throw new Error('Could not fetch as baraza details not well defined');

  try {
    const chats = await httpRequest(secUrl + `/discussions/${id}/chats`);

    return chats;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function chat({ message, id }) {
  try {
    await httpRequest(
      secUrl + `/discussions/${id}/chat`,
      'POST',
      JSON.stringify({ message })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createComment({ content, id }) {
  try {
    await httpRequest(
      secUrl + `/discussions/${id}/reply`,
      'POST',
      JSON.stringify({ content })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function upvote(id) {
  if (!id) throw new Error('Baraza not found');
  try {
    await httpRequest(secUrl + `/discussions/${id}/upvote`, 'POST');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createBarazaResource({ values, id }) {
  const { filePath, fileName } = generateSupabasePath(values.resource[0]);

  const { error } = await supabase.storage
    .from('uploads')
    .upload(fileName, values.resource[0]);

  if (error) throw new Error(error.message);

  values.resource = filePath;

  try {
    await httpRequest(
      `${secUrl}/discussions/${id}/resources`,
      'POST',
      JSON.stringify(values)
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getResources(id) {
  if (!id) throw new Error('Discussion no provided');
  try {
    const resources = await httpRequest(
      `${secUrl}/discussions/${id}/resources`
    );

    return resources;
  } catch (error) {
    throw new Error(error.message);
  }
}
