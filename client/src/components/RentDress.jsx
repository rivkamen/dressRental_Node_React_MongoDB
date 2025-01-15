
// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { useLocation } from 'react-router';
// import "react-jewish-datepicker/dist/index.css";
// import { ReactJewishDatePicker } from "react-jewish-datepicker";
// import { dontSelectShabatAndHolidays } from "jewish-dates-core";
// import { useAvailableDressMutation } from "../app/dressApiSlice";
// import './RentDress.css';
// import { Carousel } from 'primereact/carousel';

// const RentDress = (props) => {
//     const [date, setDate] = useState(new Date()); 
//     const [basicJewishDay, setBasicJewishDay] = useState(date);
//     const [availableDresses, setAvailableDresses] = useState([]);
//     const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
//     const location = useLocation();
//     const { state } = location;
//     const dress = state ? state.dress : null;

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
//     //    <Card className="pickDate fullHeightCard" style={{ width: '60%',height:'window.height', margin: 'auto', marginTop:'20px', marginBottom:'20px'}}>
//     <div className="fullscreen-container">
//         <Card className="pickDate fullHeightCard" style={{ width: '60%', height:'80%',margin: 'auto', marginTop:'30px' }}>
//             {dress && <div><div dir='rtl' className='text'>{dress.name} </div> <br/><div  dir='rtl' className='sectext'>{dress.description}</div></div>}
//             <br/>         
//             <br/>
//             <br/>
//             <div className="p-col image-container" style={{ marginBottom: '10px' }}>
//         {dress.images && dress.images.length > 1 ? (
//           <div
//           style={{
//               width: '40%',
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
//                     <h3 style={{                             padding: '10px', 
// display: 'flex', alignItems: 'center', gap: '8px' }}>
//                         <i className="pi pi-calendar-clock" style={{ fontSize: '24px' }}></i>
//                         מידות פנויות בתאריך שנבחר
//                     </h3>
//                     <ul style={{listStyleType: 'none'}}>
//                         {availableDresses.map((dress) => (
//                             <li  key={dress.key}>
//                                 <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
//                                 {dress.key}
//                                 {availableDresses.length < 3 && <span> (low in stock)</span>}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {isError && <p>Error fetching available dresses: {error?.message}</p>}
//          </Card>
// </div>
//     );
// };

// export default RentDress;
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router';
import "react-jewish-datepicker/dist/index.css";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import { dontSelectShabatAndHolidays } from "jewish-dates-core";
import { useAvailableDressMutation } from "../app/dressApiSlice";
import './RentDress.css';
import { Carousel } from 'primereact/carousel';

