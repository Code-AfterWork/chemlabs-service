import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container, Button } from 'react-bootstrap';

import {JobCardCreate} from '../components/JobCardCreate.js'


import {JobCards} from '../components/JobCardList.js'

import {Dashboard} from './dashboard.js';
import {EquipmentSearch} from '../components/EquipmentList.js';


import '../style/index.css'

export const HomeScreen = () => {

  return (
      <div className='home'>
        <EquipmentSearch></EquipmentSearch>
      </div>
  );
};
