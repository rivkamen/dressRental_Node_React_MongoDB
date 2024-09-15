
// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { useLocation } from 'react-router';
// import "react-jewish-datepicker/dist/index.css";
// import { ReactJewishDatePicker } from "react-jewish-datepicker";
// import { dontSelectShabatAndHolidays } from "jewish-dates-core";

// const RentDress = () => {
//     let date = new Date();

//     const [basicJewishDay, setBasicJewishDay] = useState(date);
//     const excludeShabatAndHolidays = dontSelectShabatAndHolidays();

//     const location = useLocation();
//     const { state } = location;
//     const dress = state ? state.dress : null;

//     const handleDateSelect = (selectedDay) => {
//         setBasicJewishDay(selectedDay);
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

const RentDress = () => {
    const [date,setDate] = useState(new Date()) 

    const [basicJewishDay, setBasicJewishDay] = useState(date);
    const excludeShabatAndHolidays = dontSelectShabatAndHolidays();

    const location = useLocation();
    const { state } = location;
    const dress = state ? state.dress : null;

    const handleDateSelect = async(selectedDay) => {
        console.log(selectedDay);
        
        await setBasicJewishDay(selectedDay.date);
        setDate(selectedDay)
        console.log(selectedDay);
        
    };

    return (
        <>
            <Card>
                {dress && <div>{dress.name}</div>}
                <ReactJewishDatePicker
                    value={basicJewishDay}
                    isHebrew
                    canSelect={excludeShabatAndHolidays}
                    onClick={handleDateSelect}
                />
            </Card>
        </>
    );
}

export default RentDress;
