

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router";
import { useTakeDressMutation } from "../../app/dressApiSlice";
import Swal from "sweetalert2";
import { Button } from 'primereact/button';
import { useGetUserByIdQuery } from "../../app/userApiSlice";
import { Card } from 'primereact/card';
import './Renting.css'

const Renting = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId, dress, chosenDate, size } = location.state;

    // Fetch the user by ID with useGetUserByIdQuery hook
    const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
    const [takeDressFunc] = useTakeDressMutation();

    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleTakeDress = async () => {
        try {
            const response = await takeDressFunc({
                userId: userId,
                _id: dress._id,
                key: size,
                chosenDate: chosenDate.date
            }).unwrap();

            Swal.fire({
                title: "Success!",
                text: `You have successfully taken the dress: ${dress.name}`,
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate("/catalogm"); // Redirect to the catalog after confirmation
            });
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err?.data?.message || "Failed to take the dress. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            }).then(() => {
                navigate("/catalogm"); // Redirect to the catalog after confirmation
            });
        }
    };

    return (
             <div dir='rtl' style={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        height: '100vh', // Full viewport height
                    }}>
                        <Card id="cardid" className="pickDate fullHeightCard" style={{ width: '70%', height: '550px', marginTop: '5px', backgroundColor: '#646464' }}>
            <h1>סיכום הזמנה</h1>
            <p>שם לקוח: {isLoading ? "Loading..." : error ? "Error loading user" : user?.name}</p>
            <p>דגם: {dress.name}</p>
            <p>תאריך: {chosenDate.toString()}</p>
            <p>מידה: {size}</p>
            <Button 
                label="קח שמלה"
                onClick={handleTakeDress}
                className="successButton"
            />
            {/* כפתור חזור לעמוד קודם */}
            <Button
                label="חזור לעמוד קודם"
                onClick={() => navigate(-1)} // שימוש ב-Navigate כדי לחזור לעמוד הקודם
                className="p-button-secondary mt-2"
                style={{ marginRight: '10px' }}
            />
            </Card>
        </div>
    );
};

export default Renting;
