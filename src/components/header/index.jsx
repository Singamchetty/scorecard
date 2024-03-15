import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clearStore from '../../utils/clearStore';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/');
        clearStore(dispatch)
    }
    return (
        <div className="flex items-center justify-between py-5 px-10">
            <img src="/logo.png"/>
            <div className="flex items-center">
                <img src="/power-button.png" width="30px" height="30px"/>
                <button className="ml-2 -mt-1 text-2xl" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Header;
