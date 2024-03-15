import React, { useState } from "react";
import Table from "../table";
import moment from "moment";
import ModalButton from "../modal/modalButton";
import { useSelector ,useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { calculateDefaultScore,calculateInitiativeScore } from "../../redux/reducers/reportSlice";


function Accordion({ title, data ,handleAddActivity,open,handleAccordian}) {
  const dispatch=useDispatch()
  // const [open, setOpen] = useState(false);
  const { reports,defaultAvgScore,initiativeAvgScore } = useSelector((state) => state.reports);
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(()=>{
    const data = {
      reportees: userDetails.user.reportees,
      sort: { type: "empId", order: 1 },
      page: 1,
      perPage: 10,
    }
    dispatch(fetchReportees(data));
   dispatch(calculateDefaultScore(reports))
   dispatch(calculateInitiativeScore(reports))
    
  },[reports])
  
  function  handleClick(){
    handleAccordian(title)
  }
  const headers = [
    { title: "Name", id: "aName", width: "30%" },
    { title: "Date", id: "recorded_date", width: "20%", render: (value) => moment(value).format('DD-MM-YYYY') },
    { title: "Score", id: "score", width: "10%", render: (value) => <div className="w-[35px] bg-blue-200 rounded-md text-center p-[4px]">{value}</div> },
    { title: "Comments", id: "comments", width: "40%" },
  ];
  return (
    <div className="px-4">
     
      <button
        onClick={handleClick}
        type="button"
        className="flex items-center rounded-lg   w-full py-2 px-2 mt-4 font-medium rtl:text-right bg-white text-gray-500 border border-[#B7B7B7] focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2" >
        <div className="w-1/2 text-start ms-2">{title}</div>
        <div className="w-1/2 flex justify-between">Average Score :{title === "Default Activities:" ? defaultAvgScore : initiativeAvgScore}
        <ModalButton type={`${title === "Default" ? "default" : "initiative"}`} handleAddActivity={handleAddActivity}/>
        </div>
        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      <div
        className={`${!open && "hidden"} mt-2`}
        aria-labelledby="accordion-collapse-heading-2"
      >
         <Table headers={headers} data={data} maxHeight={10}/>
      </div>
    </div>
  );
}

export default Accordion;
