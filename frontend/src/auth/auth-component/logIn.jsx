import "../auths-css/login.css";
import { useState } from "react";
import { getInput, login } from "./index.js";
import { useMutation } from "@tanstack/react-query";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userDetails = {
    email,
    password,
  };

  const logIn = useMutation({
    mutationFn: () => login(userDetails),
    onSuccess: () => {
      setEmail("");
      setPassword("");
    },
  });

  const submitFn = (e) => {
    e.preventDefault();
    logIn.mutate();
  };

  return (
    <div id="login">
      <div className="header-hero">
        <h1>Welcome Back</h1>
        <h3>Log in to manage your appointments.</h3>
      </div>

      <form className="form-login" id="form-login" onSubmit={submitFn}>
        <p className="image-container">
          <img src="/doctorapp.svg" alt="Doctor appointment illustration" />
        </p>

        <div>
          <h1>Login</h1>
          <input
            type="email"
            value={email}
            placeholder="enter"
            onChange={(e) => getInput(e, setEmail)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => getInput(e, setPassword)}
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
