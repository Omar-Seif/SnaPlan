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

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Organizer */}


          <Route path='/organizer/login' element={<LoginOrganizer />} />
          <Route path='/organizer/register' element={<RegisterOrganizer />} />
          <Route path='/organizer/Home' element={<HomeOrganizer />} />
          <Route path='/organizer/MyEvents' element={<MyEventsOrganizer />} />
          <Route path='/organizer/CreateEvent' element={<CreateEventOrganizer />} />
          <Route path='/organizer/Explore' element={<ExploreOrganizer />} />
          <Route path='/organizer/Account' element={<AccountOrganizer />} />
          <Route path='/organizer/EventDetails' element={<EventDetailsOrganizer />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
