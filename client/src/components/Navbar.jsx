import React from 'react';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';  // ניתן לשנות את ערכת הנושא לפי הצורך
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const Navbar = () => {
    const items = [
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
            icon: 'pi pi-fw pi-envelope',
            command: () => { window.location.pathname = "/contactForm"; }
        }
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
}

export default Navbar;
