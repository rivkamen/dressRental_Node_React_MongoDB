
// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { useLocation } from 'react-router';
// import "react-jewish-datepicker/dist/index.css";
// import { ReactJewishDatePicker } from "react-jewish-datepicker";
// import { dontSelectShabatAndHolidays } from "jewish-dates-core";
// import { useAvailableDressMutation } from "../app/dressApiSlice";
// import './RentDress.css';

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

//     return (
//        <Card className="pickDate" style={{ width: '90%', height:'100%', margin:'auto' }}>
//             {dress && <div dir='rtl'className='text'>{dress.name}</div>}
//             <div className="container">
//                 {/* Display the selected dress image on the left */}
//                 {dress && (
//                     <div className="imageContainer">
//                         <img 
//                             src={dress.imageUrl} 
//                             alt="Selected Dress" 
//                             style={{ 
//                                 width: '200px', 
//                                 height: 'auto', 
//                                 borderRadius: '10px',
//                                 boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
//                             }} 
//                         />
//                     </div>
//                 )}
//                 {/* Date picker on the right */}
//                 <div className="datePickerContainer" dir='rtl' style={{ 
//                             fontSize: '20px', 
//                             marginRight:'20px', 
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
//                 <div>
//                     <h3>Available Dresses for Selected Date:</h3>
//                     <ul>
//                         {availableDresses.map((dress) => (
//                             <li key={dress.key}>
//                                 {dress.key}
//                                 {availableDresses.length < 3 && <span> (low in stock)</span>}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {isError && <p>Error fetching available dresses: {error?.message}</p>}
//          </Card>

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

const RentDress = (props) => {
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

    return (
       <Card className="pickDate fullHeightCard" style={{ width: '90%', margin: 'auto' }}>
            {dress && <div><div dir='rtl' className='text'>{dress.name} </div> <br/><div  dir='rtl' className='sectext'>{dress.description}</div></div>}
            <br/>         
            <br/>
            <br/>
            <div className="container fullHeightContent">
                {/* Display the selected dress image on the left */}
                {dress && (
                    <div className="imageContainer">
                        <img 
                            src={dress.imageUrl} 
                            alt="Selected Dress" 
                            style={{ 
                                width: '200px', 
                                height: 'auto', 
                                borderRadius: '10px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                            }} 
                        />
                    </div>
                )}
                {/* Date picker on the right */}
                <div className="datePickerContainer" dir='rtl' style={{ 
                            fontSize: '20px', 
                            marginRight: '20px', 
                            padding: '10px', 
                        }}>
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

            {availableDresses.length > 0 && (
                <div dir='rtl'>
                    <h3 style={{                             padding: '10px', 
display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="pi pi-calendar-clock" style={{ fontSize: '24px' }}></i>
                        מידות פנויות בתאריך שנבחר
                    </h3>
                    <ul style={{listStyleType: 'none'}}>
                        {availableDresses.map((dress) => (
                            <li  key={dress.key}>
                                <i className='pi pi-star-fill' style={{ fontSize: '14px' }}></i>&nbsp;&nbsp;
                                {dress.key}
                                {availableDresses.length < 3 && <span> (low in stock)</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isError && <p>Error fetching available dresses: {error?.message}</p>}
         </Card>

    );
};

export default RentDress;
