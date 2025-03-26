import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import Particles from "../components/Particles";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Background Animation
const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;
const style = document.createElement("style");
style.innerHTML = gradientAnimation;
document.head.appendChild(style);

// Background Style
const backgroundStyle: React.CSSProperties = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  padding: "40px 0",
  background: "linear-gradient(-45deg, #1E1E2E, #3E3E56, #2A2A4E)",
  backgroundSize: "400% 400%",
  animation: "gradientBG 8s ease infinite",
};

// Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup Submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData);
      console.log("Signup Success:", response.data);

      // ✅ Store email in localStorage for OTP verification
      localStorage.setItem("email", formData.email);

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/verify-email");
      }, 2000);
    } catch (error: any) {
      console.error("Signup Error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <Particles />
      <Container>
        <Row className="justify-content-center">
            <Col md={5} className="d-none d-md-block">
                      <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.2 }}>
                        <h2 className="fw-bold text-warning">Welcome Back!</h2>
                        <p className="text-light">Access your AI-powered dashboard.</p>
          
                        {[
                          { title: "🚀 AI Image Classification", desc: "Sort images instantly with AI." },
                          { title: "🔍 Smart Image Captioning", desc: "Generate accurate captions in seconds." },
                          { title: "🎨 AI Image Quality Analysis", desc: "Ensure the best visuals every time." },
                        ].map((box, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="p-3 mb-3 shadow-lg"
                            style={{
                              background: "rgba(255, 255, 255, 0.1)",
                              backdropFilter: "blur(10px)",
                              borderRadius: "10px",
                              color: "white",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                          >
                            <h5 className="fw-bold">{box.title}</h5>
                            <p className="m-0">{box.desc}</p>
                          </motion.div>
                        ))}
                      </motion.div>
             </Col>
          <Col md={5}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card className="shadow-lg border-0 p-4" style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", borderRadius: "10px", color: "white" }}>
                <Card.Body>
                  <h2 className="fw-bold text-center text-warning">Sign Up</h2>
                  <p className="text-center text-light">Create an account to get started.</p>

                  {error && <Alert variant="danger">{error}</Alert>}
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}

                  <Form onSubmit={handleSignup}>
                    {/* Full Name */}
                    <Form.Group controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" placeholder="Enter full name" className="bg-transparent text-light border-light" value={formData.fullName} onChange={handleChange} required />
                    </Form.Group>

                    {/* Username */}
                    <Form.Group controlId="username" className="mt-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" name="username" placeholder="Enter username" className="bg-transparent text-light border-light" value={formData.username} onChange={handleChange} required />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId="email" className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter email" className="bg-transparent text-light border-light" value={formData.email} onChange={handleChange} required />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="password" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" placeholder="Enter password" className="bg-transparent text-light border-light" value={formData.password} onChange={handleChange} required />
                    </Form.Group>

                    {/* Gender */}
                    <Form.Group controlId="gender" className="mt-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select name="gender" className="bg-transparent text-light border-light" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="mt-4">
                      <Button variant="warning" type="submit" className="w-100 fw-bold">Sign Up</Button>
                    </motion.div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
