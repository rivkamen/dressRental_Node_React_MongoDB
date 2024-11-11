import React from 'react';
import { useGetAllBookedDatesQuery } from '../../app/dressApiSlice';

const RentedDressesList = ()=> {
  const { data: bookedDates, error, isLoading } = useGetAllBookedDatesQuery();

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת נתוני השמלות המושכרות.</p>;

  return (
    <div>
      <h2>רשימת שמלות מושכרות</h2>
      <table>
        <thead>
          <tr>
            <th>שם שמלה</th>
            <th>שוכר/ת</th>
            <th>תאריך השכרה</th>
          </tr>
        </thead>
        <tbody>
          {bookedDates.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.dress.name}</td>
              <td>{booking.user.name}</td>
              <td>{new Date(booking.date).toLocaleDateString('he-IL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RentedDressesList;
