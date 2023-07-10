import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import '../App.css';

export const JobCardUpload = () => {
  const [formData, setFormData] = useState({
    jobcard_id: '',
    region: '',
    inst_name: '',
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

  const [equipments, setEquipments] = useState([]);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/equipments/');
      const data = response.data;
      setEquipments(data);
    } catch (error) {
      console.error('Error:', error);
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
      console.error('Error:', error);
    }
  };

  return (
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
          <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('region', e)}>
            {equipments.map((equipment, index) => (
              <option key={index} value={equipment.region}>
                {equipment.region}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridInstitution">
          <Form.Label>Institution Name</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('inst_name', e)}>
            {equipments.map((equipment, index) => (
              <option key={index} value={equipment.inst_name}>
                {equipment.inst_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEquipment">
          <Form.Label>Equipment</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('equipment', e)}>
            {equipments.map((equipment, index) => (
              <option key={index} value={equipment.equipment}>
                {equipment.equipment}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSerialNumber">
          <Form.Label>Serial Number</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => handleFieldChange('serial_number', e)}>
            {equipments.map((equipment, index) => (
              <option key={index} value={equipment.serial_number}>
                {equipment.serial_number}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formGridAddress1">
          <Form.Label>Received By</Form.Label>
          <Form.Control type="text" name="received_by" onChange={handleChange} value={formData.received_by} placeholder="Complain Received By" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Job Start Date</Form.Label>
          <Form.Control type="text" name="job_start_date" onChange={handleChange} value={formData.job_start_date} placeholder="Job Start Date" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridJobEndDate">
          <Form.Label>Job End Date</Form.Label>
          <Form.Control type="text" name="job_end_date" onChange={handleChange} value={formData.job_end_date} placeholder="Job Start Date" />
        </Form.Group>

        <Form.Group as={Col} controlId="formRequestedBy">
          <Form.Label>Requested By</Form.Label>
          <Form.Control type="text" name="requested_by" onChange={handleChange} value={formData.requested_by}  placeholder="Requested By" />
        </Form.Group>

        <Form.Group as={Col} controlId="formOkChecklist">
          <Form.Label>Ok Checklist</Form.Label>
          <Form.Control type="text" name="ok_checklist" onChange={handleChange} value={formData.ok_checklist} placeholder="Ok Checklist" />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} controlId="formFaultyChecklist">
          <Form.Label>Faulty Checklist</Form.Label>
          <Form.Control type="text" name="faulty_checklist" onChange={handleChange} value={formData.faulty_checklist} placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formSparesUsed">
          <Form.Label>Spares Used</Form.Label>
          <Form.Control type="text" name="spare_used" onChange={handleChange} value={formData.spare_used} placeholder="Spares Used" />
        </Form.Group>

        <Form.Group as={Col} controlId="formLaborCharge">
          <Form.Label>Labor Charge</Form.Label>
          <Form.Control type="text" name="labor_charge" onChange={handleChange} value={formData.labor_charge} placeholder="Labor Charge" />
        </Form.Group>

        <Form.Group as={Col} controlId="formTotalCost">
          <Form.Label>Total Cost</Form.Label>
          <Form.Control type="text" name="total_cost" onChange={handleChange} value={formData.total_cost} placeholder="Total Cost" />
        </Form.Group>
      </Row>

        <label className="jobCardLabel">
          Uploaded Media:
          <input type="file" name="uploaded_media" onChange={handleFileChange} />
        </label>

        <br/>

      <Button variant="primary" type="submit">
        Create Job Card
      </Button>
    </Form>
  );
};



//++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {Button, Card, Form} from 'react-bootstrap';
// import '../App.css';


// export const JobCardUpload = () => {
//   const [formData, setFormData] = useState({
//     jobcard_id: '',
//     region: '',
//     inst_name: '',
//     equipment: '',
//     serial_number: '',
//     received_by: '',
//     job_start_date: '',
//     job_end_date: '',
//     requested_by: '',
//     ok_checklist: '',
//     faulty_checklist: '',
//     spare_used: '',
//     labor_charge: '',
//     total_cost: '',
//     uploaded_media: null,
//   });

//   const [regions, setRegions] = useState([]);
//   const fetchRegions = async () => {
//     const response = await axios.get("https://api.example.com/regions");
//     const data = await response.data;
//     setRegions(data);
//   };

//   useEffect(() => {
//     fetchRegions();
//   }, []);

//   const handleRegionChange = (event) => {
//     setFormData({
//       ...formData,
//       region: event.target.value,
//     });
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       uploaded_media: file,
//     }));
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataObj = new FormData();
//     for (const key in formData) {
//       formDataObj.append(key, formData[key]);
//     }

//     const accessToken = localStorage.getItem('accessToken');
//     const refreshToken = localStorage.getItem('refreshToken');

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/jobcards/', formDataObj, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${accessToken}`,
//           refreshToken,
//         },
//       });

//       // Handle success or display any returned data
//       console.log(response.data);
//     } catch (error) {
//       // Handle error
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <Card>
//       <form onSubmit={handleSubmit} style={{margin:"20px"}}>
//         <label className="jobCardLabel">
//           Job Card ID:
//           <input type="text" name="jobcard_id" onChange={handleChange} value={formData.jobcard_id} />
//         </label>

//         <label className="jobCardLabel">
//           Region:
//           <input type="text" name="region" onChange={handleChange} value={formData.region} />
//         </label>


//         <label className="jobCardLabel">
//           Institution Name:
//           <input type="text" name="inst_name" onChange={handleChange} value={formData.inst_name} />
//         </label>

//         <label className="jobCardLabel">
//           Equipment:
//           <input type="text" name="equipment" onChange={handleChange} value={formData.equipment} />
//         </label>

//         <label className="jobCardLabel">
//           Serial Number:
//           <input type="text" name="serial_number" onChange={handleChange} value={formData.serial_number} />
//         </label>

//         <label className="jobCardLabel">
//           Received By:
//           <input type="text" name="received_by" onChange={handleChange} value={formData.received_by} />
//         </label>

//         <label>
//           Job Start Date:
//           <input type="text" name="job_start_date" onChange={handleChange} value={formData.job_start_date} />
//         </label>

//         <label className="jobCardLabel">
//           Job End Date:
//           <input type="text" name="job_end_date" onChange={handleChange} value={formData.job_end_date} />
//         </label>

//         <label className="jobCardLabel">
//           Requested By:
//           <input type="text" name="requested_by" onChange={handleChange} value={formData.requested_by} />
//         </label>

//         <label className="jobCardLabel">
//           OK Checklist:
//           <input type="text" name="ok_checklist" onChange={handleChange} value={formData.ok_checklist} />
//         </label>

//         <label className="jobCardLabel">
//           Faulty Checklist:
//           <input type="text" name="faulty_checklist" onChange={handleChange} value={formData.faulty_checklist} />
//         </label>

//         <label className="jobCardLabel">
//           Spare Used:
//           <input type="text" name="spare_used" onChange={handleChange} value={formData.spare_used} />
//         </label>

//         <label className="jobCardLabel">
//           Labor Charge:
//           <input type="text" name="labor_charge" onChange={handleChange} value={formData.labor_charge} />
//         </label>

//         <label className="jobCardLabel">
//           Total Cost:
//           <input type="text" name="total_cost" onChange={handleChange} value={formData.total_cost} />
//         </label>

//         <label className="jobCardLabel">
//           Uploaded Media:
//           <input type="file" name="uploaded_media" onChange={handleFileChange} />
//         </label>

//         <Button variant="primary" type="submit">Upload Job Card</Button>
//       </form>
//     </Card>
//   );
// };

