import axios from "axios";
import weburl from "../../config/web-url.js";

const getInput = (e, set) => {
  set(e.target.value);
};

const register = async (e, object) => {
  e.preventDefault();

  const res = await axios.post(
    `${weburl}/auth/register`,
    {
      email: object.email,
      name: object.name,
      password: object.password,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

const login = async (e, object) => {
  e.preventDefault();

  const res = await axios.post(
    `${weburl}/auth/login`,
    {
      email: object.email,
      password: object.password,
    },
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export { getInput, register, login };