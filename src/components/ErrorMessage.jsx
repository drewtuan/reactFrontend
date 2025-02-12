import styles from "./ErrorMessage.module.css"

export default function ErrorMessage() {
  return (
    <p className={styles.errorMessage}>Oops. Data did not load. Something went wrong... </p>
  )
}
