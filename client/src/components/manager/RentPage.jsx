
// // // // // // // import React from 'react';
// // // // // // // import { useLocation } from 'react-router';
// // // // // // // import { useFormik } from 'formik';
// // // // // // // import { InputText } from 'primereact/inputtext';
// // // // // // // import { Button } from 'primereact/button';
// // // // // // // import { classNames } from 'primereact/utils';
// // // // // // // import { useCreateUserMutation } from '../../app/userApiSlice';

// // // // // // // const RentPage = () => {
// // // // // // //     const location = useLocation();
// // // // // // //     const { dress, chosenDate, size } = location.state;  // Retrieve props
// // // // // // //     const [createUserFunc, { isError, error, isSuccess }] = useCreateUserMutation();

// // // // // // //     // Formik for managing form state and validation
// // // // // // //     const formik = useFormik({
// // // // // // //         initialValues: {
// // // // // // //             name: '',
// // // // // // //             phone: '',
// // // // // // //             email: ''
// // // // // // //         },
// // // // // // //         validate: (data) => {
// // // // // // //             let errors = {};

// // // // // // //             if (!data.name) {
// // // // // // //                 errors.name = 'Name is required';
// // // // // // //             }
// // // // // // //             if (!data.phone) {
// // // // // // //                 errors.phone = 'Phone number is required';
// // // // // // //             } else if (!/^\d{10}$/.test(data.phone)) {
// // // // // // //                 errors.phone = 'Phone number must be 10 digits';
// // // // // // //             }
// // // // // // //             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
// // // // // // //                 errors.email = 'Invalid email address';
// // // // // // //             }

// // // // // // //             return errors;
// // // // // // //         },
// // // // // // //         onSubmit: async (data) => {
// // // // // // //             try {
// // // // // // //                 await createUserFunc({ ...data });  // Call API to create user
// // // // // // //                 formik.resetForm();  // Reset form on successful submission
// // // // // // //             } catch (error) {
// // // // // // //                 console.error('Error creating user:', error);
// // // // // // //             }
// // // // // // //         }
// // // // // // //     });

// // // // // // //     // Helper to conditionally apply 'p-invalid' class for validation errors
// // // // // // //     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// // // // // // //     const getFormErrorMessage = (name) => {
// // // // // // //         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div>
// // // // // // //             <h1>Rent Dress</h1>
// // // // // // //             <p>Dress: {dress.name}</p>
// // // // // // //             <p>Date: {chosenDate.toString()}</p>
// // // // // // //             <p>Size: {size}</p>

// // // // // // //             {/* User Form */}
// // // // // // //             <div className="card">
// // // // // // //                 <h2>Create User</h2>
// // // // // // //                 <form onSubmit={formik.handleSubmit}>
// // // // // // //                     <div className="p-field">
// // // // // // //                         <label htmlFor="name">Name</label>
// // // // // // //                         <InputText
// // // // // // //                             id="name"
// // // // // // //                             value={formik.values.name}
// // // // // // //                             onChange={formik.handleChange}
// // // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('name') })}
// // // // // // //                         />
// // // // // // //                         {getFormErrorMessage('name')}
// // // // // // //                     </div>

// // // // // // //                     <div className="p-field">
// // // // // // //                         <label htmlFor="phone">Phone</label>
// // // // // // //                         <InputText
// // // // // // //                             id="phone"
// // // // // // //                             value={formik.values.phone}
// // // // // // //                             onChange={formik.handleChange}
// // // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
// // // // // // //                         />
// // // // // // //                         {getFormErrorMessage('phone')}
// // // // // // //                     </div>

// // // // // // //                     <div className="p-field">
// // // // // // //                         <label htmlFor="email">Email (Optional)</label>
// // // // // // //                         <InputText
// // // // // // //                             id="email"
// // // // // // //                             value={formik.values.email}
// // // // // // //                             onChange={formik.handleChange}
// // // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('email') })}
// // // // // // //                         />
// // // // // // //                         {getFormErrorMessage('email')}
// // // // // // //                     </div>

// // // // // // //                     <Button type="submit" label="Submit" className="mt-2" />
// // // // // // //                 </form>

