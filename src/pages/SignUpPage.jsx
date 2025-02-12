import Form from "../components/Form"
import styles from "./SignUpPage.module.css"

// Signup page component that includes a header and a Form Component
export default function SignUpPage() {

   /*<Form backButtonPath="/" forwardButtonPath="/login"/>*/

  return(
    
    <div className={styles.signupcontainer}>
      <div id={styles.header}><h1>Sign Up</h1></div>
      <Form backButtonPath="/"/>
    </div>

  )
   
}
