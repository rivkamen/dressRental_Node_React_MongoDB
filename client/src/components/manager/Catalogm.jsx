

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
import './Catalogm.css';
import Dress from './Dressm';
import { useGetAllDressesQuery } from '../../app/dressApiSlice';
import { Button } from 'primereact/button';
import AddDress from './AddDress';
import { Dialog } from 'primereact/dialog';

const Catalogm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: dresses = [], isLoading, isError, error, refetch } = useGetAllDressesQuery();
    const [visible,setVisible]=useState('')

    return (
        
        <div className="catalog" dir='rtl'>
        <Button label="הוספת שמלה" icon="pi pi-plus" onClick={()=>setVisible(true)}/>
        <Dialog children="card" header="Add Dress" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
    <AddDress handleCloseDialog={() => setVisible(false)} />
</Dialog>

             {/* {visible&&<AddDress/>} */}
            <div className="dress-grid">
                {dresses.map((d) => <Dress dress={d} key={d.id} />)}
            </div>
           
        </div>
    );
};

export default Catalogm;
