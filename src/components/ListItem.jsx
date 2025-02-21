/* eslint-disable react/prop-types */
import styles from "./ListItem.module.css"

export default function ListItem({index,item}) {

  var hour = parseInt(item.time.split(":")[0]);
  var minutes= parseInt(item.time.split(":")[1]);


  var timeOfDayString = "";
  if(hour < 12) {
    timeOfDayString = "AM";
  } if(hour > 12) {
    hour = hour % 12;
    timeOfDayString = "PM";
  } if(hour == 12) {
    timeOfDayString = "PM";
  }

  var minuteString = "";
  if (minutes < 10) {
    minuteString = "0" + minutes;
  } else {
    minuteString = minuteString + minutes;
  }

 

  const formattedDate = item.date.split("T")[0];
  
  return (
    <li className={styles.listItem}>
      <div id={styles.button_container}>
        <p id={styles.appointmentNumber}>#{index + 1}</p>
      </div>
      <div id={styles.information}>
        <p><span className={styles.clientName}>Email:</span> {item.Patient.Client["email"]} </p>
        <p><span className={styles.petName}>Pet Name:</span> {item.patientName} </p>
        <p><span className={styles.petType}>Pet Type:</span> {item.Patient.patientType} </p>
        <p><span className={styles.time}>Time:</span> {hour}:{minuteString} {timeOfDayString}</p>
        <p><span className={styles.date}> Date: </span>{formattedDate}</p>
      </div>
      <div>
        <button id={styles.cancelbutton}>Cancel ❌ </button>
      </div>
     
    </li>
  )
}
