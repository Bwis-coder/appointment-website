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
    <div className="profile-overlay" onClick={() => setProfile(false)}>
      {logout.isPending && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Logging Out...</p>
        </div>
      )}

      <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
        <button
          className="profile-close"
          onClick={() => setProfile(false)}
          aria-label="Close menu"
        >
          &times;
        </button>

        <div className="profile-header">
          <div className="profile-avatar">
            <span>👤</span>
          </div>
        </div>

        <button className="profile-logout" onClick={() => logout.mutate()}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Profile;
