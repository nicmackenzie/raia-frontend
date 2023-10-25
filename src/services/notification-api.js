import { httpRequest, url } from '../lib/utils';

export async function getNotifications() {
  try {
    return await httpRequest(url + '/notifications');
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function readNotification(id) {
  try {
    await httpRequest(
      url + '/notifications/' + id,
      'PATCH',
      JSON.stringify({ status: 'read' })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteNotification(id) {
  try {
    await httpRequest(url + '/notifications/' + id, 'DELETE');
  } catch (error) {
    throw new Error(error.message);
  }
}
