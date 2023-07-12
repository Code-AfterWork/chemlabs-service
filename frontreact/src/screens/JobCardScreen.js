import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Button } from 'react-bootstrap';
import {JobCardCreate} from '../components/JobCardCreate.js'
import {JobCardList} from '../components/JobCardList.js'
import {EquipmentSearch} from '../components/EqptSearch.js';

export const JobCards = () => {

  return (
    <Container className="text-center">
      <div>
        <h1>View and Create Jobcards</h1>
        <h3>Equipment List</h3>
        <EquipmentSearch></EquipmentSearch>
        <h3>Create Job Card</h3>
        <JobCardCreate></JobCardCreate>
        <h3>View Job Cards</h3>
        <JobCardList></JobCardList>
      </div>
    </Container>
  );
};
