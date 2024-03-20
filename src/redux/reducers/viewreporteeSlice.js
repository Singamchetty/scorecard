import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reports: null,
  defaultAvgScore:0,
  initiativeAvgScore:0,
  loading: false,
  error: null,
};

export const fetchReporteeActivities = createAsyncThunk("getReports", async (data) => {
  return await axios
    .post(`${base_url}/getActivities`, data)
    .then((response) => response.data);
});

const reportSlice = createSlice({
  name: "reportees",
  initialState,
  reducers: {
    resetReports:() => {
      return initialState
    },
    calculateDefaultScore:(state, action)=>{
      if(action.payload===undefined){
        return {...state,defaultAvgScore :0}
      }else{
      const dutiesItems = action.payload?.filter(item => item.type === "duties");
      const totalDutiesScore =dutiesItems?.length? dutiesItems?.reduce((acc, curr) => acc+ Number(curr.score), 0):0;
      const defaultAvgScore =totalDutiesScore===0?0: Number(totalDutiesScore) / Number(dutiesItems?.length);
      return {...state,defaultAvgScore :Number(defaultAvgScore).toFixed(1)}
    }
    },
    calculateInitiativeScore:(state,action)=>{
      if(action.payload===undefined){
        return {...state,initiativeAvgScore:0}
      }
      else{
      const initiatiesItems = action.payload?.filter(item => item.type === "initiative");
      const totalInitiateScore =initiatiesItems?.length? (initiatiesItems?.reduce((acc, curr) => acc+ Number(curr.score), 0)):0;
      const initialAvgScore =totalInitiateScore===0?0: Number(totalInitiateScore) / Number(initiatiesItems?.length) ;
      return {...state,initiativeAvgScore :Number(initialAvgScore).toFixed(1)}
      }
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchReporteeActivities.pending, (state) => {
      return {...state,loading :true,error :"loading"}
    });
    builder.addCase(fetchReporteeActivities.fulfilled, (state, action) => {
      return {...state,loading :false,error :"",reports:action.payload?.activities}
    });
    builder.addCase(fetchReporteeActivities.rejected, (state, action) => {
      return {...state,loading :false,error :action.error || "Something went wrong!",reports:null}
    });
  },
});

export const {resetReports,calculateDefaultScore,calculateInitiativeScore} = reportSlice.actions;

export default reportSlice.reducer;
