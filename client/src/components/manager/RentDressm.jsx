
// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { useLocation, useNavigate } from 'react-router'; // Import useNavigate
// import "react-jewish-datepicker/dist/index.css";
// import { ReactJewishDatePicker } from "react-jewish-datepicker";
// import { dontSelectShabatAndHolidays } from "jewish-dates-core";
// import { useAvailableDressMutation } from "../../app/dressApiSlice";
// import './RentDressm.css';
// import { Button } from 'primereact/button';
// import { Carousel } from 'primereact/carousel';

// const RentDressm = (props) => {
//     const [date, setDate] = useState(new Date()); 
//     const [basicJewishDay, setBasicJewishDay] = useState(date);
//     const [availableDresses, setAvailableDresses] = useState([]);
//     const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
//     const location = useLocation();
//     const { state } = location;
//     const dress = state ? state.dress : null;
//     const navigate = useNavigate(); // Initialize navigate

//     const handleDateSelect = async (selectedDay) => {
//         setBasicJewishDay(selectedDay.date);
//         setDate(selectedDay);

//         try {
//             const availableDressesResponse = await availableDressFunc({ chosenDate: selectedDay.date, _id: dress._id }).unwrap();
//             setAvailableDresses(availableDressesResponse);
//         } catch (err) {
//             console.error('Failed to fetch available dresses', err);
//         }
//     };

//     // Function to handle button click and navigate to another component with props
//     const handleRentClick = (size) => {
//         navigate('/rentPage', { state: { dress, chosenDate: date, size } });  // Pass the dress, chosenDate, and size via state
//     };

//     const renderGalleryItem = (image) => {
//         const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <img
//                     className="dress-gallery-image"
//                     src={imageUrl}
//                     alt={dress.name}
//                     style={{
//                         maxHeight: '300px',    
//                         maxWidth: '100%',      
//                         objectFit: 'contain',    // Ensures no cropping
//                         padding: '2px',         // Optional padding for clarity
//                     }}
//                 />
//             </div>
//         );
//     };

//     return (
//         <Card className="pickDate fullHeightCard" style={{ width: '70%', margin: 'auto' }}>
//             {dress && <div><div dir='rtl' className='text'>{dress.name} </div> <br/><div  dir='rtl' className='sectext'>{dress.description}</div></div>}
//             <br/>         
//             <br/>
//             <br/>
//             <div className="container fullHeightContent">
 

// <div className="p-col image-container" style={{ marginBottom: '10px' }}>
//         {dress.images && dress.images.length > 1 ? (
//           <div
//           style={{
//               width: '100%',
//               height: '700px', // Consistent container height to fit images and indicators
//               position: 'relative', // Enable absolute positioning of indicators
//               display: 'flex',
//               alignItems: 'center', // Center image vertically
//               justifyContent: 'center', // Center image horizontally
//           }}
//       >
//           <Carousel
//               value={dress.images}
//               itemTemplate={renderGalleryItem}
//               numVisible={1}
//               numScroll={1}
//               indicatorsContentClassName="carousel-indicators"
//           />
//       </div>
      
//         ) : (
//             dress.images?.length === 1 && (
              

// <img
//     className="dress-image"
//     src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
//     alt={dress.name}
//     style={{
//         maxHeight: '250px',      // Consistent height for all images
//         maxWidth: '100%',        // Max width for the container
//         objectFit: 'contain',    // Ensures no cropping
//         padding: '5px',          // Padding inside the border
//         display: 'block',
//         margin: '0 auto',        // Center the image horizontally
//     }}
// />


//             )
//         )}
//     </div>
  



//                 {/* Date picker on the right */}
//                 <div className="datePickerContainer" dir='rtl' style={{ 
//                             fontSize: '20px', 
//                             marginRight: '20px', 
//                             padding: '10px', 
//                         }}>
//                     בחר תאריך:
//                     <ReactJewishDatePicker
//                         value={basicJewishDay}
//                         isHebrew
//                         canSelect={dontSelectShabatAndHolidays()}
//                         onClick={handleDateSelect}
//                         style={{ 
//                             fontSize: '20px',  
//                             padding: '10px', 
//                             borderRadius: '10px',
//                             border: '2px solid #ccc',
//                             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//                         }}
//                     />
//                 </div>
//             </div>

//             {availableDresses.length > 0 && (
//                 <div dir='rtl'>
//                     <h3 style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
//                         <i className="pi pi-calendar-clock" style={{ fontSize: '24px' }}></i>
//                         מידות פנויות בתאריך שנבחר


                        
//                     </h3>
//                     <ul style={{listStyleType: 'none'}}>

