import React, { useState, useEffect }  from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../style/flexboxgrid.min.css";
import '../style/index.css';
import axios from "axios";
import {FullButton} from "./Elements/FullButton";

import { useLocation } from 'react-router-dom';



export const Navigation = ({ isAuthenticated }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  },  [location]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/user/logout/',{
        refresh_token:localStorage.getItem('refreshToken')
      } ,{headers: {
        'Content-Type': 'application/json'
      }}, {withCredentials: true});

      console.log('logout');
      localStorage.clear();
      axios.defaults.headers.common['Authorization'] = null;
      window.location.href = '/';
    } catch (e) {
      console.log('logout not working', e);
    }
  };

  return (
    <div>
      <Navbar className="sticky-navbar" bg="" variant="light" >
        <Navbar.Brand href="/" style={{marginLeft:"20px", marginRight:"20px"}}>
            <img src="https://chem-labs.com/web/image/website/1/logo/Chem-Labs%20LTD?unique=0a04a07" alt="Chem-labs Service Portal" width="10%" object-fit="cover"/>
        </Navbar.Brand>

        <Nav className="me-auto">
          {isAuthenticated && (
            <Nav.Link
              href="/"
              onClick={() => handleLinkClick('/')}
              className={activeLink === '/' ? 'active' : ''}
              >
              <b>Home</b>
          </Nav.Link>
          )}

          {isAuthenticated && ( 
            <Nav.Link
              href="/tickets"
              onClick={() => handleLinkClick('/tickets')}
              className={activeLink === '/tickets' ? 'active' : ''}
              >
              <b>Tickets</b>
            </Nav.Link>
          )}

          {isAuthenticated && ( 
            <Nav.Link
              href="/jobcards"
              onClick={() => handleLinkClick('/jobcards')}
              className={activeLink === '/jobcards' ? 'active' : ''}
              >
              <b>Jobcards</b>
            </Nav.Link>)}
        </Nav>

        <Nav>
          {!isAuthenticated && <Nav.Link href="/register"><b>Sign Up</b></Nav.Link>}
        </Nav>

        <Nav>
          {isAuthenticated ? (
            <FullButton title="Logout" action={() => (handleLogout())}  className="nav-link"/>
          ) : (
            <Nav.Link href="/login" style={{ marginRight:"20px"}}><b>Login</b></Nav.Link>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};
