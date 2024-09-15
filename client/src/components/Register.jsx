// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Messages } from 'primereact/messages';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import './Register.css';
import { useCreateUserMutation } from '../app/userApiSlice';

const Register = () => {
    const [addUser, { isError, isSuccess, error }]=useCreateUserMutation()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const messages = React.createRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData));
      messages.current.show({ severity: 'success', summary: 'Registration Successful', detail: 'User registered successfully' });
    } catch (error) {
      messages.current.show({ severity: 'error', summary: 'Registration Failed', detail: error.message });
    }
  };

  return (
    <div className="register-container">
      <Card title="Register">
        <form onSubmit={handleSubmit} className="p-fluid">
          <Messages ref={messages} />
          <div className="p-field">
            <label htmlFor="username">UserName</label>
            <InputText id="username" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="p-field">
            <label htmlFor="email">Email</label>
            <InputText id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password id="password" name="password" value={formData.password} onChange={handleChange} required toggleMask />
          </div>
          <Button label="Register" icon="pi pi-check" />
        </form>
      </Card>
    </div>
  );
};

export default Register;
