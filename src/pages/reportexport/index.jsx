
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReportesActivitiesData } from '../../redux/reducers/exporttableslice';
import { fetchReportees } from '../../redux/reducers/reporteesSlice';



function Exporttable() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userDetails);
    const { activitiesData } = useSelector((state) => state.totalreportees);
    const { reportees} = useSelector((state) => state.reportees);
    const [selectedEmployee, setSelectedEmployee] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    const calculateDateRange = (monthsAgo) => {
        const toDate = new Date().toISOString().split('T')[0];
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - monthsAgo);
        const fromDateFormatted = fromDate.toISOString().split('T')[0];
        return { fromDate: fromDateFormatted, toDate };
    };

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        let fromDate, toDate;

        if (selectedValue === 'pastMonth') {
            ({ fromDate, toDate } = calculateDateRange(1));
        } else if (selectedValue === 'pastthreeMonth') {
            ({ fromDate, toDate } = calculateDateRange(3));
        } else if (selectedValue === 'pastsixMonth') {
            ({ fromDate, toDate } = calculateDateRange(6));
        } else if (selectedValue === 'pasttwelvemonth') {
            ({ fromDate, toDate } = calculateDateRange(12));
        }
        setFromDate(fromDate);
        setToDate(toDate);
    };

    const handleView = (e) => {
        e.preventDefault();
        let data = {
            "empId": Number(selectedEmployee),
            "fromDate": fromDate,
            "toDate": toDate,
        }
        console.log(data, "data")
        dispatch(fetchReportesActivitiesData(data))
    }

    useEffect(() => {
        if (user) {
            let data = {
                reportees: user.reportees,
                page: 1,
                perPage: user.reportees.length

            }
            dispatch(fetchReportees(data));
        }

    }, [user]);

   useEffect(()=>{console.log(activitiesData)},[activitiesData])

    if (reportees?.length > 0) {
        return (
            <div>
                <div className="" >
                    <div className="text-blue-800 py-3 pl-2 text-center"> Genarate Report</div>
                    <div>
                        <form className=" p-2 text-[12px]" >
                            <div className="flex items-center justify-evenly ">
                                <div className='flex items-center'>
                                    <label htmlFor="countries" className='font-semibold'>Select Employee: </label>
                                    <select onChange={(e) => setSelectedEmployee(e.target.value)} value={selectedEmployee} className="bg-gray-50  ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm   rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700" >
                                        <option id="" value="">Select</option>
                                        {
                                            reportees && reportees.map((reportee) => <option key={reportee.empId} id={reportee.empId} value={reportee.empId}>{reportee?.empName}</option>)
                                        }
                                    </select>
                                </div>
                                <div className='flex items-center'>
                                    <label htmlFor="countries" className='font-semibold'>Select Period:</label>
                                    <select onChange={handleDropdownChange} className="bg-gray-50 ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 " >
                                        <option id="" value="">Select</option>
                                        <option id="" value="pastMonth">Past 1 months</option>
                                        <option id="" value="pastthreeMonth">Past 3 months</option>
                                        <option id="" value="pastsixMonth">Past 6 months</option>
                                        <option id="" value="pasttwelvemonth">Past year</option>
                                    </select>
                                </div>
                                <div className='flex'>
                                    <button className="px-8  py-2 ml-5 w-[100px]  h-[40px] bg-green-500 text-white font-semibold rounded-md" onClick={(e) => handleView(e)} >View</button>
                                    <button type="button" className="px-3  py-2 ml-5   w-[100px]  h-[40px] bg-red-500 font-semibold text-white rounded-md">Download</button>
                                </div>
                            </div>
                        </form>
                    </div>
                   


                  </div>


            </div>

        )
    } else {
        return <div classNameName="w-full h-full">
            <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">No records to display</p>
        </div>
    }

}

export default Exporttable