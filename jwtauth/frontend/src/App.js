
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './component/Navbar';
// import Login from './component/Login';
// import Register from './component/Register';
// import ProfilePage from './component/ProfilePage';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
    
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLogin = (token) => {
//     localStorage.setItem('authToken', token); // Store token in localStorage
//     setIsAuthenticated(true); // Update state to reflect authentication
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Remove token from localStorage
//     setIsAuthenticated(false); // Update state to reflect logout
//   };

//   return (
//     <Router>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import ProfilePage from './component/ProfilePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token,username) => {
    localStorage.setItem('authToken', token); // Store token in localStorage
    setIsAuthenticated(true);
    setUsername(username);
     // Update state to reflect authentication
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    setIsAuthenticated(false); 
    setUsername(username);// Update state to reflect logout
    setUsername('');
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated}  username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
