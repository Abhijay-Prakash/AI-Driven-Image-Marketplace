import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Navbar.css";

const CustomNavbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-text">DREAMPIX</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as="button" onClick={() => (user ? navigate("/upload") : setShowModal(true))}>
                Upload
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Dropdown align="end">
                <Dropdown.Toggle as="button" className="profile-btn">
                  <Image src={user?.profilePic || "/default-profile.png"} alt="Profile" roundedCircle width="40" height="40" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user ? (
                    <>
                      <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item onClick={() => navigate("/login")}>Login</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Required Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>You need to log in to access this feature.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => { setShowModal(false); navigate("/login"); }}>Go to Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomNavbar;
