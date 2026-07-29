import "./auths-css/register.css";
import { useState } from "react";
import { getInput } from "./index.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="register">
      <div>
        <h1>Appointment App</h1>
        <h3>Create an account to book an appointment with a doctor.</h3>
      </div>
      <div>
        <img src="/booking.svg" />
      </div>

      <form>
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
  );
};

export default Register;
