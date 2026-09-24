import "./profile.css";
import authFn from "../auth/registery/auth.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Profile = ({ setProfile }) => {
  const navigation = useNavigate();

  const logout = useMutation({
    mutationFn: async () => {
      const result = await authFn.logOut();
      await wait(3000);

      return result;
    },
    onSuccess: () => {
      navigation("/");
    },
    onError: () => {
      console.log("Logout failed");
    },
  });
  return (
    <div className="profile-menu">

      {logout.isPending && (
        <div className="loading-container">
          <p>Logging Out...</p>
          <img src="/loading-spanner.svg" alt="Loading" />
        </div>
      )}
      
      <h4 onClick={() => setProfile(false)}>X</h4>
      <p onClick={() => logout.mutate()}>Log out</p>
    </div>
  );
};

export default Profile;
