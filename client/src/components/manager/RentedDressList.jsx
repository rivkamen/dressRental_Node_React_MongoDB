
import React, { useState } from "react";
import { useGetAllBookedDatesQuery, useReturnDressMutation } from "../../app/dressApiSlice";
import { HDate } from "@hebcal/core";

// Helper function to convert numbers to Hebrew numerals
const hebrewNumbers = (number) => {
  const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
  const tens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
  const hundreds = ["", "ק", "ר", "ש", "ת"];
  let result = "";

  // Process hundreds
  if (number >= 100) {
    result += hundreds[Math.floor(number / 100)];
    number %= 100;
  }

  // Handle special cases for 15 and 16
  if (number === 15) return result + "טו";
  if (number === 16) return result + "טז";

  // Process tens
  if (number >= 10) {
    result += tens[Math.floor(number / 10)];
    number %= 10;
  }

  // Process units
  result += units[number];

  return result;
};

// };
const formatHebrewDate = (gregorianDate) => {
  const hdate = new HDate(gregorianDate);
  const hebrewDay = hebrewNumbers(hdate.getDate()); // Convert day to Hebrew numeral
  
  // Map of month names to the desired format
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

  // Get Hebrew month name and convert it
  const hebrewMonth = monthNames[hdate.getMonthName("h")] || hdate.getMonthName("h");

  // Hebrew year conversion with manual formatting
  const rawYear = hdate.getFullYear();
  
  // Manually convert the year if needed
  let hebrewYear = rawYear.toString();
  if (hebrewYear === '5785') {
    hebrewYear = 'תשפ״ה'; // Explicitly map 5785 to תשפ״ה
  } else {
    // Use a more generalized conversion for other years
    hebrewYear = `${hebrewYear.replace(/^5/, 'ת')}`;  // Replace first '5' with 'ת' for Hebrew years
  }

  return `${hebrewDay} ${hebrewMonth} ${hebrewYear}`;
};


const RentedDressesList = () => {
  const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
  const [returnDress] = useReturnDressMutation(); // Mutation for returning dresses
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredBookings = bookedDates.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.dressName.toLowerCase().includes(searchLower) ||
      booking.userName.toLowerCase().includes(searchLower) ||
      booking.userPhone.toLowerCase().includes(searchLower) ||
      new Date(booking.date).toLocaleDateString("he-IL").includes(searchLower)
    );
  });

  const sortedBookings = sortBookings(filteredBookings, sortBy);

  const handleReturnDress = async (booking) => {
    try {
      const { dressId, userPhone } = booking;
      const returnDate = new Date().toISOString();

      await returnDress({ dressId, returnDate, userPhone }).unwrap();
      alert("השמלה הוחזרה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בהחזרת השמלה:", error);
      alert("שגיאה בהחזרת השמלה");
    }
  };

  return (
    <div>
      <h2>רשימת שמלות מושכרות</h2>
      <div>
        <input
          type="text"
          placeholder="חפש שמלה, שם שוכר או טלפון"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => setSortBy("date")}>מיין לפי תאריך</button>
        <button onClick={() => setSortBy("dressName")}>מיין לפי שם שמלה</button>
        <button onClick={() => setSortBy("phone")}>מיין לפי טלפון</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>שם שמלה</th>
            <th>שוכר/ת</th>
            <th>טלפון</th>
            <th>תאריך השכרה</th>
            <th>תאריך השכרה (עברי)</th>
            <th>החזר שמלה</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookings.length === 0 ? (
            <tr>
              <td colSpan="6">לא נמצאו תוצאות</td>
            </tr>
          ) : (
            sortedBookings.map((booking) => {
              const gregorianDate = new Date(booking.date);
              const jewishDate = formatHebrewDate(gregorianDate); // Convert to formatted Hebrew date

              return (
                <tr key={booking._id}>
                  <td>{booking.dressName}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.userPhone}</td>
                  <td>{gregorianDate.toLocaleDateString("he-IL")}</td>
                  <td>{jewishDate}</td>
                  <td>
                    <button onClick={() => handleReturnDress(booking)}>החזר שמלה</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RentedDressesList;
