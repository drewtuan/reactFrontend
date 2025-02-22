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


// Client Dashboard component that allows the user to view newly created appointments and past visits.
export default function ClientDashboard() {
  // state variables
  const [isDataLoading, setIsDateLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const date = new Date();
  console.log(date);
  console.log(date.getDay());
  console.log(date.getFullYear());

  // color for the navigation button on this page (Back button).
  const backButtonColor = "orange";

  // navigator
  const navigator = useNavigate();

  // source https://github.com/PranayChavhan/GSport-V1
  // get the cookie string
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

  // return the cookie name
  const getCookieName = (name)=> {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // trims the whitespace in the array of characters
      
      // picks which substring starts with the token name plus the equal sign
      if (cookie.startsWith(name)) { 
        console.log(name);
        return name; // returns the token not counting "name="
      }
    }
    return null;
  }

  // This function deletes the cookie by setting the expiration date to a random past time
  const deleteCookieOnSignOut = async() => {

    const cookieName = getCookieName("token");
    document.cookie = `${cookieName}=; expires=Wed, 02 Feb 1960 10:00:01 GMT;`;
    navigator("/")
    
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
        
        console.log(response.data);
        setData(response.data.appointments);

      } catch(error) {
        console.log("Error loading appointment data:", error);
        setError(true);
      }finally {
        setIsDateLoading(false);
      }
    }

    fetchAppointments();

  },[]); //where dependency array goes.

   
//   {data.map((item) => (<ListItem key={item.id} item={item}/>))}
 
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
            <div><h2>Scheduled Appointments ({data.length})</h2></div>
            <div className={styles.appointment_list_container}>
             
               {isDataLoading && <Loading/>}
               {!isDataLoading && !error && <ScheduleAppointmentList appointments={data}/>}
               {error && <ErrorMessage />}
            
            </div>
          </div>

          <div className={styles.past_appointments_container}>
              <div><h2>Your Past Appointments</h2></div>
              <div></div>
          </div>
      
        </div>
      
    
    </div>
  )
}


