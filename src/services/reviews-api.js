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

export async function getReviews({ filter, page }) {
  let params = '';
  if (filter) {
    params += `?category=${filter.value}&page=${page}`;
  } else {
    params += '?page=' + page;
  }

  try {
    const reviews = await httpRequest(url + '/reviews/leader' + params);
    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
}
