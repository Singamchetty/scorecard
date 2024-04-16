import React, { useState } from 'react';
import { useLocation  } from "react-router-dom";
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import LeftSidebar from '../../components/leftSidebar';
import SetWindowSize from '../../utils/SetWindowSize';

function Layout({children}) {
    const location = useLocation();
    const  [isOpen, setIsOpen] = useState(false);
    const  [windowWidth, windowHeight] = SetWindowSize();

    const handleLogoutOpen=()=>{
       setIsOpen(false)
    }
    const url = location.pathname;
    return (
        <div className='max-h-[84vh]' onClick={handleLogoutOpen}>
            <Header isOpen={isOpen} />
            <div className="flex pt-[85px]">
                <Sidebar/>
                <div className="bg-[#fafafb] w-full overflow-auto" style={{ height: `calc(${windowHeight}px - 87px)` }}>
                    {children}
                </div>
                {url.includes('/viewreportee') && <LeftSidebar/>}
            </div>
        </div>
    )
}

export default Layout;
