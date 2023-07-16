import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';

export const JobCardCreate = () => {
  const [formData, setFormData] = useState({
    jobcard_id: '',
    region: '',
    institution: '',
    equipment: '',
    serial_number: '',
    received_by: '',
    job_start_date: '',
    job_end_date: '',
    requested_by: '',
    ok_checklist: '',
    faulty_checklist: '',
    spare_used: '',
    labor_charge: '',
    total_cost: '',
    uploaded_media: null,
  });

  const [institutions, setInstitutions] = useState([]);
  const [equipments, setEquipments] = useState([]);

  const fetchInstitutions = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      const response = await axios.get('http://127.0.0.1:8000/institutions/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshToken,
        },
      });

      const inst = response.data;
      setInstitutions(inst);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    }
  };

  useEffect(() => {
    fetchInstitutions();
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
    <Card style={{margin:"10px"}}>
    <Form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Jobcard ID</Form.Label>
          <Form.Control
            type="text"
            name="jobcard_id"
            onChange={handleChange}
            value={formData.jobcard_id}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRegion">
          <Form.Label>Region</Form.Label>
          {equipments.length > 0 ? (
            <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('region', e)}>
              {institutions.map((institution, index) => (
                <option key={index} value={institution.region}>
                  {institution.region}
                </option>
              ))}
            </Form.Select>
          ) : (
            <p>Loading regions...</p>
          )}
        </Form.Group>


        <Form.Group as={Col} controlId="formGridInstitution">
          <Form.Label>Institution</Form.Label>
          {institutions.length > 0 ? (
            <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('institution', e)}>
              {institutions.map((institution, index) => (
                <option key={index} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </Form.Select>
          ) : (
            <p>Loading Institutions...</p>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEquipment">
          <Form.Label>Equipment</Form.Label>
          {equipments.length > 0 ? (
            <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('equipment', e)}>
              {equipments.map((equipment, index) => (
                <option key={index} value={equipment.serial_number}>
                  {equipment.equipment}
                </option>
              ))}
            </Form.Select>
          ) : (
            <p>Loading equipments...</p>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSerialNumber">
          <Form.Label>Serial Number</Form.Label>
          {equipments.length > 0 ? (
            <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('serial_number', e)}>
              {equipments.map((equipment, index) => (
                <option key={index} value={equipment.serial_number}>
                  {equipment.serial_number}
                </option>
              ))}
            </Form.Select>
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

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Job Start Date</Form.Label>
          <Form.Control
            type="text"
            name="job_start_date"
            onChange={handleChange}
            value={formData.job_start_date}
            placeholder="Job Start Date"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridJobEndDate">
          <Form.Label>Job End Date</Form.Label>
          <Form.Control
            type="text"
            name="job_end_date"
            onChange={handleChange}
            value={formData.job_end_date}
            placeholder="Job Start Date"
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

      <label className="jobCardLabel">
        Uploaded Media:
        <input type="file" name="uploaded_media" onChange={handleFileChange} />
      </label>

      <br />

      <Button variant="primary" type="submit" style={{margin:"20px"}}>
        Create Job Card
      </Button>
    </Form>
    </Card>
  );
};

