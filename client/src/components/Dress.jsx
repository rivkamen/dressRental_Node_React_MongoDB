// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';
 
// const Dress = (props) => {
//     const { dress } = props;
//     const [visible, setVisible] = useState(false);
//     const navigate = useNavigate();
 
//     const handleNavigate = () => {
//         navigate('/rent', { state: { dress: dress } });
//     };
 
//     const fileName = dress?.images?.[0].split("\\").pop();

//     const imageUrl = `http://localhost:3435/upload/${fileName}`;
//     return (
//         <Card className="p-mb-3" key={dress.id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
//             <div className="p-grid p-align-center">
//                 <div className="p-col">
//                 <img
//         className="dress-image"
//         src={imageUrl}
//         alt={dress.name}
//         style={{
//           width: '100%',
//           height: '200px', // Control image height
//           objectFit: 'cover', // Ensure images have the same dimensions
//           borderRadius: '5px',
//         }}
//       />                </div>
//                 <div className="p-col">
//                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                         <div className="text-2xl font-bold text-900">{dress.name}</div>
//                         <div className="flex align-items-center gap-3">
//                             {/* Add any additional elements here */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-col">
//                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                         {/* <span className="text-2xl font-semibold">₪{dress.price}</span> */}
//                         <Button label="לפרטים" className="p-button-rounded p-button-info" onClick={handleNavigate} />
//                     </div>
//                 </div>
//             </div>
//         </Card>
//     );
// };
 
// export default Dress;


import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import './Dress.css'; // Add a separate CSS file to share similar styles with the manager component

const Dress = (props) => {
    const { dress } = props;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/rent', { state: { dress: dress } });
    };

    const fileName = dress?.images?.[0].split("\\").pop();
    const imageUrl = `http://localhost:3435/upload/${fileName}`;

    return (
        <div
            className="p-mb-3 dress-item"
            key={dress.id}
            style={{
                border: 'none',
                width: '250px',
                height: '450px', // Consistent height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '15px',
            }}
        >
            <div className="p-grid p-align-center">
                <div className="p-col">
                    <img
                        className="dress-image"
                        src={imageUrl}
                        alt={dress.name}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                        }}
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
                    <Button label="לפרטים" className="p-button-rounded p-button-info" onClick={handleNavigate} />
                </div>
            </div>
        </div>
    );
};

export default Dress;
