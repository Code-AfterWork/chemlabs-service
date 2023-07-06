import React, { useState } from 'react';

export const IssuesForm = () => {
  const [equipment, setEquipment] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve authentication tokens from local storage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Create a payload object with the data to update the model
    const payload = {
      equipment,
      'serial_number': serialNumber,
      issue,
    };

    // Send the update request with authentication tokens in the headers
    try {
      const response = await fetch('http://127.0.0.1:8000/issues/', {
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
        console.log('Issue updated successfully');
      } else {
        // Handle error
        console.error('Failed to update issue');
      }
    } catch (error) {
      console.error('Error occurred while updating issue', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Equipment:
        <input
          type="text"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
        />
      </label>
      <br />
      <label>
        Serial Number:
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
      </label>
      <br />
      <label>
        Issue:
        <input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Update Issue</button>
    </form>
  );
};

