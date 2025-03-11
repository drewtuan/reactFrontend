/* eslint-disable react/prop-types */
import { useLocation,useNavigate } from "react-router-dom";


export default function LoginAttemptsCounter({count}) {

   // returns an object with the pathname
   const pageLocation = useLocation();
   const navigator = useNavigate();

   // condition for the login navigation link to show up on form
   const condition = pageLocation.pathname == "/login";
   const condition2 = count > 3;



  const navigate = async() => {
    navigator("/");
  }

  if(condition2) {
    navigate();
  }
   

  return (
    <div>
      {condition && <p >No. of login attempts: <span style={{color:"#10aee3"}}>{count}</span></p>}

    </div>
  )
}
