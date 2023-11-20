import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" className="mt-5">
      <Container>
        <Navbar.Brand href="#home">
          &copy; {new Date().getFullYear()} Your Company
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
