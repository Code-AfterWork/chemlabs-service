import { FaUpload, FaPlayCircle, silfood} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Dashboard = () => {
  return (
    <Container style={{padding:"20px"}}>
      <Card className="text-center">
        <Card.Header>First Class Service</Card.Header>
        <Card.Body>
          <Card.Title>Join to Get Quality Support</Card.Title>
          <Card.Text>
            With our support system, you can worry less about your laboratory
          </Card.Text>
          <Button variant="primary">Register</Button>
        </Card.Body>
        <Card.Footer className="text-muted">20% off on Service Contracts</Card.Footer>
      </Card>
    </Container>
  );
};