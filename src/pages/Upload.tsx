import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Image, Alert } from "react-bootstrap";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Upload.css"; // Import the corresponding CSS file

const Upload: React.FC = () => {
  const [imageTitle, setImageTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; variant: "success" | "danger" } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !imageTitle.trim() || !description.trim()) {
      setMessage({ text: "Please fill in all fields and select an image.", variant: "danger" });
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("imageTitle", imageTitle);
    formData.append("description", description);
    formData.append("image", selectedFile);

    try {
      const response = await axiosInstance.post("/upload/postImages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ text: "Image uploaded successfully!", variant: "success" });
      console.log("Response from backend:", response.data);

      // Reset form
      setImageTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({ text: "Upload failed. Please try again.", variant: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={7}> {/* Increased width for a better look */}
            <Card className="upload-card">
              <h2 className="upload-title">Upload an Image</h2>

              {message && <Alert variant={message.variant}>{message.text}</Alert>}

              <Form className="upload-form">
                <Form.Group controlId="imageTitle" className="mb-3">
                  <Form.Label>Image Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a catchy title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write something interesting about the image..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="fileUpload" className="mb-3">
                  <Form.Label>Choose an Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                </Form.Group>

                {previewUrl && (
                  <div className="image-preview-container">
                    <Image src={previewUrl} alt="Preview" className="image-preview" />
                  </div>
                )}

                <div className="text-center">
                  <Button className="upload-btn" onClick={handleUpload} disabled={loading || !imageTitle || !description || !selectedFile}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Upload"}
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Upload;
