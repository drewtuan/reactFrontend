import styles from "./ScheduleForm.module.css"
import ButtonNavLink from "./ButtonNavLink"
import SubmitButton from "./SubmitButton"
import ScheduleAppointment from "../functions/ScheduleAppointment"
import { makeTextSafe } from "../functions/validateText"
import { validateEmail } from "../functions/validateEmail"
import { useState } from "react";

export default function ScheduleForm() {

  const[email, setEmail] = useState("");
  // variable to keep track of the email so it can be exported.
 

  const[clientName, setClientName] = useState("");
  const[petName, setPetName] = useState("");
  const[petBreed, setPetBreed] = useState("");
  const[petType, setPetType] = useState("Dog");
  const[date, setDate] = useState("");
  const[time, setTime] = useState("");

  //validate the emails for both login and signup data.
  const checkEmail = (e) => {
     if(validateEmail(e.target.value)) {
          setEmail(e.target.value);
      }
  }
  
  // validate the client's name.
  const checkClientName = (e) => {
    if(makeTextSafe(e.target.value)) {
      setClientName(e.target.value);
    }
  }

  // validate the pet's name
  const checkPetName = (e) => {
    if(makeTextSafe(e.target.value)) {
      setPetName(e.target.value);
    }
  }

  const checkPetBreed = (e) => {
    if(makeTextSafe(e.target.value)) {
      setPetBreed(e.target.value);
    }
  }
    
  // This function submits the data to the EC2 server and waits for a response that the data is validated and accepted.
  const handleSubmit = async(e) => {
    e.preventDefault();
    await ScheduleAppointment(email, petName,petBreed, petType, clientName, date, time);
    console.log(email, petName,petBreed, petType, clientName, date, time);

  }


  // This function is to validate the date that the user sends
  const validateDate = async(e) => {

       // current date
      const todaysDate = new Date();
      // current day.
      const currentDay = (todaysDate.getDate());
      // current month.  Add 1 to get the correct month
      const currentMonth = (todaysDate.getMonth() + 1) % 12;
      // current year.
       const currentYear = todaysDate.getFullYear();

      
      const dateValue = e.target.value;
      
      const selectedYear = parseInt(dateValue.split("-")[0]);
      const selectedMonth = parseInt(dateValue.split("-")[1]);
      const selectedDay = parseInt(dateValue.split("-")[2]);

      /*
      console.log(todaysDate);
      console.log(selectedYear, currentYear);
      console.log(selectedMonth, currentMonth);
      console.log(selectedDay, currentDay);
      */


      const condition1 = selectedMonth < currentMonth;
      const condition2 = selectedMonth == currentMonth && selectedDay < currentDay;
      const condition3 = selectedYear != currentYear;
      


      if(condition1 || condition2 || condition3) {
        alert("Please input a date that is today or after today's date. Your appointment must be this year.");
        setDate("");
      } else {
        setDate(dateValue);
      }
    
  }

  // This function will validate the time in which the user selects to make sure it is between the open and close hours.
  const validateTime = async(e) => {

    const date = new Date();
    
    
    const hourOpen = 9; // 9:30 a.m.
    const minuteOpen = 30;

    const hourClosed = 20; // 8:30 p.m.
    const minuteClosed = 30;

    const currentHour = date.getHours();
    const currentMinutes = date.getMinutes();
  

    const selectedTime = e.target.value;
    const selectedHour = parseInt(selectedTime.split(":")[0]);
    const selectedMinute = parseInt(selectedTime.split(":")[1]);


    const condition1 = (selectedHour < hourOpen);
    const condition2 = (selectedHour == hourOpen) && (selectedMinute <= minuteOpen);
    const condition3 = (selectedHour < currentHour);
    const condition4 = (selectedHour == currentHour) && (selectedMinute <= currentMinutes);
    const condition5 = (selectedHour > hourClosed);
    const condition6 = (selectedHour == hourClosed) && (selectedMinute >= minuteClosed);

    // correct the date and time validation by making sure the day, month, and year are valid before the time is entered.

  
    if(condition1 || condition2|| condition3 || condition4 || condition5 || condition6) {
      //alert("Your selected time is invalid.  Please make it after our open time and before our closed time");
      setTime("");
      //alert("Your selectedtime is invalid. Your time is either between 9:30 a.m. and 8:30 p.m., or your time is after our closed time.");
    } else {
      setTime(selectedTime);
    }
  

  }

  const clearFields = () => {
    console.log("clearFields executed");
    setPetName("");
    setClientName("");
    setEmail("");
    setPetBreed("");
    setPetType("");
    setDate("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.container}>
            <div className={styles.subcontainer2}> 
                <div className={styles.subcontainer3}>
                  <label>Caretaker Email:</label>
                  <input type="email" maxLength="30" value={email} onChange={checkEmail} required/>
                </div>
                <div className={styles.subcontainer3}>
                  <label>Caretaker Name:</label>
                  <input type="text" maxLength="30" value={clientName} onChange={checkClientName} required/>
                </div>
            </div>
            <div className={styles.subcontainer2}>
                  <div className={styles.subcontainer3}>
                    <label>Pet Name:</label>
                    <input type="text" maxLength="40" value={petName} onChange={checkPetName} required/>
                  </div>
                  <div className={styles.subcontainer3}>
                    <label>Pet Breed:</label>
                    <input type="text" maxLength="40" value={petBreed} onChange={checkPetBreed} required/>
                </div>
            </div>
            <div className={styles.subcontainer2}>
              <div className={styles.subcontainer3}>
                <label>Pet Type:</label>
                <div>
                  <select id={styles.selectionBox} value={petType} onChange={(e) => setPetType(e.target.value)} required>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Lizard">Lizard</option>
                    <option value="Snake">Snake</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className={styles.subcontainer3}>
                  <label>Appointment Date:</label>
                  <input id={styles.dateBox} type="date" value={date} onChange={validateDate} required/>
              </div>
            </div>
            <div className={styles.subcontainer3}>
                <label>Appointment Time (must be between 9:30 a.m. and 8:30 p.m.): </label>
                <input id={styles.timeBox} type="time" value={time} onChange={validateTime} required/>
            </div>

        </div>

      <div className={styles.buttonContainer}>
          <div className={styles.separate_area2}>
              <SubmitButton color="orange" text="Submit Schedule"/>
          </div>  
          <div className={styles.separate_area3}>
              <input type="button" value="Create New Schedule➕"  id={styles.new_appointment_button} onClick={clearFields}/>
          </div>   
          <div className={styles.separate_area4}>
            <ButtonNavLink to="/clientDashboard" id={styles.viewAppointmentsButton} color="#34d1c9">View Appointments➡ </ButtonNavLink>
          </div> 
      </div>

     
                   

    </form>
  )
}