// // // // // // //                 {isSuccess && <p>User created successfully!</p>}
// // // // // // //                 {isError && <p>Error creating user: {error.message}</p>}
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default RentPage;
// // // // // // import React from 'react';
// // // // // // import { useLocation, useNavigate } from 'react-router';
// // // // // // import { useFormik } from 'formik';
// // // // // // import { InputText } from 'primereact/inputtext';
// // // // // // import { Button } from 'primereact/button';
// // // // // // import { classNames } from 'primereact/utils';
// // // // // // import { useCreateUserMutation } from '../../app/userApiSlice';
// // // // // // // import {use}
// // // // // // const RentPage = () => {
// // // // // //     const location = useLocation();
// // // // // //     const navigate = useNavigate();  // Initialize the useNavigate hook
// // // // // //     const { dress, chosenDate, size } = location.state;  // Retrieve props
// // // // // //     const [createUserFunc, { data: user, isError, error, isSuccess }] = useCreateUserMutation();

// // // // // //     // Formik for managing form state and validation
// // // // // //     const formik = useFormik({
// // // // // //         initialValues: {
// // // // // //             name: '',
// // // // // //             phone: '',
// // // // // //             email: ''
// // // // // //         },
// // // // // //         validate: (data) => {
// // // // // //             let errors = {};

// // // // // //             if (!data.name) {
// // // // // //                 errors.name = 'Name is required';
// // // // // //             }
// // // // // //             if (!data.phone) {
// // // // // //                 errors.phone = 'Phone number is required';
// // // // // //             } else if (!/^\d{10}$/.test(data.phone)) {
// // // // // //                 errors.phone = 'Phone number must be 10 digits';
// // // // // //             }
// // // // // //             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
// // // // // //                 errors.email = 'Invalid email address';
// // // // // //             }

// // // // // //             return errors;
// // // // // //         },
// // // // // //         onSubmit: async (data) => {
// // // // // //             try {
// // // // // //                 // const isUser=await 
// // // // // //                 const createdUser = await createUserFunc({ ...data }).unwrap();  // Call API to create user
// // // // // // console.log("id");
// // // // // // console.log(createdUser);


// // // // // //                 // Navigate to the next component upon success
// // // // // //                 navigate('/renting', {
// // // // // //                     state: { userId: createdUser.userId, dress, chosenDate, size }
// // // // // //                 });
// // // // // //             } catch (error) {
// // // // // //                 console.error('Error creating user:', error);
// // // // // //             }
// // // // // //         }
// // // // // //     });

// // // // // //     // Helper to conditionally apply 'p-invalid' class for validation errors
// // // // // //     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// // // // // //     const getFormErrorMessage = (name) => {
// // // // // //         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// // // // // //     };

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <h1>Rent Dress</h1>
// // // // // //             <p>Dress: {dress.name}</p>
// // // // // //             <p>Date: {chosenDate.toString()}</p>
// // // // // //             <p>Size: {size}</p>

// // // // // //             {/* User Form */}
// // // // // //             <div className="card">
// // // // // //                 <h2>Create User</h2>
// // // // // //                 <form onSubmit={formik.handleSubmit}>
// // // // // //                     <div className="p-field">
// // // // // //                         <label htmlFor="name">Name</label>
// // // // // //                         <InputText
// // // // // //                             id="name"
// // // // // //                             value={formik.values.name}
// // // // // //                             onChange={formik.handleChange}
// // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('name') })}
// // // // // //                         />
// // // // // //                         {getFormErrorMessage('name')}
// // // // // //                     </div>

// // // // // //                     <div className="p-field">
// // // // // //                         <label htmlFor="phone">Phone</label>
// // // // // //                         <InputText
// // // // // //                             id="phone"
// // // // // //                             value={formik.values.phone}
// // // // // //                             onChange={formik.handleChange}
// // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
// // // // // //                         />
// // // // // //                         {getFormErrorMessage('phone')}
// // // // // //                     </div>

