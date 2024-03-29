import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportees, setViewReportee, setCurrPage, setPagesCount, setReporteeId } from "../../redux/reducers/reporteesSlice";
import Table from '../../components/table';
import RightArrowIcon from '../../assets/icons/rightArrowIcon';
import { scoreColor } from '../../utils/commonFunctions';
import PaginationComponent from "../../components/Pagenation/Pagenation";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportees, loading, totalCount, currPage,  pagesCount, sortKey, sortOrder} = useSelector((state) => state.reportees);
  const userDetails = useSelector((state) => state.userDetails);
  const [reporteIds, setReporteIds] = useState([]);
  const [inputValue, setInputValue] = useState(null);

  //  userDetails.user.reportees || [];
  const handlePageChange = (currPage) => {
    let data = {
      reportees: userDetails.user.reportees,
      page: currPage,
      perPage: 10,
      sort: sortKey ? {type:sortKey, order: sortOrder === "asc" ? 1 : -1} : {}
    }
    dispatch(setCurrPage(currPage))
    dispatch(fetchReportees(data))
  }

  const handleSort = (key, order) => {
    let data = {
      reportees: userDetails.user.reportees,
      page: currPage,
      perPage: 10,
      sort: key ? {type:key, order: order === "asc" ? 1 : -1} : {}
    }
    dispatch(fetchReportees(data))
  }

  useEffect(() => {
    dispatch(setPagesCount(Math.ceil((totalCount) / (10))))
  }, [totalCount])


  useEffect(() => {
    if (reporteIds.length > 0 ) {
      const data = {
        reportees: userDetails.user.reportees,
        page: currPage,
        perPage: 10
      };
      dispatch(fetchReportees(data));
    }
  }, [reporteIds]);

  useEffect(() => {
    if (userDetails.user) {
      setReporteIds(userDetails.user.reportees)
      // navigate("/dashboard")
    } else {
      navigate("/")
    }
  }, [userDetails]);

  useEffect(() => {
   if(inputValue!==null){
    const debounceTimeout = setTimeout(() => {
      const data = {
        reportees: userDetails.user.reportees,
        page: 1,
        perPage: 10,
        searchText:inputValue
      };
      dispatch(fetchReportees(data));
    }, 1000);
    return () => clearTimeout(debounceTimeout);
   }

    // return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value.trim());
  };

  const headers = [
    {
      title: "Employee Name",
      id: "empName",
      render: (value) => <span className="flex items-center">
        {/* <img className="pr-2" src="/man.png" width="30px" height="30px" /> */}
        {value}</span>,
      isSorting: true
    },
    {
      title: "Emp.Id",
      id: "empId",
      isSorting: true
    },
    {
      title: "Designation",
      id: 'designation',
      isSorting: true
    },
    {
      title: "Role",
      id: 'techStack',
      isSorting: true
    },
    {
      title: "score",
      id: "score",
      isSorting: true,
      render: (value) => <span className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(value)}`}>{value}</span>
    },
    {
      title: "Action",
      id: "empId",
      render: (value) => <Link to={`/viewreportee`}>
        <button className="bg-blue-400 text-white rounded-md px-2 py-1 flex items-center justify-center w-[40px]" onClick={()=>dispatch(setReporteeId(value))}>
          <RightArrowIcon />
          </button>
        </Link>
    },
  ]


  return (
    <div>
      <div className="mb-2">
        <div className="flex justify-end my-1 mr-2 items-center">
          <label>Search :</label>
          <input placeholder="Name/Id/Designation/Role"  value={inputValue} onChange={handleChange} type="text" className="p-1 px-2 border rounded ml-2 placeholder:text-[14px]"/>
        </div>
         <Table headers={headers} data={reportees} loading={loading} handleSorting={handleSort}/>
         
      <div className="">
        {reportees.length>0 && pagesCount>1 && (
          <div className="flex justify-center mt-2">
            {pagesCount >= 1 && (
              <PaginationComponent
                currentPage={currPage}
                totalPages={pagesCount}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Dashboard;
