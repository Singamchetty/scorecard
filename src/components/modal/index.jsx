import axios from "axios";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { base_url } from "../../utils/constants";
import { v4 as uuidv4 } from 'uuid';
// import Loading from "../loading Component/Loading";


export default function MyModal({ visible, onClose, type, handleAddActivity }) {
  const {user} = useSelector((state) => state.userDetails)
  const [activitiesList, setActivitiesList] = useState([])
  const [enableSubmit, setEnableSubmit] = useState(false)
  const [activityData, setActivityData] = useState({ aName: "",ratedBy:"", aId: "", type: type, score: 0, comments: "" })
  const [activityType, setActivtyType] = useState("")
  const [showCustActivity, setShowActivity] = useState(false);
  const [modalLoading, setModalLoading] = useState(true)
  const [scoreRender, setScoreRender] = useState([]);
  const [showScore, setShowScore] = useState(false)
  const [disableAppreciate,setDisableAppreciate]=useState(false)

  const getActivitysList = async (type) => {
    const activities = await axios.get(`${base_url}/activities`)
    const response = await activities.data.filter((item) => item.type == type)
    setActivitiesList(response)
    setModalLoading(false)
  }

  const handleActivityName = (e) => {
    setActivityData({ ...activityData, aName: e.target.value, aId: e.target.options[e.target.selectedIndex].id })
  }

  const handleCustumActivity = (e) => {
    const randomId = uuidv4();
    setActivityData({ ...activityData, aName: e.target.value, aId: randomId })
  }


  const handleScoreChange = (value) => {
    setActivityData({ ...activityData, score: Number(value) })
  }

  const handlePerformance=(value)=> {
    let appreciateScores = [1, 2, 3, 4, 5]
    let depreciateScores = [ -1, -2, -3, -4, -5]
    if (value == 1) {
      setActivityData({ ...activityData, score: 0 })
      setScoreRender(appreciateScores)
      setShowScore(true)
    }
    else if (value == -1) {
      setActivityData({ ...activityData, score: 0 })
      setScoreRender(depreciateScores)
      setShowScore(true)
    }
  }

  const handleComments = (e) => {
    setActivityData({ ...activityData, comments:e.target.value.trim() })
  }

  const handleSubmit = (e) => {
    onClose()
    setShowActivity(false)
    handleAddActivity(activityData)
  }



  useEffect(() => {
    if (activityData.aName !== "" && activityData.aId !== "" && activityData.comments !== "" && activityData.score != (0 || -0)) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [activityData]);

  const SentenceCase = (type) => {
    let str = type;
    setActivtyType(str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
  }
  useEffect(() => {
    if(type==="duties"){
      setDisableAppreciate(true);
    }else{
      setDisableAppreciate(false);
    }
    SentenceCase(type)
    if (visible === false) {
      setActivityData({ aName: "",ratedBy:"", aId: "", type: type, score: 0, comments: "" })
    } else {
      setActivityData({...activityData,ratedBy:user.empName})
      getActivitysList(type);
      setModalLoading(true)
    }
  }, [visible, type]);

  const handleCustBtn = (e) => {
    e.preventDefault();
    setShowActivity(!showCustActivity);
    setActivityData({ ...activityData, aName: "", aId: "" })
  }



  if (!visible) return null;

  return (
    <>
      <div className="absolute w-full h-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm   flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {
          (!modalLoading) ? <div className="bg-white rounded-md lg:w-4/12 sm:w-100">
            <div className=" text-white py-3 pl-2 bg-blue-500 rounded-md text-start">{activityType}</div>
            <div>
              <div>
                <form className=" p-2 max-w-sm mx-auto text-[12px]" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center   my-5">
                      

                    <label htmlFor="countries">SELECT ACTIVITY<span className="text-[15px]">*</span>: </label>
                    <select disabled={showCustActivity} className="bg-gray-50 ml-2 w-6/12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " onChange={(e) => handleActivityName(e)} value={activityData.aName}>
                      <option id="" value="">Select</option>
                      {
                        activitiesList && activitiesList.map((activity) => <option className=" w-7/12" key={activity.aId} id={activity.aId} value={activity.aName}>{activity.aName}</option>)
                      }
                    </select>
                    <button onClick={(e) => { handleCustBtn(e) }} className={`${showCustActivity && 'hidden'} bg-blue-400 ml-2 w-2/12 text-white  py-1 rounded hover:scale-95 transition text-sm`}>Custom</button>
                  </div>
                  <div className={`flex items-center  ${!showCustActivity && 'hidden'}`}>
                    <label className={`font-medium  mr-2`}>Custom Activity<span className="text-[15px]">*</span>:</label>
                    <input type="text" value={activityData.aName} placeholder="Enter Activity name" name="performance" className={`border border-gray-300 rounded p-2 `} onChange={(e) => handleCustumActivity(e)} />
                    <button onClick={(e) => { handleCustBtn(e) }} className={`${!showCustActivity && 'hidden'} bg-blue-400 ml-2 w-2/12 text-white  py-1 rounded hover:scale-95 transition text-sm`}>Close</button>
                  </div>



                  <div className="flex items-center mb-4 ">
                    <label htmlFor="appreciate" className="font-medium">APPRECIATION<span className="text-[15px]">*</span>:</label>
                    <input id="appreciate" disabled={disableAppreciate} type="radio" value="appreciate" name="performance" className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  " onChange={() => handlePerformance(1)} />
                    <label htmlFor="depreciate" className="ms-2  font-medium ">DEPRECIATION<span className="text-[15px]">*</span>:</label>
                    <input id="depreciate" type="radio" value="depreciate" name="performance" className="w-4 h-4 m-3 text-blue-600 bg-gray-100 border-gray-300  " onChange={() => handlePerformance(-1)} />
                  </div>
                  <div className={`flex ${!showScore && 'hidden'}`}>
                    <span>SCORE<span className="text-[15px]">*</span>: </span>
                    <select className="border w-1/5 ms-1" onChange={(e) => handleScoreChange(e.target.value)} value={activityData.score}>
                      <option value={0}>Select</option>
                      {
                        scoreRender && scoreRender.map((score) => <option value={score}>{score}</option>)
                      }
                    </select>
                  </div>



                  <div className="flex items-center my-5">
                    <label htmlFor="comments" className="block w-3/12 mb-20 text-start  font-medium  ">COMMENTS<span className="text-[15px]">*</span>:</label>
                    <textarea id="comments" style={{ resize: "none" }} rows="4" className="block ml-2 p-2.5 w-9/12  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Comments" onChange={(e) => handleComments(e)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
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
                    <button onClick={() => { setShowActivity(false); onClose() }} className="px-3 py-2 rounded-md bg-gray-700 text-white ">Cancel</button>
                    {
                      enableSubmit ? <button type="button" className="px-3  py-2 ml-5 bg-blue-500 text-white rounded-md" onClick={handleSubmit}>Submit</button> :
                        <button type="button" className="px-3  py-2 ml-5 bg-gray-400 text-white rounded" disabled={!enableSubmit} title="Please fill all fileds to submit">Submit</button>
                    }

                  </div>
                </form>
              </div>
            </div>
          </div> : null
        }
      </div>
    </>
  )

}