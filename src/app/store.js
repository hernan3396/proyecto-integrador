import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import tweetSlice from "../features/tweet/tweetSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    tweet: tweetSlice,
  },
});
