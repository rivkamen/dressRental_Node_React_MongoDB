

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
                title: "!הצלחה",
                text: `לקיחת שמלה הסתיימה בהצלחה`,
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
                         <div dir='rtl'>        <Button rounded
        icon="pi pi-arrow-right"
title='חזור'
        onClick={() => navigate(-1)}
        style={{
            position: 'fixed', // Fixes the button's position
            top: '60px',       // Adjust the top distance
            right: '10px',     // Adjust the right distance
            backgroundColor: 'rgb(65, 62, 64)',
            paddingLeft: '20px',
            paddingRight: '20px',
            borderColor: 'rgb(213, 1, 118)',
            color: 'rgb(213, 1, 118)',
            zIndex: 1000,      // Ensures the button stays above other elements
        }}
    />
              </div>
                        <Card id="cardid" className="pickDate fullHeightCard" style={{ width: '70%', height: '550px', marginTop: '5px', backgroundColor: '#646464' }}>
                            <br/>
                            <br/>
                            {console.log(chosenDate)
                            }
            <h1>סיכום הזמנה</h1>
            <p>שם לקוח: {isLoading ? "Loading..." : error ? "Error loading user" : user?.name}</p>
            <p>דגם: {dress.name}</p>
            <p>תאריך: {`${chosenDate.jewishDateStrHebrew.toString()} (${chosenDate.date.getFullYear()} / ${chosenDate.date.getMonth()+1} / ${chosenDate.date.getDate()})`}</p>

            <p>מידה: {size}</p>
            <Button 
                label="קח שמלה"
                onClick={handleTakeDress}
                className="successButton"
            />
            {/* כפתור חזור לעמוד קודם */}
      
            </Card>
        </div>
    );
};

export default Renting;
