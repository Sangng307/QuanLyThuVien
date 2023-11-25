import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Container, Navbar } from "react-bootstrap";

const UserNavBar = ({ onCartCountUpdate }) => {
  const user = useUser();
  // const [count, setCount] = useState(0);

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  return (
    <Navbar style={{ backgroundColor: "#D7F4F6" }}>
      <Container>
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "black", fontSize: "30px" }}
        >
          Your Brand
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "black", fontSize: "20px" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/book"
                style={{ color: "black", fontSize: "20px" }}
              >
                Book
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/cart"
                style={{ color: "black", fontSize: "20px" }}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            <li
              className="nav-link"
              style={{ cursor: "pointer", color: "black", fontSize: "20px" }}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