// // // // // //                     <div className="p-field">
// // // // // //                         <label htmlFor="email">Email (Optional)</label>
// // // // // //                         <InputText
// // // // // //                             id="email"
// // // // // //                             value={formik.values.email}
// // // // // //                             onChange={formik.handleChange}
// // // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('email') })}
// // // // // //                         />
// // // // // //                         {getFormErrorMessage('email')}
// // // // // //                     </div>

// // // // // //                     <Button type="submit" label="Submit" className="mt-2" />
// // // // // //                 </form>

// // // // // //                 {isSuccess && <p>User created successfully!</p>}
// // // // // //                 {isError && <p>Error creating user: {error.message}</p>}
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default RentPage;
// // // // // import React from 'react';
// // // // // import { useLocation, useNavigate } from 'react-router';
// // // // // import { useFormik } from 'formik';
// // // // // import { InputText } from 'primereact/inputtext';
// // // // // import { Button } from 'primereact/button';
// // // // // import { classNames } from 'primereact/utils';
// // // // // import { useCreateUserMutation, useGetUsersQuery } from '../../app/userApiSlice';

// // // // // const RentPage = () => {
// // // // //     const location = useLocation();
// // // // //     const navigate = useNavigate();
// // // // //     const { dress, chosenDate, size } = location.state;
// // // // //     const [createUserFunc, { isError, error, isSuccess }] = useCreateUserMutation();
// // // // //     const { data: users } = useGetUsersQuery();

// // // // //     const formik = useFormik({
// // // // //         initialValues: {
// // // // //             name: '',
// // // // //             phone: '',
// // // // //             email: ''
// // // // //         },
// // // // //         validate: (data) => {
// // // // //             let errors = {};

// // // // //             if (!data.name) {
// // // // //                 errors.name = 'Name is required';
// // // // //             }
// // // // //             if (!data.phone) {
// // // // //                 errors.phone = 'Phone number is required';
// // // // //             } else if (!/^\d{10}$/.test(data.phone)) {
// // // // //                 errors.phone = 'Phone number must be 10 digits';
// // // // //             }
// // // // //             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
// // // // //                 errors.email = 'Invalid email address';
// // // // //             }

// // // // //             return errors;
// // // // //         },
// // // // //         onSubmit: async (data) => {
// // // // //             try {
// // // // //                 // Check if user already exists by phone or email
// // // // //                 const existingUser = users.find(
// // // // //                     (user) => user.phone === data.phone || (data.email && user.email === data.email)
// // // // //                 );

// // // // //                 if (existingUser) {
// // // // //                     // If user exists, navigate with existing user ID
// // // // //                     navigate('/renting', {
// // // // //                         state: { userId: existingUser.userId, dress, chosenDate, size }
// // // // //                     });
// // // // //                 } else {
// // // // //                     // If user doesn't exist, create a new user
// // // // //                     const createdUser = await createUserFunc(data).unwrap();
// // // // //                     navigate('/renting', {
// // // // //                         state: { userId: createdUser.userId, dress, chosenDate, size }
// // // // //                     });
// // // // //                 }
// // // // //             } catch (error) {
// // // // //                 console.error('Error creating user:', error);
// // // // //             }
// // // // //         }
// // // // //     });

// // // // //     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// // // // //     const getFormErrorMessage = (name) => {
// // // // //         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// // // // //     };

// // // // //     return (
// // // // //         <div>
// // // // //             <h1>Rent Dress</h1>
// // // // //             <p>Dress: {dress.name}</p>
// // // // //             <p>Date: {chosenDate.toString()}</p>
// // // // //             <p>Size: {size}</p>

// // // // //             <div className="card">
// // // // //                 <h2>Create User</h2>
// // // // //                 <form onSubmit={formik.handleSubmit}>
// // // // //                     <div className="p-field">
// // // // //                         <label htmlFor="name">Name</label>
// // // // //                         <InputText
// // // // //                             id="name"
// // // // //                             value={formik.values.name}
// // // // //                             onChange={formik.handleChange}
// // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('name') })}
// // // // //                         />
// // // // //                         {getFormErrorMessage('name')}
// // // // //                     </div>

