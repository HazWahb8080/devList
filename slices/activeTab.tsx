import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum Tabs {
  portfolio = "Portfolio",
  resume= "Resume",
}

export interface ActiveTabSlice {
  value: Tabs;
}

const initialState: ActiveTabSlice = {
  value: Tabs.portfolio,
};

export const ActiveTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    activeTabIs: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { activeTabIs } = ActiveTabSlice.actions;

export default ActiveTabSlice.reducer;
