import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
// import './Car.css'; // Import the CSS file
 
const Dress = (props) => {
    const { dress } = props;
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
 
    const handleNavigate = () => {
        console.log("lllllllllllllllllll");
        navigate('/rent', { state: { dress: dress } });
    };
 
    const handleAddToCart = () => {
        // Add your logic here for adding the car to the cart
    };
 
    return (
        <Card className="p-mb-3" key={dress.id} style={{ border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
            <div className="p-grid p-align-center">
                <div className="p-col">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:3000/images/${dress.imageUrl}`} alt={dress.name} />
                </div>
                <div className="p-col">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{dress.name}</div>
                        <div className="flex align-items-center gap-3">
                            {/* Add any additional elements here */}
                        </div>
                    </div>
                </div>
                <div className="p-col">
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">₪{dress.price}</span>
                        <Button label="לפרטים" className="p-button-rounded p-button-info" onClick={handleNavigate} />
                    </div>
                </div>
            </div>
        </Card>
    );
};
 
export default Dress;