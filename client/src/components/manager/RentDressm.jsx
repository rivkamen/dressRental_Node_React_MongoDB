
import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { useLocation, useNavigate } from 'react-router';
import "react-jewish-datepicker/dist/index.css";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import { dontSelectShabatAndHolidays } from "jewish-dates-core";
import { useAvailableDressMutation } from "../../app/dressApiSlice";
import './RentDressm.css';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Image } from 'primereact/image';

const RentDressm = (props) => {
    const [date, setDate] = useState(new Date()); 
    const [basicJewishDay, setBasicJewishDay] = useState(date);
    const [availableDresses, setAvailableDresses] = useState([]);
    const [availableDressFunc, { isError, error }] = useAvailableDressMutation();
    const location = useLocation();
    const { state } = location;
    const dress = state ? state.dress : null;
    console.log("dress!!");
    console.log(dress);
    
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    // Get current date
    const currentDate = new Date();

    // Custom canSelect logic: Exclude dates before today
    const customCanSelect = (date) => {
        // Don't select Shabbat, holidays, and dates before today

        
        return dontSelectShabatAndHolidays()(date) && date.date >= currentDate;
    };

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
                <Image
                    className="dress-gallery-image"
                    src={imageUrl}
                    alt={dress.name}
                    style={{
                        maxHeight: '550px',    
                        maxWidth: '100%',
                        objectFit: 'contain',
                        padding: '2px',
                    }}
                    width="100%"  preview/>
            </div>
        );
    };

    return (

        <>  <div dir='rtl'>        <Button rounded
        icon="pi pi-arrow-right"
title='חזור'
        onClick={() => navigate('/catalogm')}
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
        <div       style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            // alignItems: 'center', // Center vertically
            height: '94vh', // Full viewport height
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
            <Image
                className="dress-image"
                src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
                alt={dress.name}
                style={{
                    maxHeight: '550px',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    padding: '5px',
                    display: 'block',
                    margin: '0 auto',
                }}
                width="100%"  preview />
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
                {availableDresses.map((dress, index) => (
                    <div
                        key={dress.key}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Button
                            className="sizeBut"
                            label={`${dress.key} - ${dress.size=="girls"?"בנות":"נשים"}`}
                            onClick={() => handleRentClick(dress.key)}
                            style={{ minWidth: '50px',minHeight: '50px', marginRight: '10px' }}
                            rounded
                        />
                        {availableDresses[index].availableDresses < 3 && (
                            <span style={{ fontSize: '14px', color: 'white' }}>
                               &nbsp; (נשארו {availableDresses[index].availableDresses})
                     
                            </span>
                        )}
                    </div>
                ))}
            </div>
            </>
        )}
    </div>
</div>
            {isError && <p>Error fetching available dresses: {error?.message}</p>}

             
        </Card>
        </div></>
    );
};

export default RentDressm;
