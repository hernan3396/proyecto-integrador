import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "./tweetSlice";
import Tweet from "./Tweet";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function Tweets() {
  const tweets = useSelector((state) => state.tweet.tweets);
  const loading = useSelector((state) => state.tweet.fetchingTweets);
  const error = useSelector((state) => state.tweet.fetchingTweetsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
      {loading && (
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      )}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </>
  );
}

export default Tweets;
