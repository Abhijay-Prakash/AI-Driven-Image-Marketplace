import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  fullName: string;
  username: string;
  profilePic: string;
  email: string;
}

interface Image {
  id: number;
  imageUrl: string;
  imageTitle: string;
  description: string;
  tags: string[];
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/profile", {
          withCredentials: true,
        });

        setUser(response.data.user);
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Profile Section */}
      {user && (
        <div className="card shadow p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={user.profilePic}
                alt="Profile"
                className="img-fluid rounded-circle shadow"
                width="150"
                height="150"
              />
            </div>
            <div className="col-md-7">
              <h3>{user.fullName}</h3>
              <p><strong>Username:</strong> @{user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="col-md-2 text-end">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Images Section */}
      <h2>Your Uploads</h2>
      <div className="row">
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className="col-md-3 mb-4">
              <div className="card shadow">
                <img src={img.imageUrl} alt={img.imageTitle} className="card-img-top" />
                <div className="card-body">
                  <h5>{img.imageTitle}</h5>
                  <p>{img.description}</p>
                  <small className="text-muted">Tags: {img.tags.join(", ")}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No uploads yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
