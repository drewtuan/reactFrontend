import axios from "axios";
//import { loginKey } from "./LoginOwner";
//import { getCookie } from "../functions/GetCookie";

// This function returns the token stored in the cookie
// if async does not work, get rid of it.

// some borrowed code for getting cookie tokens.
function getCookie(name) {
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




// this variable stores the token.
const token = getCookie("token");

// This function sends the appointment data to an api for validation by the node.js backend. 
// This data is converted to json before being sent.
// Additional error handling by the frontend is implemented if the server responds with an error.
const ScheduleAppointment= async (email, Pname, Pbreed, Ptype, Cname, date, time) => {

  
    try {

      const apiUrl = 'https://api.vpbackendapi.com:5000/api/schedule';

      const response = await axios.post(
        apiUrl,
        { email: email, patientName: Pname, patientBreed: Pbreed, patientType: Ptype, clientName: Cname, date: date, time: time }, // Request body
        {
          headers: {
            'Authorization': 'Bearer ' + token
          },
        }
      );
  
      if (response.status === 201) {
        console.log('Schedule successful:', response.data);
        alert('User scheduled appointment successfully!');
      

        return response.data; // You can return the response for further use
      }
   
    } catch (error) {
      if (!email || !Pname || !Pbreed || !Ptype || !Cname || !date || !time) {
        // Server responded with an error status
        console.error('Scheduling failed:', error.response.data);
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

export default ScheduleAppointment