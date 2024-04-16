import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import CreateActivityButton from '../../components/modal/createActivityButton';
import Table from '../../components/table';
import Loading from "../../components/loading Component/Loading";
import { styles } from './styles.js';
import { convertToString } from "../../utils/commonFunctions";
import axiosApi from '../../api/axiosConfig'

// Define fetchData function
export const fetchData = async () => {
  try {
    const response = await axiosApi.get(`/activities`);
    //setActivitiesList(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error for handling by the caller if needed
  }
};

const Admin = () => {
  const [activitiesList, setActivitiesList] = useState([]);
  const [refresh,setRefresh]=useState(true)
  const { loading } = useSelector((state) => state.reportees);
  const dispatch = useDispatch(); // Initialize useDispatch

const handleRefresh=()=>{
  setRefresh(!refresh)
}



  useEffect(() => {
    // Call fetchData when the component mounts
    fetchData().then((res)=>setActivitiesList(res))
  }, [refresh]);



  const handleDelete = async (_id) => {
    try {
        //console.log("Deleting activity with id:", _id);
        await axiosApi.put(`/deleteMasterActivity`, { ObjectId: _id });
        setRefresh(!refresh)
        // console.log("Deleted successfully");
   
        
    } catch (error) {
        // console.error("Error deleting activity:", _id);
        // console.error("Error:", error);
    }
};

  const headers = [
    { title: "Activity Type", id: "atype" },
    { title: "Activity Name", id: "aName" },
    { title: "Appreciate", id: "appreciate", render: (value) => convertToString(value) },
    { title: "Depreciate", id: "depreciate", render: (value) => convertToString(value) },
    {
      title: "Actions",
      id: "_id",
      render: (id) => (
        <button
          className="bg-red-400 text-white rounded-md px-1 py-1 flex items-center justify-center w-[40px]"
          onClick={() => {
            if (id) {
              handleDelete(id);
              //console.log(id)
            } else {
              // console.error("Item or item._id is undefined");
            }
          }}
        >
          X
        </button>
      )
    },
  ];

  if (loading) return <Loading />;

  return (
    <div>
      <div className={styles.createActivityContainer}>
        <div className={styles.textBlueHeading}>
          ACTIVITY LIST
        </div>
        <div className="flex" style={{ justifyContent: 'flex-end', marginBottom: "10px" }}>
          <CreateActivityButton handleRefresh={handleRefresh} />
        </div>
        <Table headers={headers} loading={loading} data={activitiesList} />
      </div>
    </div>
  );
};

export default Admin;
