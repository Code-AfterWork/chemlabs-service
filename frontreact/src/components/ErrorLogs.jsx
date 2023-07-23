import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ErrorLogs = () => {
  const [errorLogs, setErrorLogs] = useState([]);

  useEffect(() => {
    // Fetch the data from your API endpoint
    axios.get('http://127.0.0.1:8000/client/errors/')
      .then(response => {
        setErrorLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div style={{margin:"20px"}}>
      <h3>Realtime Monitoring Logs</h3>
      <div >
        {errorLogs.map(errorLog => (
          <div key={errorLog.id} style={{ border: '1px solid #ccc', padding: '5px', margin: '5px', width: '100%' }}>
            <p><b>{errorLog.facility}{errorLog.error}</b><span> Created at: {errorLog.created_at}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};
