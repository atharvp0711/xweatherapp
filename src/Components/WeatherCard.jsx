import React from "react";

const WeatherCard = ({ title, value, unit, icon }) => {
  return (
    <div
      className="weather-card"
      style={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#fff",
        width: "150px",
      }}
    >
      <h3> {title} </h3>
      <p>
        {value} {unit}
      </p>
      {icon && <img src={icon} alt="Weather Icon" style={{ width: "50px" }} />}
    </div>
  );
};

export default WeatherCard;
