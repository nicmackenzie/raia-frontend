import axios from 'axios';
// import { getToken } from './utils';

export async function axiosRequest(url, method = 'GET', data, headers = {}) {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${getToken()?.token}`,
        ...headers,
      },
      withCredentials: true,
    });

    if (response.status >= 400) {
      const errorResponse = response.data || {};
      const errorMessage =
        errorResponse.errors ||
        errorResponse.error ||
        'Something went wrong with your request';
      throw new Error(errorMessage);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
}
