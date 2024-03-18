import React, { useState } from 'react'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import LeftSidebar from '../../components/leftSidebar';

function Layout({children}) {
    const  [isOpen, setIsOpen] = useState(false)
    const handleLogoutOpen=()=>{
       setIsOpen(false)
    }
    const url = window.location.href;
    return (
        <div className='max-h-[84vh]' onClick={handleLogoutOpen}>
            <Header isOpen={isOpen} />
            <div className="flex">
                <Sidebar/>
                <div className="bg-[#E9EDEE] w-full" style={{height:"88vh"}}>
                    {children}
                </div>
                {url.includes('/viewreportee') && <LeftSidebar/>}
            </div>
        </div>
    )
}

export default Layout;
