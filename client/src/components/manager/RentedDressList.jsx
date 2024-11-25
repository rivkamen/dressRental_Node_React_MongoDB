
// import React, { useState } from "react";
// import { useCancelRentDressMutation, useGetAllBookedDatesQuery, useReturnDressMutation } from "../../app/dressApiSlice";
// import { HDate } from "@hebcal/core";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Paginator } from 'primereact/paginator';  // הוספתי את ה-import של ה-Paginator

// import './RentedDressesList.css';
// import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component
// import Swal from "sweetalert2";

// // Helper function to convert numbers to Hebrew numerals
// const hebrewNumbers = (number) => {
//   const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
//   const tens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
//   const hundreds = ["", "ק", "ר", "ש", "ת"];
//   let result = "";

//   if (number >= 100) {
//     result += hundreds[Math.floor(number / 100)];
//     number %= 100;
//   }

//   if (number === 15) return result + "טו";
//   if (number === 16) return result + "טז";

//   if (number >= 10) {
//     result += tens[Math.floor(number / 10)];
//     number %= 10;
//   }

//   result += units[number];

//   return result;
// };

// const formatHebrewDate = (gregorianDate) => {
//   const hdate = new HDate(gregorianDate);
//   const hebrewDay = hebrewNumbers(hdate.getDate());

//   const monthNames = {
//     'Tishrei': 'תשרי',
//     'Cheshvan': 'חשוון',
//     'Kislev': 'כסלו',
//     'Tevet': 'טבת',
//     'Shevat': 'שבט',
//     'Adar': 'אדר',
//     'Nisan': 'ניסן',
//     'Iyar': 'אייר',
//     'Sivan': 'סיוון',
//     'Tamuz': 'תמוז',
//     'Av': 'אב',
//     'Elul': 'אלול'
//   };

//   const hebrewMonth = monthNames[hdate.getMonthName("h")] || hdate.getMonthName("h");

//   const rawYear = hdate.getFullYear();
//   let hebrewYear = rawYear.toString();
//   if (hebrewYear === '5785') {
//     hebrewYear = 'תשפ״ה';
//   } else {
//     hebrewYear = `${hebrewYear.replace(/^5/, 'ת')}`;
//   }

//   return `${hebrewDay} ${hebrewMonth} ${hebrewYear}`;
// };

// // const RentedDressesList = (props) => {
// //   const { data: bookedDates, error, isLoading,refetch } = useGetAllBookedDatesQuery();
// //   const [returnDress] = useReturnDressMutation();
// //   const [sortBy, setSortBy] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// // const [cancelRentFunc]=useCancelRentDressMutation()

// //   if (isLoading) return <p>טוען נתונים...</p>;
// //   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

// //   const sortBookings = (bookings, sortBy) => {
// //     if (!sortBy) return bookings;
// //     return [...bookings].sort((a, b) => {
// //       if (sortBy === "date") {
// //         return new Date(a.date) - new Date(b.date);
// //       } else if (sortBy === "dressName") {
// //         return a.dressName.localeCompare(b.dressName);
// //       } else if (sortBy === "phone") {
// //         return a.userPhone.localeCompare(b.userPhone);
// //       }
// //       return 0;
// //     });
// //   };

// //   const filteredBookings = bookedDates.filter((booking) => {
// //     const searchLower = searchTerm.toLowerCase();
// //     return (
// //       booking.dressName.toLowerCase().includes(searchLower) ||
// //       booking.dressSize.toLowerCase().includes(searchLower) ||
// //       booking.userName.toLowerCase().includes(searchLower) ||
// //       booking.userPhone.toLowerCase().includes(searchLower) ||
// //       new Date(booking.date).toLocaleDateString("he-IL").includes(searchLower)
// //     );
// //   });

// //   const sortedBookings = sortBookings(filteredBookings, sortBy);

// //   const handleReturnDress = async (booking) => {
// //     try {
// //       const { dressId, userPhone, dressSize } = booking;
// //       const returnDate = new Date().toISOString();

// //       await returnDress({ dressId, returnDate, userPhone }).unwrap();
// //       alert("השמלה הוחזרה בהצלחה!");
// //     } catch (error) {
// //       console.error("שגיאה בהחזרת השמלה:", error);
// //       alert("שגיאה בהחזרת השמלה");
// //     }
// //   };
// //   const returnDr = async (rowData) => {
// //     const confirmation = await Swal.fire({
// //       title: 'אישור ביטול השכרה',
// //       text: 'האם אתה בטוח שברצונך לבטל את ההשכרה?',
// //       icon: 'warning',
// //       showCancelButton: true,
// //       confirmButtonText: 'כן, בטל השכרה',
// //       cancelButtonText: 'ביטול',
// //       reverseButtons: true, // To make the cancel button more prominent
// //     });
  
