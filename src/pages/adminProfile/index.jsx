import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducers/userSlice";
import { scoreColor } from "../../utils/commonFunctions";
import Tabs from "./tabs";

const AdminProfile = () => {
    const dispatch = useDispatch();
    const { user,error,loading } = useSelector((state) => state.userDetails); // Get user data from Redux store
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (



        <div className="p-4" >
            <div className="bg-white p-3 rounded-md">
                <div className="flex justify-between">

                    {user && (
                        <div className="flex items-center">
                            <div>
                                <p className="font-medium mb-2">
                                    Employee Name
                                </p>
                                <p className="font-medium">
                                    Employee Id
                                </p>
                            </div>
                            <div>
                                <p className="mb-2"><span className="font-medium">:</span> {user.empName}</p>
                                <p><span className="font-medium">:</span> {user.empId}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center">
                        <div>
                            <p className="font-medium mb-2">
                                Designation
                            </p>
                            <p className="font-medium">
                                Role
                            </p>
                        </div>
                        <div>
                            <p className="mb-2"><span className="font-medium">:</span> {user.designation}</p>
                            <p><span className="font-medium">:</span> {user.techStack}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className={`w-[40px] h-[40px] rounded-full flex items-center text-white justify-center  ${scoreColor(user.score)}`}>
                            <span className="text-lg font-bold">{user.score}</span>
                        </div>
                        <div className="">
                            <span className="text-blue-400 font-semibold">Total Score</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-10">
                < Tabs />
            </div>


        </div>


    );
};

export default AdminProfile;
