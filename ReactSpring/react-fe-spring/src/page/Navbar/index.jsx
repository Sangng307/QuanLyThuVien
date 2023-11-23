import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <Link className="navbar-brand" to="/">
          Your Brand
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">
                Book
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {" "}
            {/* Updated class here */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
