
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SchedulingPage from "./pages/SchedulingPage";
import ClientDashboard from "./pages/ClientDashboard"
import PageNotFound from "./pages/PageNotFound";

const doesCookieExist = (name)=> {
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // trims the whitespace in the array of characters
    
    // picks which substring starts with the token name plus the equal sign
    if (cookie.startsWith(name)) { 
      return true; // returns the token not counting "name="
    }
  }
  return false;
}

// This component prevents users from accessing the scheduling page by typing in the URL.
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
  return doesCookieExist("token") ? children : <Navigate to="/login" />;
}


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/scheduling" element={<PrivateRoute><SchedulingPage/></PrivateRoute>}/>
          <Route path="/clientDashboard" element={<ClientDashboard/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
