import React, { useState } from 'react';
import axios from 'axios';

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
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   const formDataObj = new FormData();
  //   for (const key in formData) {
  //     formDataObj.append(key, formData[key]);
  //   }

  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');

  //   fetch('http://127.0.0.1:8000/jobcards/', {
  //     method: 'POST',
  //     body: formDataObj,
  //     headers: {
  //         'Content-Type': 'application/json',
  //         "Authorization": "Bearer " + accessToken,
  //         refreshToken
  //       },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle success or display any returned data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <container>
      <form onSubmit={handleSubmit}>
        <label>
          Job Card ID:
          <input type="text" name="jobcard_id" onChange={handleChange} value={formData.jobcard_id} />
        </label>

        <label>
          Region:
          <input type="text" name="region" onChange={handleChange} value={formData.region} />
        </label>

        <label>
          Institution Name:
          <input type="text" name="inst_name" onChange={handleChange} value={formData.inst_name} />
        </label>

        <label>
          Equipment:
          <input type="text" name="equipment" onChange={handleChange} value={formData.equipment} />
        </label>

        <label>
          Serial Number:
          <input type="text" name="serial_number" onChange={handleChange} value={formData.serial_number} />
        </label>

        <label>
          Received By:
          <input type="text" name="received_by" onChange={handleChange} value={formData.received_by} />
        </label>

        <label>
          Job Start Date:
          <input type="text" name="job_start_date" onChange={handleChange} value={formData.job_start_date} />
        </label>

        <label>
          Job End Date:
          <input type="text" name="job_end_date" onChange={handleChange} value={formData.job_end_date} />
        </label>

        <label>
          Requested By:
          <input type="text" name="requested_by" onChange={handleChange} value={formData.requested_by} />
        </label>

        <label>
          OK Checklist:
          <input type="text" name="ok_checklist" onChange={handleChange} value={formData.ok_checklist} />
        </label>

        <label>
          Faulty Checklist:
          <input type="text" name="faulty_checklist" onChange={handleChange} value={formData.faulty_checklist} />
        </label>

        <label>
          Spare Used:
          <input type="text" name="spare_used" onChange={handleChange} value={formData.spare_used} />
        </label>

        <label>
          Labor Charge:
          <input type="text" name="labor_charge" onChange={handleChange} value={formData.labor_charge} />
        </label>

        <label>
          Total Cost:
          <input type="text" name="total_cost" onChange={handleChange} value={formData.total_cost} />
        </label>

        <label>
          Uploaded Media:
          <input type="file" name="uploaded_media" onChange={handleFileChange} />
        </label>

        <button type="submit">Upload Job Card</button>
      </form>
    </container>
  );
};