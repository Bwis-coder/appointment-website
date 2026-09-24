import axios from "axios";
import weburl from "../../../config/web-url.js";

class AuthFn {
  getInput(e, set) {
    set(e.target.value);
  }

  async register(object) {
    const res = await axios.post(
      `${weburl}/auth/register`,
      {
        email: object.email,
        name: object.name,
        password: object.password,
      },
      {
        withCredentials: true,
      },
    );

    return res.data;
  }

  async login(object) {
    const res = await axios.post(
      `${weburl}/auth/login`,
      {
        email: object.email,
        password: object.password,
      },
      {
        withCredentials: true,
      },
    );

    return res.data;
  }

  async logOut() {
    const response = await axios.post(
      `${weburl}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    return response.data;
  }
}

const authFn = new AuthFn();

export default authFn;
