import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "../styles/Login.css"; // Import the CSS for styling
import aiImage from "../assets/logo.webp"; // Import AI-related image

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", { username, password });
      console.log(response.data);
      navigate("/home"); // Redirect to home after successful login
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} className="login-box">
          <Row>
            {/* Left Side - Image */}
            <Col md={6} className="d-none d-md-flex align-items-center justify-content-center image-container">
              <img src={aiImage} alt="AI Marketplace" className="login-image" />
            </Col>

            {/* Right Side - Form */}
            <Col md={6} className="form-container">
              <Form onSubmit={handleLogin} className="login-form">
                <h2 className="text-center mb-4">Welcome Back</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
