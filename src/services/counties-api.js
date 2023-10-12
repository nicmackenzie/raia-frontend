import { apiUrl, getToken } from '../lib/utils';

const url = apiUrl();
export async function getCounties() {
  //   console.log();
  try {
    const response = await fetch(`${url}/counties`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + getToken().access_token },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
