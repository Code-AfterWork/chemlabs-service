import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import '../App.css';

export const TicketCreate = () => {
  const [formData, setFormData] = useState({
    serial_number: '',
    equipment: '',
    title: '',
    equipment: '',
    status: '',
    description: '',
    created_by: '',
    assigned_to: '',
    completed: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Decode the accessToken and retrieve the user_id
      const base64Payload = accessToken.split('.')[1];
      const decodedPayload = atob(base64Payload);
      const payload = JSON.parse(decodedPayload);
      const user_id = payload.user_id;
      setFormData((prevData) => ({
        ...prevData,
        created_by: parseInt(user_id),
        // created_by: 1,

      }));
      console.log(user_id)
    }      
  }, 
  []);

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await axios.post('http://127.0.0.1:8000/client/tickets/', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
      });

      // Handle success or display any returned data
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
      <Form onSubmit={handleSubmit} style={{ margin: '20px' }}>
        <Row>
          <Form.Group as={Col} controlId="formSerialNumber">
            <Form.Label>Serial Number</Form.Label>
            <Form.Control type="text" name="serial_number" onChange={handleChange} value={formData.serial_number} placeholder="Equipment Serial Number" />
          </Form.Group>

          <Form.Group as={Col} controlId="formEquipment">
            <Form.Label>Equipment</Form.Label>
            <Form.Control type="text" name="equipment" onChange={handleChange} value={formData.equipment} placeholder="Equipment" />
          </Form.Group>

          <Form.Group as={Col} controlId="formTicketTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Title" />
          </Form.Group>

          <Form.Group as={Col} controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange} value={formData.description} placeholder="description" />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formSparesUsed">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control type="text" name="assigned_to" onChange={handleChange} value={formData.assigned_to} placeholder="Assigned To" />
          </Form.Group>
        </Row>

          <br/>

        <Button variant="primary" type="submit">
          Create Ticket
        </Button>
      </Form>
  );
};

