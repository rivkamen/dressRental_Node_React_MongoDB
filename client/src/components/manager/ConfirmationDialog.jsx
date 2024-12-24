import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from "react-router";

const ConfirmationDialog = ({ visible, onHide, onConfirm, message, header = 'Confirm Action', confirmLabel = 'Yes', cancelLabel = 'No' }) => {
              const location = useLocation();
              const navigate = useNavigate();
    useEffect(() => {
               const token = sessionStorage.getItem('adminToken');
               if (!token) {
                   navigate('/');
               }
           }, [navigate]);
    return (
        <Dialog 
            visible={visible} 
            style={{ width: '30vw' }} 
            header={header} 
            modal 
            footer={() => (
                <div>
                    <Button label={confirmLabel} icon="pi pi-check" onClick={onConfirm} className="p-button-danger" />
                    <Button label={cancelLabel} icon="pi pi-times" onClick={onHide} className="p-button-secondary" />
                </div>
            )} 
            onHide={onHide}
        >
            <p>{message}</p>
        </Dialog>
    );
};

export default ConfirmationDialog;
