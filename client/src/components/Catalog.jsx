

// import React, { useState, useEffect } from 'react';
// import './Catalog.css';
// import Dress from './Dress';
// import { useGetAllDressesQuery } from '../app/dressApiSlice';

// const Catalog = () => {
//     // const [dresses, setDresses] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredDresses, setFilteredDresses] = useState([]);
//     const { data: dresses = [], isLoading, isError, error, refetch } = useGetAllDressesQuery();

 

//     return (
//          <> 
    
//         <div className="catalog">
         
//                { dresses.map((d) => <Dress dress={d}/>)}
        
//         </div></>
//     );
// };

// export default Catalog;
import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Dress from './Dress';
import { useGetAllDressesQuery } from '../app/dressApiSlice';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: dresses = [], isLoading, isError, error, refetch } = useGetAllDressesQuery();

    return (
        <div className="catalog">
            <div className="dress-grid">
                {dresses.map((d) => <Dress dress={d} key={d.id} />)}
            </div>
        </div>
    );
};

export default Catalog;
