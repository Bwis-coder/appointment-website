import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import weburl from "../config/web-url.js";
import {
  faHospital,
  faCalendarCheck,
  faCircleUser,
  faPhone,
  faMessage,
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

// homepage component

class HomePage {
  doctor = [];
  constructor(home) {
    this.id = home.id;
    this.header = home.header;
    this.subHeader = home.subHeader;
    this.button = home.button;
    this.footer = home.footer;
    this.appointmentButton = home.appointmentButton;
  }

  async doctorDetails() {
    const response = await axios.get(`${weburl}/doctorDetails`, {
      withCredentials: true,
    });
    return (this.doctor = response.data?.data?.doctorItems);
  }

  async bookRequest(object) {
    const res = await axios.post(
      `${weburl}/book/bookAppointment`,
      {
        doctorId: object.doctorId,
        time: object.time,
        day: object.day,
      },
      {
        withCredentials: true,
      },
    );

    return res.data;
  }

  capitalized(word) {
    return word
      .toLowerCase()
      .split(" ")
      .map((i) => {
        return i[0].toUpperCase() + i.slice(1);
      })
      .join(" ");
  }

  getInput(e, state) {
    state(e.target.value);
  }

  selectDay(state, fn) {
    return (
      <select value={state} onChange={fn}>
        <option value="choose a day">Choose Day</option>
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
      </select>
    );
  }

  selectTime(state, fn) {
    return (
      <select value={state} onChange={fn}>
        <option value="choose time">Choose TIme</option>
        <option value="10:00AM">10:00AM</option>
        <option value="12:00PM">12:00PM</option>
        <option value="3:00PM">3:00PM</option>
      </select>
    );
  }

  footerPage() {
    return (
      <footer className="footer-container">
        {this.footer.map((footer) => {
          const Icon = footer.contact.FontAwesomeIcon;

          return (
            <div key={footer.id} className="footer-section">
              <div className="footer-about">
                <h2>{this.capitalized(footer.name)}</h2>
                <h3>{footer.aboutUs}</h3>
                <p>{footer.aboutMessage}</p>
              </div>

              <div className="footer-contact">
                <h3>Contact Us</h3>

                <div>
                  <Icon icon={footer.contact.phoneIcon} />
                  <span>{footer.contact.phone}</span>
                </div>

                <div>
                  <Icon icon={footer.contact.message} />
                  <span>{footer.contact.mailAddress}</span>
                </div>
              </div>

              <div className="footer-social">
                <h3>Follow Us</h3>
                <a
                  href="https://www.instagram.com/bwis_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon={footer.instagram} />
                </a>

                <a
                  href="https://linkedin.com/in/wisdom-ezekiel-6478482aa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon={footer.linkedinIN} />
                </a>
              </div>
            </div>
          );
        })}
      </footer>
    );
  }
}

const homeDetails = [
  {
    id: crypto.randomUUID(),
    header: "Find the Right Doctor for You",
    subHeader:
      "Book appointments with trusted doctors quickly and easily. Choose a doctor, select an available time, and manage your appointments in one place.",
    button: "booking slots",
    appointmentButton: "Book Appointment",
    footer: [
      {
        id: crypto.randomUUID(),
        name: "mediBook",
        aboutUs: "About us",
        aboutMessage:
          "We make booking appointments with trusted doctors quick, easy, and convenient.",
        contact: {
          FontAwesomeIcon,
          phoneIcon: faPhone,
          message: faMessage,
          phone: "+234 9037 455 456",
          mailAddress: "wisdomezekiel9@gmail.com",
        },
        instagram: faSquareInstagram,
        linkedinIN: faLinkedinIn,
      },
    ],
  },
].map((home) => {
  return new HomePage(home);
});

export { headerDetails, homeDetails };
