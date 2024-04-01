import React, { useEffect, useState } from "react";
import axiosApi from '../../api/axiosConfig';
import { useDispatch, useSelector } from "react-redux";
import { fetchReportesActivitiesData, resetReporteesTableData, resetActivitiesData } from "../../redux/reducers/exporttableslice";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { convertUTCToLocal } from "../../utils/commonFunctions";
import Table from "../../components/table";
import DownloadIcon from '../../assets/icons/downloadIcon';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {styles} from './styles';

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
  const [pdfLoading, setPdfLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    if(selectedEmployee && fromDate && toDate) {
      let data = {
        empId: Number(selectedEmployee),
        fromDate: fromDate,
        toDate: toDate,
      };
      dispatch(fetchReportesActivitiesData(data));
    }
  },[selectedEmployee, fromDate, toDate])

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

    if (selectedValue === "Past 1 month") {
      ({ fromDate, toDate } = calculateDateRange(1));
    } else if (selectedValue === "Past 3 months") {
      ({ fromDate, toDate } = calculateDateRange(3));
    } else if (selectedValue === "Past 6 months") {
      ({ fromDate, toDate } = calculateDateRange(6));
    } else if (selectedValue === "Past 1 year") {
      ({ fromDate, toDate } = calculateDateRange(12));
    }
    setSelectedDate(selectedValue)
    setFromDate(fromDate);
    setToDate(toDate);
  };


  useEffect(() => {
    if (user) {
      let data = {
        reportees: user.reportees,
        page: 1,
        perPage: 100000000, //user.reportees.length,
        getMasterData: true
      };
      dispatch(fetchReportees(data));
    }
    return(() => {
      dispatch(resetReporteesTableData())
    })
  }, []);


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

  const periodOptions = ['Past 1 month', 'Past 3 months', 'Past 6 months', 'Past 1 year']


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
      const response = await axiosApi.post(`/getActivities`, data).then((res) =>  res.data.activities);
      if(response.length > 0) convertTableToPDF(response);
    } catch {
      setPdfLoading(false);
    } finally {
      setPdfLoading(false);
    }
  }
  const getName = (id) => {
    const user = reportees.find((item) => item?.empId === Number(id));
    return user ? user.empName : '';
  }

    return (
      <div>
        <div className={styles.genarateReportContainer}>
          <div className={styles.textBlueHeading}>
            REPORTS
          </div>

          <div>
            <form className={styles.formContainer}>
              <div className={styles.flexContainer}>
                <div className={styles.flexItemsCenter}>
                  <div className={styles.flexItemsCenter}>
                  <label htmlFor="countries" className="font-semibold">
                    SELECT EMPLOYEE:{" "}
                  </label>
                  <select 
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    value={selectedEmployee}
                    className={styles.selectEmployeeDropdown}
                  >
                    
                    <option id="" value="">
                      Select
                    </option>
                    {reportees &&
                      reportees.map((reportee) => (
                        <option
                          className="text-pretty"
                          key={reportee?.empId}
                          id={reportee?.empId}
                          value={reportee?.empId}
                        >
                          {reportee?.empName}
                        </option>
                      ))}
                  </select>
                  </div>
                  <div className={styles.flexItemsCenter}>
                  <label htmlFor="countries" className="font-semibold ml-4">
                    SELECT PERIOD:
                  </label>
                  <select
                    onChange={handleDropdownChange}
                    className={styles.selectEmployeeDropdown && styles.selectDropdown}  
                  >
                    <option value="">
                      Select
                    </option>
                    {
                      periodOptions.map((option) => (
                        <option  value={option}>
                          {option}
                        </option>
                      ))
                    }
                  </select>
                </div>
                </div>
                
                <div className="flex">
                  <button
                    onClick={getPdfList}
                    disabled={activitiesData?.length === 0}
                    type="button"
                    className={styles.downloadButton}
                  >
                    <span>{pdfLoading ? "Downloading... " : "Download "}  </span>
                    <DownloadIcon />

                    { pdfLoading && <div className="loading ml-2 "></div>}
                  </button>
                </div>
              </div>
            </form>
          </div>
            <div className={`mb-4 ${activitiesData?.length === 0 && "hidden"}`}>
              <p>Showing <span className="font-semibold">{getName(selectedEmployee)}</span> reports from <span className="font-semibold">{selectedDate}</span> </p>
            </div>
            <Table headers={headers} loading={loading} data={activitiesData} />
        </div>
      </div>
    );
  
}

export default Exporttable;
