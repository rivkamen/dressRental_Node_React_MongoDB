
// // import React, { useState } from 'react';
// // import { Button } from 'primereact/button';
// // import { useNavigate } from 'react-router-dom';
// // import { useDeleteDressMutation } from '../../app/dressApiSlice';
// // import { Dialog } from 'primereact/dialog';
// // import { Carousel } from 'primereact/carousel';
// // import EditDress from './EditDress';
// // import ConfirmationDialog from './ConfirmationDialog';
// // import './Dressm.css';

// // const Dressm = (props) => {
// //     const { dress } = props;
// //     const [editVisible, setEditVisible] = useState(false);
// //     const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
// //     const navigate = useNavigate();
// //     const [deleteFuncDress] = useDeleteDressMutation();

// //     const handleNavigate = () => {
// //         navigate('/rentm', { state: { dress: dress } });
// //     };

// //     const deleteDress = async () => {
// //         await deleteFuncDress(dress._id);
// //         setIsConfirmationVisible(false);
// //     };

// //     // Render each image for the carousel
// //     const renderGalleryItem = (image) => {
// //         const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
// //         return (
// //             <img
// //                 className="dress-gallery-image"
// //                 src={imageUrl}
// //                 alt={dress.name}
// //                 style={{
// //                     width: '100%',
// //                     height: 'auto', // Same height for consistency
// //                     objectFit: 'contain', // Ensure the image scales proportionally
// //                     padding: '10px', // Add some padding for a cleaner look
// //                     backgroundColor: '#f9f9f9' // Optional: background color for better visibility
// //                 }}
// //             />
// //         );
// //     };

// //     return (
// //         <>
// //             <div
// //                 className="p-mb-3 dress-item"
// //                 key={dress.id}
// //                 style={{
// //                     border: 'none',
// //                     width: '250px',
// //                     height: '450px',
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     justifyContent: 'space-between',
// //                     padding: '15px',
// //                 }}
// //             >
// //                 <div className="p-grid p-align-center">
// //                     <div className="p-col image-container">
// //                         {dress.images && dress.images.length > 1 ? (
// //                             // If more than one image, show carousel
// //                             <Carousel
// //                                 value={dress.images}
// //                                 itemTemplate={renderGalleryItem}
// //                                 numVisible={1}
// //                                 numScroll={1}
// //                             />
// //                         ) : (
// //                             // If only one image, show it without carousel
// //                             dress.images?.length === 1 && (
// //                                 <img
// //                                     className="dress-image"
// //                                     src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
// //                                     alt={dress.name}
// //                                     style={{
// //                                         width: '100%',
// //                                         height: 'auto', // Ensure height is consistent
// //                                         objectFit: 'contain', // Keep images proportional
// //                                         padding: '10px',
// //                                     }}
// //                                 />
// //                             )
// //                         )}
// //                     </div>
// //                     <div className="p-col">
// //                         <div className="dress-info">
// //                             <div className="text-xl font-bold text-900">{dress.name}</div>
// //                             <div className="text-sm text-700">{dress.description}</div>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="p-col dress-buttons">
// //                     <div className="button-group">
// //                         <Button label="עריכת שמלה" icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
// //                         <Button
// //                             label="מחיקה"
// //                             className="p-button-rounded p-button-danger"
// //                             onClick={() => setIsConfirmationVisible(true)}
// //                         />
// //                         <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
// //                     </div>
// //                 </div>
// //             </div>

// //             <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
// //                 <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
// //             </Dialog>

// //             <ConfirmationDialog
// //                 visible={isConfirmationVisible}
// //                 onHide={() => setIsConfirmationVisible(false)}
// //                 onConfirm={deleteDress}
// //                 message={`${dress.name} האם אתה בטוח שברצונך למחוק את השמלה ?`}
// //                 header="מחיקה"
// //                 confirmLabel="כן, מחק"
// //                 cancelLabel="בטל"
// //             />
// //         </>
// //     );
// // };

// // export default Dressm;


// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { useDeleteDressMutation } from '../../app/dressApiSlice';
// import { Dialog } from 'primereact/dialog';
// import { Carousel } from 'primereact/carousel';
// import EditDress from './EditDress';
// import ConfirmationDialog from './ConfirmationDialog';
// import './Dressm.css';

// const Dressm = (props) => {
//     const { dress } = props;
//     const [editVisible, setEditVisible] = useState(false);
//     const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
//     const navigate = useNavigate();
//     const [deleteFuncDress] = useDeleteDressMutation();

//     const handleNavigate = () => {
//         navigate('/rentm', { state: { dress: dress } });
//     };

//     const deleteDress = async () => {
//         await deleteFuncDress(dress._id);
//         setIsConfirmationVisible(false);
//     };

