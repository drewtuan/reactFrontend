import {NavLink} from "react-router-dom"
import { useLocation } from "react-router-dom";
import styles from "./LoginNavLink.module.css"

export default function LoginNavLink() {
  // returns an object with the pathname
  const pageLocation = useLocation();

  // condition for the login navigation link to show up on form
  const condition = pageLocation.pathname == "/signup";
  return (
    <div id={styles.bottomArea}>
    {condition && <p>Already have an account? Click here to <NavLink to="/login" id="navlink">Login</NavLink></p> }
  </div>
  )
}
