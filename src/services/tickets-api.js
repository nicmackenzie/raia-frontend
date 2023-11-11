import { httpRequest, url } from '../lib/utils';

export async function createTicket(details) {
  try {
    await httpRequest(url + '/tickets', 'POST', JSON.stringify(details));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTicketsByUser(user) {
  if (!user) return [];
  try {
    const tickets = await httpRequest(url + '/tickets/' + user + '/user');
    return tickets;
  } catch (error) {
    throw new Error(error.message);
  }
}
