import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateEventOrganizer from './pages/Organizer/CreateEvent'
import RegisterAttendee from './pages/Attendee/Register'
import LoginAttendee from './pages/Attendee/Login'
import ExploreAttendee from './pages/Attendee/Explore'
import BookedAttendee from './pages/Attendee/BookedEvents'
import AccountAttendee from './pages/Attendee/Account'
import EventDetailsAttendee from './pages/Attendee/EventDetails'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Attendee */}


          <Route path='/attendee/login' element={<LoginAttendee />} />
          <Route path='/attendee/register' element={<RegisterAttendee />} />
          <Route path='/attendee/Explore' element={<ExploreAttendee />} />
          <Route path='/attendee/BookedEvents' element={<BookedAttendee />} />
          <Route path='/attendee/Account' element={<AccountAttendee />} />
          <Route path='/attendee/EventDetails/:id' element={<EventDetailsAttendee />} />


          {/* Organizer */}

          <Route path='/organizer/CreateEvent' element={<CreateEventOrganizer />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
