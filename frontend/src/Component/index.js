import Header from "./header/header.jsx";
import Home from "./home/home.jsx";
import Appointment from "./appointmentHistory/appointment.jsx";
import Profile from "./profile/profile.jsx";
import MainAuth from "../Component/auth/registery/main_auth.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faCalendarCheck,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

// header component
const headerDetails = {
  FontAwesomeIcon,
  home: faHospital,
  booking: faCalendarCheck,
  profile: faCircleUser,
  instagram: faSquareInstagram,
  linkedIn: faLinkedinIn,
  name: "MediBook",
};

export { Header, Home, Appointment, Profile, MainAuth, headerDetails };
