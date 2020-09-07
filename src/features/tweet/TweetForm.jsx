import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendTweet } from "./tweetSlice";

function TweetForm({ history }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.signupError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTweet(text, history));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>New Tweet</h1>
      <br />
      <textarea
        placeholder="Say something"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <br />
      <button type="submit">Send</button>
    </form>
  );
}

export default TweetForm;
