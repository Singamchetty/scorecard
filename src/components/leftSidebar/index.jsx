import React, { useEffect, useState } from "react";
import { fetchReportees, setViewReportee, setCurrPage, setPagesCount } from "../../redux/reducers/reporteesSlice";
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
   if(inputValue!==null){
    const debounceTimeout = setTimeout(() => {
      const data = {
        reportees: userDetails.user.reportees,
        page: currPage,
        perPage: 10,
        searchText:inputValue
      };
      dispatch(fetchReportees(data));
    }, 1000);
  

    return () => clearTimeout(debounceTimeout);
  }
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
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

    <div className="  w-[33%] flex flex-col px-[5px]">
      <div className="flex mt-3 items-center justify-between">
        <p className="text-xl text-blue-400 font-semibold pl-4">
        Reportees
        </p>
        <input 
          placeholder="Search"
          type="text" 
          className="p-2 mi-2 border rounded w-[160px]"
          value={inputValue} 
          onChange={handleChange} 
        />
      </div>
      {
        (loading) ? <Loading /> :
          <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[80vh] overflow-auto">
            {reportees?.map(({ empName, score, empId }) => (
              <button onClick={() => dispatch(setViewReportee(empId))}
                // to={`/viewreportee`}
                className={`flex items-center hover:bg-blue-400 hover:text-white  bg-${viewReportee?.empId == empId ? "blue-400 text-white" : "white"
                  } p-2 justify-between mb-1 w-full`}
                key={empId}
              >
                
                  <p className="w-[80%] text-left">{empName}</p>
                  <p className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(score)}`}>
                    {score}
                  </p>
                </button>
              
            ))}
          </div>
      }
      <div>
        <PaginationComponent 
          currentPage={currPage}
          totalPages={pagesCount}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default LeftSidebar;
