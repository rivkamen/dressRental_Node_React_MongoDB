
// import React, { useState } from "react";
// import "./PlaceDetails.css";
// import  { useRef } from 'react';
// import { OverlayPanel } from 'primereact/overlaypanel';
// import { Button } from 'primereact/button';

// const PlaceDetails = () => {
//   const op = useRef(null);

//   const hours = {
//     sundayMonday: "17:00 - 19:00",
//     tuesday: "19:00 - 20:30",
//     wednesday: "20:00 - 21:30"
//   };

//   return (
//     <div className="place-details-container" style={{ direction: "rtl" }}>
//       <div className="section">
//         <div className="store-name">נורדמן שמלות</div>
//         <div className="description">
//           גמ"ח להשאלת שמלות לשושבניות לנשים נערות וילדות
//         </div>
//       </div>

//       <div className="section hours-container">
//         <h3>שעות פעילות</h3>
//         <div className="hours">
//           ראשון ושני: {hours.sundayMonday} | שלישי: {hours.tuesday} | רביעי: {hours.wednesday}
//         </div>
//       </div>

//       <div className="section icons-section">
//         <a
//           href="https://www.google.com/maps/place/%D7%A9%D7%A2%D7%A8%D7%99+%D7%AA%D7%A9%D7%95%D7%91%D7%94+16,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9258839,35.0424329,704m/data=!3m2!1e3!4b1!4m5!3m4!1s0x1502d29e1c032ea9:0xf793590e3ceaccc!8m2!3d31.9258794!4d35.039858?hl=iw&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="icon-link"
//         >
//           <i className="pi pi-map-marker"></i>
//         </a>
//         <a href="tel:+972527140037" className="icon-link">
          
//         </a>
//         <i className="pi pi-phone" onClick={(e) => op.current.toggle(e)}></i> 
// <OverlayPanel ref={op} className="icon-link">
// <a className="phone">0527140037</a>
// </OverlayPanel>
//         <a href="mailto:r3208616@gmail.com" className="icon-link">
//           <i className="pi pi-envelope"></i>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PlaceDetails;
// import React, { useState, useEffect } from "react";
// import "./PlaceDetails.css";
// import { useRef } from "react";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { Button } from "primereact/button";

// const PlaceDetails = () => {
//   const op = useRef(null);
//   const [showFooter, setShowFooter] = useState(false);

//   const hours = {
//     sundayMonday: "17:00 - 19:00",
//     tuesday: "19:00 - 20:30",
//     wednesday: "20:00 - 21:30"
//   };

//   // useEffect(() => {
//   //   console.log("Adding scroll listener");
//   //   const handleScroll = () => {
//   //     console.log("Scroll event triggered");
//   //     const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
//   //     console.log("Is at bottom:", isAtBottom);
//   //     setShowFooter(isAtBottom);
//   //   };
  
//   //   window.addEventListener("scroll", handleScroll);
//   //   return () => {
//   //     console.log("Removing scroll listener");
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);
//   useEffect(() => {
//     console.log("Adding scroll listener");

//     const handleScroll = () => {
//       console.log("Scroll event triggered");
//       const isAtBottom =
//         window.innerHeight + window.scrollY >= document.body.offsetHeight;
//       console.log("Is at bottom:", isAtBottom);
//       setShowFooter(isAtBottom);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       console.log("Removing scroll listener");
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//   return (
//    showFooter && <div className="place-details-container" style={{ direction: "rtl" }}>
//       <div className="section">
//         <div className="store-name">נורדמן שמלות</div>
//         <div className="description">
//           גמ"ח להשאלת שמלות לשושבניות לנשים נערות וילדות
//         </div>
//       </div>

//       <div className="section hours-container">
//         <h3>שעות פעילות</h3>
//         <div className="hours">
//           ראשון ושני: {hours.sundayMonday} | שלישי: {hours.tuesday} | רביעי:{" "}
//           {hours.wednesday}
//         </div>
//       </div>

//       <div className="section icons-section">
//         <a
//           href="https://www.google.com/maps/place/%D7%A9%D7%A2%D7%A8%D7%99+%D7%AA%D7%A9%D7%95%D7%91%D7%94+16,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9258839,35.0424329,704m/data=!3m2!1e3!4b1!4m5!3m4!1s0x1502d29e1c032ea9:0xf793590e3ceaccc!8m2!3d31.9258794!4d35.039858?hl=iw&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="icon-link"
//         >
//           <i className="pi pi-map-marker"></i>
//         </a>
//         <a href="tel:+972527140037" className="icon-link"></a>
//         <i className="pi pi-phone" onClick={(e) => op.current.toggle(e)}></i>
//         <OverlayPanel ref={op} className="icon-link">
//           <a className="phone">0527140037</a>
//         </OverlayPanel>
//         <a href="mailto:r3208616@gmail.com" className="icon-link">
//           <i className="pi pi-envelope"></i>
//         </a>
//       </div>
      
//     </div>
//   );
// };

// export default PlaceDetails;
import React from "react";
import "./PlaceDetails.css";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

const PlaceDetails = () => {
  const op = useRef(null);

  const hours = {
    sundayMonday: "17:00 - 19:00",
    tuesday: "19:00 - 20:30",
    wednesday: "20:00 - 21:30",
  };

  return (
    <div className="place-details-container" style={{ direction: "rtl" }}>
      <div className="section">
        <div className="store-name">נורדמן שמלות</div>
        <div className="description">
          גמ"ח להשאלת שמלות לשושבניות לנשים נערות וילדות
        </div>
      </div>

      <div className="section hours-container">
        <h3>שעות פעילות</h3>
        <div className="hours">
          ראשון ושני: {hours.sundayMonday} | שלישי: {hours.tuesday} | רביעי:{" "}
          {hours.wednesday}
        </div>
      </div>

      <div className="section icons-section">
        <a
          href="https://www.google.com/maps/place/%D7%A9%D7%A2%D7%A8%D7%99+%D7%AA%D7%A9%D7%95%D7%91%D7%94+16,+%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F+%D7%A2%D7%99%D7%9C%D7%99%D7%AA%E2%80%AD/@31.9258839,35.0424329,704m/data=!3m2!1e3!4b1!4m5!3m4!1s0x1502d29e1c032ea9:0xf793590e3ceaccc!8m2!3d31.9258794!4d35.039858?hl=iw&entry=ttu&g_ep=EgoyMDI1MDExNS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <i className="pi pi-map-marker"></i>
        </a>
        <a href="tel:+972527140037" className="icon-link"></a>
        <i className="pi pi-phone" onClick={(e) => op.current.toggle(e)}></i>
        <OverlayPanel ref={op} className="icon-link">
          <a className="phone">0527140037</a>
        </OverlayPanel>
        <a href="mailto:r3208616@gmail.com" className="icon-link">
          <i className="pi pi-envelope"></i>
        </a>
      </div>
    </div>
  );
};

export default PlaceDetails;
