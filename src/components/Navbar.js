// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated, toggleBackgroundColor }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
              <span>{JSON.parse(localStorage.getItem("user")).email}</span>
              <button onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          <button onClick={toggleBackgroundColor}>
            {toggleBackgroundColor === "" ? "" : "Background Color"}

          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;






