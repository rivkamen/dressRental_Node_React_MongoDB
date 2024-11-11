// import React from 'react';
// import { useGetAllBookedDatesQuery } from '../../app/dressApiSlice';

// const RentedDressesList = ()=> {
//   const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
//     console.log(bookedDates);
    
//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

//   return (
//     <div>
//       <h2>רשימת שמלות מושכרות</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>שם שמלה</th>
//             <th>שוכר/ת</th>
//             <th>טלפון</th>
//             <th>תאריך השכרה</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookedDates.map((booking) => (
//             <tr key={booking._id}>
//               <td>{booking.dressName}</td>
//               <td>{booking.userName}</td>
//               <td>{booking.userPhone}</td>
//               <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default RentedDressesList;
// import React, { useState } from 'react';
// import { useGetAllBookedDatesQuery } from '../../app/dressApiSlice';

// const RentedDressesList = () => {
//   const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
//   const [sortBy, setSortBy] = useState(null); // משתנה למעקב אחרי איך למיין את הנתונים

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

//   // פונקציה למיון על פי הקריטריונים שנבחרו
//   const sortBookings = (bookings, sortBy) => {
//     if (!sortBy) return bookings; // אם לא נבחר מיון, מחזירים את הרשימה כמו שהיא

//     return [...bookings].sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(a.date) - new Date(b.date); // מיון לפי תאריך מהישן לחדש
//       } else if (sortBy === 'dressName') {
//         return a.dressName.localeCompare(b.dressName); // מיון לפי שם שמלה
//       } else if (sortBy === 'phone') {
//         return a.userPhone.localeCompare(b.userPhone); // מיון לפי טלפון
//       }
//       return 0;
//     });
//   };

//   const sortedBookings = sortBookings(bookedDates, sortBy);

//   return (
//     <div>
//       <h2>רשימת שמלות מושכרות</h2>

//       {/* כפתורי מיון */}
//       <div>
//         <button onClick={() => setSortBy('date')}>מיין לפי תאריך</button>
//         <button onClick={() => setSortBy('dressName')}>מיין לפי שם שמלה</button>
//         <button onClick={() => setSortBy('phone')}>מיין לפי טלפון</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>שם שמלה</th>
//             <th>שוכר/ת</th>
//             <th>טלפון</th>
//             <th>תאריך השכרה</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedBookings.length === 0 ? (
//             <tr>
//               <td colSpan="4">לא נמצאו תוצאות</td>
//             </tr>
//           ) : (
//             sortedBookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.dressName}</td>
//                 <td>{booking.userName}</td>
//                 <td>{booking.userPhone}</td>
//                 <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RentedDressesList;
// import React, { useState } from 'react';
// import { useGetAllBookedDatesQuery } from '../../app/dressApiSlice';

// const RentedDressesList = () => {
//   const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
//   const [sortBy, setSortBy] = useState(null); // משתנה למעקב אחרי איך למיין את הנתונים
//   const [searchTerm, setSearchTerm] = useState(''); // משתנה לשמירה על מונח החיפוש

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

//   // פונקציה למיון על פי הקריטריונים שנבחרו
//   const sortBookings = (bookings, sortBy) => {
//     if (!sortBy) return bookings; // אם לא נבחר מיון, מחזירים את הרשימה כמו שהיא

//     return [...bookings].sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(a.date) - new Date(b.date); // מיון לפי תאריך מהישן לחדש
//       } else if (sortBy === 'dressName') {
//         return a.dressName.localeCompare(b.dressName); // מיון לפי שם שמלה
//       } else if (sortBy === 'phone') {
//         return a.userPhone.localeCompare(b.userPhone); // מיון לפי טלפון
//       }
//       return 0;
//     });
//   };

