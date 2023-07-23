import { FaUpload, FaPlayCircle, silfood} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {contact} from "..components/Contact.jsx";
import {Contact} from '../components/Contact.jsx';
import {EquipmentCovered} from '../components/EquipmentCovered.jsx';
import {Hero} from '../components/Hero.jsx';
import {Services} from '../components/Services.jsx';



export const Dashboard = () => {
  return (
    <>
      <Hero/>
      <Services/>
      <EquipmentCovered/>
      <Contact/>
    </>
  );
};