import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reportees: [],
  loading: false,
  error: null,
};

export const fetchReportees = createAsyncThunk("getReportees", async (data) => {
  return await axios
    .post(`${base_url}/getreportees`, data)
    .then((response) => response.data);
});

const reporteesSlice = createSlice({
  name: "reportees",
  initialState,
  reducers: {
    resetReportees:() => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReportees.pending, (state) => {
      state.loading = true;
      state.error = "pending";
    });
    builder.addCase(fetchReportees.fulfilled, (state, action) => {
      state.loading = false;
      state.reportees = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchReportees.rejected, (state, action) => {
      state.loading = false;
      state.reportees = [];
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetReportees} = reporteesSlice.actions;

export default reporteesSlice.reducer;
