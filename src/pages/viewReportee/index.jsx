import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { base_url } from "../../utils/constants";
import axios from 'axios';
import { fetchReportees,setViewReportee } from "../../redux/reducers/reporteesSlice";
import {fetchReporteeActivities, fetchActivitiesAvg} from '../../redux/reducers/viewreporteeSlice'
import Accordion from "../../components/accordion";
import {scoreColor} from '../../utils/commonFunctions';


function Viewreportee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {reportees, viewReportee } = useSelector((state) => state.reportees);
  const user = useSelector((state) => state.userDetails.user)
  const { reports, loading, error, dutiesReports, initiativeReports } = useSelector((state) => state.reports);
  const [open, setOpen] = useState({ "accordianOne": false, "accordianTwo": false });


  /*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-11"
}
*/
  const fetchActivities = (type) => {
    const data ={
      empId:viewReportee?.empId, 
      types:[type], 
      page: 1,
      perPage: 5
    }
    dispatch(fetchReporteeActivities(data))
  }

  const handleAccordian = (value) => {
    switch (value) {
      case "Duties":
        setOpen({ ...open, "accordianOne": !open["accordianOne"], "accordianTwo": false });
        fetchActivities('duties')
        break;
      case "Initiatives":
        setOpen({ ...open, "accordianOne": false, "accordianTwo": !open["accordianTwo"] });
        fetchActivities('initiative')
        break;
      default:
        setOpen({ "accordianOne": false, "accordianTwo": false });
    }
  }

  const fetchLatestReporteesData = () => {
    if (user) {
      const data = {
        reportees: user.reportees,
        page: 1,
        perPage: 10,
      };
      dispatch(fetchReportees(data))
    }

  }

  const handleAddActivity = async (activityData) => {
    if (viewReportee) {
      let newData = {
        "empId": viewReportee.empId,
        "data": activityData
      }
      await axios.post(`${base_url}/createActivity`, newData)
        .then(async (result) => {
          fetchLatestReporteesData();
          fetchActivities(activityData?.type)
        })
    } else {
      alert("Please login")
    }
  }

  useEffect(()=>{
    if(reportees.length>0 && viewReportee !== null)
     dispatch(fetchActivitiesAvg({empId:viewReportee?.empId, types:["duties", "initiative"]}))
  },[viewReportee])

  useEffect(()=>{
    if(reportees.length){
      dispatch(setViewReportee(viewReportee?.empId))
    }
  },[reportees])



  useEffect(() => {
    if (user) {
      navigate(`/viewreportee`)
      setOpen({ "accordianOne": false, "accordianTwo": false })
    } else {
      navigate("/")
    }
  }, []);

  if ( reportees.length && viewReportee)
    return (
      <div className="p-4" >
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between">
            {/* <img src="/generic-male-avatar-rectangular.jpg" width="100px" height="100px" /> */}
            <div className="my-1">
              <p>
                <span className="font-medium">Employee Name : </span> {viewReportee?.empName}
              </p>
              <p>
                <span className="font-medium">Designation : </span> {viewReportee?.designation}
              </p>
              {/* <p>
              <span className="font-medium">Email Id:  </span> {viewReportee?.empEmail}
          </p> */}
            </div>
            <div className="my-1">
              <p>
                <span className="font-medium">Role : </span> {viewReportee?.techStack}
              </p>
              <p>
                <span className="font-medium">Employee Id:  </span> {viewReportee?.empId}
              </p>
              {/* <p>
          <span className="font-medium">Total Score : </span> {viewReportee?.score}
          </p> */}
              {/* <p>
          <span className="font-medium">Allocated To : </span> {viewReportee?.project}
          </p> */}

            </div>
            <div className="flex flex-col justify-center items-center">
              <div className={`w-[40px] h-[40px] rounded-full flex items-center text-white justify-center  ${scoreColor(viewReportee?.score)}`}>
                <span className="text-lg font-bold">{viewReportee?.score}</span>
              </div>
              <div className="">
                <span className="text-blue-400 font-semibold">Total Score</span>
              </div>
            </div>

          </div>
        </div>
        <div className="">
          <div className="">
            <Accordion title="Duties" open={open.accordianOne} handleAccordian={handleAccordian} data={dutiesReports} handleAddActivity={handleAddActivity} />
          </div>
          <div className="">
            <Accordion title="Initiatives" open={open.accordianTwo} handleAccordian={handleAccordian} data={initiativeReports} handleAddActivity={handleAddActivity} />
          </div>
        </div>
      </div>
    );
  else
    return <div className="w-full h-full">
      <p className="text-center align-middle pt-14 pb-14 text-blue-500 font-bold">Employee Details Not Found</p>
    </div>
}


export default Viewreportee;