// //     if (confirmation.isConfirmed) {
// //       try {
// //         await returnDress({
// //           id: rowData.id,
// //           dress: {
// //             date: rowData.date,
// //             userId: rowData.userId._id,
// //             dressId: rowData.dressId,
// //           },
// //         }).unwrap();
// //         refetch(); // Refresh the list after successful cancellation
// //         Swal.fire('בוטל!', 'שמלה הוחזרה בהצלחה', 'success');
// //       } catch (error) {
// //         console.error(error);
// //         Swal.fire({
// //           title: 'שגיאה',
// //           text: error?.data?.message || 'קרתה שגיאה בלתי צפויה. אנא נסה שוב.',
// //           icon: 'error',
// //           confirmButtonText: 'אישור',
// //         });
// //       }
// //     } else {
// //       Swal.fire('פעולה בוטלה', 'ביטול ההשכרה לא בוצע.', 'info');
// //     }
// //   };
// // const cancelRent = async (rowData) => {
// //   const confirmation = await Swal.fire({
// //     title: 'אישור החזרת שמלה',
// //     text: 'האם אתה בטוח שברצונך להחזיר את השמלה?',
// //     icon: 'warning',
// //     showCancelButton: true,
// //     confirmButtonText: 'כן, החזר שמלה ',
// //     cancelButtonText: 'ביטול',
// //     reverseButtons: true, // To make the cancel button more prominent
// //   });

// //   if (confirmation.isConfirmed) {
// //     try {
// //       await cancelRentFunc({
// //         id: rowData.id,
// //         dress: {
// //           date: rowData.date,
// //           userId: rowData.userId._id,
// //           dressId: rowData.dressId,
// //         },
// //       }).unwrap();
// //       refetch(); // Refresh the list after successful cancellation
// //       Swal.fire('בוטל!', 'השכרה בוטלה בהצלחה.', 'success');
// //     } catch (error) {
// //       console.error(error);
// //       Swal.fire({
// //         title: 'שגיאה',
// //         text: error?.data?.message || 'קרתה שגיאה בלתי צפויה. אנא נסה שוב.',
// //         icon: 'error',
// //         confirmButtonText: 'אישור',
// //       });
// //     }
// //   } else {
// //     Swal.fire('פעולה בוטלה', 'ביטול ההשכרה לא בוצע.', 'info');
// //   }
// // };

// //   return (
// //     <div >
// //       <h2>רשימת שמלות מושכרות</h2>
// //       <div>
// //         <InputText 
// //           dir='rtl' 
// //           className="inputSearch"
// //           placeholder="חפש שמלה, שם שוכר או טלפון"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </div>
// //       <div>
// //         <Button className="but" label="מיין לפי תאריך" onClick={() => setSortBy("date")} />
// //         <Button className="but" label="מיין לפי שם שמלה" onClick={() => setSortBy("dressName")} />
// //         <Button className="but" label="מיין לפי טלפון" onClick={() => setSortBy("phone")} />
// //       </div>

// //       <DataTable className="myTab" value={sortedBookings} paginator rows={10} dir="rtl">
// //         <Column className="myTab" field="dressName" header="שם שמלה" />
// //         <Column className="myTab" field="dressSize" header="מידה" />
// //         <Column className="myTab" field="userName" header="שוכר/ת" />
// //         <Column className="myTab" field="userPhone" header="טלפון" />
// //         <Column 
// //           className="myTab" 
// //           field="date" 
// //           header="תאריך השכרה (לועזי)" 
// //           body={(rowData) => new Date(rowData.date).toLocaleDateString("he-IL")} 
// //         />
// //         <Column 
// //           className="myTab" 
// //           field="jewishDate" 
// //           header="תאריך השכרה (עברי)" 
// //           body={(rowData) => formatHebrewDate(new Date(rowData.date))} 
// //         />
// //         <Column 
// //           className="myTab" 
// //           body={(rowData) => {
// //             const today = new Date();
// //             const bookingDate = new Date(rowData.date);

// //             // Calculate difference in days
// //             const dayDifference = Math.round((bookingDate - today) / (1000 * 60 * 60 * 24));

