import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "../styles/VerifyOTP.css";

const VerifyOTP: React.FC = () => {
  const [otpCode, setOtp] = useState("");
  const [email, setEmail] = useState(""); // Store email
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Get email from localStorage when component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please sign up again.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required. Please sign up again.");
      return;
    }

    try {
      console.log("Sending request with:", { email, otpCode });
      const response = await axiosInstance.post("/auth/verifyotp", { email, otpCode });
      console.log(response.data);
      setSuccess("OTP verified successfully! Redirecting...");

      // ✅ Clear stored email after successful verification
      localStorage.removeItem("email");

      setTimeout(() => navigate("/login"), 3000);
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
              <Form.Control type="text" placeholder="Enter OTP" value={otpCode} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Verify OTP</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOTP;
