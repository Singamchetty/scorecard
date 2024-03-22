import React from "react";
import { Link } from "react-router-dom";
import SetWindowSize from '../../utils/SetWindowSize';

function Sidebar() {
  const  [windowWidth, windowHeight] = SetWindowSize();

  return (
    <div className="w-[20%] flex items-center flex-col overflow-auto" style={{ height: `calc(${windowHeight}px - 87px)` }}>
      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <li>
            <Link
              className={`flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 `}
              to={`/dashboard`}
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 `}  to={`/reportees`}
            >
              <svg
                className="size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
