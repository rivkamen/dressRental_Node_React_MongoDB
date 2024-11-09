


import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { useAddDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';
import { FileUpload } from 'primereact/fileupload'; // Import FileUpload

import { Toast } from 'primereact/toast';

const AddDress = (props) => {
    const { handleCloseDialog } = props;
    const [sizesData, setSizesData] = useState([]);
    const [addDressFunc] = useAddDressMutation();
    const [imageFiles, setImageFiles] = useState(null);
    const toast = useRef(null); // For showing toast messages

    const genderOptions = [
        { label: 'Women', value: 'women' },
        { label: 'Girls', value: 'girls' }
    ];
    const onUpload = (e) => {
              setImageFiles([...e.files]);
              toast.current.show({ severity: 'info', summary: 'Success', detail: 'Image Uploaded' });
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
            return errors;
        },
        onSubmit: async () => {
            await addDressFunc({
                name: formik.values.name,
                description: formik.values.description,
                dressListSizes: sizesData.map(size => ({
                    key: size.key,
                    size: size.size,
                    dresses: Array(size.qty).fill({ renteDates: [] })
                }))
            });
            handleCloseDialog();
        }
      
      
    });

    const addSize = () => {
        setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
    };

    const updateSizeData = (index, field, value) => {
      console.log(index);
      console.log(field);
      console.log(value);
      
      
      
        const updatedSizes = [...sizesData];
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
           {/* <Toast ref={toast} /> */}
            <div className="field">
                <InputText
                    placeholder="Dress Name"
                    value={formik.values.name}
                    name='name'
                    className={classNames({ 'p-invalid': formik.errors.name })}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
            </div>

            <div className="field">
                <InputText
                    placeholder="Description"
                    value={formik.values.description}
                    name='description'
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
            </div>

            <div>
                <Button label="Add Size" type="button" onClick={addSize} />
<br/><br/>
                {sizesData.map((size, index) => (
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
                            value={size.qty}
                            onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
                            mode="decimal"
                            min={0}
                            placeholder="כמות"
                        />
                    </div>
                ))}
<div className="field">

</div>
            </div>

             <Button type="submit" label="Submit" />
            <Button label="Cancel" className="p-button-secondary" onClick={handleCloseDialog} />

       </form>
    );
};

export default AddDress;

