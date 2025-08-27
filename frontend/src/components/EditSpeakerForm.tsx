import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eventsDummy } from "../data/events";
import type { Speaker } from "../types/Speaker";
import { Upload, ALargeSmall } from "lucide-react";
import { cn } from "../lib/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const SpeakerForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [currentSpeaker, setCurrentSpeaker] = useState<Speaker>({
    name: "",
    profile: "",
    bio: "",
  });
  const mySwal = withReactContent(Swal)
  const [image, setImage] = useState<string>("");
  useEffect(() => {
    const fetchCurrentSpeaker = async () => {
      
      const sessions = eventsDummy.flatMap((event) => event.sessions);
      const speakers = sessions
        .map((session) => session?.speaker)
        .filter((speaker): speaker is Speaker => !!speaker);
      console.log(speakers);
      const speaker = speakers.find((speaker) => speaker.id === Number(id));
      console.log(speaker);
      if (speaker) {
        setCurrentSpeaker({
          name: speaker.name,
          profile: speaker.profile,
          bio: speaker.bio,
        });
        setImage(speaker.profile);
      }
    };
    fetchCurrentSpeaker();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentSpeaker((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image || !currentSpeaker.name || !currentSpeaker.bio) {
      mySwal.fire({
        title: "All fields are required!",
        text: "Please enter data in all the given fields!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonText: "Continue entering data...",
      });
      return;
    }
    setTimeout(() => {
      mySwal
        .fire({
          title: "Speaker created!",
          text: "Speaker created and added successfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Continue",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/organizer/Speakers");
          }
        });
    }, 1500);
  };

  console.log(currentSpeaker);
  return (
    <>
      <div className="flex items-center md:ml-48 justify-center min-h-screen">
        <form
          action=""
          onSubmit={handleSubmit}
          className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
        >
          {/*Upload profile picture for speaker here */}
          {/* Upload profile picture for speaker here */}
          <div className="w-full h-64 rounded-lg overflow-hidden mb-6 flex  items-center justify-center">
            {image ? (
              <>
                <img
                  src={image}
                  alt="Speaker Profile picture"
                  className="w-full h-full object-contain"
                />
                <label className=" p-4 flex flex-col items-center justify-center cursor-pointer text-black hover:underline">
                  Change picture
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
                <Upload size={32} />
                <span className="mt-2 text-sm">
                  Click to upload speaker profile picture
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* speaker name */}
          <div>
            <div className="flex items-center gap-2">
              <ALargeSmall size={18} />
              <input
                type="text"
                name="name"
                placeholder="Speaker name"
                value={currentSpeaker.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>
          </div>
          {/* currentSpeaker bio */}
          <div>
            <textarea
              placeholder="Speaker Biography"
              name="bio"
              value={currentSpeaker.bio}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>
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
              Submit changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SpeakerForm;
