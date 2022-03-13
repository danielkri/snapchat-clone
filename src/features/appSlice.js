import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  selectedImage: null,
  status: "idle",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { login } = appSlice.actions;

export const selectApp = (state) => state.app.value;

export default appSlice.reducer;
