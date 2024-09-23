
// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { useLocation } from 'react-router';
// import "react-jewish-datepicker/dist/index.css";
// import { ReactJewishDatePicker } from "react-jewish-datepicker";
// import { dontSelectShabatAndHolidays } from "jewish-dates-core";
// import {useAvailableDressMutation} from "../app/dressApiSlice"
// const RentDress = () => {
//     const [date,setDate] = useState(new Date()) 

//     const [basicJewishDay, setBasicJewishDay] = useState(date);
//     const excludeShabatAndHolidays = dontSelectShabatAndHolidays();
//     const [availableDressFunc,{data:sizes,isError,error,isSuccess}]=useAvailableDressMutation()
//     const location = useLocation();
//     const { state } = location;
//     const dress = state ? state.dress : null;

//     const handleDateSelect = async(selectedDay) => {
//         console.log(selectedDay);
        
//         await setBasicJewishDay(selectedDay.date);
//         setDate(selectedDay)
//         console.log(selectedDay);
        
        
//     };

//     return (
//         <>
//             <Card>
//                 {dress && <div>{dress.name}</div>}
//                 <ReactJewishDatePicker
//                     value={basicJewishDay}
//                     isHebrew
//                     canSelect={excludeShabatAndHolidays}
//                     onClick={handleDateSelect}
//                 />
//             </Card>
//         </>
//     );
// }

// export default RentDress;
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { useLocation } from 'react-router';
import "react-jewish-datepicker/dist/index.css";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import { dontSelectShabatAndHolidays } from "jewish-dates-core";
import { useAvailableDressMutation } from "../app/dressApiSlice";

const RentDress = (props) => {
    // const {dress}=props
    const [date, setDate] = useState(new Date()); 
    const [basicJewishDay, setBasicJewishDay] = useState(date);
    const [availableDresses, setAvailableDresses] = useState([]); // To store the available dresses
    const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
    const location = useLocation();
    const { state } = location;
    const dress = state ? state.dress : null;


    const handleDateSelect = async (selectedDay) => {
        setBasicJewishDay(selectedDay.date);
        console.log(selectedDay);
        
        setDate(selectedDay);

        try {
            // Call the mutation function to get available dresses for the selected date
            const availableDressesResponse = await availableDressFunc({ chosenDate: selectedDay.date, _id:dress._id  }).unwrap();
            setAvailableDresses(availableDressesResponse); // Store the available dresses in state
        } catch (err) {
            console.error('Failed to fetch available dresses', err);
        }
    };

    return (
        <>
            <Card>
                {dress && <div>{dress.name}</div>}
                
                <ReactJewishDatePicker
                    value={basicJewishDay}
                    isHebrew
                    canSelect={dontSelectShabatAndHolidays()}
                    onClick={handleDateSelect} // Trigger the function when a date is clicked
                />
                
                {/* Show the available dresses after a date is selected */}
                {availableDresses.length > 0 && (
                    <div>
                        <h3>Available Dresses for Selected Date:</h3>
                        {/* <ul>
                            {availableDresses.map((dress, index) => (
                                <li key={index}>{dress.key}{console.log(dress)}</li> 
                                // Displaying dress name, modify based on your data structure
                            ))}
                        </ul> */}
                        <ul>
    {availableDresses.map((dress) => (
        <li key={dress.key}>
            {dress.key}
            {availableDresses.length < 3 && <span> (low in stock)</span>}
            {console.log(dress)} {/* This will still log the dress object */}
        </li>
    ))}
</ul>

                    </div>
                )}

                {/* Display error if fetching the available dresses fails */}
                {isError && <p>Error fetching available dresses: {error?.message}</p>}
            </Card>
        </>
    );
};

export default RentDress;
