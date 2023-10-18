import React from "react";

const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        background: "#f4f4f4",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        About Us
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: "1.6",
          color: "#666",
        }}
      >
        Welcome to our website! We are a passionate team dedicated to providing
        you with the best information and services. Our mission is to make your
        experience enjoyable and productive.
      </p>
    </div>
  );
};

export default About;
