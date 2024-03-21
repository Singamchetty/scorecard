import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
    totalReporteesData: [],
    activitiesData:null,
    loading: false,
    error: null,
    fromDate: null,
    toDate: null,
};

export const fetchReportstableData = createAsyncThunk("getreportees", async (data) => {
  return await axios.post(`${base_url}/getreportees`,  data)
    .then((response) => response.data);
});

const exporttableSlice = createSlice({
  name: "totalReportees",
  initialState,
  reducers: {
    resetReporteesTableData:() => {
      return initialState
    },
    setPastMonth: (state) => {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 1);
        state.fromDate = fromDate;
        state.toDate = toDate;
        console.log(fromDate,toDate)
      },
      setPastTwoMonths: (state) => {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3);
        state.fromDate = fromDate;
        state.toDate = toDate;
        console.log(fromDate,toDate)
      },
      setPastsixMonths: (state) => {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 6);
        state.fromDate = fromDate;
        state.toDate = toDate;
        console.log(fromDate,toDate)
      },
      setPasttwelvemonths: (state) => {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 12);
        state.fromDate = fromDate;
        state.toDate = toDate;
        console.log(fromDate,toDate)
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReportstableData.pending, (state) => {
      state.loading = true;
      state.error = "pending";
    });
    builder.addCase(fetchReportstableData.fulfilled, (state, action) => {
      state.loading = false;
      state.totalReporteesData = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchReportstableData.rejected, (state, action) => {
      state.loading = false;
      state.totalReporteesData = null;
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetReporteesTableData,setPastMonth,setPastTwoMonths,setPastsixMonths,setPasttwelvemonths} = exporttableSlice.actions;

export default exporttableSlice.reducer;
