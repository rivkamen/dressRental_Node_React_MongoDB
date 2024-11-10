

import React, { useState, useEffect } from 'react';
import './Catalogm.css';
import Dress from './Dressm';
import { useGetAllDressesQuery } from '../../app/dressApiSlice';
import { Button } from 'primereact/button';
import AddDress from './AddDress';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import Dressm from './Dressm';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();
    const [visible, setVisible] = useState(false);

    const filteredDresses = dresses.filter(dress => {
        const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (dress.description && dress.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesSizes = selectedSizes.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedSizes.includes(sizeEntry.size)) : true;
        const matchesKeys = selectedKeys.length > 0 ? dress.dressListSizes && dress.dressListSizes.some(sizeEntry => selectedKeys.includes(sizeEntry.key)) : true;
        return matchesSearchTerm && matchesSizes && matchesKeys;
    });

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

    return (
        <div className="catalog">
            <Dialog header="Add Dress" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <AddDress handleCloseDialog={() => setVisible(false)} />
            </Dialog>

            {/* Dress Gallery */}
            <div className="dress-grid">
                   {isLoading && <p>Loading...</p>}
                    {isError && <p>Error: {error.message}</p>}
                    {filteredDresses.map((d) => (
                          <div className="dress-item" key={d.id}>
                                <Dress dress={d} />
                          </div>
    ))}

            </div>

            {/* Button to open sidebar on small screens */}
            {!isSidebarOpen && (
                <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                    Open Filter
                </button>
            )}

            {/* Filter Sidebar */}
            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <InputText dir='rtl'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="חפש שמלה..."
                    className="w-full"
                />
                <MultiSelect dir='rtl'
                    value={selectedSizes} 
                    onChange={(e) => setSelectedSizes(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))]
                        .map(size => ({ label: size, value: size }))}
                    placeholder="נשים/בנות"
                    className="w-full"
                />
                <MultiSelect dir='rtl'
                    value={selectedKeys} 
                    onChange={(e) => setSelectedKeys(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))]
                        .map(key => ({ label: key, value: key }))}
                    placeholder="בחר מידה"
                    className="w-full"
                />
                            <Button className="addButton" label="הוספת שמלה" icon="pi pi-plus" onClick={() => setVisible(true)} />

                {window.innerWidth <= 500 && (
                    <button onClick={() => setIsSidebarOpen(false)}>Close</button>
                )}
            </div>
        </div>
    );
};
export default Catalog;
