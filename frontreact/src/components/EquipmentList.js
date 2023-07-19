import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, InputGroup, Form, Modal, Button } from 'react-bootstrap';

const API_URL = 'http://127.0.0.1:8000/equipments/';

export const EquipmentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setEditedData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${API_URL}${selectedRow.serial_number}/`, editedData);
      fetchData();
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const filteredData = data.filter((entry) =>
    entry.equipment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isDateWithinMonth = (dateString) => {
    const currentDate = new Date();
    const entryDate = new Date(dateString);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    return entryDate.getFullYear() === currentYear && entryDate.getMonth() === currentMonth;
  };

  const EquipmentRow = ({ entry }) => (
    <tr key={entry.serial_number} onClick={() => handleRowClick(entry)}>
      <td>{entry.serial_number}</td>
      <td>{entry.region}</td>
      <td>{entry.inst_name}</td>
      <td>{entry.equipment}</td>
      <td>{entry.status ? 'Active' : 'Inactive'}</td>
      <td>{entry.install_date}</td>
      <td>{entry.contract_end}</td>
      <td
        style={
          isDateWithinMonth(entry.first_serv)
            ? { backgroundColor: '#FE3939', color: '#FFFFFF' }
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
  );

  return (
    <div style={{ margin: '10px' }}>
      <InputGroup className="mb-3" style={{ margin: '15px' }}>
        <Form.Control
          type="text"
          placeholder="Search equipment"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover responsive style={{ width: '100%' }}>
        <thead style={{ backgroundColor: '#76236C', color: '#FFFFFF' }}>
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
          {filteredData.map((entry) => (
            <EquipmentRow key={entry.serial_number} entry={entry} />
          ))}
        </tbody>
      </Table>

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {selectedRow && (
              <>
                <Form.Group controlId="serialNumber">
                  <Form.Label>Serial Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.serial_number}
                    onChange={(e) =>
                      setEditedData({ ...editedData, serial_number: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="region">
                  <Form.Label>Region</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.region}
                    onChange={(e) =>
                      setEditedData({ ...editedData, region: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="instName">
                  <Form.Label>Institution</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.inst_name}
                    onChange={(e) =>
                      setEditedData({ ...editedData, inst_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="equipment">
                  <Form.Label>Equipment</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.equipment}
                    onChange={(e) =>
                      setEditedData({ ...editedData, equipment: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.status ? 'Active' : 'Inactive'}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        status: e.target.value === 'Active',
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="installDate">
                  <Form.Label>Install Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.install_date}
                    onChange={(e) =>
                      setEditedData({ ...editedData, install_date: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="contractEnd">
                  <Form.Label>Contract End</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.contract_end}
                    onChange={(e) =>
                      setEditedData({ ...editedData, contract_end: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="firstService">
                  <Form.Label>Service 1</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.first_serv}
                    onChange={(e) =>
                      setEditedData({ ...editedData, first_serv: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="firstValidation">
                  <Form.Label>Validation</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.validation ? 'Validated' : 'Not Validated'}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        validation: e.target.value === 'Validated',
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="secondService">
                  <Form.Label>Service 2</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.second_serv}
                    onChange={(e) =>
                      setEditedData({ ...editedData, second_serv: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="secondValidation">
                  <Form.Label>Validation</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.validation ? 'Validated' : 'Not Validated'}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        validation: e.target.value === 'Validated',
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="contractType">
                  <Form.Label>Contract Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={editedData.contract_type}
                    onChange={(e) =>
                      setEditedData({ ...editedData, contract_type: e.target.value })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {error && <p>Error: {error}</p>}
    </div>
  );
};





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, InputGroup, Form, Modal, Button } from 'react-bootstrap';

// export const EquipmentSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [data, setData] = useState([]);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editedData, setEditedData] = useState({});

//   const   EQUIPMENT_URL = 'http://127.0.0.1:8000/equipments/';

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get( EQUIPMENT_URL );
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setEditedData(row);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const handleSaveChanges = async () => {
//     try {
//       await axios.put(`http://127.0.0.1:8000/equipments/${selectedRow.serial_number}/`, editedData);
//       // You may add a success message or update the data after successful save
//       fetchData();
//       setModalOpen(false);
//     } catch (error) {
//       console.error('Error saving data:', error);
//     }
//   };

