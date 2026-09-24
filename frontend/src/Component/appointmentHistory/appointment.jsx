import { app } from "../index";
import { Header, Profile } from "../renderComponent.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import queryClient from "../../main.jsx";
import "./appointment.css";

const AppointMent = () => {
  const [profile, setProfile] = useState(false);
  const cancelAppointment = useMutation({
    mutationFn: (id) => app[0].cancelAppointment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const { data: appointmentData } = useQuery({
    queryFn: () => {
      return app[0].getAppointmentHistory();
    },
    queryKey: ["appointments"],
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  return (
    <div className="appointment-container">
      <Header setProfile={setProfile} />
      {!appointmentData && (
        <div className="appointment-status">
          <p>Book To View Appointment</p>
        </div>
      )}

      {appointmentData && (
        <h1 className="appointment-header">My Appointments</h1>
      )}
      {appointmentData &&
        appointmentData.map((details) => {
          return (
            <div key={details.id} className="appointment-card">
              <div className="doctorDetails">
                <p className="image-section">
                  <img
                    src={details.doctor.image}
                    className="image-appointment"
                  />
                </p>

                <p>{details.doctor.name}</p>
              </div>

              <div className="appointment">
                <div className="appointment-details">
                  <p>Day:</p>
                  <p>{details.day}</p>
                </div>

                <div className="appointment-details">
                  <p>Time: </p>
                  <p>{details.time}</p>
                </div>

                <div className="appointment-details">
                  <p>Booked on:</p>
                  <p>{new Date(details.createdAt).toDateString()}</p>
                </div>

                <div className="appointment-details">
                  <span>Status:</span>
                  <span
                    className={
                      details.status === "BOOKED" ? "booked" : "cancelled"
                    }
                  >
                    {details.status}
                  </span>
                </div>

                <div className="appointment-button">
                  <button
                    onClick={() => {
                      cancelAppointment.mutate(details.id);
                    }}
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {profile && <Profile setProfile={setProfile} />}
    </div>
  );
};

export default AppointMent;
