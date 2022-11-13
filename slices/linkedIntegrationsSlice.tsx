import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IntegrationsLinked {
  value: [];
}

const initialState: IntegrationsLinked = {
  value: [],
};

export const integrationLinkedSlice = createSlice({
  name: "linkedIntegration",
  initialState,
  reducers: {
    addIntegrationLinked: (state: any, action) => {
      state.value = [...state.value, action.payload];
    },
    removeIntegration: (state: any, action) => {
      state.value = state.value.filter(
        (intg: string) => intg != action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIntegrationLinked, removeIntegration } =
  integrationLinkedSlice.actions;

export default integrationLinkedSlice.reducer;
