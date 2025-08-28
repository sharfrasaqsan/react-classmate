import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Classmate</h2>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
