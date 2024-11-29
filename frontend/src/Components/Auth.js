import React, { useState, useEffect } from "react";
import "./Auth.css";
import smokeVideo from "./smoke.mp4";
import AuthToggle from "./AuthToggle"; // Ensure this is the correct path

const Auth = () => {
  const [animationDone, setAnimationDone] = useState(false);
  const [currentView, setCurrentView] = useState("Auth");

  useEffect(() => {
    const animationDuration = 4000; // Time until text animation is done
    const timer = setTimeout(() => {
      setAnimationDone(true);
    }, animationDuration);
    return () => clearTimeout(timer);
  }, []);

  if (currentView === "AuthToggle") {
    return <AuthToggle />;
  }

  return (
    <section className="auth-section">
      {/* Smoke Video Background */}
      <video
        src={smokeVideo}
        autoPlay
        muted
        loop
        className="background-video"
      ></video>

      {/* Smoke Animation Text */}
      <h1>
        <span>I</span>
        <span>N</span>
        <span>V</span>
        <span>E</span>
        <span>S</span>
        <span>T</span>
        <span>I</span>
        <span>Q</span>
      </h1>

      {/* Auth Buttons */}
      {animationDone && (
        <div className="auth-buttons">
          <button className="auth-btn" onClick={() => setCurrentView("AuthToggle")}>
            Sign In
          </button>
        </div>
      )}
    </section>
  );
};

export default Auth;
