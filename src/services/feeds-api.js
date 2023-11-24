import { httpRequest, secUrl } from '../lib/utils';

const baseUrl = secUrl + '/feeds';

export async function createFeed(content) {
  try {
    const data = await httpRequest(baseUrl, 'POST', JSON.stringify(content));

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFeeds() {
  try {
    const data = await httpRequest(baseUrl);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFriendSuggestions() {
  try {
    const data = await httpRequest(`${secUrl}/friends/suggestions`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
