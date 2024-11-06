import React from 'react';
import { useLocation } from 'react-router';

const RentDresss = () => {
    const location = useLocation();
    const { userId, dress, chosenDate, size } = location.state;

    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {userId}</p>
            <p>Dress: {dress.name}</p>
            <p>Date: {chosenDate.toString()}</p>
            <p>Size: {size}</p>
        </div>
    );
};

export default RentDresss;
