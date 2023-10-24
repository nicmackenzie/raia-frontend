import { url, getToken, httpRequest } from '../lib/utils';

// const url = apiUrl();
export async function getDiscussions() {
  //   console.log();
  try {
    const response = await httpRequest(`${url}/discussions`);

    // const data = await response.json();
    // if (!response.ok) throw new Error(data.error);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}