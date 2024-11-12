
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useCreateUserMutation, useGetUserByPhoneQuery } from '../../app/userApiSlice';

const RentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dress, chosenDate, size } = location.state;
    const [phoneSubmitted, setPhoneSubmitted] = useState(false);
    const [phone, setPhone] = useState('');
    const [existingUser, setExistingUser] = useState(null);

    const [createUserFunc] = useCreateUserMutation();
    const { data: user, error, isLoading } = useGetUserByPhoneQuery(phone, { skip: !phoneSubmitted });

    // Formik for user creation
    const formik = useFormik({
        initialValues: { name: '', phone: '', email: '' },
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
                console.error('Error creating user:', error);
            }
        }
    });

    // Handle phone number submission
    const handlePhoneSubmit = () => {
        setPhone(formik.values.phone);
        setPhoneSubmitted(true);
    };

    // Check if user was found in the query response
    useEffect(() => {
        if (user) {
            setExistingUser(user);
        } else if (phoneSubmitted && !isLoading && !user && !error) {
            setPhoneSubmitted(false);
        }
    }, [user, isLoading, error, phoneSubmitted]);

    // Proceed with existing user
    const handleProceedWithUser = () => {
        if (existingUser?._id) {
            console.log('Navigating with user:', existingUser);
            navigate('/renting', { state: { userId: existingUser._id, dress, chosenDate, size } });
            // navigate(`/renting?userId=${existingUser.userId}&dress=${dress}&date=${chosenDate}&size=${size}`);

        } else {
            console.error('User ID is missing in existing user object:', existingUser);
        }
    };

    return (
        <div>
            {/* <h1>Rent Dress</h1>
            <p>Dress: {dress.name}</p>
            <p>Date: {chosenDate.toString()}</p>
            <p>Size: {size}</p> */}

            {!phoneSubmitted && !existingUser && (
                <div>
                    <h2>הכנס מספר טלפון</h2>
                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className={classNames({ 'p-invalid': formik.errors.phone })}
                        />
                    </div>
                    <Button label="Check Phone" onClick={handlePhoneSubmit} />
                </div>
            )}

            {existingUser && (
                <div dir='rtl'>
                    <h2>משתמש קיים</h2>
                    <p>שם: {existingUser.name}</p>
                    <p>טלפון: {existingUser.phone}</p>
                    <p>Email: {existingUser.email}</p>
                    <Button label="Proceed with this User" onClick={handleProceedWithUser} />
                </div>
            )}

            {phoneSubmitted && !existingUser && (
                <div className="card">
                    <h2>משתמש חדש</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="name">שם מלא</label>
                            <InputText
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': formik.errors.name })}
                            />
                            {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="email">כתובת מייל (אופציונלי)</label>
                            <InputText
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': formik.errors.email })}
                            />
                            {formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            )}
        </div>
    );
};

export default RentPage;
