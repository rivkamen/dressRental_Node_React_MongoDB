
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Swal from 'sweetalert2';
import { useCreateUserMutation, useGetUserByPhoneQuery } from '../../app/userApiSlice';
import './RentPage.css'
const RentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dress, chosenDate, size } = location.state;
    const [phoneSubmitted, setPhoneSubmitted] = useState(false);
    const [phone, setPhone] = useState('');
    const [existingUser, setExistingUser] = useState(null);

    const [createUserFunc] = useCreateUserMutation();
    const { data: user, error, isLoading } = useGetUserByPhoneQuery(phone, { skip: !phoneSubmitted });
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleDisabledClick = () => {
        Swal.fire({
            icon: 'info',
            title: 'כפתור לא זמין',
            text: 'עליך למלא את השדה לפני שתוכל להמשיך.',
        });
    };
    
    // Formik for user creation
    const formik = useFormik({
        initialValues: { name: '', phone: '', email: '' },
        validateOnBlur: false, // Disable validation on blur
        validateOnChange: false, // Disable validation on change
        validate: (data) => {
            let errors = {};
            if (!data.name) errors.name = 'Name is required';
            if (!data.phone) errors.phone = 'Phone number is required';
            return errors;
        },
        onSubmit: async (data) => {
            try {
                const createdUser = await createUserFunc(data).unwrap();
                navigate('/renting', { state: { userId: createdUser.userId, dress, chosenDate, size } });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to create user. Please try again.',
                });
                console.error('Error creating user:', error);
            }
        }
    });

    // Handle phone number submission
    const handlePhoneSubmit = () => {
        if (!formik.values.phone) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please enter a phone number.',
            });
            return;
        }
        setPhone(formik.values.phone);
        setPhoneSubmitted(true);
    };

    // Check if user was found in the query response
    useEffect(() => {
        if (user) {
            setExistingUser(user); // Found user
            setPhoneSubmitted(false); // Reset submission state
        } else if (!isLoading && phoneSubmitted && error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while searching for the phone number.',
            });
            setPhoneSubmitted(false); // Reset submission state on error
        }
    }, [user, isLoading, error, phoneSubmitted]);

    // Proceed with existing user
    const handleProceedWithUser = () => {
        
        if (existingUser?._id) {
            navigate('/renting', { state: { userId: existingUser._id, dress, chosenDate, size } });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User information is incomplete. Please try again.',
            });
            console.error('User ID is missing in existing user object:', existingUser);
        }
    };

    return (
        <div>
            {!phoneSubmitted && !existingUser && (
                <div >   
<br />
                <br />
                <br />
                    <h2 style={{color:'white'}}>הכנס מספר טלפון</h2>
                    <div className="p-field">
                        <InputText
                        style={{border:'1px solid rgb(213, 1, 118)'}}
                            dir="rtl"
                            id="phone"
                            value={formik.values.phone}
                            placeholder="מספר טלפון"
                            onChange={formik.handleChange}
                            className={classNames({ 'p-invalid': formik.errors.phone })}
                        />
                    </div>
                    <Button className='phoneButton'
                        label="חפש משתמש"
                        onClick={!formik.values.phone ? handleDisabledClick : handlePhoneSubmit}
title='לחץ לאישור'
                        // onClick={handlePhoneSubmit}
                        disabled={!formik.values.phone}// Enable button only if phone field has a value
                    /></div>
            )}

            {existingUser && (
                <div dir="rtl">
                    <h2>משתמש קיים</h2>
                    <p>שם: {existingUser.name}</p>
                    <p>טלפון: {existingUser.phone}</p>
                    <p>Email: {existingUser.email}</p>
                    <Button title='לחץ לאישור' label="Proceed with this User" onClick={handleProceedWithUser} />
                </div>
            )}

            {phoneSubmitted && !existingUser && (
                <div style={{ alignItems: 'center' }}>
                    <br />
                    <br />
                    <br />
                    <h2>משתמש חדש</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-field">
                            <InputText
                                dir="rtl"
                                id="name"
                                placeholder="שם מלא"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': formik.errors.name })}
                            />
                            <br />
                            {/* Error message shown only on button click (form submit) */}
                            {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
                        </div>

                        <div className="p-field">
                            <InputText
                                dir="rtl"
                                id="email"
                                placeholder="כתובת מייל (אופציונלי)"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': formik.errors.email })}
                            />
                            {formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
                        </div>

                        <Button title='לחץ לאישור' type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            )}
        </div>
    );
};

export default RentPage;
