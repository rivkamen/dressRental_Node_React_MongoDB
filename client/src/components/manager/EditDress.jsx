

// // import React, { useEffect, useRef, useState } from 'react';
// // import { Button } from 'primereact/button';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Dropdown } from 'primereact/dropdown';
// // import { InputText } from 'primereact/inputtext';
// // import { useFormik } from 'formik';
// // import { useUpdateDressMutation } from '../../app/dressApiSlice';
// // import { classNames } from 'primereact/utils';

// // const EditDress = (props) => {
// //     const { handleCloseDialog, dress } = props;
// //     const [sizesData, setSizesData] = useState([]);
// //     const [editDressFunc, { isError, error, isSuccess }] = useUpdateDressMutation();
// //     const toast = useRef(null);

// //     const genderOptions = [
// //         { label: 'Women', value: 'women' },
// //         { label: 'Girls', value: 'girls' }
// //     ];

// //     // Initialize formik, using `dress` data when available
// //     const formik = useFormik({
// //         enableReinitialize: true,
// //         initialValues: {
// //             name: dress?.name || '',              // Fallback to empty if `dress` is undefined
// //             description: dress?.description || '',
// //             sizes: dress?.sizes || []
// //         },
// //         validate: (data) => {
// //             let errors = {};
// //             if (!data.name) {
// //                 errors.name = 'Required';
// //             }
// //             if (!sizesData.length) {
// //                 errors.sizes = 'At least one size required';
// //             }
// //             return errors;
// //         },
// //         onSubmit: async () => {
// //             console.log('hereeee');
            
// //             await editDressFunc({
// //                 id: dress._id,
// //                 dress: {
// //                     name: formik.values.name,
// //                     description: formik.values.description,
// //                     dressListSizes: sizesData.map(size => ({
// //                         key: size.key,
// //                         size: size.size,
// //                         dresses: Array(size.qty).fill({ renteDates: [] })
// //                     }))
// //                 }
// //             });
// //             handleCloseDialog();
// //         }
// //     });

// //     useEffect(() => {
// //         if (dress && dress.sizes) {
// //             setSizesData(dress.sizes);
// //         }
// //     }, [dress]);

// //     const addSize = () => {
// //         setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
// //     };

// //     const updateSizeData = (index, field, value) => {
// //         const updatedSizes = [...sizesData];
// //         updatedSizes[index][field] = value;
// //         setSizesData(updatedSizes);
// //     };

// //     // If `dress` data is missing, display a loading state or message
// //     if (!dress) return <p>Loading dress data...</p>;

// //     return (
// //         <form onSubmit={formik.handleSubmit}>
// //             <div className="field">
// //                 <InputText
// //                     placeholder="Dress Name"
// //                     value={formik.values.name}
// //                     name="name"
// //                     className={classNames({ 'p-invalid': formik.errors.name })}
// //                     onChange={(e) => formik.setFieldValue('name', e.target.value)}
// //                 />
// //                 {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
// //             </div>

// //             <div className="field">
// //                 <InputText
// //                     placeholder="Description"
// //                     value={formik.values.description}
// //                     name="description"
// //                     onChange={(e) => formik.setFieldValue('description', e.target.value)}
// //                 />
// //             </div>

// //             <div>
// //                 <Button label="Add Size" type="button" onClick={addSize} />
// //                 <br /><br />
// //                 {sizesData.map((size, index) => (
// //                     <div key={index} className="field">
// //                         <InputText
// //                             placeholder="מידה"
// //                             value={size.key}
// //                             onChange={(e) => updateSizeData(index, 'key', e.target.value)}
// //                         />
// //                         <Dropdown
// //                             value={size.size}
// //                             options={genderOptions}
// //                             onChange={(e) => updateSizeData(index, 'size', e.value)}
// //                             placeholder="נשים/בנות"
// //                         />
// //                         <InputNumber
// //                             value={size.qty}
// //                             onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
// //                             mode="decimal"
// //                             min={0}
// //                             placeholder="כמות"
// //                         />
// //                     </div>
// //                 ))}
// //             </div>

// //             <Button type="submit" label="Submit" />
// //             <Button label="Cancel" className="p-button-secondary" onClick={handleCloseDialog} />
// //         </form>
// //     );
// // };

// // export default EditDress;
// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from 'primereact/button';
// import { InputNumber } from 'primereact/inputnumber';
// import { Dropdown } from 'primereact/dropdown';
// import { InputText } from 'primereact/inputtext';
// import { useFormik } from 'formik';
// import { useUpdateDressMutation } from '../../app/dressApiSlice';
// import { classNames } from 'primereact/utils';

