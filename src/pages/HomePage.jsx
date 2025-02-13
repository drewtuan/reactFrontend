
import styles from './HomePage.module.css'
import ButtonNavLink from '../components/ButtonNavLink';


const currentDate = new Date();
const openHour = 9; const openMinute=30;
const closedHour = 20; const closedMinute = 30;
const currentHour = currentDate.getHours(); const currentMinutes = currentDate.getMinutes();
 
const condition1 = (currentHour < openHour ) || (currentHour == openHour && currentMinutes < openMinute)
|| (currentHour == closedHour && currentMinutes >= closedMinute) || (currentHour > closedHour);



// Homepage component.  This is the page the user first goes to when pulling up the application
export default function HomePage() {
  return (
   <div className={styles.container}>
      <nav className={styles.navbar}>
        <div id={styles.logo}><h2>🐕Veterinarian Web App</h2></div>
        <div id={styles.buttonSection}>
          <ButtonNavLink to="/signup" id={styles.signUpButton} color="orange">Signup</ButtonNavLink>
          <ButtonNavLink to="/login" id={styles.loginButton} color="red">Login</ButtonNavLink>
        </div>   
      </nav>

      <div className={styles.welcome}>
        <h1>Welcome!! Sign up and Schedule An Appointment</h1>
      </div>
      <div className={styles.timeDisplay}>
        {condition1 ? <p className = {styles.closed}>We are closed</p>: <p className= {styles.open} >We are open from 9:30 a.m. to 8:30 p.m. </p>}
      </div>
   </div>
  );
}