//   // Filter the data based on the search term
//   const filteredData = data.filter((entry) =>
//     entry.equipment.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Check if the date is less than a month from now
//   const isDateWithinMonth = (dateString) => {
//     const currentDate = new Date();
//     const entryDate = new Date(dateString);
//     const currentYear = currentDate.getFullYear();
//     const currentMonth = currentDate.getMonth();
//     return entryDate.getFullYear() === currentYear && entryDate.getMonth() === currentMonth;
//   };


//   const EquipmentRow = ({ entry, handleRowClick, isDateWithinMonth }) => (
//     <tr key={entry.serial_number} onClick={() => handleRowClick(entry)}>
//       <td>{entry.serial_number}</td>
//       <td>{entry.region}</td>
//       <td>{entry.inst_name}</td>
//       <td>{entry.equipment}</td>
//       <td>{entry.status ? 'Active' : 'Inactive'}</td>
//       <td>{entry.install_date}</td>
//       <td>{entry.contract_end}</td>
//       <td
//         style={
//           isDateWithinMonth(entry.first_serv)
//             ? { backgroundColor: '#FE3939', color: '#FFFFFF' }
//             : {}
//         }
//       >
//         {entry.first_serv}
//       </td>
//       <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
//       <td>{entry.second_serv}</td>
//       <td>{entry.validation ? 'Validated' : 'Not Validated'}</td>
//       <td>{entry.contract_type}</td>
//     </tr>
//   );
  
//   return (
//     <div style={{ margin: '10px' }}>
//       <InputGroup className="mb-3" style={{ margin: '15px' }}>
//         <Form.Control
//           type="text"
//           placeholder="Search equipment"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </InputGroup>

//       <Table striped bordered hover responsive style={{ width: '100%' }}>
//         <thead style={{ backgroundColor: '#76236C', color: '#FFFFFF' }}>
//           <tr>
//             <th>Serial Number</th>
//             <th>Region</th>
//             <th>Institution</th>
//             <th>Equipment</th>
//             <th>Status</th>
//             <th>Install Date</th>
//             <th>Contract End</th>
//             <th>Service 1</th>
//             <th>Validation</th>
//             <th>Service 2</th>
//             <th>Validation</th>
//             <th>Contract Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((entry) => (
//             <EquipmentRow
//               key={entry.serial_number}
//               entry={entry}
//               handleRowClick={handleRowClick}
//               isDateWithinMonth={isDateWithinMonth}
//             />
//           ))}
//         </tbody>
//       </Table>

//       <Modal show={modalOpen} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Row</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Render input fields and allow editing of the selectedRow data */}
//           <Form>
//             {selectedRow && (
//               <>
//                 <Form.Group controlId="serialNumber">
//                   <Form.Label>Serial Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.serial_number}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, serial_number: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="region">
//                   <Form.Label>Region</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.region}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, region: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="instName">
//                   <Form.Label>Institution</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.inst_name}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, inst_name: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="equipment">
//                   <Form.Label>Equipment</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.equipment}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, equipment: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="status">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.status ? 'Active' : 'Inactive'}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         status: e.target.value === 'Active',
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="installDate">
//                   <Form.Label>Install Date</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.install_date}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, install_date: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="contractEnd">
//                   <Form.Label>Contract End</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.contract_end}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, contract_end: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="firstService">
//                   <Form.Label>Service 1</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.first_serv}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, first_serv: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="firstValidation">
//                   <Form.Label>Validation</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.validation ? 'Validated' : 'Not Validated'}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         validation: e.target.value === 'Validated',
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="secondService">
//                   <Form.Label>Service 2</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.second_serv}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, second_serv: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="secondValidation">
//                   <Form.Label>Validation</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.validation ? 'Validated' : 'Not Validated'}
//                     onChange={(e) =>
//                       setEditedData({
//                         ...editedData,
//                         validation: e.target.value === 'Validated',
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="contractType">
//                   <Form.Label>Contract Type</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={editedData.contract_type}
//                     onChange={(e) =>
//                       setEditedData({ ...editedData, contract_type: e.target.value })
//                     }
//                   />
//                 </Form.Group>
//               </>
//             )}
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveChanges}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

