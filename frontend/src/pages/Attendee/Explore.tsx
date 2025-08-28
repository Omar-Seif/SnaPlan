import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import axios from "axios"
import type { Event } from "../../types/Event"
import EventsCard from "../../components/EventsCard"
import { Heading1 } from "lucide-react"

const ExploreAttendee = () => {
  const [exploreEvents, setExploreEvents] = useState<Event[]>([])

  useEffect(() => {
    axios
      .get("https://192.168.201.124:5001/api/Events/explore")
      .then((res) => setExploreEvents(res.data))
      .catch((err) => console.error("Failed to fetch api values", err))
  }, []) // ✅ added dependency array

  return (
    <>
      <Navbar />
      {
      exploreEvents.length===0 ? (<h1 className="text-center text-5xl">Oh ooh! no events have yet to be added</h1>):
      exploreEvents.map((event) => (
        <div key={event.id}>
          <EventsCard event = { event}/>
        </div>
      ))}
    </>
  )
}

export default ExploreAttendee
