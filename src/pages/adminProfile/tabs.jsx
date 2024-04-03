import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchReporteeActivities} from '../../redux/reducers/viewreporteeSlice'
import Accordion from "../../components/accordion";
import profileSlice from "../../redux/reducers/profileSlice";


const Tabs = () => {

    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const { reports, loading, error, dutiesReports, initiativeReports } = useSelector((state) => state.reports);
    const {reportees, viewReportee,currPage, reporteeId } = useSelector((state) => state.reportees);

    const fetchActivities = (type) => {
        const data ={
          empId:viewReportee?.empId, 
          types:[type], 
          page: 1,
          perPage: 5
        }
        dispatch(fetchReporteeActivities(data))
      }

    console.log(fetchActivities)

    return (
        <>



            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 ">
                <ul className="flex flex-wrap -mb-px">

                    <li className="me-2" onClick={()=>{}}>
                        <button onClick={()=>{setIndex(0); fetchActivities('duties')}} className="inline-block p-4 text-blue-600 border-b-2 border-blue-600  dark:text-blue-500 " >Duties</button>
                    </li>
                    <li className="me-2">
                        <button onClick={()=>{setIndex(index+1); fetchActivities('initiative')}} className="inline-block p-4 border-b-2 border-transparent  hover:text-gray-600 hover:border-gray-300 " >Initiatives</button>
                    </li>

                </ul>
                
                {index === 0 ? <div>
                    {/* <Accordion data={dutiesReports} /> */}
                    Duties
                </div> : <div>
                    <p>Intiatives </p>
                </div>}





            </div>


        </>
    )

}

export default Tabs;