import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "../styles/VerifyOTP.css";

const VerifyOTP: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/verify-otp", { otp });
      console.log(response.data);
      setSuccess("OTP verified successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <Container fluid className="verifyotp-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6} className="verifyotp-box">
          <h2 className="text-center mb-4">Verify Your Email</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleVerifyOTP} className="verifyotp-form">
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Verify OTP</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP;
