
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SchedulingPage from "./pages/SchedulingPage";
import ClientDashboard from "./pages/ClientDashboard"
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/scheduling" element={<SchedulingPage/>}/>
          <Route path="/clientDashboard" element={<ClientDashboard/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
