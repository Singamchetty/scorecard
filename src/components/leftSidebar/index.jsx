import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function LeftSidebar() {
    const reportees = useSelector((state) => state.reportees.reportees);
    const {id} = useParams()
  return (

      <div className="mt-2  w-[30%] flex flex-col px-[5px]">
        <p className="text-xl text-blue-400 font-semibold pl-4 mt-3">
          My Reportees
        </p>
        <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[80vh] overflow-auto">
          {reportees?.map(({ empName, score, empId }) => (
            <Link
              to={`/${empId}/reports`}
              className={`flex items-center bg-${
                Number(id) === empId ? "indigo-400" : "white"
              } p-2 justify-between mb-1 w-full`}
              key={empId}
            >
              <img src="/man.png" width="18px" height="18px" />
              <p className="w-[80%] text-left">{empName}</p>
              <p className="w-[10%] bg-blue-200 rounded-sm text-center">
                {score}
              </p>
            </Link>
          ))}
        </div>
      </div>
  );
}

export default LeftSidebar;
