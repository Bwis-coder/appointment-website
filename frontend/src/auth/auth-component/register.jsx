import "../auths-css/register.css";
import { useState } from "react";
import { getInput, register } from "./index.js";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userDetails = {
    name,
    email,
    password,
  };

  const createUser = useMutation({
    mutationFn: () => register(userDetails),
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
    },
  });

  const submitFn = (e) => {
    e.preventDefault();
    createUser.mutate();
  };

  return (
    <div id="register">
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
            onChange={(e) => getInput(e, setName)}
            value={name}
          />

          <input
            placeholder="Email"
            type="email"
            onChange={(e) => getInput(e, setEmail)}
            value={email}
          />

          <input
            placeholder="password"
            type="password"
            onChange={(e) => getInput(e, setPassword)}
            value={password}
          />
          <button type="submit">Register </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
