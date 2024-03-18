import React, { useState } from "react";
import { useEffect } from "react";

const DateRangePicker = ({getReports}) => {

  const [value, setValue] = useState({
    startDate: "",
    endDate: ""
  });

  const handleStartChange = (newValue) => {
    setValue({...value,startDate: newValue});
  }
  const handleEndChange = (newValue) => {
    setValue({...value,endDate: newValue});
  }

  useEffect(()=>{
    if(value.startDate!=="" & value.endDate!==""){
    getReports(value.startDate?value.startDate:null,value.endDate?value.endDate:null )
    }
  },[value])

  return (
    <div>
      <label htmlFor="start" className="font-bold ps-2">From:</label>
      <input type="date" id="start" name="start"  placeholder="MM-DD-YYYY" className="rounded-md font-semibold text-sm ms-1 ps-2 text-[#555]" onChange={(e)=>handleStartChange(e.target.value)} />
      <label htmlFor="end"  className="font-bold ps-2">To:</label>
      <input type="date" id="end" name="end" placeholder="MM-DD-YYYY" className="rounded-md font-semibold text-sm ms-1 ps-2 text-[#555]" onChange={(e)=>handleEndChange(e.target.value)}/>

    </div>
  )
};
export default DateRangePicker;