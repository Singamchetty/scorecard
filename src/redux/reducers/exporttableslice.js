import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
    activitiesData:null,
    loading: false,
    error: null,
};


export const fetchReportesActivitiesData = createAsyncThunk("getactivities", async (data) => {
  return await axios.post(`${base_url}/getActivities`,  data)
    .then((response) =>  response.data.activities);
});

const exporttableSlice = createSlice({
  name: "totalReportees",
  initialState,
  reducers: {
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
      state.loading = false;
      state.activitiesData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchReportesActivitiesData.rejected, (state, action) => {
      state.loading = false;
      state.activitiesData = null;
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetReporteesTableData} = exporttableSlice.actions;

export default exporttableSlice.reducer;
