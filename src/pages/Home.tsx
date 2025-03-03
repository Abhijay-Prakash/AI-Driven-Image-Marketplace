import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "../styles/Home.css"


interface ImageData {
  _id: string;
  imageTitle: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get("/upload/getImages")
      .then((response) => {
        if (response.data?.success && response.data.data) {
          setImages(response.data.data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load images. Please try again.");
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">AI-Driven Image Marketplace</h2>

      {loading && <p className="text-center">Loading images...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && images.length > 0 && (
        <LightGallery speed={500} plugins={[lgZoom, lgThumbnail]} elementClassNames="gallery-grid">
          {images.map((img) => (
            <a key={img._id} href={img.imageUrl} data-src={img.imageUrl} data-sub-html={`<h4>${img.imageTitle}</h4>`}>
              <img
                src={img.imageUrl}
                alt={img.imageTitle}
                className="gallery-item"
              />
            </a>
          ))}
        </LightGallery>
      )}

      {!loading && !error && images.length === 0 && (
        <p className="text-center">No images available.</p>
      )}
    </div>
  );
};

export default Home;
