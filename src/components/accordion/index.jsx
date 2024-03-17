import React, { useState } from "react";
import Table from "../table";
import moment from "moment";
import ModalButton from "../modal/modalButton";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import {useParams} from 'react-router'
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { calculateDefaultScore,calculateInitiativeScore } from "../../redux/reducers/reportSlice";
import Loading from "../loading Component/Loading";


function Accordion({ title, data ,handleAddActivity,open,handleAccordian}) {
  const dispatch=useDispatch()
  const {id}=useParams()
  const { reports,defaultAvgScore,initiativeAvgScore ,loading} = useSelector((state) => state.reports);
  const userDetails = useSelector((state) => state.userDetails);


  useEffect(()=>{
     if(userDetails.user!==null){
      const data = {
        reportees: userDetails.user.reportees,
        sort: { type: "empId", order: 1 },
        page: 1,
        perPage: 10,
      }
      dispatch(fetchReportees(data)) 
     }
  },[userDetails,id])

  useEffect(()=>{
    if(reports !==null){
    dispatch(calculateDefaultScore(reports))
    dispatch(calculateInitiativeScore(reports))
    }
  },[reports,id])
  
  function  handleClick(){
    handleAccordian(title)
  }
  const headers = [
    { title: "Activity Name", id: "aName", width: "30%" },
    { title: "Date", id: "recorded_date", width: "20%", render: (value) => moment(value).format('DD-MM-YYYY') },
    { title: "Score", id: "score", width: "10%", render: (value) => <div className="w-[35px] bg-blue-200 rounded-md text-center p-[4px]">{value}</div> },
    { title: "Comments", id: "comments", width: "40%" },
  ];
  
  if(loading && title =="Default")return <Loading/>
 
  if(!loading){
    return (
      <div className="px-4">
       
        <button           
          onClick={handleClick}
          type="button"
          className="flex items-center rounded-lg  w-full py-2 px-2 mt-4 font-medium rtl:text-right bg-white text-gray-500 border border-[#B7B7B7] focus:ring-4  dark:border-gray-700  hover:bg-gray-100 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2" >
          <div className="w-1/2 text-start ms-2">{title}</div>
          <div className="w-1/2 flex justify-between">
            Average Score :{title === "Default" ? defaultAvgScore : initiativeAvgScore}
          <ModalButton type={`${title === "Default" ? "default" : "initiative"}`} handleAddActivity={handleAddActivity}/>
          </div>
          <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
        <div
          className={`${!open && "hidden"} mt-2`}
          aria-labelledby="accordion-collapse-heading-2"
        >
           <Table headers={headers} loading={loading} data={data} maxHeight={10}/>
        </div>
      </div>
    );
  }
}

export default Accordion;
