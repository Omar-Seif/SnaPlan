import { useState, useEffect } from "react";
import type { Session } from "../types/Session";
import type { Speaker } from "../types/Speaker";
import { cn } from "../lib/utils";
import DropDownMenu from "./DropDownMenu";
import axios from "axios";

interface Props {
  handleCreateSession: (newSession: Session) => void;
}

export const SessionForm = ({ handleCreateSession }: Props) => {
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
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Handle input changes (for text inputs)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle selecting a speaker
  const handleSpeakerChange = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setFormData((prev) => ({
      ...prev,
      speaker: {
        name: speaker.name,
        profile: speaker.profile,
        bio: speaker.bio,
      },
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!formData.name || !formData.speaker.name) {
      alert("Please fill all the required fields");
      return false;
    }

    handleCreateSession(formData);
    setFormData({
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
    alert("Session created successfully!");
    return false;
  };

  // Fetch speakers from API
  useEffect(() => {
    axios
      .get("https://192.168.201.124:5001/api/Speakers")
      .then((res) => setSpeakers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="max-w-[350px] my-10 mx-5 px-4 pb-8 pt-4 border border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Session Title */}
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

        {/* Speaker Dropdown */}
        <DropDownMenu
          options={speakers}
          selected={selectedSpeaker}
          onSelect={handleSpeakerChange}
          placeholder="Select a speaker"
        />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={cn(
              "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
              "inline-flex items-center justify-center gap-2",
              "bg-orange-500 text-white hover:bg-orange-600",
              "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
            )}
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;