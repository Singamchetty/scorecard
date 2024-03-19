import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import scoreColor from '../../utils/scoreColor';
import Loading from "../loading Component/Loading";

function LeftSidebar() {
  const { reportees, loading } = useSelector((state) => state.reportees);
  const { id } = useParams()

  return (

    <div className="  w-[33%] flex flex-col px-[5px]">
      <p className="text-xl text-blue-400 font-semibold">
        My Reportees
      </p>
      {
        (loading) ? <Loading /> :
          <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[80vh] overflow-auto">
            {reportees?.map(({ empName, score, empId }) => (
              <Link
                to={`/viewreportee/${empId}`}
                className={`flex items-center hover:bg-blue-400 hover:text-white hover:rounded-2xl bg-${Number(id) == empId ? "indigo-200" : "white"
                  } p-2 justify-between mb-1 w-full`}
                key={empId}
              >
                {/* <img src="/man.png" width="18px" height="18px" /> */}
                <p className="w-[80%] text-left">{empName}</p>
                <p className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(score)}`}>
                  {score}
                </p>
              </Link>
            ))}
          </div>
      }

    </div>
  );
}

export default LeftSidebar;
