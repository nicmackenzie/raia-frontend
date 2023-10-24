import { url, getToken, httpRequest } from '../lib/utils';

// const url = apiUrl();
export async function getDiscussions() {
  //   console.log();
  try {
    const response = await httpRequest(`${url}/discussions`);

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
                title: values.title,
                content: values.content,
                user_id: values.id
            })
        )
    } catch (error) {
        
    }
}