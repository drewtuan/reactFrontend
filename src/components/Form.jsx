import styles from "./Form.module.css"
import ButtonNavLink from "./ButtonNavLink";
import SubmitButton from "./SubmitButton";
import LoginNavLink from "./LoginNavLink";
import axios from "axios";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import { hashPassword } from "../functions/hashPassword";


// This is the form component that is reusable by other web page components in this web application
// eslint-disable-next-line no-unused-vars, react/prop-types
export default function Form({backButtonPath}) {

  // useState hook in practice.  youremail and yourpassword are variables, 
  // and setYourEmail and setYourPassword are functions.  The useState for each of them is blank in the input fields.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  // button colors
  const backButtonColor = "red";
  //const nextButtonColor = "green";
  const submitButtonColor = "orange";

  // page location
  const pageLocation = useLocation();

  // conditions for the navigation links that will allow the user to go from one page to another based on the location
  // of the page in this web application's file directory
  const condition =  pageLocation.pathname == "/signup";
  //const condition2 =  pageLocation.pathname == "/login";



// navigator
const navigator = useNavigate();

// This function allows the pet owner to register/signup for an appointment.
// The sign-up data is sent to a backend api. Frontend error handling is used for when the server responds with an error
const RegisterOwner = async (email, password) => {



    try {

      //const apiUrl = 'https://54.158.247.54:5000/clientAuth/register';
      const apiUrl2 = 'https://api.vpbackendapi.com:5000/clientAuth/register';

      const response = await axios.post(
        apiUrl2,
        { email, password }, // Request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        navigator("/login");
        console.log('Registration successful:', response.data);
        alert('User registered successfully!');
      }
   
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        console.error('Registration failed:', error.response.data);
        alert(error.response.data.error || 'Registration failed.');
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
        alert('Error: No response from the server.');
      } else {
        // Other errors
        console.error('Error setting up request:', error.message);
        alert(error.message);
      }
    }
}
 


  // function that handles the submission of the user's account data (email and password) when logging in
  const LoginOwner = async(email, password) => {
    try {

      //const apiUrl = 'https://54.158.247.54:5000/clientAuth/register';
      const apiUrl3 = 'https://api.vpbackendapi.com:5000/clientAuth/login';

      const response = await axios.post(
        apiUrl3,
        { email, password }, // Request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 201) {
        navigator("/scheduling");
        console.log('Login successful:', response.data);
        alert('User logged in successfully!');
      }
   
    } catch (error) {
      if (error.response) {
        // Server responded with an error status
        console.error('Login failed:', error.response.data);
        alert(error.response.data.error || 'Login failed.');
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
        alert('Error: No response from the server.');
      } else {
        // Other errors
        console.error('Error setting up request:', error.message);
        alert(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RegisterOwner(email, password);
  };
  
  
  const handleSubmit2 = async(e) => {
    e.preventDefault();
    await LoginOwner(email, password);
  }

  const pressEnterDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  /*
  {condition2 && isLoggedIn && <ButtonNavLink to={forwardButtonPath} id={styles.goToLoginPageButton} color={nextButtonColor}>Next ➡ </ButtonNavLink>}
  */
  
  

  return (
    <form onSubmit={condition ? handleSubmit : handleSubmit2} >
        <div className={styles.myform_container}>
          <div className={styles.container2}>
            <div className={styles.container_component}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={pressEnterDown} required/>
            </div>
            <div className={styles.container_component}>
              <label>Password:</label>
              <input type="password" value={password} maxLength="12" onChange={(e) => setPassword(e.target.value)} onKeyDown={pressEnterDown} required/>
            </div>
          </div>

          <div className={styles.formButtons}>
            <ButtonNavLink to={backButtonPath} id={styles.goBackToHomePageButton} color={backButtonColor}>⬅ Back</ButtonNavLink>
            <SubmitButton text="submit" id={styles.submitButton} color={submitButtonColor} />
          </div>
        
        </div>

       
        
        <LoginNavLink/>

 
    </form>
  );
}
