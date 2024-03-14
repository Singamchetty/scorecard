import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="flex items-center justify-between py-5 px-10">
            <img src="/logo.png"/>
            <div className="flex items-center">
                <img src="/power-button.png" width="30px" height="30px"/>
                <button className="ml-2 -mt-1 text-2xl" >
                    <Link to="/">
                        Logout
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Header;
