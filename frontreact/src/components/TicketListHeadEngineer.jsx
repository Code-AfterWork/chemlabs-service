import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Form } from "react-bootstrap";

export const TicketListHeadEngineer = () => {
  const [tickets, setTickets] = useState([]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');


  const getTickets = async () => {
    try {
      const [ticketsResponse, usersResponse] = await Promise.all([
        axios.get("http://127.0.0.1:8000/client/tickets/"),
        axios.get("http://127.0.0.1:8000/user/users/"), // Update the API endpoint for fetching users
      ]);
      setTickets(ticketsResponse.data);
      setUsers(usersResponse.data);
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

  const handleAssigned = (id, assignedTo) => {
    const ticket = tickets.find((ticket) => ticket.id === id); // Find the ticket with the given id
    const payload = {
      equipment: ticket.equipment,
      title: ticket.title,
      description: ticket.description,
      serial_number: ticket.serial_number,
      created_by: ticket.created_by,
      assigned_to: assignedTo
    };
  
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/`, payload);
  };
  
  

  const handleCompleted = (id) => {
    axios.put(`http://127.0.0.1:8000/client/tickets/${id}/completed`);
  };

  return (
    <Row xs={1} md={2} className="g-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id}>
          <Card.Header>
            <h4>{ticket.title}</h4>
            <p>{ticket.equipment}</p>
          </Card.Header>
          <Card.Body>
            <p>{ticket.description}</p>
          </Card.Body>
          <Card.Footer>
            <Button
              variant={ticket.assigned_to == "" ? "Warning" : "outline-secondary"}
              onClick={() => handlePending(ticket.assigned_to)}
              style={{ margin: "10px" }}
            >
              Pending
            </Button>

            {users.length > 0 && (
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleAssigned(ticket.id, selectedUser);
                }}
                style={{ display: 'flex' }}
              >
                <Form.Select
                  onChange={(event) => setSelectedUser(event.target.value)}
                  value={selectedUser}
                >
                  <option value="">Assign to:</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </Form.Select>
                <Button type="submit" variant="warning" style={{ margin: "10px" }}>
                  Assign
                </Button>
              </Form>
            )}


            <Button
              variant={ticket.completed  ? "success" : "outline-secondary"}
              onClick={() => handleCompleted(ticket.id)}
              style={{ margin: "10px" }}
            >
              Completed
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Row>
  );
};
