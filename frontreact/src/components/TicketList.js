import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/client/tickets/");
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const handlePending = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/pending`);
  };

  const handleAssigned = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/assigned`);
  };

  const handleCompleted = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/completed`);
  };

  return (
    <div>
      <h3>Tickets</h3>
      {tickets.map((ticket) => (
        <Card key={ticket.id} >
          <Card.Header>
            <h4>{ticket.title}</h4>
            <p>{ticket.equipment}</p>
          </Card.Header>
          <Card.Body>
            <p>{ticket.description}</p>
          </Card.Body>
          <Card.Footer>
            <Button variant="danger" onClick={() => handlePending(ticket.id)} style={{margin:"10px"}}>
              Pending
            </Button>
            <Button variant="warning" onClick={() => handleAssigned(ticket.id)} style={{margin:"10px"}}>
              Assigned
            </Button>
            <Button variant="success" onClick={() => handleCompleted(ticket.id)} style={{margin:"10px"}}>
              Completed
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};

