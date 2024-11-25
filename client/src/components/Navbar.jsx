// import React from 'react';
// import { Menubar } from 'primereact/menubar';
// import 'primereact/resources/themes/saga-blue/theme.css';  // ניתן לשנות את ערכת הנושא לפי הצורך
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

// const Navbar = () => {
//     const items = [
//         {
//             label: 'דף הבית',
//             icon: 'pi pi-fw pi-home',
//             command: () => { window.location.pathname = "/"; }
//         },
//         {
//             label: 'קטלוג',
//             icon: 'pi pi-fw pi-list',
//             command: () => { window.location.pathname = "/catalog"; }
//         },
//         {
//             label: 'צור קשר',
//             icon: 'pi pi-fw pi-envelope',
//             command: () => { window.location.pathname = "/contactForm"; }
//         },
//         {
//             label: 'כניסת מנהל',
//             icon: 'pi pi-fw pi-home',
//             command: () => { window.location.pathname = "/adminLogin"; }
//         }
//     ];

//     return (
//         <div>
//             <Menubar model={items} />
//         </div>
//     );
// }

// export default Navbar;
import React from 'react';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Navbar = () => {
    const adminToken = sessionStorage.getItem("adminToken");
    const isAdmin=adminToken!=null;
    const regularItems = [
        {
            label: 'דף הבית',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.pathname = "/"; }
        },
        {
            label: 'קטלוג',
            icon: 'pi pi-fw pi-list',
            command: () => { window.location.pathname = "/catalog"; }
        },
        {
            label: 'צור קשר',
            icon: 'pi pi-fw pi-comment',
            command: () => { window.location.pathname = "/contactForm"; }
        }
        ,
        {
            label: 'כניסת מנהל',
            icon: 'pi pi-fw pi-user',
            command: () => { window.location.pathname = "/adminLogin"; }
        }
    ];

    const adminItems = [
        {
            label: 'דף הבית',
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.pathname = "/"; }
        },
        {
            label: 'קטלוג',
            icon: 'pi pi-fw pi-list',
            command: () => { window.location.pathname = "/catalogm"; }
        },
        {
            label: 'השכרות',
            icon: 'pi pi-shopping-cart',
            command: () => { window.location.pathname = "/rentList"; }
        },
        {
            label: 'צור קשר',
            icon: 'pi pi-fw pi-comment',
            command: () => { window.location.pathname = "/contactForm"; }
        },
        isAdmin
        ? {
            label: 'יציאת מנהל',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
                sessionStorage.removeItem("adminToken");
                window.location.pathname = "/";
            }
        }
        : {
            label: 'כניסת מנהל',
            icon: 'pi pi-fw pi-user',
            command: () => { window.location.pathname = "/adminLogin"; }
        }
    ];

    return (
        <div>
            <Menubar model={isAdmin ? adminItems : regularItems} />
        </div>
    );
}

export default Navbar;
