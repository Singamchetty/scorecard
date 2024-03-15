import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  reports: [],
  defaultAvgScore:0,
  initiativeAvgScore:0,
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
    },
    calculateDefaultScore:(state, action)=>{
      const defaultItems = action.payload?.filter(item => item.type === "default");
      const totalDefaultScore = defaultItems.reduce((acc, curr) => acc+ curr.score, 0);
      const defaultAvgScore = totalDefaultScore > 0 ? totalDefaultScore / defaultItems.length : 0;
      return {...state,defaultAvgScore :defaultAvgScore.toFixed(1)}
    },
    calculateInitiativeScore:(state,action)=>{
      const defaultItems = action.payload?.filter(item => item.type === "initiative");
      const totalDefaultScore = defaultItems.reduce((acc, curr) => acc+ curr.score, 0);
      const defaultAvgScore = totalDefaultScore > 0 ? totalDefaultScore / defaultItems.length : 0;
      return {...state,initiativeAvgScore :defaultAvgScore.toFixed(1)}
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state) => {
      return {...state,loading :true,error :"pending"}
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      return {...state,loading :false,error :"",reports:action.payload?.activities}
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      return {...state,loading :false,error :action.error || "Something went wrong!",reports:[]}
    });
  },
});

export const {resetReports,calculateDefaultScore,calculateInitiativeScore} = reportSlice.actions;

export default reportSlice.reducer;