// // // // //                     <div className="p-field">
// // // // //                         <label htmlFor="phone">Phone</label>
// // // // //                         <InputText
// // // // //                             id="phone"
// // // // //                             value={formik.values.phone}
// // // // //                             onChange={formik.handleChange}
// // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
// // // // //                         />
// // // // //                         {getFormErrorMessage('phone')}
// // // // //                     </div>

// // // // //                     <div className="p-field">
// // // // //                         <label htmlFor="email">Email (Optional)</label>
// // // // //                         <InputText
// // // // //                             id="email"
// // // // //                             value={formik.values.email}
// // // // //                             onChange={formik.handleChange}
// // // // //                             className={classNames({ 'p-invalid': isFormFieldValid('email') })}
// // // // //                         />
// // // // //                         {getFormErrorMessage('email')}
// // // // //                     </div>

// // // // //                     <Button type="submit" label="Submit" className="mt-2" />
// // // // //                 </form>

// // // // //                 {isSuccess && <p>User created successfully!</p>}
// // // // //                 {isError && <p>Error creating user: {error.message}</p>}
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default RentPage;
// // // // import React, { useState } from 'react';
// // // // import { useLocation, useNavigate } from 'react-router';
// // // // import { useFormik } from 'formik';
// // // // import { InputText } from 'primereact/inputtext';
// // // // import { Button } from 'primereact/button';
// // // // import { classNames } from 'primereact/utils';
// // // // import { useCreateUserMutation, useGetUsersQuery } from '../../app/userApiSlice';

// // // // const RentPage = () => {
// // // //     const location = useLocation();
// // // //     const navigate = useNavigate();
// // // //     const { dress, chosenDate, size } = location.state;
// // // //     const { data: users } = useGetUsersQuery(); // Fetch all users
// // // //     const [createUserFunc, { isError, error, isSuccess }] = useCreateUserMutation();
// // // //     const [existingUser, setExistingUser] = useState(null); // Holds existing user data if found
// // // //     const [showFullForm, setShowFullForm] = useState(false); // Controls form display

// // // //     // Formik for form management and validation
// // // //     const formik = useFormik({
// // // //         initialValues: {
// // // //             name: '',
// // // //             phone: '',
// // // //             email: ''
// // // //         },
// // // //         validate: (data) => {
// // // //             let errors = {};
// // // //             if (!data.phone) {
// // // //                 errors.phone = 'Phone number is required';
// // // //             } else if (!/^\d{10}$/.test(data.phone)) {
// // // //                 errors.phone = 'Phone number must be 10 digits';
// // // //             }
// // // //             if (!existingUser && !data.name) {
// // // //                 errors.name = 'Name is required';
// // // //             }
// // // //             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
// // // //                 errors.email = 'Invalid email address';
// // // //             }
// // // //             return errors;
// // // //         },
// // // //         onSubmit: async (data) => {
// // // //             try {
// // // //                 if (existingUser) {
// // // //                     // If user already exists, navigate to renting page with their ID
// // // //                     navigate('/renting', {
// // // //                         state: { userId: existingUser.userId, dress, chosenDate, size }
// // // //                     });
// // // //                 } else {
// // // //                     // Create new user if no existing user found
// // // //                     const createdUser = await createUserFunc(data).unwrap();
// // // //                     navigate('/renting', {
// // // //                         state: { userId: createdUser.userId, dress, chosenDate, size }
// // // //                     });
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error('Error creating user:', error);
// // // //             }
// // // //         }
// // // //     });

// // // //     // Check if user exists by phone number
// // // //     const handlePhoneBlur = () => {
// // // //         const foundUser = users?.find((user) => user.phone === formik.values.phone);
// // // //         if (foundUser) {
// // // //             setExistingUser(foundUser);
// // // //             setShowFullForm(false); // Skip to proceed button for existing user
// // // //         } else {
// // // //             setShowFullForm(true); // Show form to create a new user
// // // //             setExistingUser(null);
// // // //         }
// // // //     };

// // // //     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// // // //     const getFormErrorMessage = (name) => {
// // // //         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <h1>Rent Dress</h1>
// // // //             <p>Dress: {dress.name}</p>
// // // //             <p>Date: {chosenDate.toString()}</p>
// // // //             <p>Size: {size}</p>