// const EditDress = (props) => {
//     const { handleCloseDialog, dress } = props;
//     const [sizesData, setSizesData] = useState([]);
//     const [editDressFunc] = useUpdateDressMutation();
//     const toast = useRef(null);

//     const genderOptions = [
//         { label: 'Women', value: 'women' },
//         { label: 'Girls', value: 'girls' }
//     ];

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: dress?.name || '',
//             description: dress?.description || '',
//             sizes: dress?.sizes || []
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
//             });
//             handleCloseDialog();
//         }
//     });

//     useEffect(() => {
//         if (dress && dress.sizes) {
//             setSizesData(dress.sizes); // Initialize sizesData with the sizes from dress
//         }
//     }, [dress]);

//     const addSize = () => {
//         setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
//     };

//     const updateSizeData = (index, field, value) => {
//         const updatedSizes = [...sizesData];
//         updatedSizes[index][field] = value;
//         setSizesData(updatedSizes);
//     };

//     if (!dress) return <p>Loading dress data...</p>;

//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div className="field">
//                 <InputText
//                     placeholder="Dress Name"
//                     value={formik.values.name}
//                     name="name"
//                     className={classNames({ 'p-invalid': formik.errors.name })}
//                     onChange={(e) => formik.setFieldValue('name', e.target.value)}
//                 />
//                 {formik.errors.name && <small className="p-error">{formik.errors.name}</small>}
//             </div>

//             <div className="field">
//                 <InputText
//                     placeholder="Description"
//                     value={formik.values.description}
//                     name="description"
//                     onChange={(e) => formik.setFieldValue('description', e.target.value)}
//                 />
//             </div>

//             <div>
//                 <Button label="Add Size" type="button" onClick={addSize} />
//                 <br /><br />
//                 {sizesData.map((size, index) => (
//                     <div key={index} className="field">
//                         <InputText
//                             placeholder="מידה"
//                             value={size.key}
//                             onChange={(e) => updateSizeData(index, 'key', e.target.value)}
//                         />
//                         <Dropdown
//                             value={size.size}
//                             options={genderOptions}
//                             onChange={(e) => updateSizeData(index, 'size', e.value)}
//                             placeholder="נשים/בנות"
//                         />
//                         <InputNumber
//                             value={size.qty}
//                             onValueChange={(e) => updateSizeData(index, 'qty', e.value)}
//                             mode="decimal"
//                             min={0}
//                             placeholder="כמות"
//                         />
//                     </div>
//                 ))}
//             </div>

//             <Button type="submit" label="Submit" />
//             <Button label="Cancel" className="p-button-secondary" onClick={handleCloseDialog} />
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

const EditDress = (props) => {
    const { handleCloseDialog, dress } = props;
    const [sizesData, setSizesData] = useState([]);
    const [editDressFunc] = useUpdateDressMutation();
    const toast = useRef(null);

    const genderOptions = [
        { label: 'Women', value: 'women' },
        { label: 'Girls', value: 'girls' }
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
        }
    });

    useEffect(() => {
        // Load sizesData from dress.sizes if it's available
        console.log(dress);
        
        if (dress && dress.dressListSizes) {
            setSizesData(dress.dressListSizes);
        }
    }, [dress]);

    const addSize = () => {
        setSizesData([...sizesData, { key: '', size: '', qty: 0 }]);
    };

    // const updateSizeData = (index, field, value) => {
    //     console.log("lolo");
        
    //     console.log(index);
    //     console.log(field);
    //     console.log(value);

        
    //     const updatedSizes = [...sizesData];
    //     updatedSizes[index][field] = value;
    //     setSizesData(updatedSizes);
    // };
    const updateSizeData = (index, field, value) => {
        const updatedSizes = structuredClone(sizesData); // Deep copy using structuredClone or JSON parse/stringify for older environments
    
        updatedSizes[index][field] = value;
        setSizesData(updatedSizes);
    };
    

    if (!dress) return <p>Loading dress data...</p>;

    return (
        <form onSubmit={formik.handleSubmit}>
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
                {sizesData.length > 0 ? (
                    sizesData.map((size, index) => (
                        <div key={index} className="field">
                            {console.log("size")}
                            {console.log(size)}

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
                {console.log("sizee")}
                {console.log(size)}

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
                    <p>No sizes available. Add a size to start.                   {console.log("sizesData")}   {console.log(sizesData)}
</p>

                )}
            </div>

            <Button type="submit" label="Submit" />
            <Button label="Cancel" className="p-button-secondary" onClick={handleCloseDialog} />
        </form>
    );
};

export default EditDress;
