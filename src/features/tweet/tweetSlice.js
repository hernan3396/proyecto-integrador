import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    sendingTweet: false,
    sendTweetError: null,
  },
  reducers: {
    sendTweetStart(state, action) {
      state.sendingTweet = true;
    },
    sendTweetSucces(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = null;
      state.tweets.push(action.payload);
    },
    sendTweetError(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = action.payload;
    },
    fetchTweetSuccess(state, action) {
      state.tweets = action.payload;
    },
  },
});

export const {
  sendTweetStart,
  sendTweetSuccess,
  sendTweetError,
  fetchTweetSuccess,
} = tweetSlice.actions;

export const sendTweet = (text, history) => async (dispatch) => {
  dispatch(sendTweetStart());

  try {
    const response = await api.post("/tweets", { text });
    dispatch(sendTweetSuccess(response.data));

    // redireccionar a tweets
    history.push("/tweets");
  } catch (error) {
    dispatch(sendTweetError(error.response?.data));
  }
};

export const fetchTweets = (tweet) => async (dispatch) => {
  try {
    const response = await api.get("/tweets", [tweet]);
    dispatch(fetchTweetSuccess(response.data));
  } catch (error) {
    dispatch(sendTweetError(error.response?.data));
  }
};

export default tweetSlice.reducer;
