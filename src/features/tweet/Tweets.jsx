import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "./tweetSlice";
import Tweet from "./Tweet";
import { Link } from "react-router-dom";

function Tweets() {
  const tweets = useSelector((state) => state.tweet.tweets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  return (
    <>
      <Link to="/new-tweet">New Tweet</Link>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </>
  );
}

export default Tweets;
