import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function Sidebar() {
    const user = useSelector((state) => state.userDetails.user);
    const reportees = useSelector((state) => state.reportees.reportees);
    const url = window.location.href

  return (
    <div className="w-[30%] flex items-center flex-col px-4">
      <div>
        <img src="/user.png" width="130px" height="130px" />
      </div>
      <div className="flex items-center flex-col mt-5">
        <p className="text-lg font-semibold">{user.empName}</p>
        <p>{user.designation}</p>
      </div>
      {
        url.includes('/reports') && <div className="mt-5 border-t-2 border-gray-300 w-[-webkit-fill-available] flex flex-col ">
        <p className="text-xl text-blue-400 font-semibold pl-4 mt-3">My Project Allocations</p>
        <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[50vh] overflow-auto">
          {
            reportees?.map(({empName, score, empId}) => (
              <div className="flex items-center bg-white p-2 justify-between mb-1" key={empId}>
                  <img src="/man.png" width="18px" height="18px" />
                  <p className="w-[80%]">{empName}</p>
                  <p className="w-[10%] bg-blue-200 rounded-sm text-center">{score}</p>
              </div>
            ))
          }
        </div>
      </div>
      }

    </div>
  );
}

export default Sidebar;
