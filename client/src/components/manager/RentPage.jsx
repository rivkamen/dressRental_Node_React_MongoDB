
// import React from 'react';
// import { useLocation } from 'react-router';
// import { useFormik } from 'formik';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { classNames } from 'primereact/utils';
// import { useCreateUserMutation } from '../../app/userApiSlice';

// const RentPage = () => {
//     const location = useLocation();
//     const { dress, chosenDate, size } = location.state;  // Retrieve props
//     const [createUserFunc, { isError, error, isSuccess }] = useCreateUserMutation();

//     // Formik for managing form state and validation
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             phone: '',
//             email: ''
//         },
//         validate: (data) => {
//             let errors = {};

//             if (!data.name) {
//                 errors.name = 'Name is required';
//             }
//             if (!data.phone) {
//                 errors.phone = 'Phone number is required';
//             } else if (!/^\d{10}$/.test(data.phone)) {
//                 errors.phone = 'Phone number must be 10 digits';
//             }
//             if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
//                 errors.email = 'Invalid email address';
//             }

//             return errors;
//         },
//         onSubmit: async (data) => {
//             try {
//                 await createUserFunc({ ...data });  // Call API to create user
//                 formik.resetForm();  // Reset form on successful submission
//             } catch (error) {
//                 console.error('Error creating user:', error);
//             }
//         }
//     });

//     // Helper to conditionally apply 'p-invalid' class for validation errors
//     const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
//     const getFormErrorMessage = (name) => {
//         return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
//     };

//     return (
//         <div>
//             <h1>Rent Dress</h1>
//             <p>Dress: {dress.name}</p>
//             <p>Date: {chosenDate.toString()}</p>
//             <p>Size: {size}</p>

//             {/* User Form */}
//             <div className="card">
//                 <h2>Create User</h2>
//                 <form onSubmit={formik.handleSubmit}>
//                     <div className="p-field">
//                         <label htmlFor="name">Name</label>
//                         <InputText
//                             id="name"
//                             value={formik.values.name}
//                             onChange={formik.handleChange}
//                             className={classNames({ 'p-invalid': isFormFieldValid('name') })}
//                         />
//                         {getFormErrorMessage('name')}
//                     </div>

//                     <div className="p-field">
//                         <label htmlFor="phone">Phone</label>
//                         <InputText
//                             id="phone"
//                             value={formik.values.phone}
//                             onChange={formik.handleChange}
//                             className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
//                         />
//                         {getFormErrorMessage('phone')}
//                     </div>

//                     <div className="p-field">
//                         <label htmlFor="email">Email (Optional)</label>
//                         <InputText
//                             id="email"
//                             value={formik.values.email}
//                             onChange={formik.handleChange}
//                             className={classNames({ 'p-invalid': isFormFieldValid('email') })}
//                         />
//                         {getFormErrorMessage('email')}
//                     </div>

//                     <Button type="submit" label="Submit" className="mt-2" />
//                 </form>

//                 {isSuccess && <p>User created successfully!</p>}
//                 {isError && <p>Error creating user: {error.message}</p>}
//             </div>
//         </div>
//     );
// };

// export default RentPage;
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useCreateUserMutation } from '../../app/userApiSlice';

const RentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();  // Initialize the useNavigate hook
    const { dress, chosenDate, size } = location.state;  // Retrieve props
    const [createUserFunc, { data: user, isError, error, isSuccess }] = useCreateUserMutation();

    // Formik for managing form state and validation
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required';
            }
            if (!data.phone) {
                errors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(data.phone)) {
                errors.phone = 'Phone number must be 10 digits';
            }
            if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: async (data) => {
            try {
                const createdUser = await createUserFunc({ ...data }).unwrap();  // Call API to create user
console.log("id");
console.log(createdUser);


                // Navigate to the next component upon success
                navigate('/renting', {
                    state: { userId: createdUser.userId, dress, chosenDate, size }
                });
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }
    });

    // Helper to conditionally apply 'p-invalid' class for validation errors
    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div>
            <h1>Rent Dress</h1>
            <p>Dress: {dress.name}</p>
            <p>Date: {chosenDate.toString()}</p>
            <p>Size: {size}</p>

            {/* User Form */}
            <div className="card">
                <h2>Create User</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                        />
                        {getFormErrorMessage('name')}
                    </div>

                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
                        />
                        {getFormErrorMessage('phone')}
                    </div>

                    <div className="p-field">
                        <label htmlFor="email">Email (Optional)</label>
                        <InputText
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                        />
                        {getFormErrorMessage('email')}
                    </div>

                    <Button type="submit" label="Submit" className="mt-2" />
                </form>

                {isSuccess && <p>User created successfully!</p>}
                {isError && <p>Error creating user: {error.message}</p>}
            </div>
        </div>
    );
};

export default RentPage;
