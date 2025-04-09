import { useState } from "react";
import styles from "./SearchAndDownloadPDF.module.css";
import {makeTextSafe} from "../functions/validateText";

export default function SearchAndDownloadPDF() {

  const [petName, setPetName] = useState("Enter pet name");
  const [inputFocused, setInputFocused] = useState(false);
  const placeholder = "Enter Pet Name";

  // This function is to assign the data variable with the user's input using the setData() method
  const handleInputChange = (event) => {
      if(makeTextSafe(event.target.value)) {
        setPetName(event.target.value);
      }

  };

  // this function shows if the user has focused (click on) the input field.
  // if the input is initally not focused, the inputFocused variable is set to true, and data variable is set to an empty string
  const handleFocus = () => {
    if(!inputFocused) {
      setInputFocused(true);
      setPetName("");
    }
  };
  
  // If the input field contains the default input "Enter pet name", when that means that the input field
  // is not focused (clicked on).
  const handleBlur = () => {
    if (petName == placeholder) {
      setInputFocused(false);
    }
  };

  
  const getCookieToken = (name) => {
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // sticks each character in the cookie string into an array, whitespace included 
      
      // picks which substring starts with the token name plus the equal sign
      if (cookie.startsWith(name + '=')) { 
        return cookie.substring(name.length + 1); // returns the token not counting "name="
      }
    }
    return null;
  }
    



const searchPetName = async() => {

  const token = getCookieToken("token");
  const data = {patientName: petName};
  const url = "https://api.vpbackendapi.com:5000/api/patient-pdf";

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        patientName: data.patientName,  
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  

    
  
 
}


  return (
    <div className={styles.container}>
      <div className={styles.subcontainer1}>
        <input type="text" value={petName}   onFocus={handleFocus}
        onBlur={handleBlur} placeholder={!inputFocused ? placeholder : ''} onChange={handleInputChange} />
        <button className={styles.searchButton} onClick={searchPetName}>Search</button>
      </div>
      <div className={styles.subcontainer2}>
        <button className={styles.pdfButton}>Download PDF</button>
      </div>
    </div>
  )
}
