import axios from "axios";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { base_url } from "../../utils/constants";


export default function MyModal({ visible, onClose ,type,handleAddActivity}) {
  const [activitiesList, setActivitiesList] = useState([])
  const [enableSubmit,setEnableSubmit]=useState(false)
  const [scoreType,setScoreType]=useState(1)
  const [activityData,setActivityData]=useState({aName:"",aId:"",type:type,score:0,comments:""})
  const [activityType,setActivtyType]=useState("")

  const  getActivitysList= async(type)=>{
    const activities=await axios.get(`${base_url}/activities`)
    const response= await activities.data.filter((item)=>item.type==type)
    setActivitiesList(response)
  }

  const handleActivityName = (e) => {
  setActivityData({...activityData,aName:e.target.value,aId:e.target.options[e.target.selectedIndex].id})
  }

  const handleScoreChange=(value)=>{
    setActivityData({...activityData,score:(scoreType)*(value)})
  }

  function handlePerformance (value){   
    setScoreType(value)
  }

  const handleComments=(e)=>{
    // e.stopPropagation()
    setActivityData({...activityData,comments:e.target.value})
  }

  const handleSubmit=(e)=>{
  onClose()
  handleAddActivity(activityData)
  }

  useEffect(()=>{handleScoreChange(activityData.score)},[scoreType])

  useEffect(() => {
    if (activityData.aName !== "" && activityData.aId !== ""  && activityData.score != 0 || -0) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [activityData]);
  
  const SentenceCase=(type)=>{
    let str=type;
    setActivtyType(str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
  }
  useEffect(()=>{
    SentenceCase(type)
    if (visible===false){
      setActivityData({aName:"",aId:"",type:type,score:0,comments:""})
    }else{
      getActivitysList(type);
    }
  },[visible,type])


  if (!visible) return null;

  return (
    <div className="absolute w-full h-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white rounded-md lg:w-4/12 sm:w-100">
        <div className=" text-white py-3 pl-2 bg-blue-500 rounded-md">{activityType} Activity</div>
        <div>
          <div>
            <form className=" p-2 max-w-sm mx-auto text-[12px]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center  my-5">
              <label htmlFor="countries">SELECT ACTIVITY: </label>
              <select  className="bg-gray-50 ml-2 w-7/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>handleActivityName(e)}>
                <option id="" value="">Select</option>
                {
                  activitiesList && activitiesList.map((activity)=><option className=" w-7/12" key={activity.aId} id={activity.aId} value={activity.aName}>{activity.aName}</option>)
                }
              </select>

              </div>
              <div className="flex items-center mb-4 ">
                <label htmlFor="appreciate" className="  font-medium  dark:text-gray-300">APPRECIATION:</label>
                <input id="appreciate" type="radio" value="appreciate" name="performance" className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" onChange={()=>handlePerformance(1)}/>
                <label htmlFor="depreciate" className="ms-2  font-medium dark:text-gray-300">DEPRECIATION:</label>
                <input id="depreciate" type="radio" value="depreciate" name="performance" className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" onChange={()=>handlePerformance(-1)} />
              </div>
              <div className="flex ">
                <span>SCORE: </span>
                <select  className="border w-1/5 ms-1" onChange={(e)=>handleScoreChange(e.target.value)}>
                  <option value={0}>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>

              <div className="flex items-center my-5">
              <label htmlFor="comments" className="block w-3/12 mb-20 text-start  font-medium  dark:text-white">COMMENTS :</label>
              <textarea id="comments" style={{resize:"none"}} rows="4" className="block ml-2 p-2.5 w-9/12  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Activity comments (optional)" onChange={(e)=>handleComments(e)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  // Prevent propagation of space key press
                  if (e.key === " ") {
                    // e.preventDefault()
                    e.stopPropagation();
                  }
                }}
                onKeyUp={(e) => {
                  // Prevent propagation of space key release
                  if (e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation();
                  }
                }}></textarea>
              </div>
              <div className="flex items-center justify-end mb-3">
            <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-700 text-white ">Cancel</button>
            {
              enableSubmit?<button type="button"  className="px-3  py-2 ml-5 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>Submit</button>:
              <button type="button"  className="px-3  py-2 ml-5 bg-gray-400 text-white rounded" disabled={!enableSubmit} title="Please fill all fileds to submit">Submit</button>
            }
            
          </div>

            </form>
          </div>      
        </div>
      </div>
    </div>
  );
}