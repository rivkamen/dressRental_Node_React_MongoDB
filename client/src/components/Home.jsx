import React from "react";
import img from "./images/dress.mp4"
const HomePage = ( ) => {
  const  imageSrc=img;
  return (
    <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //     textAlign: "center",
    //     backgroundColor: "#f4f4f4",
    //   }}
    >
      <div
        // style={{
        //   border: "2px solid #ccc",
        //   padding: "10px",
        //   borderRadius: "8px",
        //   backgroundColor: "#fff",
        // }}
      >
        <video  loop autoPlay
          src={imageSrc}
          alt={"Home image"}
          style={{ width: "100%", height: "100%", borderRadius: "8px" }}
        />
        {/* {caption && (
          <p style={{ marginTop: "10px", color: "#333", fontSize: "16px" }}>
          </p>
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
