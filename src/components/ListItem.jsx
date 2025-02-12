/* eslint-disable react/prop-types */
import styles from "./ListItem.module.css"

export default function ListItem({key, item}) {

  var hour = parseInt(item.time.split(":")[0]);
  var minutes= parseInt(item.time.split(":")[1]);

  console.log(minutes);

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
    <li key={key} className={styles.listItem}>
      <div id={styles.button_container}>
        <button>❌</button>
      </div>
      <div id={styles.information}>
        <p><span className={styles.clientName}>Client Name:</span> {item.clientName} </p>
        <p><span className={styles.petName}>Pet Name:</span> {item.patientName} </p>
        <p><span className={styles.time}>Time:</span> {hour}:{minuteString} {timeOfDayString}</p>
        <p><span className={styles.date}> Date: </span>{formattedDate}</p>
      </div>
     
    </li>
  )
}
