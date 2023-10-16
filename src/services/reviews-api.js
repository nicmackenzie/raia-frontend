import { getToken, httpRequest, url } from '../lib/utils';

export async function postReview(reviewDetails) {
  try {
    await httpRequest(`${url}/reviews`, 'POST', JSON.stringify(reviewDetails), {
      Authorization: getToken().access_token,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
