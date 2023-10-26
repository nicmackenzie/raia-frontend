import { url, getToken, httpRequest } from '../lib/utils';


export async function getDiscussions() {
  try {
    const response = await httpRequest(`${url}/discussions`);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export async function getDiscussionById(id) {
    try {
      const response = await httpRequest(`${url}/discussions/${id}`);
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export async function getDiscussionResponses(id) {
    try {
      const response = await httpRequest(`${url}/discussions/${id}/discussion_replies`);
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }


export async function createDiscussion(values){
  if (values.file.length > 0)  
  {
    const fileName = `${Math.random()}-${values.file[0].name}`.replaceAll(
        '/',
        ''
      );
      const filePath = `${supabaseUrl}/storage/v1/object/public/uploads/${fileName}`;
      const { error } = await supabase.storage
        .from('uploads')
        .upload(fileName, values.file[0]);
    
      if (error) throw new Error(error.message);
  }
      
    try {
        await httpRequest(
            url + '/discussions',
            'POST',
            JSON.stringify({
                title: values.title,
                content: values.content,
                user_id: values.id
            })
        )
    } catch (error) {
        throw new Error(error.message);  
    }
};

export async function postResponse(values){
  try {
    await httpRequest(
      url + `/discussions/${values.discussion_id}/discussion_replies`,
      'POST',
      JSON.stringify({
          content: values.content,
          discussion_id: values.discussion_id,
          user_id: values.id,
          upvotes: null,
      })
  )
  } catch (error) {
    
  }
}