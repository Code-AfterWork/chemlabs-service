import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Button } from 'react-bootstrap';
import { TicketCreate } from '../components/TicketCreate.js';
import { TicketList } from '../components/TicketList.js';
import {TicketListHeadEngineer} from '../components/TicketListHeadEngineer.jsx'
import {ErrorLogs} from '../components/ErrorLogs.jsx';
import {AverageTurnAround} from '../components/Elements/AverageTurnAround.jsx';

import '../style/index.css'

export const Tickets = () => {

  return (
    <Container className="text-center">
      <div>
        <AverageTurnAround></AverageTurnAround>
        <h2>View and Create Tickets</h2>
        <TicketCreate></TicketCreate>
        <h3 style={{margin:"20px"}}>Unassigned Tickets</h3>
        <TicketListHeadEngineer></TicketListHeadEngineer>
        <h3 style={{margin:"20px"}}>Ongoing Tickets</h3>
        <TicketList></TicketList>
        <ErrorLogs></ErrorLogs>
        
      </div>
    </Container>
  );
};
