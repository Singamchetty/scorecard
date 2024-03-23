import React from "react";
import { Link, useParams } from "react-router-dom";
import SetWindowSize from '../../utils/SetWindowSize';
import DashboardIcon from '../../assets/icons/dashboardIcon';
import ReportsIcon from '../../assets/icons/reportsIcon';

const menus = [
  {title: "Dashboard", path: '/dashboard', icon: <DashboardIcon/>},
  {title: "Reports", path: '/reportees', icon: <ReportsIcon />}
]

function Sidebar() {
  const url = window.location.href;
  const  [windowWidth, windowHeight] = SetWindowSize();

  return (
    <div className="w-[20%] flex items-center flex-col overflow-auto" style={{ height: `calc(${windowHeight}px - 87px)` }}>
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          {
            menus.map((menu) => (
              <li>
              <Link
                className={`flex items-center ${url.includes(menu.path) && 'bg-gray-100'} gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 `}
                to={menu.path}
              >
                <span>{menu.icon}</span>
                {menu.title}
              </Link>
            </li>
            ))
          }
         
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