// {availableDresses.map((dress, index) => (
//     <li key={dress.key}>
//         <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
//         <Button 
//             label={dress.key} 
//             onClick={() => handleRentClick(dress.key)}  // Pass the size (dress.key) to the handler
//         />
//         {availableDresses[index].availableDresses < 3 && (
//             <span> (נשארו רק {availableDresses[index].availableDresses} )</span>
//         )}
//     </li> 
// ))}

//                      {/* */}
//                     </ul>
//                 </div>
//             )}

//             {isError && <p>Error fetching available dresses: {error?.message}</p>}
//          </Card>
//     );
// };

// export default RentDressm;
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { useLocation, useNavigate } from 'react-router';
import "react-jewish-datepicker/dist/index.css";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import { dontSelectShabatAndHolidays } from "jewish-dates-core";
import { useAvailableDressMutation } from "../../app/dressApiSlice";
import './RentDressm.css';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

const RentDressm = (props) => {
    const [date, setDate] = useState(new Date()); 
    const [basicJewishDay, setBasicJewishDay] = useState(date);
    const [availableDresses, setAvailableDresses] = useState([]);
    const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
    const location = useLocation();
    const { state } = location;
    const dress = state ? state.dress : null;
    const navigate = useNavigate();

    const handleDateSelect = async (selectedDay) => {
        setBasicJewishDay(selectedDay.date);
        setDate(selectedDay);

        try {
            const availableDressesResponse = await availableDressFunc({ chosenDate: selectedDay.date, _id: dress._id }).unwrap();
            setAvailableDresses(availableDressesResponse);
        } catch (err) {
            console.error('Failed to fetch available dresses', err);
        }
    };

    const handleRentClick = (size) => {
        navigate('/rentPage', { state: { dress, chosenDate: date, size } });
    };

    const renderGalleryItem = (image) => {
        const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                    className="dress-gallery-image"
                    src={imageUrl}
                    alt={dress.name}
                    style={{
                        maxHeight: '300px',    
                        maxWidth: '100%',
                        objectFit: 'contain',
                        padding: '2px',
                    }}
                />
            </div>
        );
    };

    return (
        <Card className="pickDate fullHeightCard" style={{ width: '70%', margin: 'auto' }}>
            <div className="container fullHeightContent" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Left side: Image */}
                <div className="p-col image-container" style={{ marginBottom: '10px', marginTop: '2px', width: '45%' }}>
                    {dress.images && dress.images.length > 1 ? (
                        <div
                            style={{
                                width: '100%',
                                height: '700px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
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
                                    maxHeight: '250px',
                                    maxWidth: '100%',
                                    objectFit: 'contain',
                                    padding: '5px',
                                    display: 'block',
                                    margin: '0 auto',
                                }}
                            />
                        )
                    )}
                </div>

                {/* Right side: Content */}
                <div className="rightContent" style={{ width: '45%' }}>
                    <div dir="rtl" className="text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {dress.name}
                    </div>
                    <div dir="rtl" className="sectext" style={{ fontSize: '18px', marginBottom: '20px' }}>
                        {dress.description}
                    </div>

                    {/* Date picker */}
                    <div className="datePickerContainer" dir='rtl' style={{ fontSize: '20px', marginRight: '20px', padding: '10px' }}>
                        בחר תאריך:
                        <ReactJewishDatePicker
                            value={basicJewishDay}
                            isHebrew
                            canSelect={dontSelectShabatAndHolidays()}
                            onClick={handleDateSelect}
                            style={{ 
                                fontSize: '20px',
                                padding: '10px', 
                                borderRadius: '10px',
                                border: '2px solid #ccc',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Available dresses list */}
            {availableDresses.length > 0 && (
                <div dir='rtl'>
                    <h3 style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="pi pi-calendar-clock" style={{ fontSize: '24px' }}></i>
                        מידות פנויות בתאריך שנבחר
                    </h3>
                    <ul style={{ listStyleType: 'none' }}>
                        {availableDresses.map((dress, index) => (
                            <li key={dress.key}>
                                <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
                                <Button 
                                    label={dress.key} 
                                    onClick={() => handleRentClick(dress.key)} 
                                />
                                {availableDresses[index].availableDresses < 3 && (
                                    <span> (נשארו רק {availableDresses[index].availableDresses} )</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isError && <p>Error fetching available dresses: {error?.message}</p>}
        </Card>
    );
};

export default RentDressm;
