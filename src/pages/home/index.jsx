import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from '../../api/axiosConfig';
import { base_url } from "../../utils/constants";
import { loginUser } from "../../redux/reducers/userSlice";
import {useDispatch,useSelector} from 'react-redux'

function Home() {

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [id, setId] = useState(null);
  const [errorMsg,setErrorMsg]=useState("")
  const [loading,setLoading]=useState(true)
  const userDetails = useSelector((state) => state.userDetails);
 

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)
    if(id!==null){
     await axiosApi.post(`/login`,{empId:Number(inputRef.current.value)})
      .then((res) => {
        setLoading(false)
        dispatch(loginUser(res.data.user))
      })
      .catch((error)=>{  
        setLoading(false)
        setErrorMsg("Not Authorized");
      })
    }else{
      setLoading(false)
      navigate(`/`);
    }

  };
  useEffect(()=>{
  
     setLoading(false)
     inputRef.current.focus();
  },[]);

  useEffect(()=>{
    if (userDetails?.user!=null){
      if(userDetails?.user.roleId === 1)
        navigate("/admin")
      else
        navigate("/dashboard")
    }
    else {
      navigate("/")
    }
  },[userDetails])

  return (
  
    <div className="container py-10 px-10 mx-0 min-w-full h-screen flex items-center justify-center bg-blue-100 ">
      <div className="">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight   md:text-5xl lg:text-6xl text-purple-900 mb-10 ">SCORE  CARD</h1>
      <form>
        <div className="max-w-sm p-10 bg-white border border-gray-400 rounded-lg shadow ">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Employee Id
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter Employee ID"
          required
          onChange={(e) => setId(e.target.value)}
          ref={inputRef}
        />
        {

        }
       <div className=" text-red-600">
       {
        errorMsg!==""? <span>{errorMsg}</span>:null
       }
       </div>
        <div className="flex justify-between">
        <button
          className="bg-purple-900 text-white disabled:bg-purple-900 hover:bg-blue-400 font-bold py-2 px-4 mt-6  rounded text-center"
          onClick={(e) => handleSubmit(e)}
          disabled={!id}
          type="submit"
        >
          Submit
        </button>

        {
          (loading)?<img src="/Loader2.gif" className="" width={100} height={100}/>:null
        }
        </div>
        
      </div>
      </form>

      </div>
    </div>
  );
}

export default Home;
