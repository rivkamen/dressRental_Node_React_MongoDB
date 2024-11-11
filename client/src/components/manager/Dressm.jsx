
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDeleteDressMutation } from '../../app/dressApiSlice';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import EditDress from './EditDress';
import ConfirmationDialog from './ConfirmationDialog';
import './Dressm.css';

const Dressm = (props) => {
    const { dress } = props;
    const [editVisible, setEditVisible] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const navigate = useNavigate();
    const [deleteFuncDress] = useDeleteDressMutation();

    const handleNavigate = () => {
        navigate('/rentm', { state: { dress: dress } });
    };

    const deleteDress = async () => {
        await deleteFuncDress(dress._id);
        setIsConfirmationVisible(false);
    };

    // Render each image for the carousel
    const renderGalleryItem = (image) => {
        const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
        return (
            <img
                className="dress-gallery-image"
                src={imageUrl}
                alt={dress.name}
                style={{
                    width: '100%',
                    height: 'auto', // Same height for consistency
                    objectFit: 'contain', // Ensure the image scales proportionally
                    padding: '10px', // Add some padding for a cleaner look
                    backgroundColor: '#f9f9f9' // Optional: background color for better visibility
                }}
            />
        );
    };

    return (
        <>
            <div
                className="p-mb-3 dress-item"
                key={dress.id}
                style={{
                    border: 'none',
                    width: '250px',
                    height: '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px',
                }}
            >
                <div className="p-grid p-align-center">
                    <div className="p-col image-container">
                        {dress.images && dress.images.length > 1 ? (
                            // If more than one image, show carousel
                            <Carousel
                                value={dress.images}
                                itemTemplate={renderGalleryItem}
                                numVisible={1}
                                numScroll={1}
                            />
                        ) : (
                            // If only one image, show it without carousel
                            dress.images?.length === 1 && (
                                <img
                                    className="dress-image"
                                    src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
                                    alt={dress.name}
                                    style={{
                                        width: '100%',
                                        height: 'auto', // Ensure height is consistent
                                        objectFit: 'contain', // Keep images proportional
                                        padding: '10px',
                                    }}
                                />
                            )
                        )}
                    </div>
                    <div className="p-col">
                        <div className="dress-info">
                            <div className="text-xl font-bold text-900">{dress.name}</div>
                            <div className="text-sm text-700">{dress.description}</div>
                        </div>
                    </div>
                </div>
                <div className="p-col dress-buttons">
                    <div className="button-group">
                        <Button label="עריכת שמלה" icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
                        <Button
                            label="מחיקה"
                            className="p-button-rounded p-button-danger"
                            onClick={() => setIsConfirmationVisible(true)}
                        />
                        <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
                    </div>
                </div>
            </div>

            <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
            </Dialog>

            <ConfirmationDialog
                visible={isConfirmationVisible}
                onHide={() => setIsConfirmationVisible(false)}
                onConfirm={deleteDress}
                message={`${dress.name} האם אתה בטוח שברצונך למחוק את השמלה ?`}
                header="מחיקה"
                confirmLabel="כן, מחק"
                cancelLabel="בטל"
            />
        </>
    );
};

export default Dressm;
