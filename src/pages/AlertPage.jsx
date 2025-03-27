import styles from "./AlertPage.module.css";
//import { useLocation } from "react-router-dom"
import { useAppointmentContext } from "../Context";
import ButtonNavLink from "../components/ButtonNavLink";
import Alert from "../components/Alert";

export default function AlertPage() {


  const backButtonColor = "orange";

  // data variable to destructure the appointment Context to access the appointments in the Context data property.
  const { data } = useAppointmentContext();

  // filter the past appointments from the data to get only the future appointments and the ones now.
  const future_appointments = data.filter((appointment) => {
    const appointment_date = new Date(
      appointment.date + "T" + appointment.time
    );
    const current_date = new Date();
    console.log(appointment_date);

    return appointment_date.getTime() >= current_date.getTime();
  });

  // sort the future appointments based on how close the time stamps from least to greatest
  const future_appointments_sorted_based_on_time = future_appointments.sort(
    (appointment, nextAppointment) => {
      const appointment_date = new Date(
        appointment.date + "T" + appointment.time
      );
      const next_appointment_date = new Date(
        nextAppointment.date + "T" + nextAppointment.time
      );

      return appointment_date.getTime() - next_appointment_date.getTime();
    }
  );

  return (
    <div className={styles.container}>
       <div className={styles.navbar}>
          <div><ButtonNavLink to="/clientDashboard" id={styles.goBackButton} color={backButtonColor}>⬅ Back</ButtonNavLink></div>
          <div><h1>View your alerts & get notified of the closest appointment date</h1></div>
       </div>
      <Alert data={future_appointments_sorted_based_on_time}/>
    </div>
  );
}
