import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import type { Session } from "../types/Session";
import type { Speaker } from "../types/Speaker";
import { eventsDummy } from "../data/events";
import {cn} from "../lib/utils"
import DropDownMenu from "./DropDownMenu";
export const SessionForm = () => {
  const [formData, setFormData] = useState<Session>({
    name: "",
    timeSlot: {
      day: "",
      startDate: "",
      endDate: "",
    },
    speaker: {
      name: "",
      profile: "",
      bio: "",
    },
  });
  
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const navigate = useNavigate();
  const [selectedSpeaker , setSelectedSpeaker] = useState<Speaker | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSpeakerChange = (speaker : Speaker) =>{
    setSelectedSpeaker(speaker)
    setFormData((prev)=>({
        ...prev,
        speaker: {
            name : speaker.name , 
            profile : speaker.profile,
            bio: speaker.bio
        }
    }))
    console.log(formData)
  } 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement> ) =>{
    e.preventDefault()
    if(!formData.name || !formData.speaker.name){
      alert("please fill all the required data")
      return;
    }
    setTimeout(()=>{
      alert("Session created successfully!");
      navigate("/organizer/CreateEvent")
      
    },1500)
  };
  useEffect(() => {
    const fetchSpeakers = async () => {
      const allSessions = eventsDummy.flatMap((event) => event.sessions ?? []);
      const speakers = allSessions.map((session: Session) => session.speaker);
      setSpeakers(speakers);
    };
    fetchSpeakers();
  }, []);
  console.log(speakers)
  return (
    <>
      <div className="flex items-center  justify-center min-h-screen">
        <form
          action=""
          className="max-w-[350px] my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
          onSubmit = {handleSubmit}
        >
          {/* Title */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Session Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg font-bold focus:ring-orange-400 focus:border-orange-400"
              required
            />
          </div>
          <DropDownMenu
            options = {speakers}
            selected = {selectedSpeaker}
            onSelect = {handleSpeakerChange}
            placeholder="Select a speaker"
          />
          <div>
          <button
            type="submit"
            className={cn(
              "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
              "inline-flex items-center justify-center gap-2",
              "bg-orange-500 text-white hover:bg-orange-600",
              "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            )

            }
          >
            Create Session
          </button>
        </div>
        </form>
      </div>
    </>
  );
};
export default SessionForm;
