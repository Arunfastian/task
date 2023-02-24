import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();
  const userState = useSelector((state) => state.userReducer);

  return location.pathname !== "/" ? (
    <nav>
      <div className="navbar-left">
        <h1>Hail.</h1>
      </div>
      <div className="navbar-center">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          {userState.isSuper && (
            <li>
              <Link to="/">Add Task</Link>
            </li>
          )}
          {userState.isSuper && (
            <li>
              <Link to="/">Add User</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/">
          <i className="fa fa-sign-out"></i>
        </Link>
      </div>
    </nav>
  ) : (
    <></>
  );
}

export default Navbar;
