import { Header, Profile } from "../renderComponent.js";
import { app } from "../index.jsx";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctorCard.jsx";
import { useState } from "react";
import "./home.css";

const Home = () => {
  const [profile, setProfile] = useState(false);

 const { data } = useQuery({
   queryKey: ["doctors"],
   queryFn: () => {
     return app[0].doctorDetails();
   },
   refetchOnWindowFocus: true,
 });

  return (
    <div className="home-container">
      <Header setProfile={setProfile} />

      {data && (
        <div className="home-section">
          {app.map((home) => {
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

      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default Home;
