import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from '../../api/axiosConfig';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("getUser", async (id) => {
  return await axiosApi
    .get(`/employee/${id}`)
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser:() => {
      return initialState
    },
    loginUser:(state,action)=>{
      return {...state,user:action.payload}
    }
  },
  extraReducers: (builder) => {
    // fetch user
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = "pending";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error || "Something went wrong!";
    });
  },
});

export const {resetUser,loginUser} = userSlice.actions;

export default userSlice.reducer;
