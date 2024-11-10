import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ConfirmationDialog = ({ visible, onHide, onConfirm, message, header = 'Confirm Action', confirmLabel = 'Yes', cancelLabel = 'No' }) => {
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
