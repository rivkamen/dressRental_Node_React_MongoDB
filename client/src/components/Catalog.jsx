
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import './Catalog.css';
// // // // // import Dress from './Dress';
// // // // // import { useGetAllDressesQuery } from '../app/dressApiSlice';

// // // // // const Catalog = () => {
// // // // //     const [searchTerm, setSearchTerm] = useState('');
// // // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // //     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

// // // // //     // סינון השמלות לפי מונח החיפוש
// // // // //     const filteredDresses = dresses.filter(dress => 
// // // // //         dress.name.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //     );

// // // // //     const handleSearch = () => {
// // // // //         console.log("מחפש:", searchTerm);
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         const handleResize = () => {
// // // // //             if (window.innerWidth > 600) {
// // // // //                 setIsSidebarOpen(true); // פתח את הסרגל אם גודל המסך גדול מ-500
// // // // //             } else {
// // // // //                 setIsSidebarOpen(false); // סגור את הסרגל אם גודל המסך קטן מ-500
// // // // //             }
// // // // //         };

// // // // //         window.addEventListener('resize', handleResize);
// // // // //         handleResize(); // בדוק את גודל המסך בהתחלה

// // // // //         return () => {
// // // // //             window.removeEventListener('resize', handleResize);
// // // // //         };
// // // // //     }, []);

// // // // //     return (
// // // // //         <div className="catalog">
// // // // //             <div className="dress-grid">
// // // // //                 {isLoading && <p>טוען...</p>}
// // // // //                 {isError && <p>שגיאה: {error.message}</p>}
// // // // //                 {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
// // // // //             </div>

// // // // //             {/* כפתור עבור מסכים קטנים */}
// // // // //             {window.innerWidth <= 600 && (
// // // // //                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
// // // // //                     פתח סנן
// // // // //                 </button>
// // // // //             )}

// // // // //             {/* טור הסינון */}
// // // // //             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
// // // // //                 <input 
// // // // //                     type="text" 
// // // // //                     placeholder="חפש שמלה..." 
// // // // //                     value={searchTerm} 
// // // // //                     onChange={(e) => setSearchTerm(e.target.value)} 
// // // // //                 />
// // // // //                 <button onClick={handleSearch}>חפש</button>
// // // // //                 {window.innerWidth <= 600 && (
// // // // //                     <button onClick={() => setIsSidebarOpen(false)}>סגור</button>
// // // // //                 )}
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Catalog;
// // // // import React, { useState, useEffect } from 'react';
// // // // import './Catalog.css';
// // // // import Dress from './Dress';
// // // // import { useGetAllDressesQuery } from '../app/dressApiSlice';

// // // // const Catalog = () => {
// // // //     const [searchTerm, setSearchTerm] = useState('');
// // // //     const [selectedSize, setSelectedSize] = useState(''); // הוספת מצב לבחירת מידה
// // // //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // //     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

// // // //     // סינון השמלות לפי מונח החיפוש והמין
// // // //     const filteredDresses = dresses.filter(dress => {
// // // //         const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase());
// // // //         const matchesSize = selectedSize ? dress.size === selectedSize : true; // סינון לפי מידה
// // // //         return matchesSearchTerm && matchesSize;
// // // //     });

// // // //     const handleSearch = () => {
// // // //         console.log("מחפש:", searchTerm);
// // // //     };

// // // //     useEffect(() => {
// // // //         const handleResize = () => {
// // // //             if (window.innerWidth > 500) {
// // // //                 setIsSidebarOpen(true);
// // // //             } else {
// // // //                 setIsSidebarOpen(false);
// // // //             }
// // // //         };

// // // //         window.addEventListener('resize', handleResize);
// // // //         handleResize();

// // // //         return () => {
// // // //             window.removeEventListener('resize', handleResize);
// // // //         };
// // // //     }, []);

// // // //     return (
// // // //         <div className="catalog">
// // // //             <div className="dress-grid">
// // // //                 {isLoading && <p>טוען...</p>}
// // // //                 {isError && <p>שגיאה: {error.message}</p>}
// // // //                 {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
// // // //             </div>

// // // //             {/* כפתור עבור מסכים קטנים */}
// // // //             {window.innerWidth <= 500 && (
// // // //                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
// // // //                     פתח סנן
// // // //                 </button>
// // // //             )}

// // // //             {/* טור הסינון */}
// // // //             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
// // // //                 <input 
// // // //                     type="text" 
// // // //                     placeholder="חפש שמלה..." 
// // // //                     value={searchTerm} 
// // // //                     onChange={(e) => setSearchTerm(e.target.value)} 
// // // //                 />
                
// // // //                 {/* בחירת מידה */}
// // // //                 <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
// // // //                     <option value="">כל המידות</option>
// // // //                     <option value="women">נשים</option>
// // // //                     <option value="girls">בנות</option>
// // // //                 </select>
                
// // // //                 <button onClick={handleSearch}>חפש</button>
// // // //                 {window.innerWidth <= 500 && (
// // // //                     <button onClick={() => setIsSidebarOpen(false)}>סגור</button>
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Catalog;
// // // import React, { useState, useEffect } from 'react';
// // // import './Catalog.css';
// // // import Dress from './Dress';
// // // import { useGetAllDressesQuery } from '../app/dressApiSlice';

// // // const Catalog = () => {
// // //     const [searchTerm, setSearchTerm] = useState('');
// // //     const [selectedSize, setSelectedSize] = useState(''); // State for selected size
// // //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

// // //     // Filtering dresses based on search term and size
// // //     const filteredDresses = dresses.filter(dress => {
// // //         console.log(dress);
        
// // //         const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase());
// // //         const matchesSize = selectedSize ? 
// // //             dress.sizeList && dress.sizeList.some(sizeEntry => sizeEntry.size === selectedSize) : true; // Check if sizeList exists
// // //         return matchesSearchTerm && matchesSize;
// // //     });

// // //     const handleSearch = () => {
// // //         console.log("Searching for:", searchTerm);
// // //     };

// // //     useEffect(() => {
// // //         const handleResize = () => {
// // //             setIsSidebarOpen(window.innerWidth > 500);
// // //         };

// // //         window.addEventListener('resize', handleResize);
// // //         handleResize();

// // //         return () => {
// // //             window.removeEventListener('resize', handleResize);
// // //         };
// // //     }, []);

// // //     return (
// // //         <div className="catalog">
// // //             <div className="dress-grid">
// // //                 {isLoading && <p>Loading...</p>}
// // //                 {isError && <p>Error: {error.message}</p>}
// // //                 {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
// // //             </div>

// // //             {/* Button for small screens */}
// // //             {window.innerWidth <= 500 && (
// // //                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
// // //                     Open Filter
// // //                 </button>
// // //             )}

// // //             {/* Filter sidebar */}
// // //             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
// // //                 <input 
// // //                     type="text" 
// // //                     placeholder="Search dress..." 
// // //                     value={searchTerm} 
// // //                     onChange={(e) => setSearchTerm(e.target.value)} 
// // //                 />
                
// // //                 {/* Size selection */}
// // //                 <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
// // //                     <option value="">All Sizes</option>
// // //                     <option value="women">Women</option>
// // //                     <option value="girls">Girls</option>
// // //                 </select>
                
// // //                 <button onClick={handleSearch}>Search</button>
// // //                 {window.innerWidth <= 500 && (
// // //                     <button onClick={() => setIsSidebarOpen(false)}>Close</button>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default Catalog;

// // import React, { useState, useEffect } from 'react';
// // import './Catalog.css';
// // import Dress from './Dress';
// // import { useGetAllDressesQuery } from '../app/dressApiSlice';

// // const Catalog = () => {
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [selectedSize, setSelectedSize] = useState(''); // State for selected size
// //     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

// //     // Filtering dresses based on search term and size
// //     const filteredDresses = dresses.filter(dress => {
// //         const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase());
// //         const matchesSize = selectedSize ? 
// //             dress.dressListSizes && dress.dressListSizes.some(sizeEntry => sizeEntry.size === selectedSize) : true; // Check if dressListSizes exists
// //         return matchesSearchTerm && matchesSize;
// //     });

// //     const handleSearch = () => {
// //         console.log("Searching for:", searchTerm);
// //     };

// //     useEffect(() => {
// //         const handleResize = () => {
// //             setIsSidebarOpen(window.innerWidth > 500);
// //         };

// //         window.addEventListener('resize', handleResize);
// //         handleResize();

// //         return () => {
// //             window.removeEventListener('resize', handleResize);
// //         };
// //     }, []);

// //     return (
// //         <div className="catalog">
// //             <div className="dress-grid">
// //                 {isLoading && <p>Loading...</p>}
// //                 {isError && <p>Error: {error.message}</p>}
// //                 {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
// //             </div>

// //             {/* Button for small screens */}
// //             {window.innerWidth <= 500 && (
// //                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
// //                     Open Filter
// //                 </button>
// //             )}

// //             {/* Filter sidebar */}
// //             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
// //                 <input 
// //                     type="text" 
// //                     placeholder="Search dress..." 
// //                     value={searchTerm} 
// //                     onChange={(e) => setSearchTerm(e.target.value)} 
// //                 />
                
// //                 {/* Size selection */}
// //                 <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
// //                     <option value="">All Sizes</option>
// //                     <option value="women">Women</option>
// //                     <option value="girls">Girls</option>
// //                 </select>
                
// //                 <button onClick={handleSearch}>Search</button>
// //                 {window.innerWidth <= 500 && (
// //                     <button onClick={() => setIsSidebarOpen(false)}>Close</button>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Catalog;
// import React, { useState, useEffect } from 'react';
// import './Catalog.css';
// import Dress from './Dress';
// import { useGetAllDressesQuery } from '../app/dressApiSlice';

// const Catalog = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedSize, setSelectedSize] = useState(''); // State for selected size
//     const [selectedKey, setSelectedKey] = useState(''); // State for selected key
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

//     // Filtering dresses based on search term, size, and key
//     const filteredDresses = dresses.filter(dress => {
//         const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesSize = selectedSize ? 
//             dress.dressListSizes && dress.dressListSizes.some(sizeEntry => sizeEntry.size === selectedSize) : true; 
//         const matchesKey = selectedKey ? 
//             dress.dressListSizes && dress.dressListSizes.some(sizeEntry => sizeEntry.key === selectedKey) : true; 
//         return matchesSearchTerm && matchesSize && matchesKey;
//     });

//     const handleSearch = () => {
//         console.log("Searching for:", searchTerm);
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             setIsSidebarOpen(window.innerWidth > 500);
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <div className="catalog">
//             <div className="dress-grid">
//                 {isLoading && <p>Loading...</p>}
//                 {isError && <p>Error: {error.message}</p>}
//                 {filteredDresses.map((d) => <Dress dress={d} key={d.id} />)}
//             </div>

//             {/* Button for small screens */}
//             {window.innerWidth <= 500 && (
//                 <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
//                     Open Filter
//                 </button>
//             )}

//             {/* Filter sidebar */}
//             <div className={`filter-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
//                 <input 
//                     type="text" 
//                     placeholder="Search dress..." 
//                     value={searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                 />
                
//                 {/* Size selection */}
//                 <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
//                     <option value="">All Sizes</option>
//                     <option value="women">Women</option>
//                     <option value="girls">Girls</option>
//                 </select>

//                 {/* Key selection */}
//                 <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
//                     <option value="">All Keys</option>
//                     {dresses.flatMap(dress => 
//                         dress.dressListSizes.map(sizeEntry => 
//                             <option key={sizeEntry.key} value={sizeEntry.key}>{sizeEntry.key}</option>
//                         )
//                     )}
//                 </select>
                
//                 <button onClick={handleSearch}>Search</button>
//                 {window.innerWidth <= 500 && (
//                     <button onClick={() => setIsSidebarOpen(false)}>Close</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Catalog;
import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Dress from './Dress';
import { useGetAllDressesQuery } from '../app/dressApiSlice';

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState(''); // State for selected size
    const [selectedKey, setSelectedKey] = useState(''); // State for selected key
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: dresses = [], isLoading, isError, error } = useGetAllDressesQuery();

    // Filtering dresses based on search term, size, and key
    const filteredDresses = dresses.filter(dress => {
        const matchesSearchTerm = dress.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSize = selectedSize ? 
            dress.dressListSizes && dress.dressListSizes.some(sizeEntry => sizeEntry.size === selectedSize) : true; 
        const matchesKey = selectedKey ? 
            dress.dressListSizes && dress.dressListSizes.some(sizeEntry => sizeEntry.key === selectedKey) : true; 
        return matchesSearchTerm && matchesSize && matchesKey;
    });

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 500);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
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
                <input 
                    type="text" 
                    placeholder="Search dress..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                
                {/* Size selection */}
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="">גיל</option>
                    <option value="women">Women</option>
                    <option value="girls">Girls</option>
                </select>

                {/* Key selection */}
                <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                    <option value="">מידה</option>
                    {[...new Set(dresses.flatMap(dress => 
                        dress.dressListSizes.map(sizeEntry => sizeEntry.key)
                    ))].map(uniqueKey => (
                        <option key={uniqueKey} value={uniqueKey}>{uniqueKey}</option>
                    ))}
                </select>
                
                {/* <button onClick={handleSearch}>Search</button> */}
                {window.innerWidth <= 500 && (
                    <button onClick={() => setIsSidebarOpen(false)}>Close</button>
                )}
            </div>
        </div>
    );
};

export default Catalog;
