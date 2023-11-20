import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();

  function sendLoginRequest() {
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
        window.location.href = "/";
        // console.log(body);
      })
      .catch((error) => {
        alert(error.message || "An error occurred during login");
      });
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={6}>
          <div className="p-4 border rounded shadow-sm">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="email"
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
                <Button
                  id="submit"
                  variant="primary"
                  onClick={() => sendLoginRequest()}
                >
                  Login
                </Button>
                <Button
                  id="submit"
                  variant="secondary"
                  onClick={() => {
                    window.location.href = "/";
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
