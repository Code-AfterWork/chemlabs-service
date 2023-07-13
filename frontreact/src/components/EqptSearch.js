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

  return (
    <div style={{margin:"0px"}}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search equipment"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
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
              <td>{entry.first_serv}</td>
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




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const EquipmentSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/equipments/');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Filter the data based on the search term
//   const filteredData = data.filter(entry =>
//     entry.equipment.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
    // <div style={{margin:"20px"}}>
    //   <input
    //     type="text"
    //     placeholder="Search equipment"
    //     value={searchTerm}
    //     onChange={e => setSearchTerm(e.target.value)}
    //   />
//       <table>
//           <td ><b>Serial Number</b></td>
//           <td><b>Region</b></td>
//           <td><b>Institution</b></td>
//           <td><b>Equipment</b></td>
//           <td><b>Status</b></td>
//           <td ><b>Install Date</b></td>
//           <td ><b>Contract End</b></td>
//           <td ><b>Service 1</b></td>
//           <td ><b>Validation</b></td>
//           <td ><b>Service 2</b></td>
//           <td ><b>Validation</b></td>
//           <td ><b>Contract Type</b></td>

//         <tbody>
//           {filteredData.map(entry => (
//             <tr key={entry.serial_number} >
//               <td>{entry.serial_number}</td>
//               <td>{entry.region}</td>
//               <td>{entry.inst_name}</td>
//               <td>{entry.equipment}</td>
//               <td>{entry.status ? 'Active' : 'Inactive'}</td>
//               <td>{entry.install_date}</td>
//               <td>{entry.contract_end}</td>
//               <td>{entry.first_serv}</td>
//               <td>{entry.second_serv}</td>
//               <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
//               <td>{entry.contract_type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
