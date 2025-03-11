/* eslint-disable react/prop-types */
import { useLocation, Navigate } from "react-router-dom";


export default function LoginAttemptsCounter({count}) {

   // returns an object with the pathname
   const pageLocation = useLocation();

   // condition for the login navigation link to show up on form
   const condition = pageLocation.pathname == "/login";
   const condition2 = count > 3;
   

  return (
    <div>
      {condition && <p >No. of login attempts: <span style={{color:"#10aee3"}}>{count}</span></p>}
      {condition2 && <Navigate to="/" />}

    </div>
  )
}
