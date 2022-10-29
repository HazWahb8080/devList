import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./slices/userDetailsSlice";
import activeTabReducer from "./slices/activeTab";
import repoDetailsReducer from "./slices/githubReposSlice"

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    activeTab: activeTabReducer,
    repoDetails: repoDetailsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
