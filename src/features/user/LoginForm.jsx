import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Enter email or username"
          required
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
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
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}

export default LoginForm;
