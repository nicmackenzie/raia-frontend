import { httpRequest, url } from '../lib/utils';

export async function createEvent(details) {
  try {
    await httpRequest(url + '/events', 'POST', JSON.stringify(details));
  } catch (error) {
    throw new Error(error.message);
  }
}
