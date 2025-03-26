import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import CustomNavbar from "./components/Navbar";
import HomePage from "./pages/Home";
import GalleryPage from "./pages/Gallery";
import AboutPage from "./pages/About";
import ProfilePage from "./pages/Profile";
import UploadPage from "./pages/Upload";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
};

const AppContent: React.FC<{ user: any; setUser: (user: any) => void }> = ({ user, setUser }) => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/verify-email"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <CustomNavbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/upload" element={user ? <UploadPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyOTP />} />
      </Routes>
    </>
  );
};

export default App;
