import React from 'react';
import AppNavbar from '../components/shared/AppNavbar';
import AppFooter from '../components/shared/AppFooter';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
         <div  className='flex flex-col min-h-screen '>
            <AppNavbar></AppNavbar>
            <main className='flex-grow max-w-10/12 mx-auto'>
               <Outlet></Outlet>
            </main>
            <AppFooter></AppFooter>
        </div>
    );
};

export default RootLayout;