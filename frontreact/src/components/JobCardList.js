import React, { useState, useEffect, useRef } from 'react';
import { CardGroup, Card, Button, Modal, Row } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import axios from 'axios';

export const JobCardList = () => {
  const [jobcards, setJobcards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [jobcard, setJobcard] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pdfContentRef = useRef(null);

  useEffect(() => {
    const fetchJobcards = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.get('http://127.0.0.1:8000/jobcards/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshToken
          },
        });
        const data = response.data;
        setJobcards(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchJobcards();
  }, []);

  const handleView = (jobcard) => {
    setJobcard(jobcard);
    setModalIsOpen(true);
  };

  const handleDownload = async () => {
    if (pdfContentRef.current) {
      const pdfContent = pdfContentRef.current;

      const pdfBlob = await pdfContent.toBlob();
      const fileURL = URL.createObjectURL(pdfBlob);

      const pdfElement = document.createElement('a');
      pdfElement.href = fileURL;
      pdfElement.download = 'my-document.pdf';
      pdfElement.click();

      // Clean up the temporary URL object
      URL.revokeObjectURL(fileURL);
    }
  };

  return (
    <Card style={{margin:"30px"}}>
      <Row xs={1} md={3} className="g-4">
            {jobcards.map((jobcard, index) => (
              <CardGroup key={index}>
                <Card.Body>
                  {/* <Card.Title>{jobcard.jobcard_id}</Card.Title> */}
                  <p>
                    Institution: {jobcard.institution}
                    <br />
                    Equipment: {jobcard.equipment}
                    <br />
                    <Button variant="primary" onClick={() => handleView(jobcard)} style={{margin:"5px"}}>
                      View
                    </Button>
                    <Button variant="primary" onClick={handleDownload} style={{margin:"5px"}}>
                      Download
                    </Button>
                  </p>
                </Card.Body>
              </CardGroup>
            ))}
            {modalIsOpen && (
              <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Jobcard Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Equipment: {jobcard.equipment}
                    <br />
                    Jobcard Number: {jobcard.jobcard_id}
                    <br />
                    Region: {jobcard.region}
                    <br />
                    Received by: {jobcard.received_by}
                    <br />
                    Job start date: {jobcard.job_start_date}
                    <br />
                    Job end date: {jobcard.job_end_date}
                    <br />
                    Total cost: {jobcard.total_cost}
                  </p>
                </Modal.Body>
              </Modal>
            )}
            <div style={{ display: 'none' }}>
              <Document
                ref={pdfContentRef}
                file={'jobcard.pdf'}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
        </Row>
    </Card>
  );
};