const RentDress = () => {
    const [date, setDate] = useState(new Date()); 
    const [basicJewishDay, setBasicJewishDay] = useState(date);
    const [availableDresses, setAvailableDresses] = useState([]);
    const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
    const location = useLocation();
    const { state } = location;
    const dress = state ? state.dress : null;

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
    const currentDate = new Date();

    const customCanSelect = (date) => {
        return dontSelectShabatAndHolidays()(date) && date.date >= currentDate;
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
        // <div className="fullscreen-container">
        //     <Card className="pickDate fullHeightCard" style={{ width: '70%', margin: 'auto', marginTop: '30px' }}>
        //         <div style={{ display: 'flex', height: '100%' }}>
                    
        //             {/* Left Section - Image Carousel */}
        //             <div style={{ width: '40%', marginTop: '2px', marginRight: '10px' }}>
        //                 {dress.images && dress.images.length > 1 ? (
        //                     <Carousel
        //                         value={dress.images}
        //                         itemTemplate={renderGalleryItem}
        //                         numVisible={1}
        //                         numScroll={1}
        //                         indicatorsContentClassName="carousel-indicators"
        //                     />
        //                 ) : (
        //                     dress.images?.length === 1 && (
        //                         <img
        //                             className="dress-image"
        //                             src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
        //                             alt={dress.name}
        //                             style={{
        //                                 maxHeight: '250px',
        //                                 maxWidth: '100%',
        //                                 objectFit: 'contain',
        //                                 padding: '5px',
        //                                 display: 'block',
        //                                 margin: '0 auto',
        //                             }}
        //                         />
        //                     )
        //                 )}
        //             </div>

        //             {/* Right Section - Text and Date Picker */}
        //             <div style={{ flex: 1, marginLeft: '10px' }}>
        //                 {dress && (
        //                     <>
        //                         <div dir='rtl' className='text'>{dress.name}</div>
        //                         <br />
        //                         <div dir='rtl' className='sectext'>{dress.description}</div>
        //                     </>
        //                 )}
        //                 <br />
        //                 <br />
        //                 <div className="datePickerContainer" dir='rtl' style={{ fontSize: '20px', padding: '10px' }}>
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

        //                 {availableDresses.length > 0 && (
        //                     <div dir='rtl'>
        //                         <h3 style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        //                             <i className="pi pi-calendar-clock" style={{ fontSize: '24px' }}></i>
        //                             מידות פנויות בתאריך שנבחר
        //                         </h3>
        //                         <ul style={{ listStyleType: 'none' }}>
        //                             {availableDresses.map((dress) => (
        //                                 <li key={dress.key}>
        //                                     <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
        //                                     {dress.key}
        //                                     {availableDresses.length < 3 && <span> (מלאי מוגבל)</span>}
        //                                 </li>
        //                             ))}
        //                         </ul>
        //                     </div>
        //                 )}

        //                 {isError && <p>Error fetching available dresses: {error?.message}</p>}
        //             </div>
        //         </div>
        //     </Card>
        // </div>


 <div       style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            // alignItems: 'center', // Center vertically
            height: '100vh', // Full viewport height
        }}>
        <Card id="cardid" className="pickDate fullHeightCard" style={{ width: '70%',height:'550px',marginTop:'5px', backgroundColor:'#646464' }}>
<div className="container fullHeightContent" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>

<div
    className="p-col image-container"
    style={{
        marginTop: '5px', // 5px from the top
        marginBottom: '10px',
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }}
>
    {dress.images && dress.images.length > 1 ? (
        <div
            style={{
                width: '100%',
                height: '700px',
                position: 'relative',
                display: 'flex',
                alignItems: 'start',
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


    <div className="rightContent" style={{ width: '45%' }}>
        <div dir="rtl" className="text" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {dress.name}
        </div>
        <div dir="rtl" className="sectext" style={{ fontSize: '18px', marginBottom: '20px' }}>
            {dress.description}
        </div>

        <div className="datePickerContainer" dir="rtl" style={{ fontSize: '20px', marginBottom: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>בחר תאריך:</span>
            <ReactJewishDatePicker
                value={basicJewishDay}
                isHebrew
                canSelect={customCanSelect}
                onClick={handleDateSelect}
                style={{
                    fontSize: '16px',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #ccc',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    marginTop: '10px',
                }}
            />

            
        </div>

        {availableDresses.length > 0 && (<>
             <h4 style={{ margin: 0 }} >: מידות פנויות בתאריך שנבחר</h4>

            <div
                className="sizesContainer"
                dir="rtl"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    maxHeight: '200px', // Adjust this value for the scroll area height
                    overflowY: 'auto',
                    // border: '1px solid #ccc',
                    // borderRadius: '8px',
                    padding: '10px',
                }}
            >
                 {availableDresses.length > 0 && (
                            <div dir='rtl'>
                                <ul style={{ listStyleType: 'none' }}>
                                    {availableDresses.map((dress) => (<>
                                        <li key={dress.key}>
                                            <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
                                            {dress.key}
                                            {availableDresses.length < 3 && <span> (מלאי מוגבל)</span>}
                                        </li><br/></>
                                    ))}
                                </ul>
                            </div>
                        )}
            </div>
            </>
        )}
    </div>
</div>
            {isError && <p>Error fetching available dresses: {error?.message}</p>}
        </Card>
        </div>



    );
};

export default RentDress;
