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
import { toJewishDate, toGregorianDate,toHebrewJewishDate, formatJewishDateInHebrew, oHebrewJewishDate, JewishMonth} from "jewish-date";

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
    
    const date = new Date(gregorianDate); // וודא שהתאריך נכנס כ- Date תקני
    if (isNaN(date)) {
      return 'תאריך לא תקין'; // אם התאריך לא תקין
    }
  console.log("date");
  console.log(date);
  const jewishDate = toJewishDate(new Date(gregorianDate));

  const jewishDateInHebrew = toHebrewJewishDate(jewishDate);

  
  return `${jewishDateInHebrew.day} ${jewishDateInHebrew.monthName} ${jewishDateInHebrew.year}`;
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
  // const visibleBookings = filteredAndSortedBookings.slice(
  //   currentPage * rowsPerPage,
  //   (currentPage + 1) * rowsPerPage
  // );
  const visibleBookings = filteredAndSortedBookings.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  
  // const onPageChange = (e) => {
  //   setCurrentPage(e.page); // עדכון עמוד נוכחי
  //   setRowsPerPage(e.rows); // עדכון כמות שורות לעמוד
  // };
  const onPageChange = (e) => {
    setCurrentPage(e.page); // עמוד נוכחי
    if (e.rows !== rowsPerPage) {
      setRowsPerPage(e.rows); // שינוי מספר שורות
      setCurrentPage(0); // אם כמות שורות משתנה, חזור לעמוד הראשון
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
    { label: "ממתין להשכרה", value: "notYet" },
    { label:"בהשכרה", value: "atUse" },
  ];

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

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
      {/* <DataTable
  value={visibleBookings}
  paginator
  rows={rowsPerPage}
  first={currentPage * rowsPerPage} // מבוסס עמוד נוכחי
  totalRecords={filteredAndSortedBookings.length}
  onPage={(e) => onPageChange(e)}
  rowsPerPageOptions={[5, 10, 20]}
  currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} פריטים"
  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
  dir="rtl"
> */}
<DataTable value={visibleBookings} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
      {/* <DataTable
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
      > */}
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

      </DataTable>
    </div>
  );
};

export default RentedDressesList;

