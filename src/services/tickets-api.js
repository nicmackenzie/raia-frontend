import { httpRequest, secUrl } from '../lib/utils';

export async function createTicket(details) {
  try {
    await httpRequest(secUrl + '/tickets', 'POST', JSON.stringify(details));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTicketsByUser(user) {
  if (!user) return [];
  try {
    const tickets = await httpRequest(secUrl + '/tickets');
    return tickets;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getTicket(ticketId) {
  if (!ticketId) throw new Error('Ticket idd not defined');
  try {
    const ticket = await httpRequest(secUrl + '/tickets/' + ticketId);
    return ticket;
  } catch (error) {
    throw new Error(error.message);
  }
}
