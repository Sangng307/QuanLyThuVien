// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../component/UserProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UserNavBar = ({ onCartCountUpdate }) => {
  const user = useUser();
  const [count, setCount] = useState(0);

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
  // useEffect(() => {
  //   const fetchItemCount = async () => {
  //     try {
  //       const response = await axios.get("/user/cart/count", {
  //         headers: {
  //           Authorization: `Bearer ${user.jwt}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setCount(response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching item count:", error);
  //     }
  //   };

  //   fetchItemCount();
  // }, [user.jwt, onCartCountUpdate]);

  const handleLogout = () => {
    user.setJwt(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Your Brand
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
        </div>
      </div>
    </nav>
  );
};

export default UserNavBar;
