import { useLocation } from 'react-router';

const RentPage = () => {
    const location = useLocation();
    const { dress, chosenDate, size } = location.state;  // Retrieve props

    return (
        <div>
            <h1>Rent Dress</h1>
            <p>Dress: {dress.name}</p>
            <p>Date: {chosenDate.toString()}</p>
            <p>Size: {size}</p>
        </div>
    );
};

export default RentPage;
