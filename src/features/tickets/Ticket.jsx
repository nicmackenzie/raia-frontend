import React, { useState, useEffect } from 'react';

function Ticket () {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/tickets');
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const createTicket = async () => {
    try {
      const response = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });
      if (response.ok) {
        setNewTicket({ title: '', description: '' });
        fetchTickets();
      }
    } catch (error) {
      console.error('Error creating a ticket:', error);
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/tickets/${ticketId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTickets();
      }
    } catch (error) {
      console.error('Error deleting the ticket:', error);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Tickets</h1>

      {/* Form for Creating a Ticket */}
      <form onSubmit={createTicket}>
        <input
          type="text"
          value={newTicket.title}
          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
          className="w-full p-2 rounded-md border mb-2"
          placeholder="Title"
        />
        <input
          type="text"
          value={newTicket.description}
          onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
          className="w-full p-2 rounded-md border mb-2"
          placeholder="Description"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mb-4">
          Create Ticket
        </button>
      </form>

      {/* List of Tickets */}
      {tickets.length > 0 && (
        <div>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="mb-4">
              <h2 className="text-xl font-semibold">{ticket.title}</h2>
              <p>{ticket.description}</p>
              <p>Status: {ticket.status}</p>
              <button onClick={() => deleteTicket(ticket.id)} className="text-red-500">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ticket;
