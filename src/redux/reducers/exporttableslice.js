import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";
 
const initialState = {
    // totalReporteesData: [],
    activitiesData:[],
    loading: false,
    error: null,

};
 

 
export const fetchReportesActivitiesData = createAsyncThunk("gettotalactivities", async (data) => {
  return await axios.post(`${base_url}/getActivities`,  data)
    .then((response) => response.data);
});
 
const exporttableSlice = createSlice({
  name: "totalReportees",
  initialState,
  reducers: {
    resetActivitiesData: (state) => {
      state.activitiesData = []
    },
    resetReporteesTableData:() => {
      return initialState
    },
   
  },
  extraReducers: (builder) => {

    builder.addCase(fetchReportesActivitiesData.pending, (state) => {
      state.loading = true;
      state.error = "pending";
    });
    builder.addCase(fetchReportesActivitiesData.fulfilled, (state, action) => {
      // console.log(action.payload.activities)
      state.loading = false;
      state.activitiesData = action.payload.activities      ;
      state.error = "";
    });
    builder.addCase(fetchReportesActivitiesData.rejected, (state, action) => {
      state.loading = false;
      state.activitiesData = null;
      state.error = action.error || "Something went wrong!";
    });
  },
});
 
export const {resetReporteesTableData, resetActivitiesData} = exporttableSlice.actions;
 
export default exporttableSlice.reducer;