// // // //             <div className="card">
// // // //                 <h2>Enter Phone Number</h2>
// // // //                 <form onSubmit={formik.handleSubmit}>
// // // //                     <div className="p-field">
// // // //                         <label htmlFor="phone">Phone</label>
// // // //                         <InputText
// // // //                             id="phone"
// // // //                             value={formik.values.phone}
// // // //                             onChange={formik.handleChange}
// // // //                             onBlur={handlePhoneBlur} // Check for user existence on blur
// // // //                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
// // // //                         />
// // // //                         {getFormErrorMessage('phone')}
// // // //                     </div>

// // // //                     {/* Display either existing user info or full form for new user */}
// // // //                     {existingUser ? (
// // // //                         <div>
// // // //                             <p>Name: {existingUser.name}</p>
// // // //                             <p>Email: {existingUser.email}</p>
// // // //                             <Button type="submit" label="Proceed with Existing User" className="mt-2" />
// // // //                         </div>
// // // //                     ) : showFullForm && (
// // // //                         <>
// // // //                             <div className="p-field">
// // // //                                 <label htmlFor="name">Name</label>
// // // //                                 <InputText
// // // //                                     id="name"
// // // //                                     value={formik.values.name}
// // // //                                     onChange={formik.handleChange}
// // // //                                     className={classNames({ 'p-invalid': isFormFieldValid('name') })}
// // // //                                 />
// // // //                                 {getFormErrorMessage('name')}
// // // //                             </div>

// // // //                             <div className="p-field">
// // // //                                 <label htmlFor="email">Email (Optional)</label>
// // // //                                 <InputText
// // // //                                     id="email"
// // // //                                     value={formik.values.email}
// // // //                                     onChange={formik.handleChange}
// // // //                                     className={classNames({ 'p-invalid': isFormFieldValid('email') })}
// // // //                                 />
// // // //                                 {getFormErrorMessage('email')}
// // // //                             </div>

// // // //                             <Button type="submit" label="Submit" className="mt-2" />
// // // //                         </>
// // // //                     )}
// // // //                 </form>

// // // //                 {isSuccess && <p>User created successfully!</p>}
// // // //                 {isError && <p>Error creating user: {error.message}</p>}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default RentPage;
// // // import React, { useState } from 'react';
// // // import { useLocation, useNavigate } from 'react-router';
// // // import { useFormik } from 'formik';
// // // import { InputText } from 'primereact/inputtext';
// // // import { Dropdown } from 'primereact/dropdown';
// // // import { Button } from 'primereact/button';
// // // import { classNames } from 'primereact/utils';
// // // import { useCreateUserMutation, useGetUsersQuery } from '../../app/userApiSlice';

// // // const RentPage = () => {
// // //     const location = useLocation();
// // //     const navigate = useNavigate();
// // //     const { dress, chosenDate, size } = location.state;
// // //     const { data: users } = useGetUsersQuery(); // Fetch all users
// // //     const [createUserFunc, { isError, error, isSuccess }] = useCreateUserMutation();
// // //     const [matchingUsers, setMatchingUsers] = useState([]); // Holds users matching phone number
// // //     const [selectedUser, setSelectedUser] = useState(null); // Holds selected user if multiple found
// // //     const [showFullForm, setShowFullForm] = useState(false); // Controls form display

// // //     // Formik for form management and validation
// // //     const formik = useFormik({
// // //         initialValues: {
// // //             name: '',
// // //             phone: '',
// // //             email: ''
// // //         },
// // //         validate: (data) => {
// // //             let errors = {};
// // //             if (!data.phone) {
// // //                 errors.phone = 'Phone number is required';
// // //             } else if (!/^\d{10}$/.test(data.phone)) {
// // //                 errors.phone = 'Phone number must be 10 digits';
// // //             }
// // //             if (!selectedUser && !data.name) {
// // //                 errors.name = 'Name is required';
// // //             }
// // //             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
// // //                 errors.email = 'Invalid email address';
// // //             }
// // //             return errors;
// // //         },
// // //         onSubmit: async (data) => {
// // //             try {
// // //                 if (selectedUser) {
// // //                     // If a user is selected, navigate to the renting page with their ID
// // //                     navigate('/renting', {
// // //                         state: { userId: selectedUser.userId, dress, chosenDate, size }
// // //                     });
// // //                 } else {
// // //                     // Create a new user if no user was selected
// // //                     const createdUser = await createUserFunc(data).unwrap();
// // //                     navigate('/renting', {
// // //                         state: { userId: createdUser.userId, dress, chosenDate, size }
// // //                     });
// // //                 }
// // //             } catch (error) {
// // //                 console.error('Error creating user:', error);
// // //             }
// // //         }
// // //     });

