import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import Table from '../../components/table';
import RightIcon from '../../assets/icons/rightIcon';
import scoreColor from '../../utils/scoreColor';
import PaginationComponent from "../../components/Pagenation/Pagenation";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reportees, loading, totalCount } = useSelector((state) => state.reportees);
  const userDetails = useSelector((state) => state.userDetails);
  const [reporteIds, setReporteIds] = useState([]);
  const [currPage, setCurrPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(1)

  //  userDetails.user.reportees || [];
  const handlePageChange = (currPage) => {
    let data = {
      reportees: userDetails.user.reportees,
      page: currPage,
      perPage: 10
    }
    setCurrPage(currPage)
    dispatch(fetchReportees(data))
  }
  // useEffect(() => {
  //   let data={
  //     reportees:reportees,
  //     ["page"]:page,
  //   }
  //   dispatch(fetchReportees(data))
  // } ,[page]);

  useEffect(() => {
    setPagesCount(Math.ceil((totalCount) / (10)))
  }, [totalCount])

  useEffect(() => {
    if (reporteIds.length > 0) {
      const data = {
        reportees: userDetails.user.reportees,
        // sort: { type: "empId", order: 1 },
        page: currPage,
        perPage: 10
      };
      dispatch(fetchReportees(data));
    }
  }, [reporteIds]);

  useEffect(() => {
    if (userDetails.user) {
      setReporteIds(userDetails.user.reportees)
      navigate("/dashboard")
    } else {
      navigate("/")
    }
  }, [userDetails]);

  const headers = [
    {
      title: "Employee Name",
      id: "empName",
      render: (value) => <span className="flex items-center">
        {/* <img className="pr-2" src="/man.png" width="30px" height="30px" /> */}
        {value}</span>
    },
    {
      title: "Emp.Id",
      id: "empId"
    },
    {
      title: "Designation",
      id: 'designation'
    },
    {
      title: "score",
      id: "score",
      render: (value) => <span className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(value)}`}>{value}</span>
    },
    {
      title: "Email",
      id: 'empEmail'
    },
    {
      title: "Action",
      id: "empId",
      render: (value) => <Link to={`/viewreportee/${value}`}>
        <button className="bg-blue-400 text-white rounded-md px-2 py-1 flex items-center justify-center w-[40px]">
          <RightIcon />
          </button>
        </Link>
    },
  ]

  return (
    <div>
      <div className="mb-2">
         <Table headers={headers} data={reportees} loading={loading} maxHeight={88} />
         
      <div className="">
        {reportees && (
          <div className="flex justify-end mt-2">
            {/* <div className="text-blue-500">Total Results: {pagesCount}</div> */}
            {pagesCount > 1 && (
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
