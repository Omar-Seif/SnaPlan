import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginOrganizer from './pages/Organizer/Login'
import RegisterOrganizer from './pages/Organizer/Register'
import MyEventsOrganizer from './pages/Organizer/MyEvents'
import HomeOrganizer from './pages/Organizer/Home'
import CreateEventOrganizer from './pages/Organizer/CreateEvent'
import ExploreOrganizer from './pages/Organizer/Explore'
import AccountOrganizer from './pages/Organizer/Account'
import EventDetailsOrganizer from './pages/Organizer/EventDetails'
import HomeAdmin from './pages/Admin/Home'


function App() {


  return (
    <>
      <BrowserRouter>
        
        <Routes>

          {/* Organizer */}


          <Route path='/organizer/login' element={<LoginOrganizer />} />
          <Route path='/organizer/register' element={<RegisterOrganizer />} />
          <Route path='/organizer/home' element={<HomeOrganizer />} />
          <Route path='/organizer/myEvents' element={<MyEventsOrganizer />} />
          <Route path='/organizer/createEvent' element={<CreateEventOrganizer />} />
          <Route path='/organizer/explore' element={<ExploreOrganizer />} />
          <Route path='/organizer/account' element={<AccountOrganizer />} />
          <Route path='/organizer/eventDetails/:id' element={<EventDetailsOrganizer />} />
          <Route path='/organizer/admin' element={<HomeAdmin />} /> {/* Will likely not be used */}
          

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