//   // פונקציה לחיפוש
//   const filteredBookings = bookedDates.filter((booking) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       booking.dressName.toLowerCase().includes(searchLower) ||
//       booking.userName.toLowerCase().includes(searchLower) ||
//       booking.userPhone.toLowerCase().includes(searchLower) ||
//       new Date(booking.date).toLocaleDateString('he-IL').includes(searchLower)
//     );
//   });

//   const sortedBookings = sortBookings(filteredBookings, sortBy);

//   return (
//     <div>
//       <h2>רשימת שמלות מושכרות</h2>

//       {/* שדה חיפוש */}
//       <div>
//         <input
//           type="text"
//           placeholder="חפש שמלה, שם שוכר או טלפון"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* כפתורי מיון */}
//       <div>
//         <button onClick={() => setSortBy('date')}>מיין לפי תאריך</button>
//         <button onClick={() => setSortBy('dressName')}>מיין לפי שם שמלה</button>
//         <button onClick={() => setSortBy('phone')}>מיין לפי טלפון</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>שם שמלה</th>
//             <th>שוכר/ת</th>
//             <th>טלפון</th>
//             <th>תאריך השכרה</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedBookings.length === 0 ? (
//             <tr>
//               <td colSpan="4">לא נמצאו תוצאות</td>
//             </tr>
//           ) : (
//             sortedBookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.dressName}</td>
//                 <td>{booking.userName}</td>
//                 <td>{booking.userPhone}</td>
//                 <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RentedDressesList;
// import React, { useState } from 'react';
// import { useGetAllBookedDatesQuery } from '../../app/dressApiSlice';

// const RentedDressesList = () => {
//   const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
//   const [sortBy, setSortBy] = useState(null); // משתנה למעקב אחרי איך למיין את הנתונים
//   const [searchTerm, setSearchTerm] = useState(''); // משתנה לשמירה על מונח החיפוש
//     console.log(bookedDates);
    
//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

//   // פונקציה למיון על פי הקריטריונים שנבחרו
//   const sortBookings = (bookings, sortBy) => {
//     if (!sortBy) return bookings; // אם לא נבחר מיון, מחזירים את הרשימה כמו שהיא

//     return [...bookings].sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(a.date) - new Date(b.date); // מיון לפי תאריך מהישן לחדש
//       } else if (sortBy === 'dressName') {
//         return a.dressName.localeCompare(b.dressName); // מיון לפי שם שמלה
//       } else if (sortBy === 'phone') {
//         return a.userPhone.localeCompare(b.userPhone); // מיון לפי טלפון
//       }
//       return 0;
//     });
//   };

//   // פונקציה לחיפוש
//   const filteredBookings = bookedDates.filter((booking) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       booking.dressName.toLowerCase().includes(searchLower) ||
//       booking.userName.toLowerCase().includes(searchLower) ||
//       booking.userPhone.toLowerCase().includes(searchLower) ||
//       new Date(booking.date).toLocaleDateString('he-IL').includes(searchLower)
//     );
//   });

//   const sortedBookings = sortBookings(filteredBookings, sortBy);

//   return (
//     <div>
//       <h2>רשימת שמלות מושכרות</h2>

//       {/* שדה חיפוש */}
//       <div>
//         <input
//           type="text"
//           placeholder="חפש שמלה, שם שוכר או טלפון"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* כפתורי מיון */}
//       <div>
//         <button onClick={() => setSortBy('date')}>מיין לפי תאריך</button>
//         <button onClick={() => setSortBy('dressName')}>מיין לפי שם שמלה</button>
//         <button onClick={() => setSortBy('phone')}>מיין לפי טלפון</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>שם שמלה</th>
//             <th>שוכר/ת</th>
//             <th>טלפון</th>
//             <th>תאריך השכרה</th>
//             <th>הוחזרה?</th> {/* עמודה חדשה */}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedBookings.length === 0 ? (
//             <tr>
//               <td colSpan="5">לא נמצאו תוצאות</td>
//             </tr>
//           ) : (
//             sortedBookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.dressName}</td>
//                 <td>{booking.userName}</td>
//                 <td>{booking.userPhone}</td>
//                 <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
//                 <td>{booking.isRented ? 'לא' : 'כן'}</td> 
//                 {/* <td>{booking.isRented}</td> */}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RentedDressesList;
import React, { useState } from 'react';
import "./RentedDressesList.css"
import { useGetAllBookedDatesQuery, useMarkDressAsReturnedMutation } from '../../app/dressApiSlice'; // שימוש ב-hook markDressAsReturned