// //             if (dayDifference >= -7 && dayDifference <= 7) {
// //               // Show return button for dates within the past or next week
// //               return (
// //                 <Button 
// //                   className="returnBut" 
// //                   label="החזר שמלה" 
// //                   onClick={() => returnDr(rowData)} 
// //                 />
// //               );
// //             } else {
// //               // Show alternate button for other dates
// //               return (
// //                 <Button 
// //                   className="alternateBut" 
// //                   label="בטל השכרה" 
// //                   onClick={() =>cancelRent(rowData)} 
// //                 />
// //               );
// //             }
// //           }} 
// //         />
// //       </DataTable>

// //     </div>
// //   );
// // };

// // export default RentedDressesList;
// const RentedDressesList = (props) => {
//   const { data: bookedDates, error, isLoading, refetch } = useGetAllBookedDatesQuery();
//   const [returnDress] = useReturnDressMutation();
//   const [sortBy, setSortBy] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [cancelRentFunc] = useCancelRentDressMutation();

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

//   // Helper function to categorize the dresses based on dates
//   const categorizeBookings = (bookings) => {
//     const today = new Date();
//     return bookings.filter((booking) => {
//       const bookingDate = new Date(booking.date);
//       const dayDifference = Math.round((bookingDate - today) / (1000 * 60 * 60 * 24));

//       // If the booking is within the next or previous week
//       if (dayDifference >= -7 && dayDifference <= 7) {
//         return { ...booking, category: 'returningSoon' };
//       }

//       // If the booking is in the future and hasn't been rented yet
//       if (dayDifference > 7) {
//         return { ...booking, category: 'futureBookings' };
//       }

//       // If the booking is older than a week (return overdue)
//       if (dayDifference < -7) {
//         return { ...booking, category: 'overdueReturns' };
//       }
      
//       return booking;
//     });
//   };

//   const filteredBookings = bookedDates.filter((booking) => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       booking.dressName.toLowerCase().includes(searchLower) ||
//       booking.dressSize.toLowerCase().includes(searchLower) ||
//       booking.userName.toLowerCase().includes(searchLower) ||
//       booking.userPhone.toLowerCase().includes(searchLower) ||
//       new Date(booking.date).toLocaleDateString("he-IL").includes(searchLower)
//     );
//   });

//   const sortedBookings = sortBookings(categorizeBookings(filteredBookings), sortBy);

//   const handleReturnDress = async (booking) => {
//     try {
//       const { dressId, userPhone, dressSize } = booking;
//       const returnDate = new Date().toISOString();

//       await returnDress({ dressId, returnDate, userPhone }).unwrap();
//       alert("השמלה הוחזרה בהצלחה!");
//     } catch (error) {
//       console.error("שגיאה בהחזרת השמלה:", error);
//       alert("שגיאה בהחזרת השמלה");
//     }
//   };

//   // New sorting logic based on categories
//   const sortBookings = (bookings, sortBy) => {
//     if (!sortBy) return bookings;
//     return [...bookings].sort((a, b) => {
//       if (sortBy === "date") {
//         return new Date(a.date) - new Date(b.date);
//       } else if (sortBy === "dressName") {
//         return a.dressName.localeCompare(b.dressName);
//       } else if (sortBy === "phone") {
//         return a.userPhone.localeCompare(b.userPhone);
//       }
//       return 0;
//     });
//   };

//   return (
//     <div>
//       <h2>רשימת שמלות מושכרות</h2>
//       <div>
//         <InputText
//           dir='rtl'
//           className="inputSearch"
//           placeholder="חפש שמלה, שם שוכר או טלפון"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div>
//         <Button className="but" label="מיין לפי תאריך" onClick={() => setSortBy("date")} />
//         <Button className="but" label="מיין לפי שם שמלה" onClick={() => setSortBy("dressName")} />
//         <Button className="but" label="מיין לפי טלפון" onClick={() => setSortBy("phone")} />
//       </div>

