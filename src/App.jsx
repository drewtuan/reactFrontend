import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SchedulingPage from "./pages/SchedulingPage";
import ClientDashboard from "./pages/ClientDashboard";
import AlertPage from "./pages/AlertPage";
import PageNotFound from "./pages/PageNotFound";
import { Provider } from "./Context";

// This function looks for the name of the cookie to see if it exists.
// If it does not find a cookie with a certain name, it returns false.  If it does find a name, it returns true.
const doesCookieExist = (name) => {
  const cookies = document.cookie.split(";"); // This is an array of cookies with tokens.
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // trims the whitespace in the array of characters

    // picks which substring starts with the token name plus the equal sign
    if (cookie.startsWith(name)) {
      return true; // returns the token not counting "name="
    }
  }
  return false;
};

// This component prevents users from accessing the scheduling page by typing in the URL.
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  return doesCookieExist("token") ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/scheduling"
              element={
                <PrivateRoute>
                  <SchedulingPage />
                </PrivateRoute>
              }
            />
            <Route path="/clientDashboard" element={<ClientDashboard />} />
            <Route path="/alerts" element={<AlertPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
