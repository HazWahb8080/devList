import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  firstName: string;
  lastName: string;
  tags: string[];
  description: string;
}

export interface userDetailsSlice {
  value: UserData;
}

const initialState: userDetailsSlice = {
  value: { firstName: "", lastName: "", tags: [], description: "" },
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;


