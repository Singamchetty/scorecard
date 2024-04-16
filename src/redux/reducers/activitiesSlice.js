import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await axios.get("/addMasterActivity");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addActivity = createAsyncThunk("user/addUser", async (values) => {
  try {
    const response = await axios.post(
      "/addMasterActivity",
      {

        type: values.type,
        aId: values.aId,
        aId: values.aId,
        appreciate: values.appreciate,
        depreciate:values.depreciate,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const activitiesSlice= createSlice({
  name: "activities",
  initialState: {
    loading: false,
    user: [],
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });

    builder.addCase(addActivity.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addActivity.fulfilled, (state, action) => {
      state.loading = false;
      state.user = [];
      state.isSuccess = action.payload;
    });

    builder.addCase(addActivity.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export default activitiesSlice.reducer;
