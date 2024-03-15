import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { base_url } from "../../utils/constants";
import axios from 'axios';
import { fetchReports } from "../../redux/reducers/reportSlice";
import Accordion from "../../components/accordion";
import DateRangePicker from "../../components/DateRangePicker";

function Reports() {
  const { id } = useParams();
  const empId=Number(id)
  const dispatch = useDispatch();
  const reportees = useSelector((state) => state.reportees.reportees);
  const [empDetails, setEmpDetails] = useState(null);
  const { reports} = useSelector((state) => state.reports);

  /*Example post data
{
    "empId":41689,
    "fromDate":"2024-03-10",
    "toDate":"2024-03-11"
}
*/
  const activities = useMemo(() => {
    if(reports !== undefined) {
        const filtered = Object.groupBy(reports, ({ type }) => type);
    return filtered;
    }
  }, [reports]);



  const getReports=(startDate=null, endDate=null)=>{
    const data={"empId":empId,"fromDate":startDate,"toDate":endDate}
    dispatch(fetchReports(data))
  }

  const handleAddActivity=(activityData)=>{
    if(id){
    let newData={
      "empId":empId,
      "data":activityData
    }
    axios.post(`${base_url}/createActivity`,newData)
    .then((result)=>{
      getReports()
    })
  }else{
    alert("Please login")
  }
  }

    useEffect(() => {
        if(id) {
            const emp = reportees?.filter((item) => item.empId === Number(id));
            setEmpDetails(emp[0]);
            const data = {
                "empId":Number(id),
                "fromDate":"2024-03-10",
                "toDate":"2024-03-15"
            }
            dispatch(fetchReports(data))
        }
        return (() => {
            setEmpDetails(null)
        })
    },[id]);

    useEffect(()=>{},[reports])

  return (
    <div className="p-4">
      <div className="flex bg-white p-3">
        <div className="w-[25%]">
          <img src="/generic-male-avatar-rectangular.jpg" width="100px" height="100px" />
          <div>
            <p className="text-lg font-medium mt-1">{empDetails?.empName}</p>
            <p>{empDetails?.designation}</p>
          </div>
        </div>
        <div className="flex flex-col w-[85%]">
          <div className="flex py-4">
            <p className="w-[23%]">
              <span className="font-medium">Email Id: </span>{empDetails?.empEmail}
            </p>
            <p className="w-[23%]">
              <span className="font-medium">Emp.Id: </span>
              {empDetails?.empId}
            </p>
            <p className="w-[23%]">
              <span className="font-medium">Experience: </span>Null
            </p>
            <p className="w-[23%]">
              <span className="font-medium">Scorecard: </span>
              {empDetails?.score}
            </p>
          </div>
          <div className="flex">
            <p className="w-[23%]">
              <span className="font-medium">Joining Date: </span>Null
            </p>
            <p className="w-[23%]">
              <span className="font-medium">Technologies Know: </span>Null
            </p>
          </div>
        </div>
      </div>
      <div className="max-h-[60vh] overflow-auto">
      <div className="container mx-auto mt-4 flex justify-end pe-4">
      <DateRangePicker getReports={getReports}/>
    </div>
        <Accordion title="Default Activities:" data={activities?.default} handleAddActivity={handleAddActivity}/>
        <Accordion title="Initiatives:" data={activities?.initiative} handleAddActivity={handleAddActivity}/>
      </div>
    </div>
  );
}

export default Reports;
