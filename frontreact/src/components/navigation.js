import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Navigation({ isAuthenticated }) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Chem-labs Service Portal</Navbar.Brand>
        
        <Nav className="me-auto">
          {isAuthenticated && <Nav.Link href="/">Home</Nav.Link>}
        </Nav>


        <Nav >
          {isAuthenticated && <Nav.Link href="/tickets">Tickets</Nav.Link>}
        </Nav>

        <Nav>
          {isAuthenticated && <Nav.Link href="/jobcards">Jobcards</Nav.Link>}
        </Nav>


        <Nav>
          {!isAuthenticated && <Nav.Link href="/register">Sign Up</Nav.Link>}
        </Nav>

        <Nav>
          {isAuthenticated ? (
            <Nav.Link href="/logout">Logout</Nav.Link>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}


// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import React, { useState, useEffect} from 'react';

// export function Navigation() {
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('accessToken') !== null) {
//       setIsAuth(true);
//     }
//   }, [isAuth]);

//   return (
    
//     <div>
//     <Navbar bg="dark" variant="dark">
//           <Navbar.Brand href="/">Chem-labs Service Portal</Navbar.Brand>
//           <Nav className="me-auto">
//           {isAuth ? null:
//             <Nav.Link href="/">Home</Nav.Link>
//             }
//           </Nav>

//           <Nav className="me-auto">
//             {isAuth ?  <Nav.Link href="/jobcards">View JobCards</Nav.Link>
//             :null}
//           </Nav>

//           <Nav className="me-auto">
//             {isAuth ?  <Nav.Link href="/tickets">tickets</Nav.Link>
//             :null}
//           </Nav>
          
//           <Nav>
//             {isAuth ?  <Nav.Link href="/jobcardcreate">Create Job Card</Nav.Link>
//             :null}
//           </Nav>

//           <Nav>
//             {isAuth ? null : <Nav.Link href="/register">Sign Up</Nav.Link>}
//           </Nav>

//           <Nav>
//           {isAuth ?
//             <Nav.Link href="/logout">Logout</Nav.Link>:
//             <Nav.Link href="/login">Login</Nav.Link>
//           }
//           </Nav>
//       </Navbar>
//       </div>
//   );
// }
