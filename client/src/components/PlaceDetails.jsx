// import React, { useState, useEffect } from "react";
// import "./PlaceDetails.css";

// const PlaceDetails = () => {
//   const [hours, setHours] = useState({
//     sundayMonday: "17:00 - 19:00",
//     tuesday: "19:00 - 20:30",
//     wednesday: "20:00 - 21:30"
//   });
  
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = sessionStorage.getItem("adminToken");
//     if (token) {
//       setIsAdmin(true); 
//     }
//   }, []);

//   const handleHourChange = (day, event) => {
//     setHours(prevHours => ({
//       ...prevHours,
//       [day]: event.target.value
//     }));
//   };

//   const handleSaveHours = () => {
//     setMessage("השעות עודכנו בהצלחה!");
//   };

//   return (
//     <div className="place-details-container" style={{direction:'rtl'}}>
//       <div className="section">
//         <div className="store-name">נורדמן שמלות</div>
//         <div className="description">
//           גמ"ח להשאלת שמלות לשושבניות לנשים נערות וילדות
//         </div>
//       </div>

      

//       <div className="section hours-container">
//         <h3>שעות פעילות</h3>
//         <div className="hours">
//           <div>
//             <label>ראשון ושני:</label>
//             {isAdmin ? (
//               <input
//                 type="text"
//                 value={hours.sundayMonday}
//                 onChange={(e) => handleHourChange("sundayMonday", e)}
//               />
//             ) : (
//               <span>{hours.sundayMonday}</span>
//             )}
//           </div>
//           <div>
//             <label>שלישי:</label>
//             {isAdmin ? (
//               <input
//                 type="text"
//                 value={hours.tuesday}
//                 onChange={(e) => handleHourChange("tuesday", e)}
//               />
//             ) : (
//               <span>{hours.tuesday}</span>
//             )}
//           </div>
//           <div>
//             <label>רביעי:</label>
//             {isAdmin ? (
//               <input
//                 type="text"
//                 value={hours.wednesday}
//                 onChange={(e) => handleHourChange("wednesday", e)}
//               />
//             ) : (
//               <span>{hours.wednesday}</span>
//             )}
//           </div>
//         </div>

//         {isAdmin && (
//           <button className="edit-hours-button" onClick={handleSaveHours}>
//             עדכן שעות
//           </button>
//         )}

//         {message && <p className="update-message">{message}</p>}
//       </div>
//       <div className="section icons-section">
//         <a
//           href="https://www.google.com/maps/@32.226743,34.747009,179558m/data=!3m1!1e3?hl=iw&entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="icon-link"
//         >
//           <i className="pi pi-map-marker"></i>
//         </a>
//         <a href="tel:+972527140037" className="icon-link">
//           <i className="pi pi-phone"></i>
//         </a>
//         <a href="mailto:r3208616@gmail.com" className="icon-link">
//           <i className="pi pi-envelope"></i>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default PlaceDetails;
import React, { useState } from "react";
import "./PlaceDetails.css";

const PlaceDetails = () => {
  const hours = {
    sundayMonday: "17:00 - 19:00",
    tuesday: "19:00 - 20:30",
    wednesday: "20:00 - 21:30"
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
          ראשון ושני: {hours.sundayMonday} | שלישי: {hours.tuesday} | רביעי: {hours.wednesday}
        </div>
      </div>

      <div className="section icons-section">
        <a
          href="https://www.google.com/maps/@32.226743,34.747009,179558m/data=!3m1!1e3?hl=iw&entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D"
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
  );
};

export default PlaceDetails;