//       <DataTable className="myTab" value={sortedBookings} paginator rows={10} dir="rtl">
//         <Column className="myTab" field="dressName" header="שם שמלה" />
//         <Column className="myTab" field="dressSize" header="מידה" />
//         <Column className="myTab" field="userName" header="שוכר/ת" />
//         <Column className="myTab" field="userPhone" header="טלפון" />
//         <Column 
//           className="myTab" 
//           field="date" 
//           header="תאריך השכרה (לועזי)" 
//           body={(rowData) => new Date(rowData.date).toLocaleDateString("he-IL")} 
//         />
//         <Column 
//           className="myTab" 
//           field="jewishDate" 
//           header="תאריך השכרה (עברי)" 
//           body={(rowData) => formatHebrewDate(new Date(rowData.date))} 
//         />
//         <Column 
//           className="myTab" 
//           body={(rowData) => {
//             // Handle return actions based on category
//             if (rowData.category === 'returningSoon') {
//               return (
//                 <Button
//                   className="returnBut"
//                   label="החזר שמלה"
//                   onClick={() => returnDr(rowData)}
//                 />
//               );
//             } else if (rowData.category === 'futureBookings') {
//               return (
//                 <Button 
//                   className="alternateBut" 
//                   label="בטל השכרה" 
//                   onClick={() => cancelRent(rowData)} 
//                 />
//               );
//             } else if (rowData.category === 'overdueReturns') {
//               return (
//                 <Button
//                   className="returnBut"
//                   label="החזר שמלה"
//                   onClick={() => handleReturnDress(rowData)}
//                 />
//               );
//             }
//           }} 
//         />
//       </DataTable>
//     </div>
//   );
// };
import React, { useState } from "react";
import { useCancelRentDressMutation, useGetAllBookedDatesQuery, useReturnDressMutation } from "../../app/dressApiSlice";
import { HDate } from "@hebcal/core";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator'; 

import './RentedDressesList.css';
import ConfirmationDialog from './ConfirmationDialog'; 
import Swal from "sweetalert2";

