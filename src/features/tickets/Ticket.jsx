import React, { useState, useEffect } from 'react';
import { useUser } from '../authentication/use-user';
import { httpRequest } from '../../lib/utils';

function Ticket() {
  const { data } = useUser();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await httpRequest('http://localhost:3000/tickets');
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const createTicket = async (event) => {
    event.preventDefault();
    let newObject = {
      ...newTicket,
      status: "Open",
      user_id: data?.user?.id && data?.user?.id || 2,
      assigned_leader_id: 1,
    };
    try {
      const response = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObject),
      });
      if (response.ok) {
        const data = await response.json();
        setNewTicket({ title: '', description: '' });
        setTickets([...tickets, data]);
      }
    } catch (error) {
      console.error('Error creating a ticket:', error);
    }
  };

  const deleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
        }
      } catch (error) {
        console.error('Error deleting the ticket:', error);
      }
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Tickets</h1>

      {/* Form for Creating a Ticket */}
      <form onSubmit={createTicket} className="mb-4">
        <input
          type="text"
          value={newTicket.title}
          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
          className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none"
          placeholder="Title"
        />
        <input
          type="text"
          value={newTicket.description}
          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
          className="w-full p-2 rounded-md border border-gray-300 mb-2 focus:outline-none"
          placeholder="Description"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
          Create Ticket
        </button>
      </form>

      <hr className="border-gray-300 my-4" />

      {/* List of Tickets */}
      {tickets.length > 0 && (
        <div>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-blue-700">{ticket.title}</h2>
              <p className="text-gray-600 mt-2">{ticket.description}</p>
              <p className="text-sm text-gray-500 mt-2">Status: {ticket.status}</p>
              <button
                onClick={() => deleteTicket(ticket.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ticket;
