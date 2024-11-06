
// import React from "react";
// import { useLocation } from "react-router";
// import { useTakeDressMutation } from "../../app/dressApiSlice";
// import Swal from "sweetalert2";
// import { Button } from 'primereact/button';

// const Renting = () => {
//     const location = useLocation();
//     const { userId, dress, chosenDate, size } = location.state;

//     const [takeDressFunc, { isError, error, isSuccess }] = useTakeDressMutation();

//     const handleTakeDress = async () => {
//         try {
     
//             const response = await takeDressFunc({
//                 userId: userId,
//                 _id: dress._id,
//                 key: size,
//                 chosenDate: chosenDate.date
//             }).unwrap();
            
//             if (isSuccess) {

//                 Swal.fire({
//                     title: "Success!",
//                     text: `You have successfully taken the dress: ${dress.name}`,
//                     icon: "success",
//                     confirmButtonText: "OK"
//                 });
//             }
//         } catch (err) {
//             Swal.fire({
//                 title: "Error!",
//                 text: error?.message || "Failed to take the dress. Please try again.",
//                 icon: "error",
//                 confirmButtonText: "OK"
//             });
//         }
//     };

//     return (
//         <div>
//             <h1>User Details</h1>
//             <p>User ID: {userId}</p>
//             <p>Dress: {dress.name}</p>
//             <p>Date: {chosenDate.toString()}</p>
//             <p>Size: {size}</p>

//             {/* Take Dress Button */}
//             <Button 
//                 label="Take Dress"
//                 onClick={handleTakeDress}
//                 className="p-button-success mt-2"
//             />
//         </div>
//     );
// };

// export default Renting;
import React from "react";
import { useLocation } from "react-router";
import { useTakeDressMutation } from "../../app/dressApiSlice";
import Swal from "sweetalert2";
import { Button } from 'primereact/button';

const Renting = () => {
    const location = useLocation();
    const { userId, dress, chosenDate, size } = location.state;

    const [takeDressFunc] = useTakeDressMutation();

    const handleTakeDress = async () => {
        try {
            const response = await takeDressFunc({
                userId: userId,
                _id: dress._id,
                key: size,
                chosenDate: chosenDate.date
            }).unwrap();  // Unwraps the mutation result

            // If the request succeeds, show the success SweetAlert
            Swal.fire({
                title: "Success!",
                text: `You have successfully taken the dress: ${dress.name}`,
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (err) {
            // If there's an error, show the error SweetAlert
            Swal.fire({
                title: "Error!",
                text: err?.data?.message || "Failed to take the dress. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {userId}</p>
            <p>Dress: {dress.name}</p>
            <p>Date: {chosenDate.toString()}</p>
            <p>Size: {size}</p>

            {/* Take Dress Button */}
            <Button 
                label="Take Dress"
                onClick={handleTakeDress}
                className="p-button-success mt-2"
            />
        </div>
    );
};

export default Renting;
