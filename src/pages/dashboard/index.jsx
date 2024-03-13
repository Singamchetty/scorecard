import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportees, fetchUser } from "../../redux/reducers/reporteesSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const reportees = useSelector((state) => state.reportees);
  const user = reportees.user.reportees;
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      const data = {
        reportees: reportees.user.reportees,
        sort: { type: "empId", order: 1 },
        page: 1,
        perPage: 10,
      };
      dispatch(fetchReportees(data));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  return <div>Dashboard Page</div>;
}

export default Dashboard;
