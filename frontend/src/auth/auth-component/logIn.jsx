import "../auths-css/login.css";
import { useState } from "react";
import { getInput } from "./index.js";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="login">
      <div className="header-hero">
        <h1>Welcome Back</h1>
        <h3>Log in to manage your appointments.</h3>
      </div>

      <form className="form-login" id="form-login">
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

          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
