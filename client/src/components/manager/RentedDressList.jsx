
import React, { useState } from "react";
import { useGetAllBookedDatesQuery, useReturnDressMutation } from "../../app/dressApiSlice";
import { HDate } from "@hebcal/core";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './RentedDressesList.css';

// Helper function to convert numbers to Hebrew numerals
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

const RentedDressesList = () => {
  const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();
  const [returnDress] = useReturnDressMutation();
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
      booking.dressSize.toLowerCase().includes(searchLower) ||
      booking.userName.toLowerCase().includes(searchLower) ||
      booking.userPhone.toLowerCase().includes(searchLower) ||
      new Date(booking.date).toLocaleDateString("he-IL").includes(searchLower)
    );
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
const cancelRent=async (rowData)=>{

}
  return (
    <div >
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

            // Calculate difference in days
            const dayDifference = Math.round((bookingDate - today) / (1000 * 60 * 60 * 24));

            if (dayDifference >= -7 && dayDifference <= 7) {
              // Show return button for dates within the past or next week
              return (
                <Button 
                  className="returnBut" 
                  label="החזר שמלה" 
                  onClick={() => handleReturnDress(rowData)} 
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
            }
          }} 
        />
      </DataTable>
    </div>
  );
};

export default RentedDressesList;
