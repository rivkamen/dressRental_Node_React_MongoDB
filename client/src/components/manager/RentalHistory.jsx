import React from 'react';
import { useGetRentalHistoryQuery } from '../../app/rentalHistorySlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const RentalHistory = () => {
  const { data, error, isLoading } = useGetRentalHistoryQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div>
      <h2>Rental History</h2>
      {data && data.length > 0 ? (
        <DataTable value={data} responsiveLayout="scroll">
          <Column field="dressName" header="Dress Name" />
          <Column field="dressSize" header="Dress Size" />
          <Column 
            field="rentalDate" 
            header="Rental Date" 
            body={(rowData) => new Date(rowData.rentalDate).toLocaleDateString()} 
          />
          <Column 
            field="userName" 
            header="User" 
            body={(rowData) => rowData.userName || 'Unknown'} 
          />
          <Column 
            field="userPhone" 
            header="Phone" 
            body={(rowData) => rowData.userPhone || 'Unknown'} 
          />
          <Column 
            field="isReturned" 
            header="Returned" 
            body={(rowData) => (rowData.isReturned ? 'Yes' : 'No')} 
          />
          <Column 
            field="isCurrent" 
            header="Current Rental" 
            body={(rowData) => (rowData.isCurrent ? 'Yes' : 'No')} 
          />
        </DataTable>
      ) : (
        <p>No rental history available.</p>
      )}
    </div>
  );
};

export default RentalHistory;

