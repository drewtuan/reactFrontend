import styles from "./SubmitButton.module.css"



// This is a submit button component.
/* eslint-disable react/prop-types */
export default function SubmitButton({color, text}) {

  return (
    <input type="submit" id={styles.submitButton} style={{backgroundColor: color}} value={text.toString()} />
  )
}
