import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Perform the logout operation
    axios
      .post("/api/logout") // Replace with your actual logout API endpoint
      .then(() => {
        alert("Sukses Keluar dari system.");
        navigate("/"); // Redirect to the homepage or any other page after logout
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
