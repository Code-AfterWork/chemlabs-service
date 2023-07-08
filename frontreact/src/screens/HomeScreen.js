import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Button } from 'react-bootstrap';

import {JobCardUpload} from '../components/JobCardUpload.js'


import {JobCards} from '../components/JobCards.js'

import {Dashboard} from './dashboard.js';
import {EquipmentSearch} from '../components/EqptSearch.js';

export const HomeScreen = () => {

  return (
    <Container className="text-center">
      <div>
        
        <EquipmentSearch></EquipmentSearch>
        <JobCards></JobCards>
      </div>
    </Container>
  );
};
