import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {base_url} from '../../utils/constants';
import axios from 'axios';

const initialState= {
    user: {},
    reportees: [],
    loading: false,
    error: null,
  }

  export const fetchUser = createAsyncThunk('getUser', async (id) => {

    return await axios.get(`${base_url}/employee/${id}`)
        .then(response => response.data);
});
export const fetchReportees = createAsyncThunk('getReportees', async (data) => {
    return await axios.post(`${base_url}/getreportees`, data)
        .then(response => response.data);
});

const reporteesSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchReportees.pending, (state) => {
        state.loading = true;
        state.error="pending"
    });
    builder.addCase(fetchReportees.fulfilled, (state, action) => {
        state.loading = false;
        state.reportees = action.payload;
        state.error = '';
    });
    builder.addCase(fetchReportees.rejected, (state, action) => {
        state.loading = false;
        state.reportees = [];
        state.error = action.error || 'Something went wrong!';
    });
    // fetch user
    builder.addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error="pending"
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = '';
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.error || 'Something went wrong!';
    });
}
});

export const {} =
reporteesSlice.actions;

export default reporteesSlice.reducer;
