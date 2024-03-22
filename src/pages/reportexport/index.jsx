import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportstableData,
  fetchReportesActivitiesData,
} from "../../redux/reducers/exporttableslice";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { convertUTCToLocal } from "../../utils/commonFunctions";
import Table from "../../components/table";

function Exporttable() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const { activitiesData } = useSelector((state) => state.totalreportees);
  const { reportees, loading, totalCount, currPage, pagesCount } = useSelector(
    (state) => state.reportees
  );

  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [inputValue, setInputValue] = useState('');
  console.log(activitiesData, "activitiesData");

  const calculateDateRange = (monthsAgo) => {
    const toDate = new Date().toISOString().split("T")[0];
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsAgo);
    const fromDateFormatted = fromDate.toISOString().split("T")[0];
    return { fromDate: fromDateFormatted, toDate };
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    let fromDate, toDate;

    if (selectedValue === "pastMonth") {
      ({ fromDate, toDate } = calculateDateRange(1));
    } else if (selectedValue === "pastthreeMonth") {
      ({ fromDate, toDate } = calculateDateRange(3));
    } else if (selectedValue === "pastsixMonth") {
      ({ fromDate, toDate } = calculateDateRange(6));
    } else if (selectedValue === "pasttwelvemonth") {
      ({ fromDate, toDate } = calculateDateRange(12));
    }
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const handleView = (e) => {
    e.preventDefault();
    let data = {
      empId: Number(selectedEmployee),
      fromDate: fromDate,
      toDate: toDate,
    };
    console.log(data, "data");
    dispatch(fetchReportesActivitiesData(data));
  };

  useEffect(() => {
    if (user) {
      let data = {
        reportees: user.reportees,
        page: 1,
        perPage: user.reportees.length,
      };
      dispatch(fetchReportees(data));
    }
  }, [user]);

  const headers = [
    { title: "Activity Name", id: "aName" },
    {
      title: "Date",
      id: "recorded_date",
      render: (value) => convertUTCToLocal(value),
    },
    { title: "Rated By", id: "ratedBy" },
    {
      title: "Score",
      id: "score",
      render: (value) => (
        <div className="w-[35px] px-3 bg-blue-400 rounded-full text-white font-bold text-center p-[4px]">
          {value}
        </div>
      ),
    },
    {
      title: "Comments",
      id: "comments",
      render: (value) => (
        <span className="listData" title={value}>
          {value}
        </span>
      ),
    },
  ];


  if (reportees?.length > 0) {
    return (
      <div>
        <div className={` overflow-auto sm:rounded-lg p-4 bg-gray-100`}>
          <div className="text-blue-800 py-3 pl-2 text-center">
            {" "}
            Genarate Report
          </div>

          <div>
            <form className=" p-2 text-[12px]">
              <div className="flex items-center justify-evenly ">
                <div className="flex items-center">
                  <label htmlFor="countries" className="font-semibold">
                    Select Employee:{" "}
                  </label>
                  <select
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    value={selectedEmployee}
                    className="bg-gray-50  ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm   rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
                  >
                    <option id="" value="">
                      Select
                    </option>
                    {reportees &&
                      reportees.map((reportee) => (
                        <option
                          key={reportee.empId}
                          id={reportee.empId}
                          value={reportee.empId}
                        >
                          {reportee?.empName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="countries" className="font-semibold">
                    Select Period:
                  </label>
                  <select
                    onChange={handleDropdownChange}
                    className="bg-gray-50 ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 "
                  >
                    <option id="" value="">
                      Select
                    </option>
                    <option id="" value="pastMonth">
                      Past 1 months
                    </option>
                    <option id="" value="pastthreeMonth">
                      Past 3 months
                    </option>
                    <option id="" value="pastsixMonth">
                      Past 6 months
                    </option>
                    <option id="" value="pasttwelvemonth">
                      Past year
                    </option>
                  </select>
                </div>
                <div className="flex">
                  <button
                    className="px-8  py-2 ml-5 w-[100px]  h-[40px] bg-blue-500 text-white font-semibold rounded-md"
                    onClick={(e) => handleView(e)}
                  >
                    View
                  </button>

                  <button
                  disabled={true}
                    type="button"
                    className="px-3  py-2 ml-5   w-[100px]  h-[40px] bg-gray-500 font-semibold text-white rounded-md"  
                  >
                    Download
                  </button>
                </div>
              </div>
            </form>
          </div>
         
          { activitiesData?.length > 0 && (
            <Table headers={headers} loading={loading} data={activitiesData} />
          )}
          {/* {
                        activitiesData?.length>0 && <div className='mx-20 items-center justify-center '>
                            <div className='mt-5'>
                                <div className='max-w-sm ml-4'>
                                    <div className="relative">
                                        <div className="absolute mt-3 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-transparent justify-center border-separate border-spacing-y-2">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr className="mb-2">

                                            <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12">
                                                ACTIVITY NAME
                                            </th>
                                            <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12  ">
                                                DATE
                                            </th>
                                            <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12 " >
                                                SCORE
                                            </th>
                                            <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12  " >
                                                COMMENTS
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        
                                         {activitiesData.map((activitie)=>
                                         <tr className="bg-white  hover:bg-gray-300 ">
                                            <td className="px-6 py-2 " >{activitie.aName}</td>
                                            <td className="px-6 py-2 " >{convertUTCToLocal(activitie.recorded_date)}</td>
                                            <td className="px-6 py-2 " >{activitie.score}</td>
                                            <td className="px-6 py-2 " >{activitie.comments}</td>
                                            
                                            </tr>
                                         )}
                                        
                                     
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    } */}
        </div>
      </div>
    );
  } else {
    return (
      <div classNameName="w-full h-full">
        <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">
          No records to display
        </p>
      </div>
    );
  }
}

export default Exporttable;
