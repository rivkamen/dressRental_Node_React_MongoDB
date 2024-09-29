
// import React, { useState, useEffect } from 'react';
// import './Catalogm.css';
// import Dress from './Dressm';
// import { useGetAllDressesQuery } from '../../app/dressApiSlice';
// import { Button } from 'primereact/button';
// import AddDress from './AddDress';
// import { Dialog } from 'primereact/dialog';

// const Catalogm = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const { data: dresses = [], isLoading, isError, error, refetch } = useGetAllDressesQuery();
//     const [visible,setVisible]=useState('')

//     return (
        
//         <div className="catalog" dir='rtl'>
//         <Button label="הוספת שמלה" icon="pi pi-plus" onClick={()=>setVisible(true)}/>
//         <Dialog children="card" header="Add Dress" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
//     <AddDress handleCloseDialog={() => setVisible(false)} />
// </Dialog>

//              {/* {visible&&<AddDress/>} */}
//             <div className="dress-grid">
//                 {dresses.map((d) => <Dress dress={d} key={d.id} />)}
//             </div>
           
//         </div>
//     );
// };

// export default Catalogm;

import React, { useState, useEffect } from 'react';
import './Catalogm.css';
import Dress from './Dressm';
import { useGetAllDressesQuery } from '../../app/dressApiSlice';
import { Button } from 'primereact/button';
import AddDress from './AddDress';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]); // MultiSelect for sizes
    const [selectedKeys, setSelectedKeys] = useState([]); // MultiSelect for keys
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();
    const [visible,setVisible]=useState('')

    // Filtering dresses based on search term, sizes, and keys
    const filteredDresses = dresses.filter(dress => {
        // const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) || dress.description.toLowerCase().includes(searchTerm.toLowerCase()) ;
        const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (dress.description && dress.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesSizes = selectedSizes.length > 0 ?
            dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedSizes.includes(sizeEntry.size)) : true;
        const matchesKeys = selectedKeys.length > 0 ?
            dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedKeys.includes(sizeEntry.key)) : true;
        return matchesSearchTerm && matchesSizes && matchesKeys;
    });

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 500);
        };

        // Debounce resize to prevent excessive calls
        let resizeTimeout;
        const debounceResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 200);
        };

        window.addEventListener('resize', debounceResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', debounceResize);
        };
    }, []);

    return (
        <div className="catalog">
            <Button label="הוספת שמלה" icon="pi pi-plus" onClick={()=>setVisible(true)}/>
         <Dialog children="card" header="Add Dress" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
    <AddDress handleCloseDialog={() => setVisible(false)} />
 </Dialog>

            <div className="dress-grid">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
            </div>

            {/* Button for small screens */}
            {window.innerWidth <= 500 && (
                <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                    Open Filter
                </button>
            )}

            {/* Filter sidebar */}
            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

                <br/>
                <br/>
                <br/>
                <br/>

                <InputText dir='rtl'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="חפש שמלה..."
                    className="w-full"
                />
                <br/>
                <br/>
                {/* MultiSelect for sizes */}
                <MultiSelect dir='rtl'
                    value={selectedSizes} 
                    onChange={(e) => setSelectedSizes(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))]
                        .map(size => ({ label: size, value: size }))}
                    placeholder="נשים/בנות"
                    className="w-full"
                />
<br/>



                {/* MultiSelect for keys */}
                <MultiSelect dir='rtl'
                    value={selectedKeys} 
                    onChange={(e) => setSelectedKeys(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))]
                        .map(key => ({ label: key, value: key }))}
                    placeholder="בחר מידה"
                    className="w-full"
                />
                
                {window.innerWidth <= 500 && (
                    <button onClick={() => setIsSidebarOpen(false)}>Close</button>
                )}
            </div>
        </div>
    );
};

export default Catalog;