// // //     // Handle phone number entry to find matching users
// // //     const handlePhoneBlur = () => {
// // //         const foundUsers = users?.filter((user) => user.phone === formik.values.phone);
// // //         if (foundUsers.length === 1) {
// // //             setSelectedUser(foundUsers[0]); // Directly select if only one match
// // //             setShowFullForm(false);
// // //         } else if (foundUsers.length > 1) {
// // //             setMatchingUsers(foundUsers); // Show dropdown if multiple matches
// // //             setSelectedUser(null);
// // //             setShowFullForm(false);
// // //         } else {
// // //             setShowFullForm(true); // Show full form if no matches
// // //             setSelectedUser(null);
// // //             setMatchingUsers([]);
// // //         }
// // //     };

// // //     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
// // //     const getFormErrorMessage = (name) => {
// // //         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>Rent Dress</h1>
// // //             <p>Dress: {dress.name}</p>
// // //             <p>Date: {chosenDate.toString()}</p>
// // //             <p>Size: {size}</p>

// // //             <div className="card">
// // //                 <h2>Enter Phone Number</h2>
// // //                 <form onSubmit={formik.handleSubmit}>
// // //                     <div className="p-field">
// // //                         <label htmlFor="phone">Phone</label>
// // //                         <InputText
// // //                             id="phone"
// // //                             value={formik.values.phone}
// // //                             onChange={formik.handleChange}
// // //                             onBlur={handlePhoneBlur} // Check for user existence on blur
// // //                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
// // //                         />
// // //                         {getFormErrorMessage('phone')}
// // //                     </div>

// // //                     {/* Display dropdown for selecting matching user if multiple matches found */}
// // //                     {matchingUsers.length > 1 && (
// // //                         <div className="p-field">
// // //                             <label htmlFor="userSelect">Select User</label>
// // //                             <Dropdown
// // //                                 id="userSelect"
// // //                                 value={selectedUser}
// // //                                 options={matchingUsers}
// // //                                 onChange={(e) => setSelectedUser(e.value)}
// // //                                 optionLabel="name"
// // //                                 placeholder="Choose a user"
// // //                             />
// // //                         </div>
// // //                     )}

// // //                     {/* Show existing user info if one is selected, otherwise show full form for new user */}
// // //                     {selectedUser ? (
// // //                         <div>
// // //                             <p>Name: {selectedUser.name}</p>
// // //                             <p>Email: {selectedUser.email}</p>
// // //                             <Button type="submit" label="Proceed with Existing User" className="mt-2" />
// // //                         </div>
// // //                     ) : showFullForm && (
// // //                         <>
// // //                             <div className="p-field">
// // //                                 <label htmlFor="name">Name</label>
// // //                                 <InputText
// // //                                     id="name"
// // //                                     value={formik.values.name}
// // //                                     onChange={formik.handleChange}
// // //                                     className={classNames({ 'p-invalid': isFormFieldValid('name') })}
// // //                                 />
// // //                                 {getFormErrorMessage('name')}
// // //                             </div>

// // //                             <div className="p-field">
// // //                                 <label htmlFor="email">Email (Optional)</label>
// // //                                 <InputText
// // //                                     id="email"
// // //                                     value={formik.values.email}
// // //                                     onChange={formik.handleChange}
// // //                                     className={classNames({ 'p-invalid': isFormFieldValid('email') })}
// // //                                 />
// // //                                 {getFormErrorMessage('email')}
// // //                             </div>

// // //                             <Button type="submit" label="Submit" className="mt-2" />
// // //                         </>
// // //                     )}
// // //                 </form>

