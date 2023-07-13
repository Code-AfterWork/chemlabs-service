import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, InputGroup, Form} from 'react-bootstrap';

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


  // Check if the date is less than a month from now
  const isDateWithinMonth = (dateString) => {
    const currentDate = new Date();
    const entryDate = new Date(dateString);
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    return entryDate < oneMonthFromNow;
  };


  return (
    <div style={{margin:"10px"}}>
        <InputGroup className="mb-3"  style={{margin:"15px", }}>
          <Form.Control
            type="text"
            placeholder="Search equipment"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputGroup>

      <Table striped bordered hover responsive style={{ width: '100%' }}>
        <thead style={{backgroundColor:"#76236C", color:"#FFFFFF",}}>
          <tr>
            <th>Serial Number</th>
            <th>Region</th>
            <th>Institution</th>
            <th>Equipment</th>
            <th>Status</th>
            <th>Install Date</th>
            <th>Contract End</th>
            <th>Service 1</th>
            <th>Validation</th>
            <th>Service 2</th>
            <th>Validation</th>
            <th>Contract Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(entry => (
            <tr key={entry.serial_number} >
              <td>{entry.serial_number}</td>
              <td>{entry.region}</td>
              <td>{entry.inst_name}</td>
              <td>{entry.equipment}</td>
              <td>{entry.status ? 'Active' : 'Inactive'}</td>
              <td>{entry.install_date}</td>
              <td>{entry.contract_end}</td>
{/* //  If date is less than a within the month shade column red */}
              <td
                style={
                  isDateWithinMonth(entry.first_serv)
                    ? { backgroundColor: '#FE3939',color: "#FFFFFF" }
                    : {}
                }
              >
                {entry.first_serv}
              </td>
              <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
              <td>{entry.second_serv}</td>
              <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
              <td>{entry.contract_type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

