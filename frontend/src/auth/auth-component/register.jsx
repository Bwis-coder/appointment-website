import "../auths-css/register.css";
import { useState } from "react";
import { getInput } from "./index.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <form className="form-register" id="form-register">
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
          <button>Register </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
