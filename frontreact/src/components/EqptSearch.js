

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EquipmentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/equipments/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Filter the data based on the search term
  const filteredData = data.filter(entry =>
    entry.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{margin:"20px"}}>
      <input
        type="text"
        placeholder="Search equipment"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
          <td ><b>Serial Number</b></td>
          <td><b>Region</b></td>
          <td><b>Facility</b></td>
          <td><b>Equipment</b></td>
          <td><b>Status</b></td>
          <td ><b>Validation</b></td>


        <tbody>
          {filteredData.map(entry => (
            <tr key={entry.serial_number} >
              <td>{entry.serial_number}</td>
              <td>{entry.region}</td>
              <td>{entry.inst_name}</td>
              <td>{entry.equipment}</td>
              <td>{entry.install_date}</td>
              <td>{entry.contract_end}</td>
              <td>{entry.status ? 'Active' : 'Inactive'}</td>
              <td>{entry.first_serv}</td>
              <td>{entry.second_serv}</td>
              <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
              <td>{entry.contract_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
