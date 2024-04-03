import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../api/axiosConfig'

const initialState = {
  reports: null,
  dutiesReports: null,
  initiativeReports: null,
 
  loading: false,
  error: null,
};

export const fetchProfileReporteeActivities = createAsyncThunk("getReports", async (data) => {
  return await axiosApi
    .post(`/getActivities`, data)
    .then((response) => {return {data:response.data?.activities, type:data.types}});
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
    builder.addCase(fetchProfileReporteeActivities.pending, (state) => {
      return {...state,loading :true,error :"loading"}
    });
    builder.addCase(fetchProfileReporteeActivities.fulfilled, (state, action) => {
      const {data, type} = action.payload;
      return {...state,loading :false,error :"", [`${type[0]}Reports`]: data}
    });
    builder.addCase(fetchProfileReporteeActivities.rejected, (state, action) => {
      return {...state,loading :false,error :action.error || "Something went wrong!",reports:null}
    });

  
  },
});

export const {resetReports} = reportSlice.actions;

export default reportSlice.reducer;
