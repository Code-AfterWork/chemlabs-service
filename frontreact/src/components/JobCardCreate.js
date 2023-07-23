import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import { api } from './Elements/api.jsx';

export const JobCardCreate = () => {
  const [formData, setFormData] = useState({
    institution: '',
    serial_number: '',
    received_by: '',
    requested_by: '',
    ok_checklist: '',
    faulty_checklist: '',
    spare_used: '',
    labor_charge: '',
    total_cost: '',
    ticket: '',
    uploaded_media: null,
  });

  const [institutions, setInstitutions] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    api.get('/institutions/')
      .then((response) => {
        const data = response.data;
        setInstitutions(response.data);
      })
      .catch((error) => {
        // Handle error cases
      });
  }, []);



  const fetchEquipments = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await axios.get('http://127.0.0.1:8000/equipments/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
      });

      const data = response.data;
      setEquipments(data);
    } catch (error) {
      console.error('Error fetching equipments:', error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleFieldChange = (fieldName, event) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

      serial_number: '',
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      uploaded_media: file,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await axios.post('http://127.0.0.1:8000/jobcards/', formDataObj, {
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
      console.error('Error creating job card:', error);
    }
  };

  return (
    <div style={{margin:"10px"}}>
      <div>
        <h3>View and edit Jobcards</h3>
        <p>Please provide accurate data as seen in the physical Job Card</p>
      </div>

      <div>
        <Button variant="secondary" type="submit" style={{margin:"5px"}}>
          Service Job Card
        </Button>
        <Button variant="secondary" type="submit" style={{margin:"5px"}}>
          Application Job Card
        </Button>
      </div>
      <Form onSubmit={handleSubmit} style={{ margin: '10px' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTicket">
            <Form.Label>Ticket</Form.Label>
            <Form.Control
              type="text"
              name="jticket"
              onChange={handleChange}
              value={formData.ticket}
              placeholder="Ticket attending to"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridInstitution">
            <Form.Label>Institution</Form.Label>
            {institutions.length > 0 ? (
              <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('institution', e)}>
                 <option value="">Select Institution</option>
                {institutions.map((institution, index) => (
                  <option key={index} value={institution.name}>
                    {institution.name}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <p>Loading Institutions...</p>
            )}
          </Form.Group>


          <Form.Group as={Col} controlId="formGridSerialNumber">
            <Form.Label>Serial Number</Form.Label>
            {equipments.length > 0 ? (
              <Form.Control as="select" onChange={(e) => handleFieldChange('serial_number', e)} value={formData.serial_number}>
                <option value="">Select or type Serial Number</option>
                {equipments.map((equipment, index) => (
                  <option key={index} value={equipment.serial_number}>
                    {equipment.serial_number}
                  </option>
                ))}
              </Form.Control>
            ) : (
              <p>Loading serial numbers...</p>
            )}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Received By</Form.Label>
            <Form.Control
              type="text"
              name="received_by"
              onChange={handleChange}
              value={formData.received_by}
              placeholder="Complain Received By"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formRequestedBy">
            <Form.Label>Requested By</Form.Label>
            <Form.Control
              type="text"
              name="requested_by"
              onChange={handleChange}
              value={formData.requested_by}
              placeholder="Requested By"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formOkChecklist">
            <Form.Label>Ok Checklist</Form.Label>
            <Form.Control
              type="text"
              name="ok_checklist"
              onChange={handleChange}
              value={formData.ok_checklist}
              placeholder="Ok Checklist"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="formFaultyChecklist">
            <Form.Label>Faulty Checklist</Form.Label>
            <Form.Control
              type="text"
              name="faulty_checklist"
              onChange={handleChange}
              value={formData.faulty_checklist}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formSparesUsed">
            <Form.Label>Spares Used</Form.Label>
            <Form.Control
              type="text"
              name="spare_used"
              onChange={handleChange}
              value={formData.spare_used}
              placeholder="Spares Used"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formLaborCharge">
            <Form.Label>Labor Charge</Form.Label>
            <Form.Control
              type="text"
              name="labor_charge"
              onChange={handleChange}
              value={formData.labor_charge}
              placeholder="Labor Charge"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formTotalCost">
            <Form.Label>Total Cost</Form.Label>
            <Form.Control
              type="text"
              name="total_cost"
              onChange={handleChange}
              value={formData.total_cost}
              placeholder="Total Cost"
            />
          </Form.Group>
        </Row>

        <label className="jobCardLabel" style={{margin:"20px"}}>
          Uploaded Media:
          <input type="file" name="uploaded_media" onChange={handleFileChange} />
        </label>

        <br />

        <Button variant="primary" type="submit" style={{margin:"20px"}}>
          Create Job Card
        </Button>
      </Form>
    </div>
  );
};

