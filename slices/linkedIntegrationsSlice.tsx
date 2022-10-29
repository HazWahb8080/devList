import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReposDetails {
  value: [];
}

const initialState: ReposDetails = {
  value: [],
};

export const integrationLinkedSlice = createSlice({
  name: "linkedIntegration",
  initialState,
  reducers: {
    addIntegrationLinked: (state: any, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIntegrationLinked } = integrationLinkedSlice.actions;

export default integrationLinkedSlice.reducer;