//     // Render each image for the carousel
//     const renderGalleryItem = (image) => {
//         const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
//         return (
//             <img
//                 className="dress-gallery-image"
//                 src={imageUrl}
//                 alt={dress.name}
//                 style={{
//                     width: '100%',
//                     height: 'auto', // Ensures the height remains proportional
//                     objectFit: 'cover', // Ensure image fills the container without distortion
//                     padding: '10px', // Optional: Padding for spacing
//                     backgroundColor: '#f9f9f9', // Optional: Background color for clarity
//                 }}
//             />
//         );
//     };

//     return (
//         <>
//             <div
//                 className="p-mb-3 dress-item"
//                 key={dress.id}
//                 style={{
//                     border: 'none',
//                     width: '300px', // Set the width to a consistent value for all cards
//                     height: '450px', // Fixed height for consistency
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     padding: '15px',
//                 }}
//             >
//                 <div className="p-grid p-align-center">
//                     <div className="p-col image-container" style={{ height: '70%' }}>
//                         {dress.images && dress.images.length > 1 ? (
//                             // If more than one image, show carousel
//                             <Carousel
//                                 value={dress.images}
//                                 itemTemplate={renderGalleryItem}
//                                 numVisible={1}
//                                 numScroll={1}
//                                 style={{
//                                     width: '100%', // Ensure carousel takes the full width of the container
//                                     height: '100%', // Ensure carousel container is the same height as the parent
//                                 }}
//                             />
//                         ) : (
//                             // If only one image, show it without carousel
//                             dress.images?.length === 1 && (
//                                 <img
//                                     className="dress-image"
//                                     src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
//                                     alt={dress.name}
//                                     style={{
//                                         width: '100%',
//                                         height: 'auto',
//                                         objectFit: 'cover', // Ensure image fills the space correctly
//                                         padding: '10px',
//                                     }}
//                                 />
//                             )
//                         )}
//                     </div>
//                     <div className="p-col">
//                         <div className="dress-info">
//                             <div className="text-xl font-bold text-900">{dress.name}</div>
//                             <div className="text-sm text-700">{dress.description}</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-col dress-buttons">
//                     <div className="button-group">
//                         <Button label="עריכת שמלה" icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
//                         <Button
//                             label="מחיקה"
//                             className="p-button-rounded p-button-danger"
//                             onClick={() => setIsConfirmationVisible(true)}
//                         />
//                         <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
//                     </div>
//                 </div>
//             </div>

//             <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
//                 <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
//             </Dialog>

//             <ConfirmationDialog
//                 visible={isConfirmationVisible}
//                 onHide={() => setIsConfirmationVisible(false)}
//                 onConfirm={deleteDress}
//                 message={`${dress.name} האם אתה בטוח שברצונך למחוק את השמלה ?`}
//                 header="מחיקה"
//                 confirmLabel="כן, מחק"
//                 cancelLabel="בטל"
//             />
//         </>
//     );
// };

