
import React, { useRef, useState , useEffect} from 'react';


import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { useAddDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import './AddDress.css';

const AddDress = (props) => {
    const { handleCloseDialog } = props;
    const [sizesData, setSizesData] = useState([]);
    const [addDressFunc] = useAddDressMutation();
    const [imageFiles, setImageFiles] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    useEffect(() => {
        const token = sessionStorage.getItem('adminToken');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const genderOptions = [
        { label: 'נשים', value: 'women' },
        { label: 'בנות', value: 'girls' }
    ];

    const onUpload = (e) => {
        setImageFiles(e.files);
        if (e.files.length > 0) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Images Uploaded' });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No images uploaded' });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            sizes: []
        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'Required';
            }
            if (!sizesData.length) {
                errors.sizes = 'At least one size required';
            }
            if (!imageFiles.length) {
                errors.imageFiles = 'At least one image is required';
            }
            return errors;
        },
        onSubmit: async () => {
            const formData = new FormData();
            formData.append('name', formik.values.name);
            formData.append('description', formik.values.description);
            
            formData.append('dressListSizes', JSON.stringify(sizesData.map(size => ({
                key: size.key,
                size: size.size,
                dresses: Array(size.qty).fill({ renteDates: [] })
            }))));

            imageFiles.forEach(file => {
                formData.append('path', file);
            });

            try {
                await addDressFunc(formData).unwrap();
                handleCloseDialog();
                Swal.fire({
                    title: "Success!",
                    text: "Dress added successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/catalogm");
                });
            } catch (error) {
                Swal.fire({
                    title: "!שגיאה",
                    text: error?.data?.message === "duplicate name" ? "שם שמלה קיים, נא שנה שם שמלה" : error?.data?.message ||"שגיאה בשמירת שמלה",
                    icon: "error",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/catalogm");
                });
                console.error('Error submitting form:', error);
            }
        }
    });

    const addSize = () => {
        setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
    };

    const updateSizeData = (index, field, value) => {
        const updatedSizes = [...sizesData];
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };

    const deleteSize = (index) => {
        const updatedSizes = sizesData.filter((_, i) => i !== index);
        setSizesData(updatedSizes);
    };
    const isSubmitDisabled = !imageFiles.length || !sizesData.length;

    return (
        <form /*style={{backgroundColor:"red"}}*/onSubmit={formik.handleSubmit}>
            <Toast ref={toast} />

            <div className="field">
                <InputText
                    placeholder="שם שמלה"
                    value={formik.values.name}
                    name="name"
                    style={{ width: '100%',borderColor:'#D50176',backgroundColor:"lightgray" }} // Adjust width as needed

                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText
                    style={{ width: '100%',borderColor:'#D50176',backgroundColor:'lightgray' }} // Adjust width as needed

                    placeholder={"תיאור שמלה"}
                    value={formik.values.description}
                    name="description"

                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
                <Button className="addSize" label="הוסף מידה" type="button" onClick={addSize} />
                <br /><br />
                {sizesData.map((size, index) => (
  
<div
    key={index}
    className="field"
    style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Add space between items
        width: '100%',
       
    }}
>
    {/* Size Input */}
    <InputText className='size'
        style={{
            flex: '0 0 100px', // Fixed width for the size input (150px)
        }}
        placeholder="מידה"
        value={size.key}
        onChange={(e) => updateSizeData(index, 'key', e.target.value)}
    />
    
    {/* Gender Dropdown */}
    <Dropdown className='kind'
        style={{
            flex: '0 0 100px', // Fixed width for the dropdown (150px)
        }}
        value={size.size}
        options={genderOptions}
        onChange={(e) => updateSizeData(index, 'size', e.value)}
        placeholder="נשים/בנות"
    />
    



            <InputNumber className='qty'
             value={size.qty>0?size.qty:''}
            onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
            placeholder='כמות'
                  
            min={0}
            // decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" 
            />


        
    {/* Delete Button */}
    <Button
        icon="pi pi-trash"
        className="delSize"
        onClick={() => deleteSize(index)}
        style={{
            width: '39.2px', // Ensure button size is small
            height: '39.2px',
            backgroundColor:"lightgray",
            color:'#F00084',
            borderColor:"lightgray"
        }}
    />
</div>



 
                
                ))}
            </div>

            <div className="field" dir='rtl'>
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
                {formik.errors.imageFiles && <small className="p-error">{formik.errors.imageFiles}</small>}
            </div>
            <div className='buttonsD'>
            <Button type="submit" label="אשר" className="okB" disabled={isSubmitDisabled} 
            />
            <Button type="button" label="בטל" className="cancelB" onClick={handleCloseDialog} />
            </div>
        </form>
    );
};

