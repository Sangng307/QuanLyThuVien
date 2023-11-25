// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

const AdNavbar = () => {
  const user = useUser();

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  const navStyle = {
    marginRight: "10px",
    color: "black", // Customize the color of the text
    textDecoration: "none", // Remove the default underline style
    
  };

  return (
    <Navbar style={{backgroundColor:"#D7F4F6"}}>
      <Container >
        <Navbar.Brand as={Link} to="/" style={{navStyle,color:"black", fontSize:"30px"}}>
          Your Brand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{navStyle,color:"black",fontSize:"20px"}}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/book"  style={{navStyle,color:"black",fontSize:"20px"}}>
              Book
            </Nav.Link>
          </Nav>
          <ul className="navbar-nav">
            <li
              className="nav-link"
              style={{ cursor: "pointer",color:"black",fontSize:"20px" }}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
          <Nav>
            <NavDropdown title="Admin tool" id="basic-nav-dropdown" align="end" style={{color:"black",fontSize:"20px"}}>
              <NavDropdown.Item as={Link} to="/admin" style={navStyle}>
                Book manager
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category" style={navStyle}>
                Category manager
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rent" style={navStyle}>
                Rent manager
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdNavbar;
