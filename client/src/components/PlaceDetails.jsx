import React from "react";
import "./PlaceDetails.css";

const PlaceDetails = () => {
  return (
    <div className="place-details-container">
      <div className="content">
        <div className="text-section">
          <span className="store-name">נורדמן שמלות</span>
          <span className="description">
          גמ"ח להשאלת שמלות לשושבניות לנשים נערות וילדות          
          </span>
        </div>
        <div className="icons-section">
          <a
            href="https://www.google.com/maps/place/%D7%A9%D7%A2%D7%A8%D7%99+%D7%AA%D7%A9%D7%95%D7%91%D7%94+16,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9258839,35.0424329,704m/data=!3m2!1e3!4b1!4m5!3m4!1s0x1502d29e1c032ea9:0xf793590e3ceaccc!8m2!3d31.9258794!4d35.039858?hl=iw&entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <i className="pi pi-map-marker"></i>
          </a>
          <a href="tel:+972527140037" className="icon-link">
            <i className="pi pi-phone"></i>
          </a>
          <a href="mailto:r3208616@gmail.com" className="icon-link">
            <i className="pi pi-envelope"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;