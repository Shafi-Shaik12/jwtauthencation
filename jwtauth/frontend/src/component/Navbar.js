
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ isAuthenticated, onLogout }) => {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Expense Tracker</a>
//           {isAuthenticated ? (
//             <button onClick={onLogout}>Logout</button>
//           ) : (
//             <div>
//               <Link to="/login">Login</Link>
             
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, onLogout }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">jwtauth</a>
          {isAuthenticated ? (
            <div>
              <span>{username}</span>
              <button onClick={onLogout} className="btn btn-link">Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
