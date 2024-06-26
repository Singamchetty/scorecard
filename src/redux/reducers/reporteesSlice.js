import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../api/axiosConfig';

const initialState = {
  reportees: [],
  reporteeId: null,
  viewReportee:null,
  totalCount:0,
  loading: false,
  error: null,
  currPage:1,
  pagesCount:1,
  sortKey: null,
  sortOrder: 'asc'
};

export const fetchReportees = createAsyncThunk("getreportees", async (data) => {
  return await axiosApi.post(`/getreportees`, data)
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
          return {
            ...state,
            viewReportee: action.payload
          }
    },
    setReporteeId: (state, action) => {
      state.reporteeId = action.payload
    },
    setCurrPage: (state, action) => {
      state.currPage = action.payload
    },
    setPagesCount: (state, action) => {
      state.pagesCount = action.payload
    },
    setSortKey: (state, action) => {
      state.sortKey = action.payload
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload
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

export const {resetReportees,setViewReportee, setCurrPage, setPagesCount, setSortKey, setSortOrder, setReporteeId} = reporteesSlice.actions;

export default reporteesSlice.reducer;
