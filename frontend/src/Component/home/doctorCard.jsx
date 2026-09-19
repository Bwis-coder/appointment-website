import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const DoctorCard = ({ doctor, home }) => {
  const [day, setDay] = useState("choose a day");
  const [time, setTime] = useState("choose time");
  const [bookingState, setBookingStatus] = useState("");

  const slots = {
    doctorId: doctor.id,
    day,
    time,
  };
  const booking = useMutation({
    mutationFn: (slots) => {
      return home.bookRequest(slots);
    },
    onSuccess: () => {
      setBookingStatus("Appointment Booked");
      setTimeout(() => {
        setBookingStatus("");
      }, 4000);
    },
    onError: (err) => {
      setBookingStatus(err?.response?.data?.message);
      setTimeout(() => {
        setBookingStatus("");
      }, 4000);
    },
  });

  return (
    <div className="booking-section">
      <div className="doctor-image">
        <img src={doctor.image} alt={doctor.name} />
      </div>

      <div className="doctor-details">
        <h3>{home.capitalized(doctor.name)}</h3>

        <h3>{home.capitalized(doctor.specialty)}</h3>

        <h3>Age: {doctor.age}</h3>
      </div>

      <div className="timeDate-section">
        <div>{home.selectDay(day || "", (e) => setDay(e.target.value))}</div>

        <div>{home.selectTime(time || "", (e) => setTime(e.target.value))}</div>
      </div>

      <button onClick={() => booking.mutate(slots)}>
        {home.appointmentButton}
      </button>

      {bookingState && (
        <p
          className={
            bookingState === "Appointment Booked"
              ? "booking-success"
              : "booking-error"
          }
        >
          {bookingState}
        </p>
      )}
    </div>
  );
};

export default DoctorCard;
