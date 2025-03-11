import styles from "./ClientDashboard.module.css"
import {useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading"
import ErrorMessage from "../components/ErrorMessage";
import ButtonNavLink from "../components/ButtonNavLink";

//import { getCookie } from "../functions/GetCookie";
//import ListItem from "../components/ListItem";
import ScheduleAppointmentList from "../components/ScheduleAppointmentList"
import SearchAndDownloadPDF from "../components/SearchAndDownloadPDF";


// Client Dashboard component that allows the user to view newly created appointments and past visits.
export default function ClientDashboard() {
  // state variables
  const [isDataLoading, setIsDateLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  // filtered list of past appointments
  const past_appointments = data.filter((appointment) => {
    const appointment_date = new Date(appointment.date + "T" + appointment.time);
    const current_date = new Date();

    return appointment_date.getTime() < current_date.getTime();
  });

  // filtered list of appointments now and in the future
  const future_appointments = data.filter((appointment) => {
    const appointment_date = new Date(appointment.date + "T" + appointment.time);
    const current_date = new Date();
    console.log(appointment_date);

    return appointment_date.getTime() >= current_date.getTime();
  });

  console.log(data);
  console.log(past_appointments);

  // color for the navigation button on this page (Back button).
  const backButtonColor = "orange";

  // navigator
  const navigator = useNavigate();

  // source https://github.com/PranayChavhan/GSport-V1
  // This function returns the access token of the cookie by only including the 
  // portion of the cookie string that is not the cookie name
  const getCookieToken = (name)=> {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // trims the whitespace in the array of characters
      
      // picks which substring starts with the token name plus the equal sign
      if (cookie.startsWith(name + '=')) { 
        return cookie.substring(name.length + 1); // returns the token not counting "name="
      }
    }
    return null;
  }

  // This function returns the cookie name if it exists.  Else, it returns null
  const getCookieName = (name)=> {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // trims the whitespace in the array of characters
      
      // picks which substring starts with the token name plus the equal sign
      if (cookie.startsWith(name)) { 
        return name; // returns the token not counting "name="
      }
    }
    return null;
  }

  // This function deletes the cookie by setting the expiration date to a random past time
  const deleteCookieOnSignOut = async() => {

    const cookieName = getCookieName("token");
    document.cookie = `${cookieName}=; expires=Wed, 02 Feb 1960 10:00:01 GMT;`;
    navigator("/");
    
  }
    

  // The data is fetched on the client dashboard pages initial render (when the page shows up)
  // This is because of the useEffect hook which allows for these actions to ocurr.
  useEffect(() => {
    const fetchAppointments = async() => {

      const token = getCookieToken("token");
      setIsDateLoading(true);
      const apiURL = 'https://api.vpbackendapi.com:5000/api/appointments';
      try {

        const response = await axios.get(apiURL,{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        );
        
        const account_data = response.data;
        const myappointments = account_data.appointments
        //console.log(appointments.appointments);
        setData(myappointments);

      } catch(error) {
        console.log("Error loading appointment data:", error);
        setError(true);
      }finally {
        setIsDateLoading(false);
      }
    }

    fetchAppointments();

  },[]); //where dependency array goes.


 
  return (
    <div className={styles.container}>

      <div className={styles.navbar}>
        <div className={styles.navbar_item}>
          <ButtonNavLink to="/scheduling" id={styles.goBackButton} color={backButtonColor}>⬅ Back</ButtonNavLink>
        </div>
        <div><h1>Client Dashboard</h1></div>
        <div className={styles.navbar_item}>
          <button className={styles.sign_out_button} onClick={deleteCookieOnSignOut}>Sign Out</button>
        </div>
      </div>
      
      <div className={styles.inner_container}>

        <div className={styles.schedule_appointments_container}>
            <div><h2>Future Scheduled Appointments ({future_appointments.length} scheduled)</h2></div>
            <div className={styles.appointment_list_container}>
             
               {isDataLoading && <Loading/>}
               {!isDataLoading && !error && <ScheduleAppointmentList appointments={future_appointments}/>}
               {error && <ErrorMessage />}
            
            </div>
          </div>

          <div className={styles.past_appointments_container}>
              <div><h2>Your Past Appointment History ({past_appointments.length} scheduled)</h2></div>
              <div>
                {isDataLoading && <Loading/>}
                {!isDataLoading && !error && <ScheduleAppointmentList appointments={past_appointments}/>}
                {error && <ErrorMessage />}
              </div>
          </div>
      
        </div>
        <div className={styles.download_pdf_section}>
          <h2 className={styles.pdf_header}>Download Individual Pet appointments as PDFs</h2>
          <SearchAndDownloadPDF />
        </div>
      
    
    </div>
  )
}


