import ScheduleForm from "../components/ScheduleForm"
import styles from "./SchedulingPage.module.css"

export default function SchedulingPage() {
  return (
    <div className={styles.schedulingcontainer}>
        <div className={styles.header}><h1>Schedule An Appointment Now</h1></div>
        <ScheduleForm />
    </div>
  )
}
