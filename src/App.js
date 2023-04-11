import "./App.css";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import LandingPage from "./pages/landing-page/LandingPage";
import Login from "./pages/login/Login";
import SignUpEndUser from "./pages/sign-up-end-user/SignUpEndUser";
import ContactUs from "./pages/contact-us/ContactUs";
import RegisterPhotoStudio from "./pages/register-photo-studio/RegisterPhotoStudio";
import ClientDashboard from "./pages/dashboard/client-dashboard/ClientDashboard";
import StudioDashboard from "./pages/dashboard/studio-dashboard/StudioDashboard";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import BookingFlow from "./pages/booking-flow/BookingFlow";

import LoginVerificationConfirmation from "./pages/login/LoginVerificationConfirmation";
import RegisterPhotoStudioConfirmation from "./pages/register-photo-studio/RegisterPhotoStudioConfirmation";

const theme = createTheme({
  palette: {
    primary: {
      light: "#CFBCFF",
      main: "#6750a4",
      dark: "#625B71",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#49454F",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              !user || !user.isUserVerified ? (
                <LandingPage />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={
              !user ? (
                <Login />
              ) : user.isUserVerified ? (
                <Navigate to="/dashboard" />
              ) : (
                (user.role === "Client" && (
                  <Navigate to="/login-verification" />
                )) ||
                (user.role === "PhotoStudio" && (
                  <Navigate to="/register-studio-confirmation" />
                ))
              )
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              !user ? (
                <SignUpEndUser />
              ) : user.isUserVerified ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login-verification" />
              )
            }
          ></Route>
          <Route exact path="/contact-us" element={<ContactUs />}></Route>
          <Route
            exact
            path="/dashboard"
            element={
              user ? (
                (user.role === "Client" && <ClientDashboard />) ||
                (user.role === "PhotoStudio" && <StudioDashboard />)
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            exact
            path="/register-photo-studio"
            element={
              !user ? (
                <RegisterPhotoStudio />
              ) : user.isUserVerified ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/register-studio-confirmation" />
              )
            }
          ></Route>
          <Route
            exact
            path="/booking-flow"
            element={user ? <BookingFlow /> : <Navigate to="/login" />}
          ></Route>
          <Route
            exact
            path="/client-dashboard"
            element={<ClientDashboard />}
          ></Route>
          <Route
            exact
            path="/studio-dashboard"
            element={<StudioDashboard />}
          ></Route>
          <Route
            exact
            path="/register-studio-confirmation"
            element={<RegisterPhotoStudioConfirmation />}
          ></Route>
          <Route
            exact
            path="/login-verification"
            element={<LoginVerificationConfirmation />}
          ></Route>
          <Route
            exact
            path="/admin-dashboard"
            element={<AdminDashboard />}
          ></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
