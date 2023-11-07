import { httpRequest, url } from '../lib/utils';

export async function createPoll(details) {
  try {
    await httpRequest(url + '/polls', 'POST', JSON.stringify(details));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPolls(filterType) {
  try {
    const data = await httpRequest(url + '/polls?type=' + filterType);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function pollVote({ optionId, pollId }) {
  try {
    await httpRequest(
      url + '/polls/' + pollId + '/vote',
      'POST',
      JSON.stringify({ poll_option_id: optionId })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPoll(id) {
  if (!id) throw new Error('Poll id not provided');
  try {
    const data = await httpRequest(url + '/polls/' + id);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
