
import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Dress from './Dress';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { useGetAllDressesQuery } from '../app/dressApiSlice';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]); // MultiSelect for sizes
    const [selectedKeys, setSelectedKeys] = useState([]); // MultiSelect for keys
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

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