const RentedDressesList = () => {
  const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
  const [markDressAsReturned] = useMarkDressAsReturnedMutation(); // שימוש ב-mutation להחזרת שמלה
  const [sortBy, setSortBy] = useState(null); // משתנה למעקב אחרי איך למיין את הנתונים
  const [searchTerm, setSearchTerm] = useState(''); // משתנה לשמירה על מונח החיפוש

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

  // פונקציה למיון על פי הקריטריונים שנבחרו
  const sortBookings = (bookings, sortBy) => {
    if (!sortBy) return bookings; // אם לא נבחר מיון, מחזירים את הרשימה כמו שהיא

    return [...bookings].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date); // מיון לפי תאריך מהישן לחדש
      } else if (sortBy === 'dressName') {
        return a.dressName.localeCompare(b.dressName); // מיון לפי שם שמלה
      } else if (sortBy === 'phone') {
        return a.userPhone.localeCompare(b.userPhone); // מיון לפי טלפון
      }
      return 0;
    });
  };

  // פונקציה לחיפוש
  const filteredBookings = bookedDates.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.dressName.toLowerCase().includes(searchLower) ||
      booking.userName.toLowerCase().includes(searchLower) ||
      booking.userPhone.toLowerCase().includes(searchLower) ||
      new Date(booking.date).toLocaleDateString('he-IL').includes(searchLower)
    );
  });

  const sortedBookings = sortBookings(filteredBookings, sortBy);

  const handleReturnDress = async (booking) => {
    try {
      const { _id, dressName, size, userId } = booking; // הוצאת נתונים מה-booking
      const returnDate = new Date().toISOString(); // יצירת תאריך החזרה (אפשר לשנות לפי הצורך)

      await markDressAsReturned({ dressName, size, userId, returnDate }); // שליחת הנתונים ל-API
      alert('המשאלה הוחזרה בהצלחה!');
    } catch (error) {
      console.error('שגיאה בהחזרת השמלה:', error);
      alert('שגיאה בהחזרת השמלה');
    }
  };

  return (
    <div>
      <h2>רשימת שמלות מושכרות</h2>

      {/* שדה חיפוש */}
      <div>
        <input
          type="text"
          placeholder="חפש שמלה, שם שוכר או טלפון"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* כפתורי מיון */}
      <div>
        <button onClick={() => setSortBy('date')}>מיין לפי תאריך</button>
        <button onClick={() => setSortBy('dressName')}>מיין לפי שם שמלה</button>
        <button onClick={() => setSortBy('phone')}>מיין לפי טלפון</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>שם שמלה</th>
            <th>שוכר/ת</th>
            <th>טלפון</th>
            <th>תאריך השכרה</th>
            <th>הוחזרה?</th> {/* עמודה חדשה */}
            <th>החזרת שמלה</th> {/* כותרת כפתור ההחזרה */}
          </tr>
        </thead>
        <tbody>
          {sortedBookings.length === 0 ? (
            <tr>
              <td colSpan="6">לא נמצאו תוצאות</td>
            </tr>
          ) : (
            sortedBookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.dressName}</td>
                <td>{booking.userName}</td>
                <td>{booking.userPhone}</td>
                <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
                <td>{booking.isRented ? 'לא' : 'כן'}</td>
                <td>
                  <button onClick={() => handleReturnDress(booking)}>
                    החזר שמלה
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentedDressesList;
