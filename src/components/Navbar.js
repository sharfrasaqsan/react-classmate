import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/student-dashboard">Student Dashboard</Link>
        </li>
        <li>
          <Link to="/teacher-dashboard">Teacher Dashboard</Link>
        </li>
        <li>
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
