


import React, { useState, useEffect } from 'react';
import { useCancelRentDressMutation, useGetAllBookedDatesQuery, useReturnDressMutation,useRentingDressMutation } from "../../app/dressApiSlice";
import { HDate } from "@hebcal/core";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

import './RentedDressesList.css';

const RentedDressesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: bookedDates = [], error, isLoading, refetch } = useGetAllBookedDatesQuery();
  const [returnDress] = useReturnDressMutation();
  const [rentingDress] = useRentingDressMutation();
  const [cancelRentFunc] = useCancelRentDressMutation();

  useEffect(() => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  
  const filterBookings = () => {
    const searchLower = searchTerm.toLowerCase();
  
    return bookedDates.filter((booking) => {
      console.log("booking");
      console.log(booking);
      
      const matchesSearchTerm =
        booking.dressName.toLowerCase().includes(searchLower) ||
        booking.userName.toLowerCase().includes(searchLower) ||
        booking.userPhone.includes(searchLower);
  
      const bookingDate = new Date(booking.date);
      const notYet = booking.status==='rent'
      const atUse = booking.status==='active'
  
      if (statusFilter === "notYet") {
        return matchesSearchTerm && notYet && !atUse;
      }
  
      if (statusFilter === "atUse") {
        return matchesSearchTerm && atUse && !notYet;
      }
  
      // Show all if no specific filter is applied
      return matchesSearchTerm;
    });
  };
  

  const sortBookings = (bookings) => {
    if (!sortBy) return bookings;

    return [...bookings].sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "dressName") return a.dressName.localeCompare(b.dressName);
      if (sortBy === "phone") return a.userPhone.localeCompare(b.userPhone);
      return 0;
    });
  };

  const formatHebrewDate = (gregorianDate) => {
    const hdate = new HDate(gregorianDate);
    const hebrewDay = hebrewNumbers(hdate.getDate());

    const monthNames = {
      Tishrei: "תשרי",
      Cheshvan: "חשוון",
      Kislev: "כסלו",
      Tevet: "טבת",
      "Sh'vat": "שבט",
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
      console.log(rowData);

      try {
        await returnDress({id:rowData.id,dress:{dressId: rowData.dressId, date: rowData.date, userId: rowData.userId._id}}).unwrap();
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
  const visibleBookings = filteredAndSortedBookings.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const onPageChange = (e) => {
    setCurrentPage(e.page); // עדכון עמוד נוכחי
    setRowsPerPage(e.rows); // עדכון כמות שורות לעמוד
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
        await cancelRentFunc({
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
  const activeRent = async (rowData) => {
    const confirmation = await Swal.fire({
      title: 'אישור ביטול השכרה',
      text: 'האם אתה בטוח שברצונך לקחת את השמלה?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן, לקח שמלה ',
      cancelButtonText: 'ביטול',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      try {
        await rentingDress({
          id: rowData.id,
          dress: {
            date: rowData.date,
            userId: rowData.userId._id,
            dressId: rowData.dressId,
          },
        }).unwrap();
        refetch();
        Swal.fire('אושר!', 'שמלה נלקחה בהצלחה ', 'success');
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
    { label: "בעתיד", value: "notYet" },
    { label:"בבית הלקוח", value: "atUse" },
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
          placeholder="פילטר לפי סטטוס"
        />
      </div>
     
      <DataTable
        value={visibleBookings}
        paginator
        first={currentPage * rowsPerPage} // הגדרת עמוד תחילה על פי העמוד הנוכחי
        rows={rowsPerPage}
        totalRecords={filteredAndSortedBookings.length}
        onPage={onPageChange} // שמירת עדכון נכון של עמוד
        rowsPerPageOptions={[5, 10, 20]}
        currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} פריטים"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        dir="rtl"
      >
        <Column sortable field="dressName" header="שם שמלה"  />
        <Column field="userName" header="שם משתמש" sortable />
        <Column field="userPhone" header="טלפון" sortable />
        <Column
          field="date"
          header="תאריך עברי"
          body={(rowData) => formatHebrewDate(new Date(rowData.date))}
          sortable
        />
        <Column
          field="date"
          header="תאריך לועזי"
          body={(rowData) => new Date(rowData.date).toLocaleDateString("he-IL")}
          sortable
        />
{/* <Column
  header="פעולות"
  body={(rowData) => {
    const isActive = rowData.status === "active";
console.log(rowData.status);

    return (
      <div>
        {isActive&&
        <Button
          icon="pi pi-refresh"
          onClick={() => handleReturnDress(rowData)}
          className="p-button-success p-mr-2"
          disabled={!isActive}
        />}
         {!isActive&&
        <Button
          icon="pi pi-times"
          onClick={() => cancelRent(rowData)}
          className="p-button-danger"
          style={{ marginRight: "2%" }}
          disabled={isActive}
        />}
         {!isActive&&
        <Button
          icon="pi pi-home"
          onClick={() => activeRent(rowData)}
          className="p-button-danger"
          style={{ marginRight: "2%" }}
          disabled={isActive}
        />}
      </div>
    );
  }}
/> */}
{/* <Column
  header="פעולות"
  body={(rowData) => {
    const isActive = rowData.status === "active";

    return (
      <div className="action-buttons">
        {isActive && (
          <Button
            icon="pi pi-refresh"
            label="החזר שמלה"
            onClick={() => handleReturnDress(rowData)}
            className="p-button-success"
            disabled={!isActive}
          />
        )}
        {!isActive && (
          <>
            <Button 
            label=" בטל השכרה "
              icon="pi pi-times"
              
              onClick={() => cancelRent(rowData)}
              className="p-button-danger"
              disabled={isActive}
            />
            <Button
              icon="pi pi-home"
              label="לקח שמלה"
              onClick={() => activeRent(rowData)}
              className="p-button-primary"
              disabled={isActive}
            />
          </>
        )}
      </div>
    );
  }}
/> */}
<Column
  header="פעולות"
  body={(rowData) => {
    const isActive = rowData.status === "active";

    return (
      <div className="action-buttons">
        {isActive && (
          <Button style={{ backgroundColor:'rgb(83, 81, 81)'}}
            icon="pi pi-refresh"
            label="החזר שמלה"
            onClick={() => handleReturnDress(rowData)}
            className="p-button-success"
            disabled={!isActive}
            
          />
        )}
        {!isActive && (
          <>
            
            <Button
              icon="pi pi-home"
              label="לקיחת שמלה"
              onClick={() => activeRent(rowData)}
              className="p-button-primary"
              disabled={isActive}
            />
            <Button style={{border:'1px solid rgb(213, 1, 118)', backgroundColor:'lightgray', color:'rgb(213, 1, 118)'}}
              icon="pi pi-times"
              label="ביטול השכרה"
              onClick={() => cancelRent(rowData)}
              className="p-button-danger"
              disabled={isActive}
            />
          </>
        )}
      </div>
    );
  }}
/>

        {/* <Column
          header="פעולות"
          body={(rowData) => (
            <div>
              <Button
                icon="pi pi-refresh"
                onClick={() => handleReturnDress(rowData)}
                className="p-button-success p-mr-2"
              />
              <Button
                icon="pi pi-times"
                onClick={() => cancelRent(rowData)}
                className="p-button-danger"
                style={{ marginRight: "2%" }}
              />
                <Button
                icon="pi pi-home"
                onClick={() => activeRent(rowData)}
                className="p-button-danger"
                style={{ marginRight: "2%" }}
              />
            </div>
          )}
        /> */}
      </DataTable>
    </div>
  );
};

export default RentedDressesList;

