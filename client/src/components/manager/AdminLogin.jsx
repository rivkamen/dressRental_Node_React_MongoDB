
import React, { useState, useEffect } from 'react';
import { useAdminLoginMutation } from '../../app/userApiSlice';
import { useLocation, useNavigate } from "react-router";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useAdminLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login({ username, password }).unwrap();
      const { token } = response;
      sessionStorage.setItem('adminToken', token);

      alert('כניסה הצליחה! ברוך הבא מנהל.');
      window.location.href = '/';
    } catch (err) {
      setError(err.data?.error || 'שגיאה בכניסה. נא לבדוק את שם המשתמש והסיסמה.');
    }
  };

  return (
    <div style={{textAlign:'center', maxWidth: '900px', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'space-between', minHeight:'100vh' }}>
      <div style={{ width: '45%',margin:'auto', marginTop:'50px'}}>
        <h2>כניסת מנהל</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label dir='rtl'>שם משתמש:</label>
            <input dir='rtl'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label dir='rtl'>סיסמה:</label>
            <input dir='rtl'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '50%',
              padding: '10px',
              backgroundColor: 'rgb(213, 1, 118)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'טוען...' : 'כניסה'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default AdminLogin;

