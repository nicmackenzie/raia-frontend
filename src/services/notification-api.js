import { httpRequest, url } from '../lib/utils';

export async function getNotifications() {
  try {
    return await httpRequest(url + '/notifications');
  } catch (error) {
    throw new Error(error.message);
  }
}
