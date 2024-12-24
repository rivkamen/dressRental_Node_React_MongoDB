// import React, { useState } from 'react';
// import { useAdminLoginMutation } from '../../app/userApiSlice';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [login, { isLoading }] = useAdminLoginMutation(); // שימוש ב-mutation

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await login({ username, password }).unwrap(); // קריאה ל-mutation
//       const { token } = response;

//       // שמירת הטוקן ב-sessionStorage
//       sessionStorage.setItem('adminToken', token);

//       alert('כניסה הצליחה! ברוך הבא מנהל.');

//       // הפניה לעמוד מנהל (לדוגמה)
//       window.location.href = '/';
//     } catch (err) {
//       setError(err.data?.error || 'שגיאה בכניסה. נא לבדוק את שם המשתמש והסיסמה.');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//       <h2>כניסת מנהל</h2>
//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: '10px' }}>
//           <label>שם משתמש:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <label>סיסמה:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{ width: '100%', padding: '8px', marginTop: '5px' }}
//           />
//         </div>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? 'טוען...' : 'כניסה'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
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
// <<<<<<< HEAD
//         useEffect(() => {
//             const token = sessionStorage.getItem('adminToken');
//             if (!token) {
//                 navigate('/');
//             }
//         }, [navigate]);

// =======
// >>>>>>> 35103b1b5fe7a52744248212da5768cbd29bcc3f

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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '45%' }}>
        <h2>כניסת מנהל</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '10px' }}>
            <label>שם משתמש:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>סיסמה:</label>
            <input
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

      {/* קו שחור ביניהם */}
      <div style={{ width: '20px', backgroundColor: 'black', height: '100%' }}></div>

      <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/register')}
          style={{
            width: '50%',
              padding: '10px',
              backgroundColor: 'rgb(213, 1, 118)',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
          }}
        >
          הרשמה
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

