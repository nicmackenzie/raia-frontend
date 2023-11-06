import { httpRequest, url } from '../lib/utils';

export async function createPoll(details) {
  try {
    await httpRequest(url + '/polls', 'POST', JSON.stringify(details));
  } catch (error) {
    throw new Error(error.message);
  }
}
