import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { base_url } from "../../utils/constants";
import axios from 'axios';
import { fetchReportees,setViewReportee } from "../../redux/reducers/reporteesSlice";
import {fetchReporteeActivities, fetchActivitiesAvg, } from '../../redux/reducers/viewreporteeSlice'
import Accordion from "../../components/accordion";
import {scoreColor} from '../../utils/commonFunctions';


function Viewreportee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {reportees, viewReportee,currPage, reporteeId } = useSelector((state) => state.reportees);
  const user = useSelector((state) => state.userDetails.user)
  const { reports, loading, error, dutiesReports, initiativeReports } = useSelector((state) => state.reports);
  const [open, setOpen] = useState({ "accordianOne": false, "accordianTwo": false });


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
        page: currPage,
        perPage: 10,
      };
      dispatch(fetchReportees(data))
    }
  }

  const fetchViewReporteeData=async(empId)=>{
        const response= await axios.get(`${base_url}/employee/${empId}`)
        const data=await response.data
        dispatch(setViewReportee(data))
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
          fetchViewReporteeData(reporteeId)
          dispatch(fetchActivitiesAvg({empId:reporteeId, types:["duties", "initiative"]}))
        })
    } else {
      alert("Please login")
    }
  }


  useEffect(() => {
    if(reporteeId) {
      fetchViewReporteeData(reporteeId)
      dispatch(fetchActivitiesAvg({empId:reporteeId, types:["duties", "initiative"]}))
    }
  }, [reporteeId])


  useEffect(() => {
    if (user) {
      // navigate(`/viewreportee`)
      setOpen({ "accordianOne": false, "accordianTwo": false })
    } else {
      navigate("/")
    }
  }, []);

  if (viewReportee!==null)
    return (
      <div className="p-4" >
        <div className="bg-white p-3 rounded-md">
          <div className="flex justify-between">
            {/* <div className="my-1">
              <p>
                <span className="font-medium">Employee Name: </span> {viewReportee?.empName}
              </p>
              <p>
                <span className="font-medium">Designation: </span> {viewReportee?.designation}
              </p>
            </div> */}
            <div className="flex items-center">
              <div>
                <p className="font-medium mb-2">
                  Employee Name 
                </p>
                <p className="font-medium">
                  Employee Id 
                </p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">:</span> {viewReportee?.empName}</p>
                <p><span className="font-medium">:</span> {viewReportee?.empId}</p>
              </div>
            </div>
            {/* <div className="my-1">
              <p>
                <span className="font-medium">Role: </span> {viewReportee?.techStack}
              </p>
              <p>
                <span className="font-medium">Employee Id:  </span> {viewReportee?.empId}
              </p>
            </div> */}
            <div className="flex items-center">
              <div>
                <p className="font-medium mb-2">
                  Designation 
                </p>
                <p className="font-medium">
                  Role 
                </p>
              </div>
              <div>
                <p className="mb-2"><span className="font-medium">:</span> {viewReportee?.designation}</p>
                <p><span className="font-medium">:</span> {viewReportee?.techStack}</p>
              </div>
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
