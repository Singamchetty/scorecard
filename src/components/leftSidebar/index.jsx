import React, { useEffect, useState } from "react";
import { fetchReportees } from "../../redux/reducers/reporteesSlice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { scoreColor } from '../../utils/commonFunctions';
import Loading from "../loading Component/Loading";

function LeftSidebar() {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const { reportees, loading } = useSelector((state) => state.reportees);
  const userDetails = useSelector((state) => state.userDetails);
  const { id } = useParams();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const data = {
        reportees: userDetails.user.reportees,
        page: currPage,
        perPage: 10,
        searchText:inputValue
      };
      dispatch(fetchReportees(data));
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (

    <div className="  w-[33%] flex flex-col px-[5px]">
      <div className="flex mt-3 items-center justify-between">
        <p className="text-xl text-blue-400 font-semibold pl-4">
          My Reportees
        </p>
        <input 
          placeholder="Search Reportees"
          type="text" 
          className="p-2 mi-2 border rounded w-[160px]"
          value={inputValue} 
          onChange={handleChange} 
        />
      </div>
      {
        (loading) ? <Loading /> :
          <div className="p-2 bg-[#E9EDEE] mt-4 max-h-[80vh] overflow-auto">
            {reportees?.map(({ empName, score, empId }) => (
              <Link
                to={`/viewreportee/${empId}`}
                className={`flex items-center hover:bg-blue-400 hover:text-white hover:rounded-2xl bg-${Number(id) == empId ? "blue-400 text-white rounded-2xl" : "white"
                  } p-2 justify-between mb-1 w-full`}
                key={empId}
              >
                {/* <img src="/man.png" width="18px" height="18px" /> */}
                <p className="w-[80%] text-left">{empName}</p>
                <p className={`w-[30px] h-[30px] rounded-full flex items-center text-white justify-center ${scoreColor(score)}`}>
                  {score}
                </p>
              </Link>
            ))}
          </div>
      }

    </div>
  );
}

export default LeftSidebar;
