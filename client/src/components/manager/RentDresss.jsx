import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router";


const RentDresss = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

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
