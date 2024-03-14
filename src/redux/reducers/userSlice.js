import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/constants";
import axios from "axios";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("getUser", async (id) => {
  return await axios
    .get(`${base_url}/employee/${id}`)
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
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

export const {} = userSlice.actions;

export default userSlice.reducer;
