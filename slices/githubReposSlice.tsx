import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReposDetails {
  value: [];
}

const initialState: ReposDetails = {
  value: [],
};

export const reposDetailsSlice = createSlice({
  name: "repoDetails",
  initialState,
  reducers: {
    getGithubRepos: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getGithubRepos } = reposDetailsSlice.actions;

export default reposDetailsSlice.reducer;
