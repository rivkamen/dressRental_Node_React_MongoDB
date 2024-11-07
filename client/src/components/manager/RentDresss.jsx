import React from 'react';
import { useLocation } from 'react-router';

const RentDresss = () => {
    const location = useLocation();
    const { userId, dress, chosenDate, size } = location.state;

    return (
        <div dir='rtl'>
            <h1>סיכום הזמנה</h1>
            <p>לקוח: {userId}</p>
            <p>דגם: {dress.name}</p>
            <p>תאריך: {chosenDate.toString()}</p>
            <p>מידה: {size}</p>
        </div>
    );
};

export default RentDresss;
