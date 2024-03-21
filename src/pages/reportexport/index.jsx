import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReportstableData } from '../../redux/reducers/exporttableslice';
import { setPastMonth,setPastTwoMonths,setPastsixMonths,setPasttwelvemonths } from '../../redux/reducers/exporttableslice';
function Exporttable() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.userDetails);
    const { totalReporteesData } = useSelector((state) => state.totalreportees);
    const [selectedOption, setSelectedOption] = useState('');
 
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === 'pastMonth') {
      dispatch(setPastMonth());
    } else if (selectedValue === 'pastthreeMonth') {
      dispatch(setPastTwoMonths());
    } else if (selectedValue === 'pastsixMonth'){
        dispatch(setPastsixMonths());
    } else if (selectedValue === 'pasttwelvemonth')
      dispatch(setPasttwelvemonths());
  
  };
    useEffect(() => {
        dispatch(fetchReportstableData({
            reportees: user.reportees,
            page: 1,
            perPage: user.reportees.length

        }))
    }, [user]);


    if (totalReporteesData?.length > 0)
        return (

            <div>
                <div className="" >
                    <div className="text-blue-800 py-3 pl-2 text-center"> Genarate Report</div>

                    <div>
                        <form className=" p-2 text-[12px]" >
                            <div className="flex items-center justify-evenly ">
                                <div className='flex items-center'>
                                    <label htmlFor="countries" className='font-semibold'>Select Employee: </label>
                                    <select className="bg-gray-50  ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm   rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700" >
                                        <option id="" value="">Select</option>
                                        {
                                            totalReporteesData && totalReporteesData.map((reportee) => <option>{reportee?.empName}</option>)
                                        }
                                    </select>
                                </div>
                                <div className='flex items-center'>
                                    <label htmlFor="countries" className='font-semibold'>Select Period:</label>
                                    <select  value={selectedOption} onChange={handleDropdownChange} className="bg-gray-50 ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 " >
                                        <option id="" value="">Select</option>
                                        <option id=""  value="pastMonth">Past 1 months</option>
                                        <option id="" value="pastthreeMonth">Past 3 months</option>
                                        <option id="" value="pastsixMonth">Past 6 months</option>
                                        <option id="" value="pasttwelvemonth">Past year</option>
                                    </select>
                                </div>
                                <div className='flex'>
                                    <button className="px-8  py-2 ml-5 w-[100px]  h-[40px] bg-green-500 text-white font-semibold rounded-md">View</button>
                                    <button type="button" className="px-3  py-2 ml-5   w-[100px]  h-[40px] bg-red-500 font-semibold text-white rounded-md">Download</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div className='mx-20 items-center justify-center '>
                    <div className='mt-5'>
                        <div className='max-w-sm ml-4'>
                            <div className="relative">
                                <div className="absolute mt-3 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " />
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <table className="border-2 border-collapse w-full border-[#B7B7B7]">
                            <thead>
                                <tr >

                                    <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12">
                                        ACTIVITY NAME
                                    </th>
                                    <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12  ">
                                        DATE
                                    </th>
                                    <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12 " >
                                        SCORE
                                    </th>
                                    <th className="border-2 p-2 border-[#B7B7B7] text-start font-medium bg-[#D9D9D9] w-4/12  " >
                                        COMMENTS
                                    </th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr>

                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        ABC
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        01/01/2024
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        5
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        VERY GOOD
                                    </td>

                                </tr>
                                <tr>

                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        XYZ
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        01/01/2024
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        4
                                    </td>
                                    <td className="border-2 p-2 border-[#B7B7B7] bg-white">
                                        GOOD
                                    </td>

                                </tr>
                            </tbody>
                        </table>

                    </div>

                </div>



            </div>
        )
    else
        return <div classNameName="w-full h-full">
            <p className="text-center align-middle pt-14 pb-14 text-blue-500  font-bold">No records to display</p>
        </div>
}

export default Exporttable