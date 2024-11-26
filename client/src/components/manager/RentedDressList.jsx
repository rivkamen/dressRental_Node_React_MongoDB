
import React, { useState } from "react";
import { useCancelRentDressMutation, useGetAllBookedDatesQuery, useReturnDressMutation } from "../../app/dressApiSlice";
import { HDate } from "@hebcal/core";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Swal from "sweetalert2";

import './RentedDressesList.css';

const RentedDressesList = () => {
  const { data: bookedDates = [], error, isLoading, refetch } = useGetAllBookedDatesQuery();
  const [returnDress] = useReturnDressMutation();
  const [cancelRentFunc] = useCancelRentDressMutation();

  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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
  // סינון התאריכים
  const filterBookings = () => {
    const searchLower = searchTerm.toLowerCase();

    return bookedDates.filter((booking) => {
      const matchesSearchTerm = 
        booking.dressName.toLowerCase().includes(searchLower) ||
        booking.userName.toLowerCase().includes(searchLower) ||
        booking.userPhone.includes(searchLower);

      const bookingDate = new Date(booking.date);
      const withinWeek = Math.abs(new Date() - bookingDate) <= 7 * 24 * 60 * 60 * 1000;

      if (statusFilter === "withinWeek") {
        return matchesSearchTerm && withinWeek;
      }

      if (statusFilter === "pastWeek") {
        return matchesSearchTerm && new Date(booking.date) < new Date();
    }
    
      return matchesSearchTerm;
    });
  };

  // מיון ההזמנות
  const sortBookings = (bookings) => {
    if (!sortBy) return bookings;

    return [...bookings].sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "dressName") return a.dressName.localeCompare(b.dressName);
      if (sortBy === "phone") return a.userPhone.localeCompare(b.userPhone);
      return 0;
    });
  };

  // פונקציה להמרת תאריך לעברי
  const formatHebrewDate = (gregorianDate) => {
    const hdate = new HDate(gregorianDate);
    const hebrewDay = hebrewNumbers(hdate.getDate());
  
    const monthNames = {
      Tishrei: "תשרי",
      Cheshvan: "חשוון",
      Kislev: "כסלו",
      Tevet: "טבת",
      Shevat: "שבט",
      Adar: "אדר",
      Nisan: "ניסן",
      Iyar: "אייר",
      Sivan: "סיוון",
      Tamuz: "תמוז",
      Av: "אב",
      Elul: "אלול",
    };
  
    const hebrewMonth = monthNames[hdate.getMonthName("h")] || hdate.getMonthName("h");
  
    const rawYear = hdate.getFullYear();
    let hebrewYear = rawYear.toString();
  
    // Use a proper mapping for Hebrew years
    const units = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
    const tens = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
    const hundreds = ["", "ק", "ר", "ש", "ת"];
  // פונקציה להמרת תאריך לעברי

  let formattedYear = "";
    if (rawYear >= 5700) {
      const yearPart = rawYear - 5700; // Start from 5700
      const hundredIndex = Math.floor(yearPart / 100);
      const tenIndex = Math.floor((yearPart % 100) / 10);
      const unitIndex = yearPart % 10;
  
      // Add hundreds place
      if (hundredIndex > 0) formattedYear += hundreds[hundredIndex];
  
      // Handle special cases for טו and טז
      if (tenIndex === 1 && (unitIndex === 5 || unitIndex === 6)) {
        if (unitIndex === 5) formattedYear += "טו";
        else if (unitIndex === 6) formattedYear += "טז";
      } else {
        // Add tens place
        if (tenIndex > 0) formattedYear += tens[tenIndex];
        // Add units place
        if (unitIndex > 0) formattedYear += units[unitIndex];
      }
  
      // Add geresh (׳) or gershayim (״)
      if (formattedYear.length > 1) {
        // Add gershayim before the last two letters
        formattedYear =
          formattedYear.slice(0, -1) + "״" + formattedYear.slice(-1);
      } else {
        // Add geresh for single-letter years
        formattedYear += "׳";
      }
    }
  
    return `${hebrewDay} ${hebrewMonth} ${formattedYear}`;

    };
    

  const handleReturnDress = async (rowData) => {
    const confirmation = await Swal.fire({
      title: 'אישור החזרת שמלה',
      text: 'האם אתה בטוח שברצונך להחזיר את השמלה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'ביטול',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      try {
        await returnDress({ dressId: rowData.dressId, returnDate: new Date().toISOString(), userPhone: rowData.userPhone }).unwrap();
        refetch();
        Swal.fire('הצלחה', 'השמלה הוחזרה בהצלחה!', 'success');
      } catch (error) {
        Swal.fire('שגיאה', 'שגיאה בהחזרת השמלה.', 'error');
      }
    }
  };

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת הנתונים.</p>;

  const filteredAndSortedBookings = sortBookings(filterBookings());
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
  const filterOptions = [
    { label: "הצג הכל", value: "" },
    { label: "שבוע הקרוב", value: "withinWeek" },
    { label: "עבר שבוע", value: "pastWeek" },
  ];

  return (
    <div>
      <h2>רשימת שמלות מושכרות</h2>
      <div className="filters">
        <InputText
          dir="rtl"
          placeholder="חיפוש לפי שמלה, שם או טלפון"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dropdown
          options={filterOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.value)}
          placeholder="סנן לפי סטטוס"
          dir="rtl"
        />
      </div>
      <div className="sort-buttons">
        <Button label="מיין לפי תאריך" onClick={() => setSortBy("date")} />
        <Button label="מיין לפי שם שמלה" onClick={() => setSortBy("dressName")} />
        <Button label="מיין לפי טלפון" onClick={() => setSortBy("phone")} />
      </div>
  
      {filteredAndSortedBookings.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.5em", marginTop: "2em" }}>
          אין פריטים זמינים
        </p>
      ) : (
        <DataTable value={filteredAndSortedBookings} paginator rows={10} dir="rtl">
          <Column field="dressName" header="שם שמלה" />
          <Column field="userName" header="שם שוכר" />
          <Column field="userPhone" header="טלפון" />
          <Column field="date" header="תאריך השכרה (לועזי)" body={(rowData) => new Date(rowData.date).toLocaleDateString("he-IL")} />
          <Column field="jewishDate" header="תאריך השכרה (עברי)" body={(rowData) => formatHebrewDate(new Date(rowData.date))} />
          <Column 
            className="myTab" 
            body={(rowData) => {
              const today = new Date();
              const bookingDate = new Date(rowData.date);
              const dayDifference = Math.round((bookingDate - today) / (1000 * 60 * 60 * 24));
              if (dayDifference >= -7 && dayDifference <= 7) {
                return (
                  <Button 
                    className="returnBut" 
                    label="החזר שמלה" 
                    onClick={() => returnDr(rowData)} 
                  />
                );
              } else {
                return (
                                                <Button 
                                                  className="alternateBut" 
                                                  label="בטל השכרה" 
                                                  onClick={() =>cancelRent(rowData)} 
                                                />
                                              );              }
            }}
          />
        </DataTable>
      )}
    </div>
  );
  
};

export default RentedDressesList;

