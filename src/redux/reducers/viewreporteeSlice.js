import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reports: null,
  dutiesReports: null,
  initiativeReports: null,
  defaultAvgScore:0,
  initiativeAvgScore:0,
  loading: false,
  error: null,
};

export const fetchReporteeActivities = createAsyncThunk("getReports", async (data) => {
  return await axios
    .post(`${base_url}/getActivities`, data)
    .then((response) => response.data?.activities);
});

export const fetchActivitiesAvg = createAsyncThunk("getActivities-avg", async (data) => {
  return await axios
    .post(`${base_url}/getActivities-avg`, data)
    .then((response) => response.data);
});

const reportSlice = createSlice({
  name: "reportees",
  initialState,
  reducers: {
    resetReports:() => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReporteeActivities.pending, (state) => {
      return {...state,loading :true,error :"loading"}
    });
    builder.addCase(fetchReporteeActivities.fulfilled, (state, action) => {
      const {type} = action?.payload[0] ?? {}
      return {...state,loading :false,error :"", [`${type}Reports`]: action.payload}
    });
    builder.addCase(fetchReporteeActivities.rejected, (state, action) => {
      return {...state,loading :false,error :action.error || "Something went wrong!",reports:null}
    });

    // getActivities Api
    builder.addCase(fetchActivitiesAvg.pending, (state) => {
      return {...state,loading :true,error :"loading"}
    });
    builder.addCase(fetchActivitiesAvg.fulfilled, (state, action) => {
      const avgScores = action.payload;
      const dutiesAvg = avgScores.find(({type}) => type === "duties")
      const initiatieAvg = avgScores.find(({type}) => type === "initiative")
      return {...state,loading :false,error :"", defaultAvgScore: dutiesAvg?.avgScore.toFixed(1) || 0, initiativeAvgScore: initiatieAvg?.avgScore.toFixed(1) || 0}
    });
    builder.addCase(fetchActivitiesAvg.rejected, (state, action) => {
      return {...state,loading :false,error :action.error || "Something went wrong!",reports:null}
    });
  },
});

export const {resetReports,calculateDefaultScore,calculateInitiativeScore} = reportSlice.actions;

export default reportSlice.reducer;
