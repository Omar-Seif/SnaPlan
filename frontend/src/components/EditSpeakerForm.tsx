import { useState, useEffect } from "react";
import type { Speaker } from "../types/Speaker";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, ALargeSmall } from "lucide-react";
import { cn } from "../lib/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const EditSpeakerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const mySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profile: null as File | null,
  });

  const [preview, setPreview] = useState<string>("");

  // Fetch existing speaker data
  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://192.168.201.124:5001/api/Speakers/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          bio: res.data.bio || "",
          profile: null, // reset to null because the backend expects a File for updates
        });
        if (res.data.profile) {
          setPreview(res.data.profile); // show current image
        }
      })
      .catch((err) => console.error("Error fetching speaker:", err));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        profile: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.bio) {
      mySwal.fire({
        title: "All fields are required!",
        text: "Please enter data in all the given fields!",
        icon: "warning",
        confirmButtonText: "Continue entering data...",
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);

      // Only append if user uploaded a new image
      if (formData.profile instanceof File) {
        data.append("profile", formData.profile);
      }

      await axios.put(
        `https://192.168.201.124:5001/api/Speakers/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      mySwal
        .fire({
          title: "Speaker updated!",
          text: "Speaker updated successfully!",
          icon: "success",
          confirmButtonText: "Continue",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/organizer/Speakers");
          }
        });
    } catch (error) {
      console.error("Error updating speaker:", error);
      mySwal.fire({
        title: "Error",
        text: "Failed to update speaker. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center md:ml-48 justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-none my-10 mx-5 px-4 pb-8 pt-4 border-gray-200 rounded-lg shadow-sm space-y-8 md:w-[700px] lg:w-[900px]"
      >
        {/* Upload profile picture */}
        <div className="w-full h-64 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 relative mb-6">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Speaker Profile"
                className="w-full h-full object-contain"
              />
              <label className="absolute p-4 flex flex-col items-center justify-center cursor-pointer text-black hover:underline">
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

        {/* Name */}
        <div className="flex items-center gap-2">
          <ALargeSmall size={18} />
          <input
            type="text"
            name="name"
            placeholder="Speaker name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Bio */}
        <textarea
          placeholder="Speaker Biography"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={5}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-orange-400 focus:border-orange-400"
        />

        <button
          type="submit"
          className={cn(
            "h-10 w-full rounded-lg py-2 px-4 font-medium transition duration-300 ease-in-out",
            "inline-flex items-center justify-center gap-2",
            "bg-orange-500 text-white hover:bg-orange-600",
            "disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          )}
        >
          Submit Changes
        </button>
      </form>
    </div>
  );
};

export default EditSpeakerForm;
