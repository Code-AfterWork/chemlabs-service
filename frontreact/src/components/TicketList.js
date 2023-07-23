import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, CardGroup, Form } from "react-bootstrap";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [expandedTickets, setExpandedTickets] = useState([]);


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

  // time taken from when the ticket was assigned to when it was marked complete
  const formatDuration = (duration) => {
    const timeParts = duration.split(":");
    const hours = parseInt(timeParts[0], 10) * 3600000;
    const minutes = parseInt(timeParts[1], 10) * 60000;
    const seconds = parseInt(timeParts[2], 10) * 1000;

    const durationInMilliseconds = hours + minutes + seconds;

    const hoursFormatted = timeParts[0].padStart(2, "0");
    const minutesFormatted = timeParts[1].padStart(2, "0");
    const secondsFormatted = timeParts[2].padStart(2, "0");
  
    return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
  };

  const handlePending = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/`);
  };

  const handleAssigned = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/`);
  };

  const handleCompleted = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/`);
  };


  const toggleExpand = (ticketId) => {
    if (expandedTickets.includes(ticketId)) {
      setExpandedTickets(expandedTickets.filter((id) => id !== ticketId));
    } else {
      setExpandedTickets([...expandedTickets, ticketId]);
    }
  };


  return (
    <>
      <CardGroup>
        {tickets.map((ticket) => (
          <Card key={ticket.id} style={{ margin: "10px" }}>
            <Card.Header onClick={() => toggleExpand(ticket.id)}>
              <p><b>{ticket.title}</b></p>
              <p>{ticket.equipment}</p>
            </Card.Header>

            {expandedTickets.includes(ticket.id) && (
              <Card.Body>
                <p>{ticket.description}</p>
              </Card.Body>
            )}

            <Card.Footer>
              {ticket.status !== "True" && ticket.assigned_to === null && (
                <Button
                  variant="danger"
                  onClick={() => handlePending(ticket.id)}
                  style={{ margin: "5px" }}
                >
                  Pending
                </Button>
              )}

              {ticket.status !== "True" && ticket.assigned_to !== null && (
                <Button
                  variant="warning"
                  onClick={() => handleAssigned(ticket.id)}
                  style={{ margin: "5px" }}
                >
                  Assigned
                </Button>
              )}
              
              {ticket.status === "True" && (
                <Button
                  variant="success"
                  onClick={() => handleCompleted(ticket.id)}
                  style={{ margin: "5px" }}
                >
                  Completed
                </Button>
              )}

              {ticket.time_taken && (
                <Button variant="info" style={{ margin: "5px" }}>
                  Time Taken: {formatDuration(ticket.time_taken)}
                </Button>
              )}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
};
