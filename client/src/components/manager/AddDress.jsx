

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
import './AddDress.css'; // Make sure to import the custom CSS

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
                handleCloseDialog(); // Close the dialog before showing SweetAlert
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
                    title: "Error!",
                    text: error?.data?.message || "Failed to add the dress. Please try again.",
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

    return (
        <form onSubmit={formik.handleSubmit}>
            <Toast ref={toast} />

            <div className="field">
                <InputText
                    placeholder="Dress Name"
                    value={formik.values.name}
                    name="name"
                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText
                    placeholder="Description"
                    value={formik.values.description}
                    name="description"
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
                <Button label="Add Size" type="button" onClick={addSize} />
                <br /><br />
                {sizesData.map((size, index) => (
                    <div key={index} className="field">
                        <InputText
                            placeholder="Size"
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
                            value={size.qty}
                            onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                            mode="decimal"
                            min={0}
                            placeholder="Quantity"
                        />
                    </div>
                ))}
            </div>

            <div className="field">
                <FileUpload 
                    name="path" 
                    accept="image/*" 
                    multiple 
                    maxFileSize={1000000} 
                    customUpload 
                    uploadHandler={onUpload} 
                    chooseLabel="Choose Images" 
                    uploadLabel="Upload" 
                />
                {formik.errors.imageFiles && <small className="p-error">{formik.errors.imageFiles}</small>}
            </div>

            <Button type="submit" label="Submit" />
            <Button label="Cancel" className="p-button-secondary" onClick={handleCloseDialog} />
        </form>
    );
};

export default AddDress;
