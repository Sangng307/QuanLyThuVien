import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useUser } from "../../component/UserProvider";
import axios from "axios";
import GoogleLogin from "react-google-login";

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
  const responseGoogle = (response) => {
    console.log(response);
    // Send the 'response.tokenId' to your backend for authentication
    // You can use axios or another HTTP library to make a POST request to your backend endpoint
  };
  return (
    <div>
      <Image
        style={{
          position: "absolute",
          width: "100%",
          height: "70%",

          left: "0",
        }}
        src="https://png.pngtree.com/background/20210710/original/pngtree-cartoon-reading-blue-sky-small-fresh-banner-picture-image_993624.jpg"
        alt=""
        fluid // Use fluid prop for responsive images
      />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div
              className="p-4 border rounded shadow-sm"
              style={{
                position: "relative",
                background: "white",
                border: "none",
                height: "auto",
              }}
            >
              <form
                onSubmit={sendLoginRequest}
                style={{ background: "white", border: "none" }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label"
                    style={{ color: "black" }}
                  >
                    Username
                  </label>
                  <input
                    style={{ marginTop: "5px" }}
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
                    style={{ marginTop: "5px" }}
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-md-end gap-3">
                  <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      background: "#80C2A7",
                      color: "black",
                      border: "none",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    style={{
                      background: "#80C2A7",
                      color: "black",
                      border: "none",
                    }}
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
    </div>
  );
};

export default Login;
