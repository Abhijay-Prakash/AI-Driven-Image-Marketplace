import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "../styles/Home.css";

interface ImageData {
  _id: string;
  imageTitle: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/upload/getImages")
      .then((response) => {
        console.log("Fetched Images:", response.data);
        if (response.data?.success && response.data.data) {
          setImages(response.data.data.slice(0, 6)); // Show only 6 images
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <Container fluid className="home-container">
      {/* Hero Section */}
      <section className="hero text-center py-5">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Welcome to <span className="brand">DreamPix</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Discover, create, and sell AI-generated images with ease.
        </motion.p>

        <motion.div 
          className="hero-buttons mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/gallery">
            <Button variant="primary" className="me-2">Explore Gallery</Button>
          </Link>
          <Link to="/upload">
            <Button variant="outline-secondary">Upload Your Work</Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <Container>
          <motion.h2 
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose DreamPix?
          </motion.h2>
          <Row className="text-center">
            {[
              { title: "AI-Powered Images", text: "Generate and explore stunning AI-enhanced images.", className: "gradient-1" },
              { title: "Image Marketplace", text: "Buy and sell high-quality images effortlessly.", className: "gradient-2" },
              { title: "Easy Uploads", text: "Upload and manage your artwork seamlessly.", className: "gradient-3" },
            ].map((feature, index) => (
              <Col md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                >
                  <div className={`feature-card ${feature.className}`}>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview py-5">
        <Container>
          <motion.h2 
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Images
          </motion.h2>
          <Row className="g-3"> {/* Adds spacing between grid items */}
            {images.length > 0 ? (
              images.map((img, index) => (
                <Col key={img._id} md={4} className="d-flex justify-content-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="w-100"
                  >
                    <Card className="gallery-item">
                      <Card.Img variant="top" src={img.imageUrl} alt={img.imageTitle} />
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <p className="text-center">No images available.</p>
            )}
          </Row>
        </Container>
      </section>
    </Container>
  );
};

export default Home;