// export default Dressm;


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

    const renderGalleryItem = (image) => {
        const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <img
                    className="dress-gallery-image"
                    src={imageUrl}
                    alt={dress.name}
                    style={{
                        maxHeight: '250px',      // Consistent max height for all images
                        maxWidth: '100%',        // Max width as per container
                        objectFit: 'contain',    // Ensures no cropping
                        padding: '2px',         // Optional padding for clarity
                    }}
                />
            </div>
        );
    };
    
    return (
        <>
            <div
                className="p-mb-3 dress-item"
                key={dress.id}
                style={{
                    border: 'none',
                    width: '300px', // Set the width to a consistent value for all cards
                    height: '550px', // Fixed height for consistency
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px',
                }}
            >
                

<div className="p-grid p-align-center">
    <div className="p-col image-container" style={{ marginBottom: '10px' }}>
        {dress.images && dress.images.length > 1 ? (
          <div
          style={{
              width: '100%',
              height: '270px', // Consistent container height to fit images and indicators
              position: 'relative', // Enable absolute positioning of indicators
              display: 'flex',
              alignItems: 'center', // Center image vertically
              justifyContent: 'center', // Center image horizontally
          }}
      >
          <Carousel
              value={dress.images}
              itemTemplate={renderGalleryItem}
              numVisible={1}
              numScroll={1}
              indicatorsContentClassName="carousel-indicators"
          />
      </div>
      
        ) : (
            dress.images?.length === 1 && (
              

<img
    className="dress-image"
    src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
    alt={dress.name}
    style={{
        maxHeight: '250px',      // Consistent height for all images
        maxWidth: '100%',        // Max width for the container
        objectFit: 'contain',    // Ensures no cropping
        padding: '5px',          // Padding inside the border
        display: 'block',
        margin: '0 auto',        // Center the image horizontally
    }}
/>


            )
        )}
    </div>
    <div className="p-col" style={{ paddingTop: '10px' }}>
        <div className="dress-info">
            <div className="text-xl font-bold text-900" >{dress.name}</div>
            <div className="text-sm text-700">{dress.description}</div>
        </div>
    </div>
</div>


                <div className="p-col dress-buttons">
                    <div className="button-group">
                        <Button style={{width:'60px', height:'60px', backgroundColor:'inherit', color:'black'}} icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
                        <Button style={{width:'60px', height:'60px'}}
                            icon="pi pi-trash"
                            // className="p-button-rounded p-button-danger"
                            onClick={() => setIsConfirmationVisible(true)}
                        />
                        <Button label="לפרטים והשכרה"  onClick={handleNavigate} />
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


// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { useDeleteDressMutation } from '../../app/dressApiSlice';
// import { Dialog } from 'primereact/dialog';
// import { Carousel } from 'primereact/carousel';
// import EditDress from './EditDress';
// import ConfirmationDialog from './ConfirmationDialog';
// import './Dressm.css';

// const Dressm = (props) => {
//     const { dress } = props;
//     const [editVisible, setEditVisible] = useState(false);
//     const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
//     const navigate = useNavigate();
//     const [deleteFuncDress] = useDeleteDressMutation();

//     const handleNavigate = () => {
//         navigate('/rentm', { state: { dress: dress } });
//     };

//     const deleteDress = async () => {
//         await deleteFuncDress(dress._id);
//         setIsConfirmationVisible(false);
//     };

//     // Render each image for the carousel
//     const renderGalleryItem = (image) => {
//         const imageUrl = `http://localhost:3435/upload/${image.split("\\").pop()}`;
//         return (
//             <img
//                 className="dress-gallery-image"
//                 src={imageUrl}
//                 alt={dress.name}
//                 style={{
//                     width: '100%',
//                     height: 'auto', // Keep the height consistent
//                     objectFit: 'contain', // Maintain aspect ratio
//                     padding: '10px', // Add padding for better spacing
//                     backgroundColor: '#f9f9f9' // Optional: background color for clarity
//                 }}
//             />
//         );
//     };

//     return (
//         <>
//             <div
//                 className="p-mb-3 dress-item"
//                 key={dress.id}
//                 style={{
//                     border: 'none',
//                     width: '350px', // Increased width for larger images
//                     height: '500px', // Adjusted height to match image size
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     padding: '15px',
//                 }}
//             >
//                 <div className="p-grid p-align-center">
//                     <div className="p-col image-container">
//                         {dress.images && dress.images.length > 1 ? (
//                             // If more than one image, show carousel
//                             <Carousel
//                                 value={dress.images}
//                                 itemTemplate={renderGalleryItem}
//                                 numVisible={1}
//                                 numScroll={1}
//                                 style={{
//                                     width: '100%', // Ensure carousel is the full width of the parent
//                                     height: 'auto', // Let the carousel adjust its height
//                                 }}
//                             />
//                         ) : (
//                             // If only one image, show it without carousel
//                             dress.images?.length === 1 && (
//                                 <img
//                                     className="dress-image"
//                                     src={`http://localhost:3435/upload/${dress.images[0].split("\\").pop()}`}
//                                     alt={dress.name}
//                                     style={{
//                                         width: '100%',
//                                         height: 'auto', // Adjust to keep the image size consistent
//                                         objectFit: 'contain',
//                                         padding: '10px',
//                                     }}
//                                 />
//                             )
//                         )}
//                     </div>
//                     <div className="p-col">
//                         <div className="dress-info">
//                             <div className="text-xl font-bold text-900">{dress.name}</div>
//                             <div className="text-sm text-700">{dress.description}</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-col dress-buttons">
//                     <div className="button-group">
//                         <Button label="עריכת שמלה" icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
//                         <Button
//                             label="מחיקה"
//                             className="p-button-rounded p-button-danger"
//                             onClick={() => setIsConfirmationVisible(true)}
//                         />
//                         <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
//                     </div>
//                 </div>
//             </div>

//             <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
//                 <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
//             </Dialog>

//             <ConfirmationDialog
//                 visible={isConfirmationVisible}
//                 onHide={() => setIsConfirmationVisible(false)}
//                 onConfirm={deleteDress}
//                 message={`${dress.name} האם אתה בטוח שברצונך למחוק את השמלה ?`}
//                 header="מחיקה"
//                 confirmLabel="כן, מחק"
//                 cancelLabel="בטל"
//             />
//         </>
//     );
// };

// export default Dressm;
