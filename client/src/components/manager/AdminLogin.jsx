// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useLoginAdminMutation } from "../../app/authApiSlice";

// // const AdminLogin = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const [loginAdmin, { isLoading, isError, error: apiError }] = useLoginAdminMutation();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await loginAdmin({ username, password }).unwrap();
      
// //       navigate("/catalogm");
// //     } catch (err) {
// //       setError(apiError?.data?.message || "Something went wrong!");
// //     }
// //   };

// //   return (
// //     <div className="login-container">
// //       <h2>Admin Login</h2>
// //       <form onSubmit={handleLogin}>
// //         <div>
// //           <label htmlFor="username">Username</label>
// //           <input
// //             type="text"
// //             id="username"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="password">Password</label>
// //           <input
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         {error && <div className="error-message">{error}</div>}
// //         <button type="submit" disabled={isLoading}>
// //           {isLoading ? "Logging in..." : "Login"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AdminLogin;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginAdminMutation } from "../../app/authApiSlice";

// const AdminLogin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const [loginAdmin, { isLoading, isError, error: apiError }] = useLoginAdminMutation();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await loginAdmin({ username, password }).unwrap();
//       console.log(response);
      
//       // שומר את ה-ID של המנהל ב-Session Storage
//       sessionStorage.setItem("adminId", response.id);

//       navigate("/catalogm");
//     } catch (err) {
//       setError(apiError?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Admin Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div className="error-message">{error}</div>}
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../app/authApiSlice";
import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [loginAdmin, { isLoading, isError, error: apiError }] = useLoginAdminMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin({ username, password }).unwrap();
      
      // פענוח ה-token כדי לקבל את ה-ID של המנהל
      const decodedToken = jwtDecode(response.token);
      console.log(decodedToken);
      
      const adminId = decodedToken._id;

      // שמירת ה-ID ב-Session Storage
      sessionStorage.setItem("adminId", adminId);

      navigate("/catalogm");
    } catch (err) {
      setError(apiError?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
