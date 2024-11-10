

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { useUpdateDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';
import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component

const EditDress = (props) => {
    const { handleCloseDialog, dress } = props;
    const [sizesData, setSizesData] = useState([]);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // State for the confirmation dialog visibility
    const [editDressFunc] = useUpdateDressMutation();
    const toast = useRef(null);

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
            // Show the confirmation dialog instead of immediately submitting
            setIsConfirmationVisible(true);
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

    const updateSizeData = (index, field, value) => {
        const updatedSizes = structuredClone(sizesData); 
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };

    // Confirm the edit action when the user accepts in the dialog
    const confirmEdit = async () => {
        await editDressFunc({
            id: dress._id,
            dress: {
                name: formik.values.name,
                description: formik.values.description,
                dressListSizes: sizesData.map(size => ({
                    key: size.key,
                    size: size.size,
                    dresses: Array(size.qty).fill({ renteDates: [] })
                }))
            }
        });
        handleCloseDialog();
        setIsConfirmationVisible(false); // Hide confirmation dialog after action
    };

    const cancelEdit = () => {
        setIsConfirmationVisible(false); // Hide confirmation dialog if canceled
    };

    if (!dress) return <p>Loading dress data...</p>;

    return (
        <form onSubmit={formik.handleSubmit} >
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
                <Button label="Add Size" type="button" onClick={addSize} />
                <br /><br />
                {sizesData.length > 0 ? (
                    sizesData.map((size, index) => (
                        <div key={index} className="field">
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
                                value={size?.dresses?.length || ''}
                                onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                                mode="decimal"
                                min={0}
                                placeholder="כמות"
                            />
                        </div>
                    ))
                ) : (
                    <p>No sizes available. Add a size to start.</p>
                )}
            </div>

            <Button type="submit" label="אשר" />
            <Button label="בטל" className="p-button-secondary" onClick={handleCloseDialog} />

            {/* Confirmation Dialog */}
            <ConfirmationDialog 
                visible={isConfirmationVisible}
                onHide={cancelEdit}
                onConfirm={confirmEdit}
                message="האם הנך מאשר את השינויים שביצעת בשמלה "
                header="Confirm Edit"
                confirmLabel="כן, אשר"
                cancelLabel="בטל"
            />
        </form>
    );
};

export default EditDress;