
import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Dress from './Dress';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { useGetAllDressesQuery } from '../app/dressApiSlice';
import { Button } from 'primereact/button';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]); // MultiSelect for sizes
    const [selectedSizes2, setSelectedSizes2] = useState([]); // MultiSelect for sizes
    const [selectedKeys, setSelectedKeys] = useState([]); // MultiSelect for keys
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();
    const [currentPage, setCurrentPage] = useState(1);
        const dressesPerPage = 12; // Number of dresses per page

        const isWomen=(e)=>{
            if(e.includes("נשים") && e.includes("בנות")){
                setSelectedSizes(['women', 'girls'])
            }
            else if(e.includes("נשים")){
                setSelectedSizes(['women'])
            
            }
            else if(e.includes("בנות")){
                setSelectedSizes(['girls'])
            
            }
            }
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

    const changePage = (pageNumber) => {
        
        if (pageNumber < 1) {
            setCurrentPage(1);
        } else if (pageNumber > totalPages) {
            setCurrentPage(totalPages);
        } else {
            setCurrentPage(pageNumber);
        }
    };

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
            setIsSidebarOpen(window.innerWidth > 600);
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



    // Function to change page



    return (
        <>
        <div className="catalog">
            <div className="dress-grid">
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error.message}</p>}
                {currentDresses.map((d) => <div key={d.id}>
                                <Dress dress={d} />
                          </div>)}
            </div>

            {/* Button for small screens */}
            {window.innerWidth <= 600 && (
                <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
                    אפשרויות נוספות
                </button>
            )}

            {/* Filter sidebar */}
            <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

                <br/>
                <br/>
              


 <br/>

<br/>
                <InputText dir="rtl"
                id='side-bar-inputext'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="חפש שמלה..."
                    className="w-full"
                />
                <br/>
                <br/>

                <MultiSelect dir="rtl"
                    id='side-bar-age'

                    value={selectedSizes2} 
                    onChange={(e) => {setSelectedSizes2(e.value); isWomen(e.value)}}
                    // options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.size)))].map(size => ({ label: size, value: size }))}
                    options={[
                        ...new Set(
                          dresses.flatMap(dress =>
                            dress.dressListSizes.map(sizeEntry =>
                              sizeEntry.size==="women" ? "נשים" : "בנות"
                            )
                          )
                        )
                      ].map(size => ({ label: size, value: size }))}
                      
                    placeholder="נשים/בנות"
                      className="w-full custom-multiselect"
                    panelClassName="custom-panel"
                    />
                <br/>

                <br/>
                <MultiSelect dir="rtl"
                    id='side-bar-size'

                    value={selectedKeys} 
                    onChange={(e) => setSelectedKeys(e.value)} 
                    options={[...new Set(dresses.flatMap(dress => dress.dressListSizes.map(sizeEntry => sizeEntry.key)))].map(key => ({ label: key, value: key }))}
                    placeholder="בחר מידה"
                    className="w-full custom-multiselect"
                    panelClassName="custom-panel"                />
                   <br/>

<br/>


                
                {window.innerWidth <= 600 && (
                    <>
                    <br/>
                    <Button className="closeButton" onClick={() => setIsSidebarOpen(false)}>סגור</Button></>
                )}
 



            </div>
        </div>

<div className="pagination">
<br/>
<br/>
<Button icon="pi pi-angle-left" rounded text raised severity="secondary" aria-label="Bookmark" onClick={() => changePage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    // className="page-button"
                    style={{backgroundColor:"rgb(213, 1, 118)",marginRight: "10px"}}
                    />


                {[...Array(totalPages)].map((_, index) => (
                  
                    <Button
    rounded
    text
    raised
    outlined
    severity="secondary"
    key={index + 1}
    onClick={() => changePage(index + 1)}
    className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
    style={{
        backgroundColor: "white",
        marginRight: "8px",
        borderColor: "rgb(213, 1, 118)",
        width: "30px",   // רוחב הכפתור
        height: "30px",  // גובה הכפתור
        borderRadius: "50%", // עיגול מלא
        display: "flex",  // ליישר את המלל במרכז
        justifyContent: "center", // למרכז במאוזן
        alignItems: "center", // למרכז במאונך
        padding: 0,  // ביטול ריפוד
        fontSize: "14px",  // גודל הטקסט (אפשר לשנות לפי הצורך)
    }}
>
    {index + 1}
</Button>

                ))}
    <Button icon="pi pi-angle-right" rounded text raised severity="secondary" aria-label="Bookmark" onClick={() => changePage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    style={{backgroundColor:"rgb(213, 1, 118)"}}
/>

        
    <br/>
    
                </div>
                </>
    );
};

export default Catalog;
