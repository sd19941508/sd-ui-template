import { createSlice } from "@reduxjs/toolkit";

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    userData: [],
  },

  reducers: {
    getUsers: (state, action) => {
      state.userData = action.payload;
    },
    setUsersData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsers, setUsersData } = usersReducer.actions;

export default usersReducer.reducer;
