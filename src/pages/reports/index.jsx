import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { base_url } from "../../utils/constants";
import axios from 'axios';
import { fetchReports } from "../../redux/reducers/reportSlice";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import Accordion from "../../components/accordion";
import scoreColor from '../../utils/scoreColor';
import DateRangePicker from "../../components/dateRangePicker/DateRangePicker";

function Reports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const empId = Number(id)
  const reportees = useSelector((state) => state.reportees.reportees);
  const user = useSelector((state) => state.userDetails.user)
  const [empDetails, setEmpDetails] = useState(null);
  const { reports, loading, error } = useSelector((state) => state.reports);
  const [open, setOpen] = useState({ "accordianOne": false, "accordianTwo": false });



  /*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-11"
}
*/
  const activities = useMemo(() => {
    if (reports) {
      const filtered = Object.groupBy(reports, ({ type }) => type);
      return filtered;
    }
  }, [reports, id]);

  const handleAccordian = (value) => {
    switch (value) {
      case "Duties":
        setOpen({ ...open, "accordianOne": !open["accordianOne"], "accordianTwo": false });
        break;
      case "Initiatives":
        setOpen({ ...open, "accordianOne": false, "accordianTwo": !open["accordianTwo"] });
        break;
      default:
        setOpen({ "accordianOne": false, "accordianTwo": false });
    }
  }

  const fetchLatestReporteesData = () => {
    if (user) {
      const data = {
        reportees: user.reportees,
        sort: { type: "empId", order: 1 },
        page: 1,
        perPage: 10,
      };
      dispatch(fetchReportees(data));
    }

  }

  const handleAddActivity = async (activityData) => {
    if (id) {
      let newData = {
        "empId": empId,
        "data": activityData
      }
      await axios.post(`${base_url}/createActivity`, newData)
        .then(async (result) => {
          fetchLatestReporteesData()
        })
    } else {
      alert("Please login")
    }
  }

  useEffect(() => {
    if (id !== undefined || null && reportees.length > 0) {
      const emp = reportees?.filter((item) => item.empId === Number(id));
      setEmpDetails(emp[0]);
      const data = {
        "empId": Number(id),
        "fromDate": "",
        "toDate": ""
      }
      dispatch(fetchReports(data))
    }
    return (() => {
      setEmpDetails(null)
    })
  }, [id, reportees]);

  useEffect(() => {
    if (user) {
      navigate(`/viewreportee/${id}`)
      setOpen({ "accordianOne": false, "accordianTwo": false })
    } else {
      navigate("/")
    }
  }, [id]);

  if (empDetails && reportees.length)
    return (
      <div className="p-4" >
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between">
            {/* <img src="/generic-male-avatar-rectangular.jpg" width="100px" height="100px" /> */}
            <div className="my-1">
              <p>
                <span className="font-medium">Employee Name : </span> {empDetails?.empName}
              </p>
              <p>
                <span className="font-medium">Designation : </span> {empDetails?.designation}
              </p>
              {/* <p>
              <span className="font-medium">Email Id:  </span> {empDetails?.empEmail}
          </p> */}
            </div>
            <div className="my-1">
              <p>
                <span className="font-medium">Role : </span> {empDetails?.techStack}
              </p>
              <p>
                <span className="font-medium">Employee Id:  </span> {empDetails?.empId}
              </p>
              {/* <p>
          <span className="font-medium">Total Score : </span> {empDetails?.score}
          </p> */}
              {/* <p>
          <span className="font-medium">Allocated To : </span> {empDetails?.project}
          </p> */}

            </div>
            <div className="flex flex-col justify-center items-center">
              <div className={`w-[40px] h-[40px] rounded-full flex items-center text-white justify-center  ${scoreColor(empDetails?.score)}`}>
                <span className="text-lg font-bold">{empDetails?.score}</span>
              </div>
              <div className="">
                <span className="text-blue-400 font-semibold">Total Score</span>
              </div>
            </div>

          </div>
        </div>
        <div className="">
          <div className="">
            <Accordion title="Duties" open={open.accordianOne} handleAccordian={handleAccordian} data={activities?.duties} handleAddActivity={handleAddActivity} />
          </div>
          <div className="">
            <Accordion title="Initiatives" open={open.accordianTwo} handleAccordian={handleAccordian} data={activities?.initiative} handleAddActivity={handleAddActivity} />
          </div>
        </div>
      </div>
    );
  else
    return <div className="w-full h-full">
      <p className="text-center align-middle pt-14 pb-14 text-blue-500 font-bold">Employee Details Not Found</p>
    </div>
}


export default Reports;
