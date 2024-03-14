import React from "react";
import { useSelector } from "react-redux";

function Sidebar() {
    const user = useSelector((state) => state.userDetails.user);
  return (
    <div className="w-[30%] flex items-center flex-col">
      <div>
        <img src="/user.png" width="130px" height="130px" />
      </div>
      <div className="flex items-center flex-col mt-5">
        <p className="text-lg font-semibold">{user.empName}</p>
        <p>{user.designation}</p>
      </div>
    </div>
  );
}

export default Sidebar;
