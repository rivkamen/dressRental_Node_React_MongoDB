import React, { useState, useEffect } from 'react';
import { useGetRentalHistoryQuery } from '../../app/rentalHistorySlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useLocation, useNavigate } from "react-router";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import hebrewDate  from 'hebrew-date';
import { toJewishDate, toGregorianDate,toHebrewJewishDate, formatJewishDateInHebrew, oHebrewJewishDate, JewishMonth} from "jewish-date";

const RentalHistory = () => {    
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetRentalHistoryQuery();
  const [sortBy, setSortBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


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
  
 

  const filterOptions = [
    { label: "הצג הכל", value: "" },
    { label: "ממתין להשכרה", value: "notYet" },
    { label: "הוחזר", value: "returned" },
    { label:"בהשכרה", value: "atUse" },
  ];

  console.log(data);
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);
    const filterBookings = () => {
      const searchLower = searchTerm.toLowerCase();
    
      return data.filter((booking) => {
        console.log("booking");
        console.log(booking);
        
        const matchesSearchTerm =
          booking.dressName.toLowerCase().includes(searchLower) ||
          booking.userName.toLowerCase().includes(searchLower) ||
          booking.userPhone.includes(searchLower);
    
        const bookingDate = new Date(booking.date);
        const notYet = booking.status==='rent'
        const atUse = booking.status==='active'
        const returned = booking.status==='returned'
        console.log(booking.status);
        
    
        if (statusFilter === "notYet") {
          return matchesSearchTerm && notYet && !atUse;
        }
    
        if (statusFilter === "atUse") {
          return matchesSearchTerm && atUse && !notYet;
        }
        if (statusFilter === "returned") {
          return matchesSearchTerm && returned;
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
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filteredAndSortedBookings = sortBookings(filterBookings());
  const visibleBookings = filteredAndSortedBookings.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );


  const onPageChange = (e) => {
    setCurrentPage(e.page); // עדכון עמוד נוכחי
    setRowsPerPage(e.rows); // עדכון כמות שורות לעמוד
  };

  return (
    <div style={{direction:'rtl'}}>
      <h2>Rental History</h2>
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
           
      {data && data.length > 0 ? (
        <DataTable responsiveLayout="scroll"
        value={visibleBookings}
        paginator
        first={currentPage * rowsPerPage} // הגדרת עמוד תחילה על פי העמוד הנוכחי
        rows={rowsPerPage}
        totalRecords={filteredAndSortedBookings.length}
        onPage={onPageChange} // שמירת עדכון נכון של עמוד
        rowsPerPageOptions={[5, 10, 20]}
        currentPageReportTemplate="מציג {first} עד {last} מתוך {totalRecords} פריטים"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        dir="rtl">
          <Column field="dressName" header="שם שמלה" />
          <Column field="dressSize" header="מידה" />
          <Column 
            field="rentalDate" 
            header="תאריך השכרה" 
            body={(rowData) => new Date(rowData.rentalDate).toLocaleDateString()} 
          />
                    <Column 
            field="rentalDate" 
            header="תאריך השכרה עברי" 
            body={(rowData) => formatHebrewDate(rowData.rentalDate)} 
          />
          <Column 
            field="userName" 
            header="משתמש" 
            body={(rowData) => rowData.userName || 'Unknown'} 
          />
          <Column 
            field="userPhone" 
            header="טלפון" 
            body={(rowData) => rowData.userPhone || 'Unknown'} 
          />
          <Column 
            field="status" 
            header="סטטוס הזמנה" 
            body={(rowData) => (rowData.status=="returned" ? 'הוחזר' :rowData.status=="active"?'בשימוש': 'הוזמן')} 
          />

        </DataTable>
      ) : (
        <p>No rental history available.</p>
      )}
    </div>
  );
};

export default RentalHistory;

