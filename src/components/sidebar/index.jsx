import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import SetWindowSize from '../../utils/SetWindowSize';
import DashboardIcon from '../../assets/icons/dashboardIcon';
import ReportsIcon from '../../assets/icons/reportsIcon';
import AdminProfileIcon from '../../assets/icons/adminProfileIcon'; // Assuming you have an icon for Admin Profile
import Admin from "../../pages/admin";


const menus = [
  { title: "Dashboard", path: '/dashboard', selectPaths: ['dashboard'], icon: <DashboardIcon />, role:[2, 3] },
  { title: "My Reportees", path: '/myreportees', selectPaths: ['myreportees', 'viewreportee'], icon: <ReportsIcon />, role:[2] },
  { title: "Reports", path: '/reportees', selectPaths:['reportees'], icon: <ReportsIcon />, role:[2] },
  { title: "Activity List", path: '/admin', selectPaths:['admin'], icon: <ReportsIcon />, role:[1] },
  { title: "Reports", path: '/adminreportees', selectPaths:['adminreportees'], icon: <ReportsIcon />, role:[1] },
]

function Sidebar() {
  const userDetails = useSelector((state) => state.userDetails?.user);
  const url = window.location.href;
  const  [windowWidth, windowHeight] = SetWindowSize();
  const selected = url.split('/').at(-1);
  const roleId = userDetails.roleId ?? 0

  return (
    <div className="w-[20%] flex bg-blue-700 text-white items-center flex-col overflow-auto" style={{ height: `calc(${windowHeight}px - 87px)` }}>
      <nav
        className="hs-accordion-group mt-1 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          {
            menus.map((menu) => {
              if(menu.role.includes(roleId)) {
                return (
                  <li key={menu.path}>
                    <Link
                      className={`flex  ${menu.selectPaths.includes(selected) && 'bg-blue-500 ' } gap-x-3.5 py-2 lg:px-5 min-sm:px-4  text-sm text-slate-700  hover:bg-blue-500 text-white`}
                      to={menu.path}
                    >
                      <p className="flex items-center">{menu.icon}  <span className="ps-2"> {menu.title}</span></p>
                     
                    </Link>
                  </li>
                )
              }
            })
          }
          
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
