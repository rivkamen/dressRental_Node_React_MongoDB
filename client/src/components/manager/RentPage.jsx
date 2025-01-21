
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Swal from 'sweetalert2';
import { useCreateUserMutation, useGetUserByPhoneQuery } from '../../app/userApiSlice';
import './RentPage.css';
import { Card } from 'primereact/card';

const RentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dress, chosenDate, size } = location.state;
    const [phoneSubmitted, setPhoneSubmitted] = useState(false);
    const [phone, setPhone] = useState('');
    const [existingUser, setExistingUser] = useState(null);

    const [createUserFunc] = useCreateUserMutation();
    const { data: user, error, isLoading,isUninitialized,  refetch} = useGetUserByPhoneQuery(phone, { skip: !phoneSubmitted });

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
    const handleGoBackToPhoneInput = () => {
   
        formik.setValues({ name: '', phone: '', email: '' });
        setExistingUser(null);     
        setPhoneSubmitted(false); 
        setPhone('');
        navigate('/rentPage', { state: { dress, chosenDate, size,phone:'' } });
    };
    const formik = useFormik({
        initialValues: { name: '', phone: '', email: '' },
        validateOnBlur: false,
        validateOnChange: false,
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

   
    useEffect(() => {
        
        if (user) {
            // אם נמצא משתמש
            setExistingUser(user); 
            setPhoneSubmitted(false); // לא צריך לשמור את מצב הטלפון לאחר שמצאנו משתמש
        } else if (phoneSubmitted && !isLoading) {
            // טיפול במקרה בו לא נמצא המשתמש
            if (error?.status === 401 && error?.data?.message === "not found") {
                // לא נמצא, נמשיך למילוי פרטי משתמש
                setExistingUser(null); 
                console.log("User not found, proceed to create new user form");
            } else if (error) {
                // אם יש שגיאה אחרת
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `An error occurred while searching for the phone number. ${error.message || ""}`,
                });
                setPhoneSubmitted(false);
            }
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

    // Handle going back from existing user
    const handleGoBack = () => {
        setExistingUser(null);
        setPhoneSubmitted(false);
        setPhone('');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            height: '100vh', // Full viewport height
        }}>
            <Card id="cardid" className="pickDate fullHeightCard" style={{ width: '70%', height: '550px', marginTop: '5px', backgroundColor: '#646464' }}>
                <div >
      
{!phoneSubmitted && !existingUser && (
  
<div >

        <br />
        <br />
        <br />
        <h2 style={{ color: 'white' }}>הכנס מספר טלפון</h2>
      
<div className="p-field">
    <InputText
        style={{ border: '1px solid rgb(213, 1, 118)' }}
        dir="rtl"
        id="phone"
        value={formik.values.phone}
        placeholder="מספר טלפון"
        onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, ''); // מסנן תווים שאינם מספרים
            formik.setFieldValue('phone', e.target.value); // מעדכן את הערך ב-Formik
        }}
        onChange={formik.handleChange}
        className={classNames({ 'p-invalid': formik.errors.phone })}
    />
    <div ><br/>
        <Button
            icon="pi pi-arrow-circle-left"
title='חזור'
            onClick={() => navigate('/catalogm')}
            style={{
                backgroundColor:'rgba(83, 81, 81, 0.9)',
                paddingLeft:'20px',
                paddingRight:'20px',

                // backgroundColor:'#646464',
                borderColor:'rgb(213, 1, 118)',
                color:'rgb(213, 1, 118)',
                margin:'2.5px',
                
                      }}
        />
        <Button
            className="phoneButton"
            label="חפש משתמש"
            onClick={!formik.values.phone ? handleDisabledClick : handlePhoneSubmit}
            title="לחץ לאישור"
            disabled={!formik.values.phone}
            style={{
                margin:'2.5px',

                      }}
        />
    </div>
</div>
</div>
)}
                    {existingUser && (
                        <div dir="rtl" >
                            <br />
                            <br />
                            <br />
                            
                            <h2 style={{color:'white'}}>משתמש קיים</h2>                     
                            <div className="align-right">
                            <p>שם: {existingUser.name}</p>
                            <p>טלפון: {existingUser.phone}</p>
                            <p>מייל: {existingUser.email}</p>
                            </div>
                            <Button className='useButton' label='המשך' title="המשך עם משתמש זה" onClick={handleProceedWithUser} />
                            {/* <Button className='useReturnButton'            icon="pi pi-arrow-circle-left"
title='חזור' onClick={handleGoBackToPhoneInput} style={{ marginTop: '10px' }} /> */}
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

                                <Button
            icon="pi pi-arrow-circle-left"
title='חזור'
            onClick={handleGoBackToPhoneInput}
            style={{
                backgroundColor:'rgba(83, 81, 81, 0.9)',
                paddingLeft:'20px',
                paddingRight:'20px',

                // backgroundColor:'#646464',
                borderColor:'rgb(213, 1, 118)',
                color:'rgb(213, 1, 118)',
                margin:'2.5px',
                
                      }}
        />                                <Button title='לחץ לאישור' type="submit" label="המשך" className="mt-2" />

                            </form>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default RentPage;
