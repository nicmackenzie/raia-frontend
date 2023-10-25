import { getToken, httpRequest, url } from '../lib/utils';

export async function postReview(reviewDetails) {
  try {
    await httpRequest(`${url}/reviews`, 'POST', JSON.stringify(reviewDetails));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getReviews({ filter }) {
  let params = '';
  if (filter) {
    params += `?category=${filter.value}`;
  } else {
    // params += '?page=' + page;
  }

  try {
    const reviews = await httpRequest(url + '/reviews/leader' + params);
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
}