// // //                 {isSuccess && <p>User created successfully!</p>}
// // //                 {isError && <p>Error creating user: {error.message}</p>}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default RentPage;
// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router';
// // import { useFormik } from 'formik';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';
// // import { classNames } from 'primereact/utils';
// // import { useCreateUserMutation, useGetUserByPhoneQuery } from '../../app/userApiSlice';

// // const RentPage = () => {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const { dress, chosenDate, size } = location.state;
// //     const [phoneSubmitted, setPhoneSubmitted] = useState(false);
// //     const [existingUser, setExistingUser] = useState(null);

// //     const [createUserFunc] = useCreateUserMutation();
// //     const {data:user} = useGetUserByPhoneQuery();

// //     // Formik for user creation
// //     const formik = useFormik({
// //         initialValues: { name: '', phone: '', email: '' },
// //         validate: (data) => {
// //             let errors = {};
// //             if (!data.name) errors.name = 'Name is required';
// //             if (!data.phone) errors.phone = 'Phone number is required';
// //             return errors;
// //         },
// //         onSubmit: async (data) => {
// //             try {
// //                 const createdUser = await createUserFunc(data).unwrap();
// //                 navigate('/renting', { state: { userId: createdUser.userId, dress, chosenDate, size } });
// //             } catch (error) {
// //                 console.error('Error creating user:', error);
// //             }
// //         }
// //     });

// //     // Handle phone number submission
// //     const handlePhoneSubmit = async () => {
// //         try {
// //             // const user = await getUserByPhone({ phone: formik.values.phone }).unwrap();
// //             if (user) {
// //                 setExistingUser(user);
// //             } else {
// //                 setPhoneSubmitted(true); // Continue to user creation if no user is found
// //             }
// //         } catch (error) {
// //             console.error('Error fetching user by phone:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h1>Rent Dress</h1>
// //             <p>Dress: {dress.name}</p>
// //             <p>Date: {chosenDate.toString()}</p>
// //             <p>Size: {size}</p>

// //             {!phoneSubmitted && !existingUser && (
// //                 <div>
// //                     <h2>Enter Phone Number</h2>
// //                     <div className="p-field">
// //                         <label htmlFor="phone">Phone</label>
// //                         <InputText
// //                             id="phone"
// //                             value={formik.values.phone}
// //                             onChange={formik.handleChange}
// //                             className={classNames({ 'p-invalid': formik.errors.phone })}
// //                         />
// //                     </div>
// //                     <Button label="Check Phone" onClick={handlePhoneSubmit} />
// //                 </div>
// //             )}

// //             {existingUser && (
// //                 <div>
// //                     <h2>Existing User Found</h2>
// //                     <p>Name: {existingUser.name}</p>
// //                     <p>Phone: {existingUser.phone}</p>
// //                     <p>Email: {existingUser.email}</p>
// //                     <Button label="Proceed with this User" onClick={() => navigate('/renting', { state: { userId: existingUser.userId, dress, chosenDate, size } })} />
// //                 </div>
// //             )}

// //             {phoneSubmitted && !existingUser && (
// //                 <div className="card">
// //                     <h2>Create User</h2>
// //                     <form onSubmit={formik.handleSubmit}>
// //                         <div className="p-field">
// //                             <label htmlFor="name">Name</label>
// //                             <InputText
// //                                 id="name"
// //                                 value={formik.values.name}
// //                                 onChange={formik.handleChange}
// //                                 className={classNames({ 'p-invalid': formik.errors.name })}
// //                             />
// //                             {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
// //                         </div>

// //                         <div className="p-field">
// //                             <label htmlFor="email">Email (Optional)</label>
// //                             <InputText
// //                                 id="email"
// //                                 value={formik.values.email}
// //                                 onChange={formik.handleChange}
// //                                 className={classNames({ 'p-invalid': formik.errors.email })}
// //                             />
// //                             {formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
// //                         </div>

// //                         <Button type="submit" label="Submit" className="mt-2" />
// //                     </form>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default RentPage;
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import { useFormik } from 'formik';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { classNames } from 'primereact/utils';
// import { useCreateUserMutation, useGetUserByPhoneQuery } from '../../app/userApiSlice';

