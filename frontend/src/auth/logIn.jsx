import "./auths-css/login.css";
import { useState } from "react";
import { getInput } from "./index.JS";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="login">
      <form>
        <div>
          <h1>Welcome Back</h1>
          <h3>log in to book appointment with a doctor</h3>
        </div>

        <div>
          <img src="/doctorapp.svg" alt="Doctor appointment illustration" />
        </div>

        <div>
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
        </div>
      </form>
    </div>
  );
};

export default LogIn;
