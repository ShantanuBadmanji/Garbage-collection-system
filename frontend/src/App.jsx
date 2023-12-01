// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import UserDashboad from "./pages/UserDashboad";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/auth/Login";
import Complaints from "./pages/Complaints";
import Complaint from "./pages/Complaint";
import FileNewComplaint from "./pages/FileNewComplaint";

import UserAuthorization from "./pages/auth/UserAuthorization";
import GoogleLoginSuccess from "./pages/auth/GoogleLoginSuccess";
import EmployeeDashboard from "./pages/EmployeeDashboad";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route
          path="/users/dashboard"
          element={
            <UserAuthorization>
              <UserDashboad />
            </UserAuthorization>
          }
        />
        <Route path="/employees/dashboard" element={<EmployeeDashboard />} />
        <Route path="/admins/dashboard" element={<AdminDashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/success" element={<GoogleLoginSuccess />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/file-new" element={<FileNewComplaint />} />
        <Route path="/complaints/:complaintId" element={<Complaint />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
