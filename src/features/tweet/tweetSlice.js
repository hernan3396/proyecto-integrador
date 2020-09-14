import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    tweets: [],
    sendingTweet: false,
    sendTweetError: null,
    fetchingTweets: false,
    fetchingTweetsError: null,
  },
  reducers: {
    sendTweetStart(state, action) {
      state.sendingTweet = true;
    },
    sendTweetSuccess(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = null;
      state.tweets.push(action.payload);
    },
    sendTweetError(state, action) {
      state.sendingTweet = false;
      state.sendTweetError = action.payload;
    },
    fetchTweetStart(state, action) {
      state.fetchingTweetsError = null;
      state.fetchingTweets = true;
    },
    fetchTweetSuccess(state, action) {
      state.tweets = action.payload;
      state.fetchingTweets = false;
      state.fetchingTweetsError = null;
    },
    fetchTweetError(state, action) {
      state.fetchingTweets = false;
      state.fetchingTweetsError = action.payload;
    },
  },
});

export const {
  sendTweetStart,
  sendTweetSuccess,
  sendTweetError,
  fetchTweetSuccess,
  fetchTweetStart,
  fetchTweetError,
} = tweetSlice.actions;

export const sendTweet = (text, history) => (dispatch) => {
  dispatch(sendTweetStart());

  // try {
  //   const response = await api.post("/tweets", { text });
  //   dispatch(sendTweetSuccess(response.data));

  //   // redireccionar a tweets
  //   history.push("/tweets");
  // } catch (error) {
  //   dispatch(sendTweetError(error.response?.data));
  // }
  api.post("/tweets", { text }).then(
    (response) => {
      dispatch(sendTweetSuccess(response.data));

      // redireccionar a tweets
      history.push("/tweets");
    },
    (error) => dispatch(sendTweetError(error.response?.data))
  );
};

export const fetchTweets = (tweet) => async (dispatch) => {
  // try {
  //   const response = await api.get("/tweets", [tweet]);
  //   dispatch(fetchTweetSuccess(response.data));
  // } catch (error) {
  //   dispatch(sendTweetError(error.response?.data));
  // }
  dispatch(fetchTweetStart());

  api.get("/tweets", [tweet]).then(
    (response) => {
      dispatch(fetchTweetSuccess(response.data));
    },
    (error) => dispatch(sendTweetError(error.response?.data))
  );
};

export default tweetSlice.reducer;
