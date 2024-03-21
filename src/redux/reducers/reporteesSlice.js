import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reportees: [],
  viewReportee:null,
  totalCount:0,
  loading: false,
  error: null,
  currPage:1,
  pagesCount:1
};

export const fetchReportees = createAsyncThunk("getreportees", async (data) => {
  return await axios.post(`${base_url}/getreportees`, data)
    .then((response) => response.data);
});

const reporteesSlice = createSlice({
  name: "reportees",
  initialState,
  reducers: {
    resetReportees:() => {
      return initialState
    },
    setViewReportee:(state,action)=>{
        const reportee=state.reportees.find((reportee)=>reportee.empId==action.payload)
         if(!reportee){
          return {
            ...state,
            viewReportee: null
          }
        } else {
          return {
            ...state,
            viewReportee: reportee
          }
        }
    },
    setCurrPage: (state, action) => {
      state.currPage = action.payload
    },
    setPagesCount: (state, action) => {
      state.pagesCount = action.payload
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
      state.totalCount = action.payload.totalCount.count;
      state.error = "";
    });
    builder.addCase(fetchReportees.rejected, (state, action) => {
      state.loading = false;
      state.reportees = [];
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetReportees,setViewReportee, setCurrPage, setPagesCount} = reporteesSlice.actions;

export default reporteesSlice.reducer;
