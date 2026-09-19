import { Header } from "../renderComponent.js";
import { homeDetails } from "../index.jsx";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctorCard.jsx";
import "./home.css";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => {
      return homeDetails[0].doctorDetails();
    },
  });

  return (
    <div className="home-container">
      <Header />

      {data && (
        <div className="home-section">
          {homeDetails.map((home) => {
            return (
              <div key={home.id} className="home-div">
                <div className="description-container">
                  <h1>{home.header}</h1>
                  <h3>{home.subHeader}</h3>
                </div>

                <div className="booking-container">
                  {data.map((doctor) => {
                    return (
                      <DoctorCard key={doctor.id} doctor={doctor} home={home} />
                    );
                  })}
                </div>
                <div>{home.footerPage()}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
