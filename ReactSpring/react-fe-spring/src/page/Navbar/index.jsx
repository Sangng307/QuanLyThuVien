import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav  className="navbar navbar-expand-lg" style={{backgroundColor:"#D7F4F6"}} >
      <Container >
        <Link className="navbar-brand " to="/" style={{color:"black", fontSize:"30px"}}>
          Your Brand
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{color:"black",fontSize:"20px"}}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book" style={{color:"black",fontSize:"20px"}}>
                Book
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {" "}
            {/* Updated class here */}
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{color:"black",fontSize:"20px"}}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{color:"black",fontSize:"20px"}}>
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
