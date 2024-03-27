import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportesActivitiesData, resetReporteesTableData, resetActivitiesData } from "../../redux/reducers/exporttableslice";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { convertUTCToLocal } from "../../utils/commonFunctions";
import Table from "../../components/table";
import { base_url } from "../../utils/constants";
import DownloadIcon from '../../assets/icons/downloadIcon';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Exporttable() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const { activitiesData } = useSelector((state) => state.totalreportees);
  const { reportees, loading, totalCount, currPage, pagesCount } = useSelector(
    (state) => state.reportees
  );

  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [pdfData, setPdfData] = useState([]);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [preState, setPreState] = useState({
    preEmployee: 0,
    preFromDate: '',
    preToDate: ''
  })

  const calculateDateRange = (monthsAgo) => {
    const toDate = new Date().toISOString().split("T")[0];
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthsAgo);
    const fromDateFormatted = fromDate.toISOString().split("T")[0];
    return { fromDate: fromDateFormatted, toDate };
  };

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    let fromDate, toDate;

    if (selectedValue === "pastMonth") {
      ({ fromDate, toDate } = calculateDateRange(1));
    } else if (selectedValue === "pastthreeMonth") {
      ({ fromDate, toDate } = calculateDateRange(3));
    } else if (selectedValue === "pastsixMonth") {
      ({ fromDate, toDate } = calculateDateRange(6));
    } else if (selectedValue === "pasttwelvemonth") {
      ({ fromDate, toDate } = calculateDateRange(12));
    }
    setFromDate(fromDate);
    setToDate(toDate);
  };

  const handleView = (e) => {
    e.preventDefault();
    setPreState({
      preEmployee: selectedEmployee,
      preFromDate: fromDate,
      preToDate: toDate
    })
    let data = {
      empId: Number(selectedEmployee),
      fromDate: fromDate,
      toDate: toDate,
    };
    dispatch(fetchReportesActivitiesData(data));
  };

  useEffect(() => {
    if (user) {
      let data = {
        reportees: user.reportees,
        page: 1,
        perPage: user.reportees.length,
      };
      dispatch(fetchReportees(data));
    }
    return(() => {
      dispatch(resetReporteesTableData())
    })
  }, [user]);

  // useEffect(() => {
  //   if(activitiesData.length > 0) {
  //     dispatch(resetActivitiesData())
  //   }
  // }, [selectedEmployee, toDate, fromDate])

  const headers = [
    { title: "Activity Name", id: "aName" },
    {
      title: "Date",
      id: "recorded_date",
      render: (value) => convertUTCToLocal(value),
    },
    { title: "Rated By", id: "ratedBy" },
    {
      title: "Score",
      id: "score",
      render: (value) => (
        <div className="w-[35px] px-3 bg-blue-400 rounded-full text-white font-bold text-center p-[4px]">
          {value}
        </div>
      ),
    },
    {
      title: "Comments",
      id: "comments",
      render: (value) => (
        <span className="listData" title={value}>
          {value}
        </span>
      ),
    },
  ];


  // Function to convert table to PDF
  const convertTableToPDF = (data) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      format: 'a4'
    });
    const headerParams = {
      align: 'justify',
      fillStyle: 'FD'
    }
  
    const tableData = data.map(item => [item.aName, item.ratedBy, item.score, item.comments]);
    // Add header to the PDF
    doc.text('Score card reports', 15, 10, headerParams);
  
    doc.autoTable({
      head: [['Activity Name', 'Rated By', 'Score', 'Comments']], // Extract header row
      body: tableData, // Extract data rows
      startY: 20, // Start y-position of the table
      theme: 'striped', // Table theme: 'plain', 'grid', 'striped', 'striped' (default is 'striped')
      styles: { overflow: 'linebreak' }, // Styles for table cells
      columnStyles: { 2: { fontStyle: 'bold' } }, // Styles for specific columns
    });
  
    // Save PDF
    doc.save('ActivitiesList.pdf');
  };

  const getPdfList = async (type) => {
    try{
      setPdfLoading(true);
      let data = {
        empId: Number(selectedEmployee),
        fromDate: fromDate,
        toDate: toDate,
      };
      const response = await axios.post(`${base_url}/getActivities`, data).then((res) =>  res.data.activities);
      if(response.length > 0) convertTableToPDF(response);
    } catch {
      setPdfLoading(false);
    } finally {
      setPdfLoading(false);
    }
  }

  const disableBtn = (type) => {
    if(!selectedEmployee || !fromDate || !toDate) {
      return true
    } else {
      const {preEmployee, preFromDate, preToDate} = preState;
      if(type === 'view'){
        if(preEmployee === selectedEmployee && fromDate === preFromDate && toDate === preToDate) {
          return true;
        }
      } else {
        if((preEmployee !== selectedEmployee || fromDate !== preFromDate || toDate !== preToDate) || activitiesData.length === 0) {
          return true;
        }
      }
    }
  }

    return (
      <div>
        <div className={` overflow-auto sm:rounded-lg p-4 bg-[#E9EDEE]`}>
          <div className="text-blue-800 py-3 pl-2 text-center">
            {" "}
            Genarate Report
          </div>

          <div>
            <form className=" p-2 text-[12px]">
              <div className="flex items-center justify-evenly ">
                <div className="flex items-center">
                  <label htmlFor="countries" className="font-semibold">
                    Select Employee:{" "}
                  </label>
                  <select
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    value={selectedEmployee}
                    className="bg-gray-50  ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm   rounded-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
                  >
                    <option id="" value="">
                      Select
                    </option>
                    {reportees &&
                      reportees.map((reportee) => (
                        <option
                          key={reportee.empId}
                          id={reportee.empId}
                          value={reportee.empId}
                        >
                          {reportee?.empName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="countries" className="font-semibold">
                    Select Period:
                  </label>
                  <select
                    onChange={handleDropdownChange}
                    className="bg-gray-50 ml-2 w-[200px] border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 "
                  >
                    <option id="" value="">
                      Select
                    </option>
                    <option id="" value="pastMonth">
                      Past 1 months
                    </option>
                    <option id="" value="pastthreeMonth">
                      Past 3 months
                    </option>
                    <option id="" value="pastsixMonth">
                      Past 6 months
                    </option>
                    <option id="" value="pasttwelvemonth">
                      Past year
                    </option>
                  </select>
                </div>
                <div className="flex">
                  <button
                    // disabled={!fromDate || !selectedEmployee  || !toDate}
                    disabled={disableBtn('view')}
                    className="px-8  py-2 ml-5 w-[100px]  h-[40px] bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
                    onClick={(e) => handleView(e)}
                  >
                    View
                  </button>

                  <button
                    onClick={getPdfList}
                    //disabled={pdfLoading || !fromDate || !selectedEmployee  || !toDate}
                    disabled={disableBtn()}
                    type="button"
                    className="px-3  py-2 ml-5 min-w-[100px] disabled:bg-gray-400  h-[40px] bg-blue-500 font-semibold text-white rounded-md flex items-center justify-center"  
                  >
                    <span>{pdfLoading ? "Downloading... " : "Download "}  </span>
                    <DownloadIcon />

                    { pdfLoading && <div className="loading ml-2 "></div>}
                  </button>
                </div>
              </div>
            </form>
          </div>
         
          {/* { activitiesData?.length > 0 && ( */}
            <Table headers={headers} loading={loading} data={activitiesData} />
          {/* )} */}
        </div>
      </div>
    );
  
}

export default Exporttable;
