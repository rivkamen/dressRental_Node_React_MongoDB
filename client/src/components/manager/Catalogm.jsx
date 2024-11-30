
// import React, { useState, useEffect } from 'react';
// import './Catalogm.css';
// import Dress from './Dressm';
// import { useGetAllDressesQuery } from '../../app/dressApiSlice';
// import { Button } from 'primereact/button';
// import AddDress from './AddDress';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { MultiSelect } from 'primereact/multiselect';

// const Catalog = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedSizes, setSelectedSizes] = useState([]);
//     const [selectedKeys, setSelectedKeys] = useState([]);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();
//     const [visible, setVisible] = useState(false);

//     // Pagination states
//     const [currentPage, setCurrentPage] = useState(1);
//     const dressesPerPage = 10; // Number of dresses per page

//     const filteredDresses = dresses.filter(dress => {
//         const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           (dress.description && dress.description.toLowerCase().includes(searchTerm.toLowerCase()));
//         const matchesSizes = selectedSizes.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedSizes.includes(sizeEntry.size)) : true;
//         const matchesKeys = selectedKeys.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedKeys.includes(sizeEntry.key)) : true;
//         return matchesSearchTerm && matchesSizes && matchesKeys;
//     });

//     // Calculate paginated dresses
//     const indexOfLastDress = currentPage * dressesPerPage;
//     const indexOfFirstDress = indexOfLastDress - dressesPerPage;
//     const currentDresses = filteredDresses.slice(indexOfFirstDress, indexOfLastDress);

//     const totalPages = Math.ceil(filteredDresses.length / dressesPerPage);

//     useEffect(() => {
//         // Force reflow to fix rendering issue
//         const grid = document.querySelector('.dress-grid');
//         if (grid) {
//             grid.style.display = 'none'; // Temporarily hide the grid
//             setTimeout(() => {
//                 grid.style.display = 'grid'; // Restore the grid layout
//             }, 10); // Short delay to force reflow
//         }
//     }, [currentDresses]);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 500) {
//                 setIsSidebarOpen(true); // Sidebar open on larger screens
//             } else {
//                 setIsSidebarOpen(false); // Sidebar closed by default on smaller screens
//             }
//         };

//         let resizeTimeout;
//         const debounceResize = () => {
//             clearTimeout(resizeTimeout);
//             resizeTimeout = setTimeout(handleResize, 200);
//         };

//         window.addEventListener('resize', debounceResize);
//         handleResize();

//         return () => {
//             window.removeEventListener('resize', debounceResize);
//         };
//     }, []);

//     // Function to change page
//     const changePage = (pageNumber) => {
//         if (pageNumber < 1) {
//             setCurrentPage(1);
//         } else if (pageNumber > totalPages) {
//             setCurrentPage(totalPages);
//         } else {
//             setCurrentPage(pageNumber);
//         }
//     };

//     return (
//         <div className="catalog">
//             <Dialog dir='rtl' header="הוספת שמלה" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
//                 <AddDress handleCloseDialog={() => setVisible(false)} />
//             </Dialog>

//             {/* Dress Gallery */}
//             <div className="dress-grid">
//                 {isLoading && <p>Loading...</p>}
//                 {isError && <p>Error: {error.message}</p>}
//                 {currentDresses.map((d) => (
//                     <div className="dress-item" key={d.id}>
//                         <Dress dress={d} />
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination Controls */}
           

//             {/* Button to open sidebar on small screens */}
//             {!isSidebarOpen && (
//                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
//                     Open Filter
//                 </button>
//             )}

//             {/* Filter Sidebar */}
//             <br/>
//             <br/>
//             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//                 <InputText dir='rtl'
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="חפש שמלה..."
//                     className="w-full"
//                 />
//                 <br/>
//                 <br/>

//                 <MultiSelect dir='rtl'
//                     value={selectedSizes} 
//                     onChange={(e) => setSelectedSizes(e.value)} 
//                     options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))].map(size => ({ label: size, value: size }))}
//                     placeholder="נשים/בנות"
//                     className="w-full"
//                 />
//                 <br/>
                
//                 <MultiSelect dir='rtl'
//                     value={selectedKeys} 
//                     onChange={(e) => setSelectedKeys(e.value)} 
//                     options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))].map(key => ({ label: key, value: key }))}
//                     placeholder="בחר מידה"
//                     className="w-full"
//                 />
//                 <Button className="addButton" label="הוספת שמלה" icon="pi pi-plus" onClick={() => setVisible(true)} />
//                 <div className="pagination">
//                 <button 
//                     onClick={() => changePage(currentPage - 1)} 
//                     disabled={currentPage === 1}
//                     className="page-button"
//                 >
//                     הקודם
//                 </button>
                
