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

  const handlePay = async () => {
    try {
      const response = await axios.get("/pay", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      if (response.status === 200) {
        window.location.href = response.data; // Redirect to the payment URL received from the backend
      } else {
        console.error("Failed to initiate payment");
        // Handle other response statuses or errors
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      // Handle payment initiation error
    }
  };

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Your Brand
        </Link>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
            </li>
            <li
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </li>
            <li
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handlePay}
            >
              Pay
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavBar;
