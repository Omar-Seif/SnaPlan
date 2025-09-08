import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../src/Auth/Authentication"; // adjust path
import ProtectedRoute from "../src/Auth/ProtectedRoutes"; // adjust path
//General
import UnauthorizedPage from "./pages/General/Unauthorized";
// Organizer
import CreateEventOrganizer from "./pages/Organizer/CreateEvent";
import Home from "./pages/Organizer/Home";
import DraftEvents from "./pages/Organizer/DraftEvents";
import SubmittedEvents from "./pages/Organizer/SubmittedEvents";
import Venues from "./pages/Organizer/Venues";
import Speakers from "./pages/Organizer/Speakers";
import CreateVenueOrganizer from "./pages/Organizer/CreateVenue";
import CreateSpeekerOrganizer from "./pages/Organizer/CreateSpeeker";
import LoginOrganizer from "./pages/Organizer/Login";
import SessionsPage from "./pages/Organizer/SessionManagementPage";
import { CreateSessionOrganizer } from "./pages/Organizer/CreateSession";
import EditEvents from "./pages/Organizer/EditEvents";
import { EditSpeaker } from "./pages/Organizer/EditSpeakers";
import { ViewEventDetails } from "./pages/Organizer/ViewEventDetails";
import { EditVenues } from "./pages/Organizer/EditVenues";

// Attendee
import RegisterAttendee from "./pages/Attendee/Register";
import ExploreAttendee from "./pages/Attendee/Explore";
import BookedAttendee from "./pages/Attendee/BookedEvents";
import AccountAttendee from "./pages/Attendee/Account";
import EventDetailsAttendee from "./pages/Attendee/EventDetails";

// Admin
import AdminHome from "./pages/Admin/AdminHome";
import AdminEvents from "./pages/Admin/Events";
import Organizers from "./pages/Admin/Organizers";
import Settings from "./pages/Admin/Settings";
import Login from "./pages/Admin/Login";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
  
        <Routes>
          {/* Unauthorized */}
          <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
          {/* Attendee */}
          <Route path="/attendee/register" element={<RegisterAttendee />} />
          <Route
            path="/attendee/Explore"
            element={

                <ExploreAttendee />
    
            }
          />
          <Route
            path="/attendee/BookedEvents"
            element={
              <ProtectedRoute requiredRole="Attendee">
                <BookedAttendee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendee/Account"
            element={
              <ProtectedRoute requiredRole="Attendee">
                <AccountAttendee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendee/EventDetails/:id"
            element={
              <ProtectedRoute requiredRole="Attendee">
                <EventDetailsAttendee />
              </ProtectedRoute>
            }
          />

          {/* Organizer */}
          <Route path="/organizer/login" element={<LoginOrganizer />} />
          <Route
            path="/organizer/CreateEvent"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <CreateEventOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/Home"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/DraftEvents"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <DraftEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/SubmittedEvents"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <SubmittedEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/Venues"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <Venues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/Speakers"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <Speakers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/CreateVenue"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <CreateVenueOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/CreateSpeaker"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <CreateSpeekerOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/CreateSession"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <CreateSessionOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/EditEvent/:id"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <EditEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/EditSpeaker/:id"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <EditSpeaker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/EditVenue/:id"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <EditVenues />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/ViewEventDetails/:id"
            element={
              <ProtectedRoute requiredRole="Organizer">
                <ViewEventDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route path="/admin/Login" element={<Login />} />
          <Route
            path="/admin/home"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/organizers"
            element={
              <ProtectedRoute requiredRole="Admin">
                <Organizers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredRole="Admin">
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
