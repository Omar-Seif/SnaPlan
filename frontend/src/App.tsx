import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginOrganizer from "./pages/Organizer/Login";
import RegisterOrganizer from "./pages/Organizer/Register";
import MyEventsOrganizer from "./pages/Organizer/MyEvents";
import HomeOrganizer from "./pages/Organizer/Home";
import CreateEventOrganizer from "./pages/Organizer/CreateEvent";
import ExploreOrganizer from "./pages/Organizer/Explore";
import AccountOrganizer from "./pages/Organizer/Account";
import EventDetailsOrganizer from "./pages/Organizer/EventDetails";
import AdminHome from "./pages/Admin/AdminHome";
import AdminEvents from "./pages/Admin/Events";
import Organizers from "./pages/Admin/Organizers";
import Settings from "./pages/Admin/Settings";
import Login from "./pages/Admin/Login";

// https://192.168.201.124:7096/api/Auth/login

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Organizer */}

          <Route path="/organizer/login" element={<LoginOrganizer />} />
          <Route path="/organizer/register" element={<RegisterOrganizer />} />
          <Route path="/organizer/home" element={<HomeOrganizer />} />
          <Route path="/organizer/myEvents" element={<MyEventsOrganizer />} />
          <Route
            path="/organizer/createEvent"
            element={<CreateEventOrganizer />}
          />
          <Route path="/organizer/explore" element={<ExploreOrganizer />} />
          <Route path="/organizer/account" element={<AccountOrganizer />} />
          <Route
            path="/organizer/eventDetails/:id"
            element={<EventDetailsOrganizer />}
          />

          {/* Admin */}
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/organizers" element={<Organizers />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
