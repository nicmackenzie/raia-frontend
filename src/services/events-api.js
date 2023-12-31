import { httpRequest, url } from '../lib/utils';
import { supabase, supabaseUrl } from '../supabase/supabase';

export async function createEvent(details) {
  const fileName = `${Math.random()}-${details.poster[0].name}`.replaceAll(
    '/',
    ''
  );
  const filePath = `${supabaseUrl}/storage/v1/object/public/events/${fileName}`;
  const { error } = await supabase.storage
    .from('events')
    .upload(fileName, details.poster[0]);
  if (error) throw new Error(error.message);
  const formFields = {
    ...details,
    poster_url: filePath,
  };
  delete formFields.poster;
  try {
    await httpRequest(url + '/events', 'POST', JSON.stringify(formFields));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEventsByDateRange({ startDate, endDate }) {
  if (!startDate || !endDate) throw new Error('Missing start or end date');
  if (new Date(startDate).getTime() > new Date(endDate).getTime())
    throw new Error('End date must be later than the start date');

  try {
    const events = await httpRequest(
      `${url}/events/by_range?start_date=${startDate}&end_date=${endDate}`
    );

    return events;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEvent(id) {
  try {
    const event = httpRequest(`${url}/events/${id}`);
    return event;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function postEnquiry({ details, id }) {
  try {
    await httpRequest(
      `${url}/events/${id}/enquiry`,
      'POST',
      JSON.stringify(details)
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function registerEvent({ user_id, id }) {
  try {
    await httpRequest(
      `${url}/events/${id}/attend`,
      'POST',
      JSON.stringify({ user_id })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEventAttendees(eventId) {
  const events = await httpRequest(`${url}/events/${eventId}/attendees`);
  return events;
}
