import "../auths-css/login.css";
import { useState } from "react";
import authFn from "../registery/auth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const logFn = useMutation({
    // userDetails is an object the state is added in the submitFn

    mutationFn: async (userDetails) => {
      try {
        const result = await authFn.login(userDetails);
        await wait(3000);
        return result;
      } catch (err) {
        await wait(3000);
        throw err;
      }
    },
    onSuccess: () => {
      setEmail("");
      setPassword("");
      navigation("/home");
      window.scrollTo(0, 0);
    },
  });

  const submitFn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("please complete all the fields");
      setTimeout(() => setError(""), 3000);
      return;
    }
    logFn.mutate({ email, password });
  };

  return (
    <div id="login">
      {logFn.isPending && (
        <div className="loading-container">
          <p>Logging in...</p>
          <img src="/loading-spanner.svg" alt="Loading" />
        </div>
      )}
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
          <h2 className="error">{logFn.error?.response?.data?.message}</h2>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
