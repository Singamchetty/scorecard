import React from 'react'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

function Layout({children}) {
    return (
        <div>
            <Header/>
            <div className="flex">
                <Sidebar/>
                <div className="bg-[#E9EDEE] w-full" style={{height:"88vh"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