const RentedDressesList = (props) => {
  const { data: bookedDates, error, isLoading, refetch } = useGetAllBookedDatesQuery();
  const [returnDress] = useReturnDressMutation();
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");  
  
  const [cancelRentFunc] = useCancelRentDressMutation();
  console.log(bookedDates);
  
  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

  const sortBookings = (bookings, sortBy) => {
    if (!sortBy) return bookings;
    return [...bookings].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "dressName") {
        return a.dressName.localeCompare(b.dressName);
      } else if (sortBy === "phone") {
        return a.userPhone.localeCompare(b.userPhone);
      }
      return 0;
    });
  };
  const hebrewNumbers = (number) => {
  const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
  const tens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
  const hundreds = ["", "ק", "ר", "ש", "ת"];
  let result = "";

  if (number >= 100) {
    result += hundreds[Math.floor(number / 100)];
    number %= 100;
  }

  if (number === 15) return result + "טו";
  if (number === 16) return result + "טז";

  if (number >= 10) {
    result += tens[Math.floor(number / 10)];
    number %= 10;
  }

  result += units[number];

  return result;
};
const formatHebrewDate = (gregorianDate) => {
  const hdate = new HDate(gregorianDate);
  const hebrewDay = hebrewNumbers(hdate.getDate());

  const monthNames = {
    'Tishrei': 'תשרי',
    'Cheshvan': 'חשוון',
    'Kislev': 'כסלו',
    'Tevet': 'טבת',
    'Shevat': 'שבט',
    'Adar': 'אדר',
    'Nisan': 'ניסן',
    'Iyar': 'אייר',
    'Sivan': 'סיוון',
    'Tamuz': 'תמוז',
    'Av': 'אב',
    'Elul': 'אלול'
  };

  const hebrewMonth = monthNames[hdate.getMonthName("h")] || hdate.getMonthName("h");

  const rawYear = hdate.getFullYear();
  let hebrewYear = rawYear.toString();
  if (hebrewYear === '5785') {
    hebrewYear = 'תשפ״ה';
  } else {
    hebrewYear = `${hebrewYear.replace(/^5/, 'ת')}`;
  }

  return `${hebrewDay} ${hebrewMonth} ${hebrewYear}`;
};
  const filteredBookings = bookedDates.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearchTerm = 
      booking.dressName.toLowerCase().includes(searchLower) ||
      booking.dressSize.toLowerCase().includes(searchLower) ||
      booking.userName.toLowerCase().includes(searchLower) ||
      booking.userPhone.toLowerCase().includes(searchLower) ||
      new Date(booking.date).toLocaleDateString("he-IL").includes(searchLower);

    const matchesStatus = statusFilter
    ? ((statusFilter === "withinWeek" && Math.abs(new Date(booking.date) - new Date()) <= 7 * 24 * 60 * 60 * 1000)?(statusFilter === "withinWeek" && Math.abs(new Date(booking.date) - new Date()) <= 7 * 24 * 60 * 60 * 1000)
    : (statusFilter === "pastWeek" && Math.abs(new Date(booking.date) - new Date()) > 7 * 24 * 60 * 60 * 1000)):true;
  
    return matchesSearchTerm && matchesStatus;
  });

  const sortedBookings = sortBookings(filteredBookings, sortBy);

  const handleReturnDress = async (booking) => {
    try {
      const { dressId, userPhone, dressSize } = booking;
      const returnDate = new Date().toISOString();
      await returnDress({ dressId, returnDate, userPhone }).unwrap();
      alert("השמלה הוחזרה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בהחזרת השמלה:", error);
      alert("שגיאה בהחזרת השמלה");
    }
  };

  const returnDr = async (rowData) => {
    const confirmation = await Swal.fire({
      title: 'אישור החזרת שמלה',
      text: 'האם אתה בטוח שברצונך להחזיר את השמלה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, החזר שמלה ',
      cancelButtonText: 'ביטול',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      try {
        await cancelRentFunc({
          id: rowData.id,
          dress: {
            date: rowData.date,
            userId: rowData.userId._id,
            dressId: rowData.dressId,
          },
        }).unwrap();
        refetch(); 
        Swal.fire('בוטל!', 'השכרה בוטלה בהצלחה.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'שגיאה',
          text: error?.data?.message || 'קרתה שגיאה בלתי צפויה. אנא נסה שוב.',
          icon: 'error',
          confirmButtonText: 'אישור',
        });
      }
    } else {
      Swal.fire('פעולה בוטלה', 'ביטול ההשכרה לא בוצע.', 'info');
    }
    
  };

  const cancelRent = async (rowData) => {
    const confirmation = await Swal.fire({
      title: 'אישור ביטול השכרה',
      text: 'האם אתה בטוח שברצונך לבטל את ההשכרה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, בטל השכרה',
      cancelButtonText: 'ביטול',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      try {
        await returnDress({
          id: rowData.id,
          dress: {
            date: rowData.date,
            userId: rowData.userId._id,
            dressId: rowData.dressId,
          },
        }).unwrap();
        refetch(); 
        Swal.fire('בוטל!', 'שמלה הוחזרה בהצלחה', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'שגיאה',
          text: error?.data?.message || 'קרתה שגיאה בלתי צפויה. אנא נסה שוב.',
          icon: 'error',
          confirmButtonText: 'אישור',
        });
      }
    } else {
      Swal.fire('פעולה בוטלה', 'ביטול ההשכרה לא בוצע.', 'info');
    }
  };

  return (
    <div>
      <h2>רשימת שמלות מושכרות</h2>
      <div>
        <InputText 
          dir='rtl' 
          className="inputSearch"
          placeholder="חפש שמלה, שם שוכר או טלפון"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <Button className="but" label="מיין לפי תאריך" onClick={() => setSortBy("date")} />
        <Button className="but" label="מיין לפי שם שמלה" onClick={() => setSortBy("dressName")} />
        <Button className="but" label="מיין לפי טלפון" onClick={() => setSortBy("phone")} />
      </div>

      <div>
        <Button className="but" label="הצג הזמנות בשבוע הקרוב" onClick={() => setStatusFilter("withinWeek")} />
        <Button className="but" label="הצג הזמנות ששבוע עבר" onClick={() => setStatusFilter("pastWeek")} />
        <Button className="but" label="הצג הכל" onClick={() => setStatusFilter("")} />
      </div>

      <DataTable className="myTab" value={sortedBookings} paginator rows={10} dir="rtl">
        <Column className="myTab" field="dressName" header="שם שמלה" />
        <Column className="myTab" field="dressSize" header="מידה" />
        <Column className="myTab" field="userName" header="שוכר/ת" />
        <Column className="myTab" field="userPhone" header="טלפון" />
        <Column 
          className="myTab" 
          field="date" 
          header="תאריך השכרה (לועזי)" 
          body={(rowData) => new Date(rowData.date).toLocaleDateString("he-IL")} 
        />
        <Column 
          className="myTab" 
          field="jewishDate" 
          header="תאריך השכרה (עברי)" 
          body={(rowData) => formatHebrewDate(new Date(rowData.date))} 
        />
        <Column 
          className="myTab" 
          body={(rowData) => {
            const today = new Date();
            const bookingDate = new Date(rowData.date);
            const dayDifference = Math.round((bookingDate - today) / (1000 * 60 * 60 * 24));
            if (dayDifference >= -7 && dayDifference <= 7) {
                            // Show return button for dates within the past or next week
                            return (
                              <Button 
                                className="returnBut" 
                                label="החזר שמלה" 
                                onClick={() => returnDr(rowData)} 
                              />
                            );
                          } else {
                            // Show alternate button for other dates
                            return (
                              <Button 
                                className="alternateBut" 
                                label="בטל השכרה" 
                                onClick={() =>cancelRent(rowData)} 
                              />
                            );
          }} }
        />
      </DataTable>
    </div>
  );
};
export default RentedDressesList;

