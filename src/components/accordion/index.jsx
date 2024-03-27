import React, { useState } from "react";
import Table from "../table";
import ModalButton from "../modal/modalButton";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import {useParams} from 'react-router'
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { calculateDefaultScore,calculateInitiativeScore } from "../../redux/reducers/viewreporteeSlice";
import Loading from "../loading Component/Loading";
import {convertUTCToLocal} from '../../utils/commonFunctions';


function Accordion({ title, data ,handleAddActivity,open,handleAccordian}) {
  const dispatch=useDispatch()
  const {id}=useParams()
  const { reports,defaultAvgScore,initiativeAvgScore ,loading} = useSelector((state) => state.reports);
  const userDetails = useSelector((state) => state.userDetails);

  //commented due to excess api calls by this method.
  // useEffect(()=>{
  //    if(userDetails.user!==null){
  //     const data = {
  //       reportees: userDetails.user.reportees,
  //       sort: { type: "empId", order: 1 },
  //       page: 1,
  //       perPage: 10,
  //     }
  //     dispatch(fetchReportees(data)) 
  //    }
  // },[userDetails,id])

  // useEffect(()=>{
  //   if(reports?.length !==null){
  //   dispatch(calculateDefaultScore(reports))
  //   dispatch(calculateInitiativeScore(reports))
  //   }
  // },[reports,id])
  
  function  handleClick(){
    handleAccordian(title)
  }
  const headers = [
    { title: "Activity Name", id: "aName"},
    { title: "Date", id: "recorded_date",  render: (value) => convertUTCToLocal(value) },
    {title: "Rated By", id: "ratedBy"},
    { title: "Score", id: "score", render: (value) => <div className="w-[35px] px-3 bg-blue-400 rounded-full text-white font-bold text-center p-[4px]">{value}</div> },
    { title: "Comments", id: "comments", render:(value)=><span className="listData" title={value}>{value}</span>},
  ];

  if(loading && title =="Duties")return <Loading/>
 
  if(!loading){
    return (
      <div className="px-4">
       
        <button           
          onClick={handleClick}
          type="button"
          className="flex items-center rounded-lg  w-full py-2 px-2 mt-4 font-medium rtl:text-right bg-white text-gray-500 border border-[#B7B7B7] focus:ring-4   hover:bg-gray-100 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2" >
          <span className="w-1/2 text-start ms-2">{title}</span>
          <span className="w-1/2 flex justify-between">
            Score :  {title === "Duties" ? defaultAvgScore : initiativeAvgScore}
          <ModalButton type={`${title === "Duties" ? "duties" : "initiative"}`} handleAddActivity={handleAddActivity}/>
          </span>
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
           <Table headers={headers} loading={loading} data={data} />
           
        </div>
      </div>
    );
  }
}

export default Accordion;
