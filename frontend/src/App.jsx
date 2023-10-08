import "./App.css";
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
import CollectorDashboard from "./pages/CollectorDashboard";
import UserAuthorization from "./pages/auth/UserAuthorization";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route
          path="/users/:userId/dashboard"
          element={
            <UserAuthorization>
              <UserDashboad />
            </UserAuthorization>
          }
        />
        <Route
          path="/collector/:collectorId/dashboard"
          element={<CollectorDashboard />}
        />
        <Route path="/admins/:adminId/dashboard" element={<AdminDashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/file-new" element={<FileNewComplaint />} />
        <Route path="/complaints/:complaintId" element={<Complaint />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
