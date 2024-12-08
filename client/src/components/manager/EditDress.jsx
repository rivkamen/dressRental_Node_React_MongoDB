
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
import { Toast } from 'primereact/toast'; // Import Toast component
const formData = new FormData();

const EditDress = (props) => {
    const { handleCloseDialog, dress } = props;
    const [sizesData, setSizesData] = useState([]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // State for the confirmation dialog visibility
    const [editDressFunc] = useUpdateDressMutation();
    const toast = useRef(null); // Initialize toast reference
    const [existingImages, setExistingImages] = useState(dress?.images || []); // Track existing images
    const [newImages, setNewImages] = useState([]); // Track newly uploaded images
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
      
    
    // const confirmEdit = async () => {
    //     try {
    //         // Combine existing images and newly uploaded images
    //         const allImages = [
    //             ...existingImages.map((image) => image.objectURL)
    //         ];
    //         await editDressFunc({
    //             id: dress._id,
    //             dress: {
    //                 name: formik.values.name,
    //                 description: formik.values.description,
    //                 existImages:existingImages,
    //                 path:newImages.map(file => ({ path: file })),
    //                 dressListSizes: sizesData.map(size => ({
    //                     key: size.key,
    //                     size: size.size,
    //                     dresses: Array(size.qty).fill({ renteDates: [] })
    //                 }))
    //             }
    //         }).unwrap();

    //         handleCloseDialog();
    //         setIsConfirmationVisible(false);
    //     } catch (error) {
    //         if (error?.status === 409) {
    //             Swal.fire({
    //                 title: 'Conflict Error',
    //                 text: 'The dress already exists with the same name. Please choose a different name.',
    //                 icon: 'error',
    //                 confirmButtonText: 'OK'
    //             });
    //         } else {
    //             console.log("error");
    //             console.log(error);
                
    //             Swal.fire({
    //                 title: 'Error',
    //                 text: error?.data?.message || 'An unexpected error occurred. Please try again.',
    //                 icon: 'error',
    //                 confirmButtonText: 'OK'
    //             });
    //         }
    //         setIsConfirmationVisible(false);
    //     }
    // };
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
    
    // const confirmEdit = async () => {
    //     try {
    //         const formData = new FormData();
            
    //         // Append the existing images if needed (optional for your case)
    //         existingImages.forEach((image) => {
    //             formData.append('existImages', image.objectURL); // or adjust to pass image path if required
    //         });
    
    //         // Append the newly uploaded images
    //         newImages.forEach((file) => {
    //             formData.append('newImages', file);
    //         });
    
    //         // Append the rest of the data like dress details
    //         formData.append('name', formik.values.name);
    //         formData.append('description', formik.values.description);
    
    //         sizesData.forEach((size) => {
    //             formData.append('sizes[]', JSON.stringify({
    //                 key: size.key,
    //                 size: size.size,
    //                 dresses: Array(size.qty).fill({ renteDates: [] }),
    //             }));
    //         });
    
    //         const response = await fetch('/your-endpoint', {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         const result = await response.json();
    
    //         if (response.ok) {
    //             handleCloseDialog();
    //             setIsConfirmationVisible(false);
    //         } else {
    //             throw new Error(result.message || 'An error occurred');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         Swal.fire({
    //             title: 'Error',
    //             text: error.message || 'An unexpected error occurred. Please try again.',
    //             icon: 'error',
    //             confirmButtonText: 'OK'
    //         });
    //         setIsConfirmationVisible(false);
    //     }
    // };
    
    // const confirmEdit = async () => {
    //     try {
    //       // Prepare FormData
    //       const formData = new FormData();
    //       formData.append('name', formik.values.name);
    //       formData.append('description', formik.values.description);
    //       formData.append('existImages', existingImages); // Add files
    //       sizesData.forEach((size, index) => {
    //         formData.append(`sizes[${index}]`, JSON.stringify(size));
    //       });
    //       newImages.forEach((file) => formData.append('path', file)); // Add files

    //       // Send FormData to backend
    //       await editDressFunc({ id: dress._id, formData }).unwrap();
      
    //       handleCloseDialog();
    //       setIsConfirmationVisible(false);
    //     } catch (error) {
    //       console.error("Error:", error);
    //       Swal.fire({
    //         title: 'Error',
    //         text: error.message || 'An unexpected error occurred. Please try again.',
    //         icon: 'error',
    //         confirmButtonText: 'OK',
    //       });
    //     }
    //   };
      
    const cancelEdit = () => {
        setIsConfirmationVisible(false);
    };

    const deleteExistingImage = (imageIndex) => {
         console.log("delete");
         
        setExistingImages(existingImages.filter((_, i) => i !== imageIndex));
    };

    if (!dress) return <p>Loading dress data...</p>;

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="field">
                <InputText
                    placeholder="שם השמלה"
                    value={formik.values.name}
                    name="name"
                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText
                    placeholder="תיאור"
                    value={formik.values.description}
                    name="description"
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
                <Button label="הוסף מידה" type="button" onClick={addSize} />
                <br /><br />
                {sizesData.length > 0 ? (
                    sizesData.map((size, index) => (
                        <div key={index} className="field" style={{ display: 'flex', alignItems: 'center' }}>
                            <InputText
                                placeholder="מידה"
                                value={size.key}
                                onChange={(e) => updateSizeData(index, 'key', e.target.value)}
                            />
                            <Dropdown
                                value={size.size}
                                options={genderOptions}
                                onChange={(e) => updateSizeData(index, 'size', e.value)}
                                placeholder="נשים/בנות"
                            />
                            <InputNumber
                                value={size.qty > 0 ? size.qty : ''}
                                onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                                placeholder="כמות"
                                min={0}
                            />
                            <Button
                                icon="pi pi-trash"
                                onClick={() => deleteSize(index)}
                                className="p-button-danger"
                                style={{ marginLeft: '10px' }}
                            />
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
                    maxFileSize={10000000} 
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
                            <img src={image.objectURL} alt={`Dress ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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

            <ConfirmationDialog
                visible={isConfirmationVisible}
                onConfirm={confirmEdit}
                onCancel={cancelEdit}
                message="Are you sure you want to update the dress?"
            />
        </form>
    );
};

export default EditDress;
