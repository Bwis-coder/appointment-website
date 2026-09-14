import { headerDetails } from "../index";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-icon">
        <h2>{headerDetails.name}</h2>
        <NavLink to="/home">
          <h2>
            <headerDetails.FontAwesomeIcon icon={headerDetails.home} />
          </h2>
        </NavLink>

        <NavLink to="/appointment">
          <h2>
            <headerDetails.FontAwesomeIcon icon={headerDetails.booking} />
          </h2>
        </NavLink>

        <h2 className="profile">
          <headerDetails.FontAwesomeIcon icon={headerDetails.profile} />
        </h2>
      </div>

      <div className="header-links">
        <a
          href="https://www.instagram.com/bwis_tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="ig-icon">
            <headerDetails.FontAwesomeIcon icon={headerDetails.instagram} />
          </h2>
        </a>

        <a
          href="https://linkedin.com/in/wisdom-ezekiel-6478482aa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="link-icon">
            <headerDetails.FontAwesomeIcon icon={headerDetails.linkedIn} />
          </h2>
        </a>
      </div>
    </div>
  );
};

export default Header;
