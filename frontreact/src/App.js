import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { Login } from './components/login';
import { HomeScreen } from './screens/HomeScreen.js';
import { Navigation } from './components/navigation';
import { Logout } from './components/logout';
import { RegisterUser } from './components/Registration';
import { Footer } from './components/Footer.jsx';
import { Dashboard } from './screens/dashboard.js';
import { JobCardUpload } from './components/JobCardUpload';
import { JobCards } from './components/JobCards';
import { IssuesForm } from './components/Issues';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

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
            
            <Route path="/jobcardcreate" element={isAuthenticated ? <JobCardUpload/> : null}/>

            <Route
            path="/jobcards"
            element={isAuthenticated ? <Navigate to="/" /> : <JobCards />}
            />
            <Route path="/register" element={<RegisterUser />} />
            <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
            path="/logout"
            element={isAuthenticated ? <Logout /> : <Navigate to="/login" />}
            />
            <Route
            path="/issues"
            element={isAuthenticated ? <IssuesForm /> : <Navigate to="/login" />}
            />
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
// import { JobCardUpload } from './components/JobCardUpload'
// import { JobCards } from './components/JobCards'
// import { IssuesForm } from './components/Issues'

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
//                 <Route path="/jobcardcreate" element={<JobCardUpload/>}/>
//                 <Route path="/jobcards" element={isAuth ? <JobCards/> : null}/>
//                 <Route path="/register" element={<RegisterUser/>}/>
//                 <Route path="/login" element={<Login/>}/>
//                 <Route path="/logout" element={<Logout/>}/>
//                 <Route path="/issues" element={<IssuesForm/>}/>
//             </Routes>
//         <Footer></Footer>    
//     </BrowserRouter>;
// }

// export default App;
// library.add(fab, fas, far)
