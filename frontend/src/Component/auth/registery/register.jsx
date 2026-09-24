import "../auths-css/register.css";
import { useState } from "react";
import authFn from "../registery/auth.js";
import { useMutation } from "@tanstack/react-query";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const createUser = useMutation({
    mutationFn: async (userDetails) => {
      try {
        const result = await authFn.register(userDetails);
        await wait(3000);
        return result;
      } catch (err) {
        await wait(3000);
        throw err;
      }
    },
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");

      document
        .getElementById("form-login")
        ?.scrollIntoView({ behavior: "smooth" });
    },
  });

  const submitFn = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please complete all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    createUser.mutate({ name, email, password });
  };

  return (
    <div id="register">
      {createUser.isPending && (
        <div className="loading-container">
          <p>Creating Account...</p>
          <img src="/loading-spanner.svg" alt="Loading" />
        </div>
      )}

      <div className="hero">
        <h1>Appointment App</h1>
        <h3>Book appointments with trusted doctors.</h3>
      </div>

      <div className="form-container">
        <div className="image-container">
          <img src="/booking.svg" alt="Doctor appointment illustration" />
        </div>

        <form className="form-register" id="form-register" onSubmit={submitFn}>
          <h1>Create Account</h1>
          <input
            placeholder="name"
            type="text"
            onChange={(e) => authFn.getInput(e, setName)}
            value={name}
            autoComplete="name"
          />

          <input
            placeholder="Email"
            type="email"
            onChange={(e) => authFn.getInput(e, setEmail)}
            value={email}
            autoComplete="email"
          />

          <input
            placeholder="password"
            type="password"
            onChange={(e) => authFn.getInput(e, setPassword)}
            value={password}
            autoComplete="new-password"
          />
          <button type="submit">Register</button>
        </form>
      </div>

      <div>
        {error && <h2 className="error">{error}</h2>}
        {createUser.isSuccess && (
          <h2 className="success">{createUser.data?.data?.status}</h2>
        )}
        {createUser.isError && (
          <h2 className="error">
            {createUser.error.response?.data?.data?.message}
          </h2>
        )}
      </div>
    </div>
  );
};

export default Register;
