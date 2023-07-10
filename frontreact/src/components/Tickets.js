import React, { useState } from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import '../App.css';

export const TicketsForm = () => {
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [ticket, setTicket] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve authentication tokens from local storage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create a payload object with the data to update the model
    const payload = {
      equipment,
      'serial_number': serialNumber,
      ticket,
    };

    // Send the update request with authentication tokens in the headers
    try {
      const response = await fetch('http://127.0.0.1:8000/tickets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'x-refresh-token': refreshToken,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Handle success
        console.log('ticket updated successfully');
      } else {
        // Handle error
        console.error('Failed to update ticket');
      }
    } catch (error) {
      console.error('Error occurred while updating ticket', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{margin:"20px"}}>
        <label className="jobCardLabel">
        Equipment:
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
      </label>

      <label className="jobCardLabel">
        Serial Number:
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
      </label>

      <label className="jobCardLabel">
        ticket:
        <input
          type="text"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />
      </label>
      <Button variant="primary" type="submit">Create ticket</Button>
    </form>
  );
};

