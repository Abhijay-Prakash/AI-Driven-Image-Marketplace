import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Particles from "../components/Particles";

// Background Animation
const gradientAnimation = `
  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
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

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure background animation is only added once
    if (!document.getElementById("bg-animation")) {
      const styleTag = document.createElement("style");
      styleTag.id = "bg-animation";
      styleTag.innerHTML = gradientAnimation;
      document.head.appendChild(styleTag);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (response.data.user) {
        navigate("/home");
      } else {
        setError("Invalid credentials.");
      }
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <Particles />
      <Container>
        <Row className="justify-content-center">
          {/* Left Side - Info Boxes */}
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

          {/* Right Side - Login Form */}
          <Col md={5}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <Card
                className="shadow-lg border-0 p-4"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <Card.Body>
                  <h2 className="fw-bold text-center text-warning">Login</h2>
                  <p className="text-center text-light">Sign in to continue.</p>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleLogin}>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        className="bg-transparent text-light border-light"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="password" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="bg-transparent text-light border-light"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="mt-4">
                      <Button variant="warning" type="submit" className="w-100 fw-bold">
                        Login
                      </Button>
                    </motion.div>

                    {/* Sign Up Option */}
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="mt-3">
                      <Button
                        variant="outline-light"
                        className="w-100 fw-bold"
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </Button>
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

export default Login;
