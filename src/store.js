import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counterSlice";
import usersReducer from "./reducers/usersReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
});
