
// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from 'primereact/button';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dropdown } from 'primereact/dropdown';
// import { InputText } from 'primereact/inputtext';
// import { useFormik } from 'formik';
// import { useUpdateDressMutation } from '../../app/dressApiSlice';
// import { classNames } from 'primereact/utils';
// import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component
// import Swal from "sweetalert2";

// const EditDress = (props) => {
//     const { handleCloseDialog, dress } = props;
//     const [sizesData, setSizesData] = useState([]);
//     const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // State for the confirmation dialog visibility
//     const [editDressFunc] = useUpdateDressMutation();
//     const toast = useRef(null);

//     const genderOptions = [
//         { label: 'נשים', value: 'women' },
//         { label: 'בנות', value: 'girls' }
//     ];

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: dress?.name || '',
//             description: dress?.description || '',
//         },
//         validate: (data) => {
//             let errors = {};
//             if (!data.name) {
//                 errors.name = 'Required';
//             }
//             if (!sizesData.length) {
//                 errors.sizes = 'At least one size required';
//             }
//             return errors;
//         },
//         onSubmit: async () => {
//             setIsConfirmationVisible(true); // Show the confirmation dialog instead of immediately submitting
//         }
//     });

//     useEffect(() => {
//         if (dress && dress.dressListSizes) {
//             setSizesData(dress.dressListSizes);
//         }
//     }, [dress]);

//     const addSize = () => {
//         setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
//     };

//     const deleteSize = (index) => {
//         const updatedSizes = sizesData.filter((_, i) => i !== index);
//         setSizesData(updatedSizes);
//     };

//     const updateSizeData = (index, field, value) => {
//         const updatedSizes = structuredClone(sizesData); 
//         updatedSizes[index][field] = value;
//         setSizesData(updatedSizes);
//     };

//     const confirmEdit = async () => {
//         try {
//             await editDressFunc({
//                 id: dress._id,
//                 dress: {
//                     name: formik.values.name,
//                     description: formik.values.description,
//                     dressListSizes: sizesData.map(size => ({
//                         key: size.key,
//                         size: size.size,
//                         dresses: Array(size.qty).fill({ renteDates: [] })
//                     }))
//                 }
//             }).unwrap();

//             handleCloseDialog();
//             setIsConfirmationVisible(false);
//         } catch (error) {
//             if (error?.status === 409) {
//                 Swal.fire({
//                     title: 'Conflict Error',
//                     text: 'The dress already exists with the same name. Please choose a different name.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             } else {
//                 Swal.fire({
//                     title: 'Error',
//                     text: error?.data?.message || 'An unexpected error occurred. Please try again.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//             setIsConfirmationVisible(false);
//         }
//     };

//     const cancelEdit = () => {
//         setIsConfirmationVisible(false);
//     };

//     if (!dress) return <p>Loading dress data...</p>;

//     return (
//         <form onSubmit={formik.handleSubmit} >
//             <div className="field">
//                 <InputText
//                     placeholder="שם השמלה"
//                     value={formik.values.name}
//                     name="name"
//                     className={classNames({ 'p-invalid': formik.errors.name })}
//                     onChange={(e) => formik.setFieldValue('name', e.target.value)}
//                 />
//                 {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
//             </div>

//             <div className="field">
//                 <InputText
//                     placeholder="תיאור"
//                     value={formik.values.description}
//                     name="description"
//                     onChange={(e) => formik.setFieldValue('description', e.target.value)}
//                 />
//             </div>

//             <div>
//                 <Button label="Add Size" type="button" onClick={addSize} />
//                 <br /><br />
//                 {sizesData.length > 0 ? (
//                     sizesData.map((size, index) => (
//                         <div key={index} className="field" style={{ display: 'flex', alignItems: 'center' }}>
//                             <InputText
//                                 placeholder="מידה"
//                                 value={size.key}
//                                 onChange={(e) => updateSizeData(index, 'key', e.target.value)}
//                             />
//                             <Dropdown
//                                 value={size.size}
//                                 options={genderOptions}
//                                 onChange={(e) => updateSizeData(index, 'size', e.value)}
//                                 placeholder="נשים/בנות"
//                             />

