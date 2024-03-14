import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reports: [],
  loading: false,
  error: null,
};

export const fetchReports = createAsyncThunk("getReports", async (data) => {
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state) => {
      state.loading = true;
      state.error = "pending";
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload.activities;
      state.error = "";
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      state.loading = false;
      state.reports = [];
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetReports} = reportSlice.actions;

export default reportSlice.reducer;
