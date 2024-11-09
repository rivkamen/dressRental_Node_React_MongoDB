// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';
// import { useDeleteDressMutation } from '../../app/dressApiSlice';
 
// const Dressm = (props) => {
//     const { dress } = props;
//     const [visible, setVisible] = useState(false);
//     const navigate = useNavigate();
//  const [deleteFuncDress,{data:del,isError,error,isSuccess}]=useDeleteDressMutation()
//  const handleNavigate = () => {
//     navigate('/rentm', { state: { dress: dress } });
// };

//  const deleteDress=async()=>{
// await deleteFuncDress(dress._id)
//  }
//     return (
//         <Card className="p-mb-3" key={dress.id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
//             <div className="p-grid p-align-center">
//                 <div className="p-col">
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`${dress.imageUrl}`} alt={dress.name} />
//                 </div>
//                 <div className="p-col">
//                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                         <div className="text-2xl font-bold text-900">{dress.name}</div>
//                         <div className="text-2xl font-bold text-900">{dress.description}</div>

//                         <div className="flex align-items-center gap-3">
//                             {/* Add any additional elements here */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-col">
//                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                         <Button label="מחיקה" className="p-button-rounded p-button-info" onClick={deleteDress} />
//                         <Button label='לפרטים והשכרה'  className="p-button-rounded p-button-info" onClick={handleNavigate}/>
//                     </div>
//                 </div>
//             </div>
//         </Card>
//     );
// };
 
// export default Dressm;
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { useDeleteDressMutation } from '../../app/dressApiSlice';

const Dressm = (props) => {
    const { dress } = props;
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [deleteFuncDress,{ data: del, isError, error, isSuccess }] = useDeleteDressMutation();

    const handleNavigate = () => {
        navigate('/rentm', { state: { dress: dress } });
    };

    const deleteDress = async () => {
        await deleteFuncDress(dress._id);
    };
    console.log(dress?.images?.[0]);
    const fileName = dress?.images?.[0].split("\\").pop();

    const imageUrl = `http://localhost:3435/upload/${fileName}`;

    return (
        <Card className="p-mb-3" key={dress.id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
            <div className="p-grid p-align-center">
                <div className="p-col">
                    {/* השתמש ב-URL המלא של התמונה */}
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={imageUrl} alt={dress.name} />
                </div>
                <div className="p-col">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{dress.name}</div>
                        <div className="text-2xl font-bold text-900">{dress.description}</div>

                        <div className="flex align-items-center gap-3">
                            {/* הוסף כל אלמנט נוסף שתרצה */}
                        </div>
                    </div>
                </div>
                <div className="p-col">
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <Button label="מחיקה" className="p-button-rounded p-button-info" onClick={deleteDress} />
                        <Button label="לפרטים והשכרה" className="p-button-rounded p-button-info" onClick={handleNavigate} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Dressm;
