import { Header, } from "../renderComponent.js";
import { homeDetails } from "../index.jsx"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./home.css";

const Home = () => {
const [day, setDay] = useState({});
const [time, setTime] = useState({});

const { data, isError, isLoading } = useQuery({
queryKey: ["doctors"],
queryFn: () => {
return homeDetails[0].doctorDetails();
},
});

console.log("loading:", isLoading);
console.log("error:", isError);
console.log("data:", data);

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
  <div key={doctor.id} className="booking-section">
    <div className="doctor-image">
      <img src={doctor.image} alt={doctor.name} />
    </div>

    <div className="doctor-details">
      <h3>{home.capitalized(doctor.name)}</h3>

      <h3>{home.capitalized(doctor.specialty)}</h3>

      <h3>Age: {doctor.age}</h3>
    </div>

    <div className="timeDate-section">
      <div>
        {home.selectDay(day[doctor.id] || "", (e) =>
          setDay({
            ...day,
            [doctor.id]: e.target.value,
          }),
        )}
      </div>

      <div>
        {home.selectTime(time[doctor.id], (e) =>
          setTime({
            ...time,
            [doctor.id]: e.target.value,
          }),
        )}
      </div>
    </div>

    <button>{home.appointmentButton }</button>
  </div>
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
