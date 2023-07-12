import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Button } from 'react-bootstrap';
import { TicketCreate } from '../components/TicketCreate.js';
import { TicketList } from '../components/TicketList.js';

export const Tickets = () => {

  return (
    <Container className="text-center">
      <div>
        <h2>View and Create Tickets</h2>
        <TicketCreate></TicketCreate>
        <TicketList></TicketList>
        
      </div>
    </Container>
  );
};
