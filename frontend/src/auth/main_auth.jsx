import Register from "./register";
import Login from "./logIn";
import Header from "./header";
import "./auths-css/main.css";

const MainAuth = () => {
  return (
    <div className="auth-container">
      <Header />
      <Register />
      <Login />
    </div>
  );
};

export default MainAuth;
