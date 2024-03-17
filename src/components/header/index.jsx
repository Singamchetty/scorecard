import React, {useState} from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clearStore from '../../utils/clearStore';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userDetails.user);
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        navigate('/');
        clearStore(dispatch)
    }

    return (
        <div className="flex items-center justify-between py-5 px-10">
            <img src="/logo.png"/>
            <div className="flex items-center relative">
                <button className=" -mt-1 text-2xl flex" onClick={() => setOpen(!open)}>
                    <img src="/user.png" width="35px" height="35px" className="mt-2 pr-2" />
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">{user?.empName}</p>
                        <p className="text-xs">{user?.designation}</p>
                    </div>
                </button>
                <button onClick={handleLogout} className={`${!open && "hidden"} absolute top-[40px] bg-white opacity-100 shadow-md px-5 py-1 bg-opacity-100 rounded border border-gray-400 right-0 hover:bg-blue-400 hover:text-white w-[-webkit-fill-available]`} style={{zIndex: 1}}>
                        Logout
                </button>
            </div>
        </div>
    )
}

export default Header;
