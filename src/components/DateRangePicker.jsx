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
    getReports(value.startDate?value.startDate:null,value.endDate?value.endDate:null )
  },[value])

  return (
    <div>
      <label htmlFor="start" className="font-bold">From:</label>
      <input type="date" id="start" name="start" onChange={(e)=>handleStartChange(e.target.value)} />
      <label htmlFor="end"  className="font-bold">To:</label>
      <input type="date" id="end" name="end" onChange={(e)=>handleEndChange(e.target.value)}/>

    </div>
  )
};
export default DateRangePicker;