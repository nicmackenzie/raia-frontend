import { url, getToken, httpRequest } from '../lib/utils';
import { supabase, supabaseUrl } from '../supabase/supabase';



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
    try {
        await httpRequest(
            url + '/discussions',
            'POST',
            JSON.stringify({
                topic: values.topic,
                title: values.title,
                content: values.content,
                user_id: values.id
            })
        )
    } catch (error) {
        
    }
}