export default AddDress;
/*
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { useAddDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import './AddDress.css';

const AddDress = (props) => {
    const { handleCloseDialog } = props;
    const [sizesData, setSizesData] = useState([]);
    const [addDressFunc] = useAddDressMutation();
    const [imageFiles, setImageFiles] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);

    const genderOptions = [
        { label: 'נשים', value: 'women' },
        { label: 'בנות', value: 'girls' }
    ];

    const onUpload = (e) => {
        setImageFiles(e.files);
        if (e.files.length > 0) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Images Uploaded' });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No images uploaded' });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            sizes: []
        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'Required';
            }
            if (!sizesData.length) {
                errors.sizes = 'At least one size required';
            }
            if (!imageFiles.length) {
                errors.imageFiles = 'At least one image is required';
            }
            return errors;
        },
        onSubmit: async () => {
            const formData = new FormData();
            formData.append('name', formik.values.name);
            formData.append('description', formik.values.description);
           
            formData.append('dressListSizes', JSON.stringify(sizesData.map(size => ({
                key: size.key,
                size: size.size,
                dresses: Array(size.qty).fill({ renteDates: [] })
            }))));

            imageFiles.forEach(file => {
                formData.append('path', file);
            });

            try {
                await addDressFunc(formData).unwrap();
                handleCloseDialog();
                Swal.fire({
                    title: "Success!",
                    text: "Dress added successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/catalogm");
                });
            } catch (error) {
                Swal.fire({
                    title: "!שגיאה",
                    text: error?.data?.message === "duplicate name" ? "שם שמלה קיים, נא שנה שם שמלה" : error?.data?.message ||"שגיאה בשמירת שמלה",
                    icon: "error",
                    confirmButtonText: "OK"
                }).then(() => {
                    navigate("/catalogm");
                });
                console.error('Error submitting form:', error);
            }
        }
    });

    const addSize = () => {
        setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
    };

    const updateSizeData = (index, field, value) => {
        const updatedSizes = [...sizesData];
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };

    const deleteSize = (index) => {
        const updatedSizes = sizesData.filter((_, i) => i !== index);
        setSizesData(updatedSizes);
    };

    // תנאי להפעיל את כפתור "אשר" רק אם יש תמונה לפחות ומידה אחת לפחות
    const isSubmitDisabled = !imageFiles.length || !sizesData.length;

    return (
        <form onSubmit={formik.handleSubmit}>
            <Toast ref={toast} />

            <div className="field">
                <InputText
                    placeholder="שם שמלה"
                    value={formik.values.name}
                    name="name"
                    style={{ width: '100%',borderColor:'#D50176',backgroundColor:"lightgray" }}
                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText
                    style={{ width: '100%',borderColor:'#D50176',backgroundColor:'lightgray' }}
                    placeholder={"תיאור שמלה"}
                    value={formik.values.description}
                    name="description"
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
                <Button className="addSize" label="הוסף מידה" type="button" onClick={addSize} />
                <br /><br />
                {sizesData.map((size, index) => (
                    <div key={index} className="field" style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}>
                        <InputText
                            style={{ flex: '0 0 100px' }}
                            placeholder="מידה"
                            value={size.key}
                            onChange={(e) => updateSizeData(index, 'key', e.target.value)}
                        />
                        <Dropdown
                            style={{ flex: '0 0 100px' }}
                            value={size.size}
                            options={genderOptions}
                            onChange={(e) => updateSizeData(index, 'size', e.value)}
                            placeholder="נשים/בנות"
                        />
                        <InputNumber
                            value={size.qty > 0 ? size.qty : ''}
                            onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                            placeholder='כמות'
                            min={0}
                        />
                        <Button
                            icon="pi pi-trash"
                            className="delSize"
                            onClick={() => deleteSize(index)}
                            style={{ width: '39.2px', height: '39.2px', backgroundColor:"lightgray", color:'#F00084', borderColor:"lightgray" }}
                        />
                    </div>
                ))}
            </div>

            <div className="field" dir='rtl'>
                <FileUpload
                    className='upLoadI'
                    name="path"
                    accept="image/*"
                    multiple
                    maxFileSize={1000000}
                    customUpload
                    uploadHandler={onUpload}
                    chooseLabel="בחר תמונה"
                    uploadLabel="העלאה"
                    cancelLabel="בטל"
                />
                {formik.errors.imageFiles && <small className="p-error">{formik.errors.imageFiles}</small>}
            </div>

            <div className='buttonsD'>
                <Button
                    type="submit"
                    label="אשר"
                    className="okB"
                    disabled={isSubmitDisabled} // כפתור "אשר" לא פעיל אם אין תמונה או מידה
                />
                <Button
                    type="button"
                    label="בטל"
                    className="cancelB"
                    onClick={handleCloseDialog}
                />
            </div>
        </form>
    );
};

export default AddDress;
 */