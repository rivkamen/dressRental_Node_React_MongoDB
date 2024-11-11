

// // export default Dressm;
// // import React, { useState } from 'react';
// // import { Button } from 'primereact/button';
// // import { Card } from 'primereact/card';
// // import { useNavigate } from 'react-router-dom';
// // import { useDeleteDressMutation } from '../../app/dressApiSlice';


// // import { Dialog } from 'primereact/dialog';
// // import EditDress from './EditDress';
// // import './Dressm.css';
// // const Dressm = (props) => {
// //     const { dress } = props;
// //     const [visible, setVisible] = useState(false);
// //     const navigate = useNavigate();



// //     const [editVisible,setEditVisible]=useState('')

// //  const [deleteFuncDress,{data:del,isError,error,isSuccess}]=useDeleteDressMutation()
// //  const handleNavigate = () => {
// //     navigate('/rentm', { state: { dress: dress } });
// // };

// //  const deleteDress=async()=>{
// // await deleteFuncDress(dress._id)
// //  }
// //       const fileName = dress?.images?.[0].split("\\").pop();

// //       const imageUrl = `http://localhost:3435/upload/${fileName}`;

// //     return (
// //         <>


// // <div
// //   className="p-mb-3 dress-item"
// //   key={dress.id}
// //   style={{
// //     border: 'none',
// //     // borderRadius: '5px',
// //     width: '250px',
// //     height: '450px', // Set a consistent height
// //     display: 'flex',
// //     flexDirection: 'column',
// //     justifyContent: 'space-between', // Ensure content is evenly distributed
// //     padding: '15px',
// //     // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
// //   }}
// // >
// //   <div className="p-grid p-align-center">
// //     <div className="p-col">
// //       <img
// //         className="dress-image"
// //         src={imageUrl}
// //         alt={dress.name}
// //         style={{
// //           width: '100%',
// //           height: '200px', // Control image height
// //           objectFit: 'cover', // Ensure images have the same dimensions
// //           borderRadius: '5px',
// //         }}
// //       />
// //     </div>
// //     <div className="p-col">
// //       <div className="dress-info">
// //         <div className="text-xl font-bold text-900">{dress.name}</div>
// //         <div className="text-sm text-700">{dress.description}</div>
// //       </div>
// //     </div>
// //   </div>
// //   <div className="p-col dress-buttons">
// //     <div className="button-group">
// //       <Button label="עריכת שמלה" icon="pi pi-pencil" onClick={() => setEditVisible(true)} />
// //       <Button label="מחיקה" className="p-button-rounded p-button-danger" onClick={deleteDress} />
// //       <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
// //     </div>
// //   </div>
// // </div>


// //          <Dialog children="card" header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
// //          <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
// //       </Dialog>
// //       </>
// //     );
// // };

// // export default Dressm;
// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { useDeleteDressMutation } from '../../app/dressApiSlice';
// import { Dialog } from 'primereact/dialog';
// import EditDress from './EditDress';
// import './Dressm.css';

// const Dressm = (props) => {
//     const { dress } = props;
//     const [editVisible, setEditVisible] = useState(false);
//     const navigate = useNavigate();
//     const [deleteFuncDress] = useDeleteDressMutation();

//     const handleNavigate = () => {
//         navigate('/rentm', { state: { dress: dress } });
//     };

//     const deleteDress = async () => {
//         await deleteFuncDress(dress._id);
//     };

//     const fileName = dress?.images?.[0].split("\\").pop();
//     const imageUrl = `http://localhost:3435/upload/${fileName}`;

//     return (
//         <>
//             <div
//                 className="p-mb-3 dress-item"
//                 key={dress.id}
//                 style={{
//                     border: 'none',
//                     width: '250px',
//                     height: '450px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                     padding: '15px',
//                 }}
//             >
//                 <div className="p-grid p-align-center">
//                     <div className="p-col image-container">
//                         <img
//                             className="dress-image"
//                             src={imageUrl}
//                             alt={dress.name}
//                         />
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
//                         <Button label="מחיקה" className="p-button-rounded p-button-danger" onClick={deleteDress} />
//                         <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
//                     </div>
//                 </div>
//             </div>

//             <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
//                 <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
//             </Dialog>
//         </>
//     );
// };

// export default Dressm;
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDeleteDressMutation } from '../../app/dressApiSlice';
import { Dialog } from 'primereact/dialog';
import EditDress from './EditDress';
import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component
import './Dressm.css';

const Dressm = (props) => {
    const { dress } = props;
    const [editVisible, setEditVisible] = useState(false);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // State for delete confirmation dialog
    const navigate = useNavigate();
    const [deleteFuncDress] = useDeleteDressMutation();

    const handleNavigate = () => {
        navigate('/rentm', { state: { dress: dress } });
    };

    const deleteDress = async () => {
        await deleteFuncDress(dress._id);
        setIsConfirmationVisible(false); // Hide confirmation dialog after delete
    };

    const fileName = dress?.images?.[0].split("\\").pop();
    const imageUrl = `http://localhost:3435/upload/${fileName}`;

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
                        <img
                            className="dress-image"
                            src={imageUrl}
                            alt={dress.name}
                        />
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
                            onClick={() => setIsConfirmationVisible(true)} // Show confirmation dialog
                        />
                        <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
                    </div>
                </div>
            </div>

            <Dialog header="ערוך" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                <EditDress dress={dress} handleCloseDialog={() => setEditVisible(false)} />
            </Dialog>

            {/* Confirmation Dialog for Delete */}
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
