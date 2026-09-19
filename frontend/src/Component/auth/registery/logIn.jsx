import "../auths-css/login.css";
import { useState } from "react";
import authFn from "../registery/auth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const userDetails = {
    email,
    password,
  };

  const logFn = useMutation({
    mutationFn: () => authFn.login(userDetails),
    onSuccess: () => {
      setEmail("");
      setPassword("");
      navigation("/home");
    },
    onError: () => {
      return `invalid emall or password`;
    },
  });

  const submitFn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("please complete all the fields");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    logFn.mutate();
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
            onChange={(e) => authFn.getInput(e, setEmail)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => authFn.getInput(e, setPassword)}
          />

          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        {logFn.isSuccess && <h2>{logFn.data?.data?.status}</h2>}

        {error && <h2 className="error">{error}</h2>}

        {logFn.isError && (
          <h2 className="error">
            {logFn.error?.response?.data?.message}
          </h2>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
