/* eslint-disable react/prop-types */
import styles from "./Alert.module.css"
import {createTime2} from "../functions/createTime2"
// eslint-disable-next-line react/prop-types
export default function Alert({data}) {

  // take the JSON data that has been received by the client dashboard from the Context Component and convert to a string.
  // trim all double quotes.
  const patient_name = JSON.stringify(data[0]["Patient"]["patientName"]).replace(/['"]/g, '');
  const patient_diagnoses = JSON.stringify(data[0]["Patient"]["diagnoses"]).replace(/['"]/g, '');

  const patient_medicine = JSON.stringify(data[0]["Patient"]["medication"]);
  const patient_date = JSON.stringify(data[0]["date"]).replace(/['"]/g, '');
  const patient_time = JSON.stringify(data[0]["time"]).replace(/['"]/g, '');

  const myString = createTime2(patient_time);
 
  return (
    <div className={styles.alertContainer}>
      <p id={styles.alertText}>Alert!</p>
      <p><span id={styles.patientName}>{patient_name}</span> has an appointment coming up!!</p>
      <p>Diagnoses: {patient_diagnoses}</p>
      <p>Medication: {patient_medicine}</p>
      <p>Bloodwork:</p>
      <p>Due date: {patient_date} at {myString}</p>
    </div>
  )
}
