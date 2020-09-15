import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";

function LoginForm({ history }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.user.loggingError);
  const loading = useSelector((state) => state.user.loggingIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }, history));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter email or username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {loading && (
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      )}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}

export default LoginForm;
