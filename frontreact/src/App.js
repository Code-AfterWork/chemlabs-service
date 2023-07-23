import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { Login } from './components/Login';
import { HomeScreen } from './screens/HomeScreen.js';
import { Navigation } from './components/Navigation';
import { Logout } from './components/Logout';
import { RegisterUser } from './components/Registration';
import { Footer } from './components/Footer.jsx';
import { Dashboard } from './screens/dashboard.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { JobCards } from './screens/JobCardScreen.js';
import { Tickets } from './screens/TicketScreen.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
        <Navigation isAuthenticated={isAuthenticated} />
        <Routes>
            {!isAuthenticated ? (
            <Route path="/" element={<Dashboard />} />
            ) : (
            <Route path="/" element={<HomeScreen />} />
            )}
            
            <Route path="/jobcards" element={isAuthenticated ? <JobCards/> : null}/>
            <Route path="/tickets" element={isAuthenticated ? <Tickets/> : null}/>
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}  />
            <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/login" />} />
            {/* <Route path="/tickets" element={isAuthenticated ? <TicketScreen /> : <Navigate to="/login" />
          } /> */}
        </Routes>
        <Footer />
    </BrowserRouter>

  );
}

export default App;
library.add(fab, fas, far);



// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Login } from "./components/login";
// import { HomeScreen } from "./screens/HomeScreen.js";
// import { Navigation } from './components/navigation';
// import { Logout } from './components/logout';
// import { RegisterUser } from './components/Registration';
// import { Footer } from './components/Footer.jsx';
// import { Dashboard } from './screens/dashboard.js';
// import { JobCardCreate } from './components/JobCardCreate'
// import { JobCards } from './components/JobCards'
// import { ticketsForm } from './components/tickets'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import React, { isAuth} from 'react';
// // import your icons
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'


// function App() {
//     return<BrowserRouter>

//         <Navigation></Navigation>
//             <Routes>
//                 <Route path="/" element={isAuth ? <HomeScreen/> : <Dashboard/>}/>
//                 <Route path="/jobcardcreate" element={<JobCardCreate/>}/>
//                 <Route path="/jobcards" element={isAuth ? <JobCards/> : null}/>
//                 <Route path="/register" element={<RegisterUser/>}/>
//                 <Route path="/login" element={<Login/>}/>
//                 <Route path="/logout" element={<Logout/>}/>
//                 <Route path="/tickets" element={<ticketsForm/>}/>
//             </Routes>
//         <Footer></Footer>    
//     </BrowserRouter>;
// }

// export default App;
// library.add(fab, fas, far)
