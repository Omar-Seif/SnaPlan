import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Speaker } from "../types/Speaker";
import { eventsDummy } from "../data/events";
import type { Session } from "../types/Session";
import { Link } from "react-router-dom";
import { Edit, Trash, UserRoundPlus } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ViewSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSpeakers = async () => {
      const allSessions = eventsDummy.flatMap((event) => event.sessions ?? []);
      const allSpeakers = allSessions.map(
        (session: Session) => session.speaker
      );
      // Filter unique speakers by name
      const uniqueSpeakers = allSpeakers.filter(
        (speaker, index, self) =>
          speaker &&
          speaker.name &&
          index === self.findIndex((s) => s && s.name === speaker.name)
      );
      setSpeakers(uniqueSpeakers);
    };
    fetchSpeakers();
  }, []);
  const handleonEditClick = (id: number | string) => {
    navigate(`/organizer/EditSpeaker/${id}`);
  };
  const handleonDeleteClick = (id:number | string)=>{
     MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes , delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSpeakers(
          speakers.filter((speaker) => speaker.id !== id)
        )

        MySwal.fire("Deleted!", "Your event has been deleted.", "success");
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br md:ml-48 flex flex-col items-center py-12">
      <h1 className="text-3xl font-extrabold text-orange-700 mb-10 drop-shadow-lg">
        {" "}
        Event Speakers
      </h1>
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-6xl">
        <Link
          to="/organizer/CreateSpeaker"
          className="block w-80 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-orange-200 border border-orange-200 hover:cursor-pointer"
        >
          <UserRoundPlus size={62} />
          Add New Speaker
        </Link>
        {speakers.map((speaker, idx) => (
          <div
            key={speaker.name + idx}
            className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center w-80 transition-transform hover:scale-105 hover:shadow-orange-200 border border-orange-200 hover:cursor-pointer"
          >
            <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-orange-400 shadow-lg bg-gray-100 flex items-center justify-center">
              {speaker.profile ? (
                <img
                  src={speaker.profile}
                  alt={speaker.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-5xl text-orange-300">👤</span>
              )}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-orange-600 mb-2 drop-shadow-sm">
                {speaker.name}
              </h2>
              <p className="text-gray-700 text-base font-medium mb-2 whitespace-pre-line">
                {speaker.bio}
              </p>
            </div>
            <div className="flex gap-2 ">
              <button>
                <Edit
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleonEditClick(speaker.id ?? 0)}
                />
              </button>
              <button>
                <Trash className="text-red-600" onClick={()=>handleonDeleteClick(speaker.id ?? 0)} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewSpeakers;
