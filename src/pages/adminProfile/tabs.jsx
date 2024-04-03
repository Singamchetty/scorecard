import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileReporteeActivities } from "../../redux/reducers/profileSlice";
import Table from "../../components/table/index";
import { convertUTCToLocal } from "../../utils/commonFunctions";
import Loading from "../../components/loading Component/Loading";

const Tabs = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { reports, loading, error, dutiesReports, initiativeReports } =
    useSelector((state) => state.reports);
  const { user } = useSelector((state) => state.userDetails);
//   console.log(dutiesReports);
//   console.log(initiativeReports);
  const fetchActivities = (type) => {
    const data = {
      empId: user?.empId,
      types: [type],
      page: 1,
      perPage: 5,
    };
    console.log(data);
    dispatch(fetchProfileReporteeActivities(data));
  };
  useEffect(() => {
    fetchActivities("duties");
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
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 ">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2" onClick={() => {}}>
            <button
              onClick={() => {
                setIndex(0);
                fetchActivities("duties");
              }}
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600  dark:text-blue-500 "
            >
              Duties
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => {
                setIndex(index + 1);
                fetchActivities("initiative");
              }}
              className="inline-block p-4 border-b-2 border-transparent  hover:text-gray-600 hover:border-gray-300 "
            >
              Initiatives
            </button>
          </li>
        </ul>
      </div>
      <div className="">
        {index === 0 ? (
          <div>
            <Table headers={headers} 
            loading={loading} 
            data={dutiesReports} />
          </div>
        ) : (
          <div>
            <Table
              headers={headers}
              loading={loading}
              data={initiativeReports} />
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;
