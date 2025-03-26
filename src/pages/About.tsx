import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Background Styling
const backgroundStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #1E1E2E, #3E3E56)",
  minHeight: "100vh",
  color: "white",
  padding: "80px 0",
};

// Framer Motion Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={backgroundStyle}>
      <Container>
        {/* Hero Section */}
        <Row className="text-center mb-5">
          <Col>
            <motion.h1
              className="fw-bold display-4"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              style={{ color: "#FFD700" }}
            >
              AI-Driven Image Marketplace
            </motion.h1>
            <motion.p
              className="fs-5 text-light"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              Leveraging AI for image classification, captioning, and quality assessment.
            </motion.p>
          </Col>
        </Row>

        {/* What We Do */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10}>
            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}>
              <h2 className="fw-bold text-info">What We Do</h2>
              <p className="text-light">
                Our AI-powered platform enhances the image marketplace by **automatically classifying, captioning, and assessing image quality**. 
                With **intelligent search, customizable AI tools, and automated enhancements**, we streamline the creative process.
              </p>
            </motion.div>
          </Col>
        </Row>

        {/* Features Section */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold text-warning">Why Choose Our Platform?</h2>
              <p className="text-light fs-5">AI-enhanced features that revolutionize digital creativity.</p>
            </Col>
          </Row>

          <Row className="mb-5">
            {[
              { title: "🚀 AI-Powered", desc: "Advanced image classification & analysis." },
              { title: "🔍 Smart Search", desc: "Find the right image using AI-driven filters." },
              { title: "📝 Automated Captions", desc: "AI-generated captions for every image." },
              { title: "📊 Quality Assessment", desc: "Evaluate image sharpness & aesthetics with AI." },
              { title: "🎨 AI Image Enhancements", desc: "Automatic enhancements for professional quality." },
              { title: "🔗 Seamless Licensing", desc: "Hassle-free licensing for commercial use." },
            ].map((feature, index) => (
              <Col key={index} md={4} className="mb-4 d-flex">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="w-100"
                >
                  <Card
                    className="text-center shadow-lg border-0 p-3 w-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "10px",
                      color: "white",
                      minHeight: "160px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Body>
                      <h4 className="fw-bold">{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Call to Action */}
        <Row className="text-center mt-5">
          <Col>
            <motion.h3 className="fw-bold text-light" initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 1 }}>
              Join the AI Revolution
            </motion.h3>
            <motion.p className="fs-5 text-secondary" initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 1.1 }}>
              Start leveraging AI-powered image technology today.
            </motion.p>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
              <Button
                variant="warning"
                size="lg"
                className="px-4 py-2 fw-bold shadow"
                onClick={() => navigate("/signup")} 
              >
                Get Started
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