//                 {/* Page number buttons */}
//                 {[...Array(totalPages)].map((_, index) => (
//                     <button 
//                         key={index + 1} 
//                         onClick={() => changePage(index + 1)} 
//                         className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}

//                 <button 
//                     onClick={() => changePage(currentPage + 1)} 
//                     disabled={currentPage === totalPages}
//                     className="page-button"
//                 >
//                     הבא
//                 </button>
//             </div>
//                 {window.innerWidth <= 500 && (
//                     <button onClick={() => setIsSidebarOpen(false)}>Close</button>
//                 )}
//             </div>
//         </div>
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
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();
    const [visible, setVisible] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const dressesPerPage = 10; // Number of dresses per page

    const filteredDresses = dresses.filter(dress => {
        const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (dress.description && dress.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSizes = selectedSizes.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedSizes.includes(sizeEntry.size)) : true;
        const matchesKeys = selectedKeys.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedKeys.includes(sizeEntry.key)) : true;
        return matchesSearchTerm && matchesSizes && matchesKeys;
    });

    // Calculate paginated dresses
    const indexOfLastDress = currentPage * dressesPerPage;
    const indexOfFirstDress = indexOfLastDress - dressesPerPage;
    const currentDresses = filteredDresses.slice(indexOfFirstDress, indexOfLastDress);

    const totalPages = Math.ceil(filteredDresses.length / dressesPerPage);

    useEffect(() => {
        // Force reflow to fix rendering issue
        const grid = document.querySelector('.dress-grid');
        if (grid) {
            grid.style.display = 'none'; // Temporarily hide the grid
            setTimeout(() => {
                grid.style.display = 'grid'; // Restore the grid layout
            }, 10); // Short delay to force reflow
        }
    }, [currentDresses]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setIsSidebarOpen(true); // Sidebar open on larger screens
            } else {
                setIsSidebarOpen(false); // Sidebar closed by default on smaller screens
            }
        };

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

    // Function to change page
    const changePage = (pageNumber) => {
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (pageNumber > totalPages) {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(pageNumber);
        }
    };


    return (
        <div className="catalog">
            {/* <Dialog dir="rtl" header="הוספת שמלה" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}> */}
            <Dialog dir="rtl" header="הוספת שמלה" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <AddDress handleCloseDialog={() => setVisible(false)} />
            </Dialog>
    
    
            {/* Dress Gallery */}
            <div className="dress-grid">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {currentDresses.map((d) => (
                    <div className="dress-item" key={d.id}>
                        <Dress dress={d} />
                    </div>
                ))}
            </div>
    
    
            {/* Pagination Controls */}
            {/* <div className="pagination"> */}
            <div className="pagination">
                <button 
                    onClick={() => changePage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="page-button"
                >
                    הקודם
                </button>
                
                {/* Page number buttons */}
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => changePage(index + 1)} 
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
    
    
                <button 
                    onClick={() => changePage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="page-button"
                >
                    הבא
                </button>
            </div>
    
            {/* Sidebar and filters */}
            {!isSidebarOpen && (
                <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                    Open Filter
                </button>
            )}
    
            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <InputText dir="rtl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="חפש שמלה..."
                    className="w-full"
                />
                <MultiSelect dir="rtl"
                    value={selectedSizes} 
                    onChange={(e) => setSelectedSizes(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))].map(size => ({ label: size, value: size }))}
                    placeholder="נשים/בנות"
                    className="w-full"
                />
                <MultiSelect dir="rtl"
                    value={selectedKeys} 
                    onChange={(e) => setSelectedKeys(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))].map(key => ({ label: key, value: key }))}
                    placeholder="בחר מידה"
                    className="w-full"
                />
                <Button className="addButton" label="הוספת שמלה" icon="pi pi-plus" onClick={() => setVisible(true)} />
    
            {/* Sidebar and filters */}
            {!isSidebarOpen && (
                <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                    Open Filter
                </button>
            )}
    
            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <InputText dir="rtl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="חפש שמלה..."
                    className="w-full"
                />
                <MultiSelect dir="rtl"
                    value={selectedSizes} 
                    onChange={(e) => setSelectedSizes(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))].map(size => ({ label: size, value: size }))}
                    placeholder="נשים/בנות"
                    className="w-full"
                />
                <MultiSelect dir="rtl"
                    value={selectedKeys} 
                    onChange={(e) => setSelectedKeys(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))].map(key => ({ label: key, value: key }))}
                    placeholder="בחר מידה"
                    className="w-full"
                />
                <Button className="addButton" label="הוספת שמלה" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            </div>
        </div>
    );
    
    
};

export default Catalog;
