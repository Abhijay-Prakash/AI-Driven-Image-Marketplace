import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "../styles/Gallery.css";

interface ImageData {
  _id: string;
  imageTitle: string;
  imageUrl: string;
  category: string;
  popularity: number;
  createdAt: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recent");


  useEffect(() => {
    axiosInstance
      .get("/upload/getImages")
      .then((response) => {
        if (response.data?.success && response.data.data) {
          setImages(response.data.data);
          setFilteredImages(response.data.data);
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

  useEffect(() => {
    let filtered = images;

    if (searchQuery) {
      filtered = filtered.filter((img) =>
        img.imageTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    if (sortBy === "recent") {
      filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "popular") {
      filtered = filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "title") {
      filtered = filtered.sort((a, b) => a.imageTitle.localeCompare(b.imageTitle));
    }

    setFilteredImages([...filtered]);
  }, [searchQuery, selectedCategory, sortBy, images]);

  return (
    <div className="gallery-layout">


      {/* Main Content */}
      <div className="gallery-container">
        <div className="hero-section">
          <div className="hero-overlay">
            <h1 className="hero-title">Discover Stunning Images</h1>
            <p className="hero-subtitle">Search & Explore AI-curated visuals</p>
            <input
              type="text"
              placeholder="Search images..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="gallery-content">
          {loading && <p className="text-center">Loading images...</p>}
          {error && <p className="text-center text-danger">{error}</p>}

          {!loading && !error && filteredImages.length > 0 && (
            <LightGallery speed={500} plugins={[lgZoom, lgThumbnail]} elementClassNames="gallery-grid">
              {filteredImages.map((img) => (
                <a
                  key={img._id}
                  href={img.imageUrl}
                  data-src={img.imageUrl}
                  data-sub-html={`<h4>${img.imageTitle}</h4>`}
                  className="gallery-item"
                >
                  <img src={img.imageUrl} alt={img.imageTitle} />
                </a>
              ))}
            </LightGallery>
          )}

          {!loading && !error && filteredImages.length === 0 && (
            <p className="text-center">No images found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
