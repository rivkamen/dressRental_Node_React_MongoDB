
// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import { useNavigate } from 'react-router-dom';
// import './Dress.css'; // Add a separate CSS file to share similar styles with the manager component

// const Dress = (props) => {
//     const { dress } = props;
//     const navigate = useNavigate();

//     const handleNavigate = () => {
//         navigate('/rent', { state: { dress: dress } });
//     };

//     const fileName = dress?.images?.[0].split("\\").pop();
//     const imageUrl = `http://localhost:3435/upload/${fileName}`;

//     return (
//         <div
//             className="p-mb-3 dress-item"
//             key={dress.id}
//             style={{
//                 border: 'none',
//                 width: '250px',
//                 height: '450px', // Consistent height
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 padding: '15px',
//             }}
//         >
//             <div className="p-grid p-align-center">
//                 <div className="p-col">
//                     <img
//                         className="dress-image"
//                         src={imageUrl}
//                         alt={dress.name}
//                         style={{
//                             width: '100%',
//                             height: '200px',
//                             objectFit: 'cover',
//                             borderRadius: '5px',
//                         }}
//                     />
//                 </div>
//                 <div className="p-col">
//                     <div className="dress-info">
//                         <div className="text-xl font-bold text-900">{dress.name}</div>
//                         <div className="text-sm text-700">{dress.description}</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="p-col dress-buttons">
//                 <div className="button-group">
//                     <Button label="לפרטים" className="p-button-rounded p-button-info" onClick={handleNavigate} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dress;
// Dress.js
import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Dress.css'; // Add a separate CSS file for consistent styling
import { Carousel } from 'primereact/carousel';

const Dress = (props) => {
    const { dress } = props;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/rent', { state: { dress: dress } });
    };

    // const imageUrls = dress?.images?.map(image => `http://localhost:3435/upload/${image.split("\\").pop()}`);
    const renderGalleryItem = (image) => {
        const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img
                    className="dress-gallery-image"
                    src={imageUrl}
                    alt={dress.name}
                    style={{
                        maxHeight: '50%',         // מקסימום גובה כ-50% מגובה הקונטיינר
                        maxWidth: '100%',         // רוחב מקסימלי של 100% מהקונטיינר
                        objectFit: 'contain',     // שומר על התמונה ללא חיתוך
                        padding: '1%',            // ריפוד של 1% לכל כיוון (למראה נקי יותר)
                    }}
                    
                />
            </div>
        );
    };
    return (


        <div
        className="p-mb-3 dress-item"
        key={dress.id}
        style={{
            border: 'none',
            width: '400px', // Set the width to a consistent value for all cards
            height: '550px', // Fixed height for consistency
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '15px'
            
        }}
    >
        

            <div className="p-grid p-align-center">


<div className="p-col image-container" style={{ marginBottom: '10px' }}>
        {dress.images && dress.images.length > 1 ? (
          <div
          style={{
              width: '100%',
              height: '270px', // Consistent container height to fit images and indicators
              position: 'relative', // Enable absolute positioning of indicators
              display: 'flex',
              alignItems: 'center', // Center image vertically
              justifyContent: 'center', 
              
          }}
      >
          <Carousel
              value={dress.images}
              itemTemplate={renderGalleryItem}
              numVisible={1}
              numScroll={1}
              indicatorsContentClassName="carousel-indicators"
          />
      </div>
      
        ) : (
            dress.images?.length === 1 && (
              

<img
    className="dress-image"
    src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
    alt={dress.name}
    style={{
        maxHeight: '250px',      // Consistent height for all images
        maxWidth: '100%',        // Max width for the container
        objectFit: 'contain',    // Ensures no cropping
        padding: '5px',          // Padding inside the border
        display: 'block',
        margin: '0 auto',        // Center the image horizontally
    }}
/>


            )
        )}
    </div>
                <div className="p-col">
                    <div className="dress-info">
                        <div className="text-xl font-bold text-900">{dress.name}</div>
                        <div className="text-sm text-700">{dress.description}</div>
                    </div>
                </div>
            </div>
            <div className="p-col dress-buttons">
                    <div >
                    <Button className="single-button" label="לפרטים" style={{textAlign:'center'}} onClick={handleNavigate} />
                </div>
            </div>
        </div>
    );
};

export default Dress;
