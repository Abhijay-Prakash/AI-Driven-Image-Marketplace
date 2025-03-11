import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "../styles/Signup.css";
import aiImage from "../assets/logo.webp"; // Import AI-related image

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    gender: "male",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Fix: Updated event type to support all input elements used in Form.Control
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      console.log(response.data);
      setSuccess("Signup successful! Please verify your email.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Container fluid className="signup-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6} className="signup-box">
          <Row>
            {/* Left Side - Image */}
            <Col md={6} className="d-none d-md-flex align-items-center justify-content-center image-container">
              <img src={aiImage} alt="AI Marketplace" className="signup-image" />
            </Col>

            {/* Right Side - Form */}
            <Col md={6} className="form-container">
              <Form onSubmit={handleSignup} className="signup-form">
                <h2 className="text-center mb-4">Create an Account</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="fullName" 
                    placeholder="Enter full name" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="username" 
                    placeholder="Choose a username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Enter password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Sign Up</Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
