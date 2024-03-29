import React, { useEffect, useState } from "react";
import { fetchReportees, setCurrPage, setPagesCount, setReporteeId } from "../../redux/reducers/reporteesSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { scoreColor } from '../../utils/commonFunctions';
import Loading from "../loading Component/Loading";
import PaginationComponent from "../Pagenation/Pagenation";

function LeftSidebar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(null);
  const { reportees, loading, viewReportee, totalCount, currPage, pagesCount } = useSelector((state) => state.reportees);
  const userDetails = useSelector((state) => state.userDetails);


  useEffect(() => {
    if (inputValue !== null) {
      const debounceTimeout = setTimeout(() => {
        const data = {
          reportees: userDetails.user.reportees,
          page: (inputValue === "") ? currPage : 1,
          perPage: 10,
          searchText: inputValue
        };
        dispatch(fetchReportees(data));
      }, 1000);
      return () => clearTimeout(debounceTimeout);
    }

  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value.trim());
  };

  useEffect(() => {
    dispatch(setPagesCount(Math.ceil((totalCount) / (10))))
  }, [totalCount])

  const handlePageChange = (currPage) => {
    let data = {
      reportees: userDetails.user.reportees,
      page: currPage,
      perPage: 10
    }
    dispatch(setCurrPage(currPage))
    dispatch(fetchReportees(data))
  }

  return (

    <div className=" w-[33%] flex flex-col px-[5px]">
      <div className="  flex mt-3 items-center">
        <p className="text-xl text-blue-400 font-semibold pl-4">
          Reportees
        </p>
        <input
          placeholder="Search"
          type="text"
          className="p-2  border rounded ml-[16px] placeholder:text-[14px]"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
      {
        (loading) ? <Loading /> :
          <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[70vh] overflow-auto">
            {(reportees.length) ? reportees?.map(({ empName, score, empId }) => (
              <button onClick={() => dispatch(setReporteeId(empId))}
                className={`flex rounded-lg items-center hover:bg-blue-400 hover:text-white  bg-${viewReportee?.empId == empId ? "blue-400 text-white" : "white"
                  } p-2 justify-between mb-1 w-full`}
                key={empId}
              >

                <p className="w-[80%] text-left">{empName}</p>
                <p className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(score)}`}>
                  {score}
                </p>
              </button>

            )) : <div className="w-full h-full">
              <p className="text-center align-middle  text-blue-500  font-bold">No Records Found</p>
            </div>
            }
          </div>
      }
      <div>
        {
          reportees.length > 0 && pagesCount > 1 && (
            <PaginationComponent
              currentPage={currPage}
              totalPages={pagesCount}
              onPageChange={handlePageChange}
            />
          )
        }
      </div>
    </div>
  );
}

export default LeftSidebar;