// const RentPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { dress, chosenDate, size } = location.state;
//     const [phoneSubmitted, setPhoneSubmitted] = useState(false);
//     const [phone, setPhone] = useState('');
//     const [existingUser, setExistingUser] = useState(null);

//     const [createUserFunc] = useCreateUserMutation();
//     const { data: user, error, isLoading } = useGetUserByPhoneQuery(phone, { skip: !phoneSubmitted });

//     // Formik for user creation
//     const formik = useFormik({
//         initialValues: { name: '', phone: '', email: '' },
//         validate: (data) => {
//             let errors = {};
//             if (!data.name) errors.name = 'Name is required';
//             if (!data.phone) errors.phone = 'Phone number is required';
//             return errors;
//         },
//         onSubmit: async (data) => {
//             try {
//                 const createdUser = await createUserFunc(data).unwrap();
//                 navigate('/renting', { state: { userId: createdUser.userId, dress, chosenDate, size } });
//             } catch (error) {
//                 console.error('Error creating user:', error);
//             }
//         }
//     });

//     // Handle phone number submission
//     const handlePhoneSubmit = () => {
//         setPhone(formik.values.phone);
//         setPhoneSubmitted(true);
//     };

//     // Check if user was found in the query response
//     React.useEffect(() => {
//         if (user) {
//             setExistingUser(user);
//         } else if (phoneSubmitted && !isLoading && !user && !error) {
//             setPhoneSubmitted(false);
//         }
//     }, [user, isLoading, error, phoneSubmitted]);

//     return (
//         <div>
//             <h1>Rent Dress</h1>
//             <p>Dress: {dress.name}</p>
//             <p>Date: {chosenDate.toString()}</p>
//             <p>Size: {size}</p>

//             {!phoneSubmitted && !existingUser && (
//                 <div>
//                     <h2>Enter Phone Number</h2>
//                     <div className="p-field">
//                         <label htmlFor="phone">Phone</label>
//                         <InputText
//                             id="phone"
//                             value={formik.values.phone}
//                             onChange={formik.handleChange}
//                             className={classNames({ 'p-invalid': formik.errors.phone })}
//                         />
//                     </div>
//                     <Button label="Check Phone" onClick={handlePhoneSubmit} />
//                 </div>
//             )}

//             {existingUser && (
//                 <div>
//                     <h2>Existing User Found</h2>
//                     <p>Name: {existingUser.name}</p>
//                     <p>Phone: {existingUser.phone}</p>
//                     <p>Email: {existingUser.email}</p>
//                     <Button label="Proceed with this User" onClick={() => navigate('/renting', { state: { userId: existingUser.userId, dress, chosenDate, size } })} />
//                 </div>
//             )}

//             {phoneSubmitted && !existingUser && (
//                 <div className="card">
//                     <h2>Create User</h2>
//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="p-field">
//                             <label htmlFor="name">Name</label>
//                             <InputText
//                                 id="name"
//                                 value={formik.values.name}
//                                 onChange={formik.handleChange}
//                                 className={classNames({ 'p-invalid': formik.errors.name })}
//                             />
//                             {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
//                         </div>

//                         <div className="p-field">
//                             <label htmlFor="email">Email (Optional)</label>
//                             <InputText
//                                 id="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 className={classNames({ 'p-invalid': formik.errors.email })}
//                             />
//                             {formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
//                         </div>

//                         <Button type="submit" label="Submit" className="mt-2" />
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RentPage;
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
                    <h2>Enter Phone Number</h2>
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
                <div>
                    <h2>Existing User Found</h2>
                    <p>Name: {existingUser.name}</p>
                    <p>Phone: {existingUser.phone}</p>
                    <p>Email: {existingUser.email}</p>
                    <Button label="Proceed with this User" onClick={handleProceedWithUser} />
                </div>
            )}

            {phoneSubmitted && !existingUser && (
                <div className="card">
                    <h2>Create User</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className={classNames({ 'p-invalid': formik.errors.name })}
                            />
                            {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
                        </div>

                        <div className="p-field">
                            <label htmlFor="email">Email (Optional)</label>
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