//                                 <InputNumber
//                                 value={size?.dresses?.length || ''}
//                                 onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
//                                 mode="decimal"
//                                 min={0}
//                                 placeholder="כמות"
//                             />
//                             <Button 
//                                 icon="pi pi-trash" 
//                                 className="p-button-danger p-button-text" 
//                                 onClick={() => deleteSize(index)} 
//                             />
//                         </div>
//                     ))
//                 ) : (
//                     <p>No sizes available. Add a size to start.</p>
//                 )}
//             </div>

//             <Button type="submit" label="אשר" />
//             <Button type="button" label="בטל" className="p-button-secondary" onClick={handleCloseDialog} />

//             <ConfirmationDialog 
//                 visible={isConfirmationVisible}
//                 onHide={cancelEdit}
//                 onConfirm={confirmEdit}
//                 message="האם הנך מאשר את השינויים שביצעת בשמלה"
//                 header="Confirm Edit"
//                 confirmLabel="כן, אשר"
//                 cancelLabel="בטל"
//             />
//         </form>
//     );
// };

// export default EditDress;

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { useUpdateDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';
import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component
import Swal from "sweetalert2";
import { FileUpload } from 'primereact/fileupload';
import { useLocation, useNavigate } from "react-router";
import { Toast } from 'primereact/toast'; // Import Toast component
import './EditDress.css'
const formData = new FormData();

const EditDress = (props) => {
    const { handleCloseDialog, dress } = props;
    const [sizesData, setSizesData] = useState([]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // State for the confirmation dialog visibility
    const [editDressFunc] = useUpdateDressMutation();
    const toast = useRef(null); // Initialize toast reference
    const [existingImages, setExistingImages] = useState(dress?.images || []); // Track existing images
    const [newImages, setNewImages] = useState([]); // Track newly uploaded images
        const location = useLocation();
        const navigate = useNavigate();
        useEffect(() => {
            const token = sessionStorage.getItem('adminToken');
            if (!token) {
                navigate('/');
            }
        }, [navigate]);
let images=[];
    const genderOptions = [
        { label: 'נשים', value: 'women' },
        { label: 'בנות', value: 'girls' }
    ];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: dress?.name || '',
            description: dress?.description || '',
        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'Required';
            }
            if (!sizesData.length) {
                errors.sizes = 'At least one size required';
            }
            return errors;
        },
        onSubmit: async () => {
            setIsConfirmationVisible(true); // Show the confirmation dialog instead of immediately submitting
        }
    });

    useEffect(() => {
        if (dress && dress.dressListSizes) {
            setSizesData(dress.dressListSizes);
        }
    }, [dress]);

    const addSize = () => {
        setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
    };

    const deleteSize = (index) => {
        const updatedSizes = sizesData.filter((_, i) => i !== index);
        setSizesData(updatedSizes);
    };

    const updateSizeData = (index, field, value) => {
        const updatedSizes = structuredClone(sizesData); 
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };

    const onUpload = (e) => {
        if (e.files.length > 0) {
          setNewImages(e.files); // Store new images for backend processing
          toast.current.show({
            severity: 'success',
            summary: 'Upload Successful',
            detail: `${e.files.length} images uploaded successfully!`,
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: 'warn',
            summary: 'No Files',
            detail: 'No files selected for upload.',
            life: 3000,
          });
        }
      };
      
    const confirmEdit = async () => {
        try {
            // הכנת FormData עבור העלאת הקבצים החדשים
            const formData = new FormData();
            
            // הוספת קבצים חדשים ל-FormData
            newImages.forEach((file) => {
                formData.append("path", file); // קבצים כ-File objects
            });
    
            // שילוב נתוני השמלה ב-FormData
            formData.append("id", dress._id);
            formData.append("name", formik.values.name);
            formData.append("description", formik.values.description);
    
            // הוספת התמונות הקיימות
            existingImages.forEach((image) => {
                formData.append("existImages[]", image);
            });
    
            // הוספת גדלים
            sizesData.forEach((size) => {
                formData.append(
                    "dressListSizes[]",
                    JSON.stringify({
                        key: size.key,
                        size: size.size,
                        dresses: Array(size.qty).fill({ renteDates: [] }),
                    })
                );
            });
    
            // קריאה לפונקציה עם ה-FormData
            await editDressFunc({id: dress._id,dress:formData}).unwrap();
    
            // התנהלות במקרה של הצלחה
            handleCloseDialog();
            setIsConfirmationVisible(false);
            Swal.fire({
                title: "Success!",
                text: "Dress updated successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });
        } catch (error) {
            // טיפול בשגיאות
            if (error?.status === 409) {
                Swal.fire({
                    title: "Conflict Error",
                    text: "The dress already exists with the same name. Please choose a different name.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } else {
                console.error("Error submitting form:", error);
                Swal.fire({
                    title: "Error",
                    text: error?.data?.message || "An unexpected error occurred. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            setIsConfirmationVisible(false);
        }
    };
    
         
    const cancelEdit = () => {
        setIsConfirmationVisible(false);
    };

    const deleteExistingImage = (imageIndex) => {
         
        setExistingImages(existingImages.filter((_, i) => i !== imageIndex));
    };

    if (!dress) return <p>Loading dress data...</p>;

    return (
        <div className="mydialog">
        <form  onSubmit={formik.handleSubmit} dir='rtl'>
<Toast ref={toast} />

            <div className="field">
                <InputText   style={{ width: '100%',borderColor:'#D50176',backgroundColor:"lightgray" }}
                    placeholder="שם השמלה"
                    value={formik.values.name}
                    name="name"
                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText   style={{ width: '100%',borderColor:'#D50176',backgroundColor:"lightgray" }}
                    placeholder="תיאור"
                    value={formik.values.description}
                    name="description"
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
               <Button className="addSize" label="הוסף מידה" type="button" onClick={addSize} />
                <br /><br />
                
                {sizesData.length > 0 ? (
                    sizesData.map((size, index) => (
<div 
    key={index}
    className="field"
    style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Add space between items
        width: '100%',
       
    }}
>                            <InputText
                              style={{
            flex: '0 0 100px', // Fixed width for the dropdown (150px)
        }}
        className='size'
                                placeholder="מידה"
                                value={size.key}
                                onChange={(e) => updateSizeData(index, 'key', e.target.value)}
                            />
                            <Dropdown className='kind'
                                value={size.size}
                                
                                options={genderOptions}
                                onChange={(e) => updateSizeData(index, 'size', e.value)}
                                placeholder="נשים/בנות"
                            />
                         
                            <InputNumber className='qty'
                                value={size?.dresses?.length > 0 ? size?.dresses?.length : ''}
                                onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                                placeholder="כמות"
                                min={0}
                            />
                            <Button 
                                icon="pi pi-trash"
                                onClick={() => deleteSize(index)}
                                className="delSize"
        style={{
            width: '39.2px', // Ensure button size is small
            height: '39.2px',
            backgroundColor:"lightgray",
            color:'#F00084',
            borderColor:"lightgray"
        }}                            />
                        </div>
                    ))
                ) : (
                    <p>No sizes added yet.</p>
                )}
            </div>



            <div className="field" dir="rtl">
    <Toast ref={toast} /> {/* רכיב ה־Toast חייב להיות מוגדר מחוץ לרכיב FileUpload */}
    <FileUpload className='upLoadI'
                    name="path" 
                    accept="image/*" 
                    multiple 
                    maxFileSize={100000000} 
                    customUpload 
                    uploadHandler={onUpload} 
                    chooseLabel="בחר תמונה" 
                    uploadLabel="העלאה" 
                    cancelLabel="בטל"
                />
</div>


            <div>
                <h5>Existing Images</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    
                    {existingImages.map((image, index) => (
                        <div key={index} style={{ marginRight: '10px', marginBottom: '10px' }}>
                            <img src={'http://localhost:3435/upload/'+image.split("\\").pop()} alt={`Dress ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            <Button
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={() => deleteExistingImage(index)}
                                style={{ display: 'block', marginTop: '5px' }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="buttonsD">
                <Button type="submit" label="אשר" className="okB" disabled={!formik.isValid || !sizesData.length || !existingImages.length && !newImages.length} />
                <Button type="button" label="בטל" className="cancelB" onClick={handleCloseDialog} />
            </div>
            <div dir="rtl">
{/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
            <ConfirmationDialog onHide={handleCloseDialog}
            
                visible={isConfirmationVisible}
                onConfirm={confirmEdit}
                onCancel={cancelEdit}
                message={<span style={{textAlign:'center'}} dir="rtl">האם אתה מאשר את עדכון השמלה?</span>}
            />
            </div>
        </form>
        </div>
    );
};

export default EditDress;
