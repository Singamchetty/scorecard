import React, { useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import Table from '../../components/table';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const reportees = useSelector((state) => state.reportees.reportees);
  const userDetails = useSelector((state) => state.userDetails);
  const reporteIds = userDetails.user.reportees || [];

  useEffect(() => {
    if (reporteIds.length > 0) {
      const data = {
        reportees: userDetails.user.reportees,
        sort: { type: "empId", order: 1 },
        page: 1,
        perPage: 10,
      };
      dispatch(fetchReportees(data));
    }
  }, [reporteIds]);

  useEffect(() => {
    if(userDetails.user !== null){
       navigate("/dashboard")
    }else{
      navigate("/")
    }
  }, [userDetails]);

  const headers = [
    {
      title: "Employee Name", 
      id:"empName",
      render: (value) => <span className="flex items-center"><img className="pr-2" src="/man.png" width="30px" height="30px"/>{value}</span>
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
      id:"score",
      render: (value) => <div className="bg-blue-200 rounded-md text-center p-[4px]">{value}</div>
    },
    {
      title: "Email", 
      id: 'empEmail'
    },
    {
      title: "Action", 
      id:"empId",
      render: (value) => <Link to={`/viewreportee/${value}`}><button className="bg-blue-400 text-white rounded-md px-3 py-1">View</button></Link>
    },
  ]

  return (
     <div>
        <Table headers={headers} data={reportees} maxHeight={88}/>    
     </div>
  )
}

export default Dashboard;
