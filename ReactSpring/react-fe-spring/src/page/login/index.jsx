import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();

  function sendLoginRequest(event) {
    event.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };
    axios
      .post("/api/auth/login", reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.data, response.headers]);
        } else {
          return Promise.reject("Invalid login");
        }
      })
      .then(([body, headers]) => {
        user.setJwt(headers["authorization"]);
        setTimeout(redirectToHome, 0); // Redirect to the home page after 2 seconds
      })
      .catch((error) => {});
  }

  function redirectToHome() {
    window.location.href = "/"; // Redirect to the home page
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="p-4 border rounded shadow-sm">
            <form onSubmit={sendLoginRequest}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end gap-3">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    redirectToHome(); // Redirect to the home page
                  }}
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
