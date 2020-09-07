import React from "react";

export default function Tweet({ tweet }) {
  return (
    <>
      <strong>@{tweet.author.username}</strong>
      <blockquote>{tweet.text}</blockquote>
      <br />
    </>
  );
}
