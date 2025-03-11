import { useState } from "react";
import styles from "./SearchAndDownloadPDF.module.css";
import {makeTextSafe} from "../functions/validateText";

export default function SearchAndDownloadPDF() {

  const [data, setData] = useState("Enter pet name");
  const [inputFocused, setInputFocused] = useState(false);
  const placeholder = "Enter Pet Name";

  // This function is to assign the data variable with the user's input using the setData() method
  const handleInputChange = (event) => {
      if(makeTextSafe(event.target.value)) {
        setData(event.target.value);
      }

  };

  // this function shows if the user has focused (click on) the input field.
  // if the input is initally not focused, the inputFocused variable is set to true, and data variable is set to an empty string
  const handleFocus = () => {
    if(!inputFocused) {
      setInputFocused(true);
      setData("");
    }
  };
  
  // If the input field contains the default input "Enter pet name", when that means that the input field
  // is not focused (clicked on).
  const handleBlur = () => {
    if (data == placeholder) {
      setInputFocused(false);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.subcontainer1}>
        <input type="text" value={data}   onFocus={handleFocus}
        onBlur={handleBlur} placeholder={!inputFocused ? placeholder : ''} onChange={handleInputChange} />
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.subcontainer2}>
        <button className={styles.pdfButton}>Download PDF</button>
      </div>
    </div>
  )
}
