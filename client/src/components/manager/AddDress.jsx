import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { ColorPicker } from 'primereact/colorpicker';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Chips } from "primereact/chips";
import { useFormik } from 'formik';
import { useAddDressMutation } from '../../app/dressApiSlice';
import { classNames } from 'primereact/utils';

const AddDress=(props)=>{
     const {handleCloseDialog}=props
     const toast = useRef(null);
     const name = useRef(null);
     const desc=useRef(null)
     const sizes=useRef(null)
     const price=useRef(null)
     const [nameVal, setNameVal] = useState('');
     const [descVal, setDescVal] = useState('');
     const [sizeVal, setSizeVal] = useState([]);
     const [priceVal, setPriceVal] = useState();
     const [qtyVal, setQtyVal] = useState(0);

     const [addDressFunc,{data:dress,isError,error,isSuccess}]=useAddDressMutation()


     const onUpload = () => {
        console.log(toast);
        
         toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
     };
    const sizing = (e) => {
        setSizeVal(e.value)
        console.log("sssssssssssssssss");
        
        console.log(sizeVal);
         
    }


    const formik = useFormik({
        initialValues: {
            name: "",
            sizes: [],
            price: null,
            qty: null
        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
                errors.name = 'שדה חובה';
            }
            if (!data.sizes.length) {
                errors.sizes = 'שדה חובה';
            }
            if (!data.price) {
                errors.price = 'שדה חובה';
            }
            if (!data.qty) {
                errors.qty = 'שדה חובה';
            }
            return errors;
        },
        onSubmit: async () => {
            console.log("addDress");
                await addDressFunc({
                name: formik.values.name,
                description: descVal,
                sizes: formik.values.sizes,
                price: formik.values.price,
                quantity: formik.values.qty
            });
            handleCloseDialog();
        }
    });
    
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    
    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    
    
           
    
    

return (
    <div>
      <form onSubmit={formik.handleSubmit}> {/* Add onSubmit event handler to the form */}
        <InputText
          placeholder="שם מוצר"
          value={formik.values.name}
          name='name'
          className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
          onChange={(e) => {
            formik.setFieldValue('name', e.target.value);
          }}
        />
        {getFormErrorMessage('name')}
  
        <FloatLabel>
          <InputTextarea id="description" value={descVal} onChange={(e) => setDescVal(e.target.value)} rows={5} cols={30} />
        </FloatLabel><br/>
        <Chips
          ref={sizes}
          placeholder={"מידות"}
          separator=","
          value={formik.values.sizes}
          name='sizes'
          className={classNames({ 'p-invalid': isFormFieldInvalid('sizes') })}
          onChange={(e) => {
            sizing(e);
            formik.setFieldValue('sizes', e.value);
          }}
        />
        {getFormErrorMessage('sizes')}
        <InputNumber
  inputId="currency-us"
  value={formik.values.price} // Use formik.values.price instead of priceVal
  onValueChange={(e) => formik.setFieldValue('price', e.value)} // Update formik value on change
  mode="currency"
  currency="ils"
  locale="en-US"
  placeholder={"מחיר"}
/>
{getFormErrorMessage('price')} {/* Display error message if price field is invalid */}

  
        <InputNumber
          inputId="minmax-buttons"
          value={formik.values.qty}
          onValueChange={(e) => formik.setFieldValue('qty', e.value)}
          mode="decimal"
          showButtons
          min={0}
        />
        {getFormErrorMessage('qty')}
  
        <Toast ref={toast}></Toast>
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
  
        {/* <div dir='rtl' style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}> */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', width: '100%' }}>
            <Button label="בצע" icon="pi pi-check" style={{ width: "45%", marginRight: '5px' }} type="submit" onClick={formik.handleSubmit}/>
            <Button label="בטל" severity="secondary" icon="pi pi-times" style={{ width: "45%" }} onClick={handleCloseDialog} />
          </div>
        {/* </div> */}
      </form>
    </div>
  );
  

}
export default AddDress

