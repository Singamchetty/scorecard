import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { fetchUser } from "../../redux/reducers/userSlice";
import Table from '../../components/table';

function Dashboard() {
  const dispatch = useDispatch();
  const reportees = useSelector((state) => state.reportees.reportees);
  const userDetails = useSelector((state) => state.userDetails);
  const { id } = useParams();
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
    if(id !== undefined ||null)
    dispatch(fetchUser(id));
  }, [id]);

  const headers = [
    {title: "Employee Name", id:"empName"},
    {title: "Emp.Id", id: "empId"},
    {title: "Designation", id: 'designation'},
    {title: "score", id:"score"},
    {title: "Action", id:"action"},

  ]
  return (
     <div>
        <Table headers={headers} data={reportees} isView={true}/>    
     </div>
  )
}

export default Dashboard;
