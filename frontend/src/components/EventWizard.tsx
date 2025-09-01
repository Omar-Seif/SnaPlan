// EventWizard.tsx
import React, { useState, useEffect } from "react";
import Step1EventDetails from "../components/StageOneEventCreation";
import Step2Sessions from "../components/StageTwoEventCreation";
import Step3ReviewSubmit from "../components/StageThreeEventCreation";
import type { Event } from "../types/Event";
import type { Session } from "../types/Session";
import type { Venue } from "../types/Venue";
import axios from "axios";

const EventWizard = () => {
  const [step, setStep] = useState(1);

  const [venues, setVenues] = useState<Venue[]>([]);
  const [formData, setFormData] = useState<Event>({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: { name: "", address: "", location: "", rooms: [] },
    description: "",
  });

  const [allSessions, setAllSessions] = useState<Session[]>([]);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://192.168.201.124:5001/api/Venues")
      .then((res) => setVenues(res.data))
      .catch((err) => console.error(err));
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center">
      {step === 1 && (
        <Step1EventDetails
          formData={formData}
          setFormData={setFormData}
          image={image}
          setImage={setImage}
          venues={venues}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2Sessions
          sessions={allSessions}
          setAllSessions={setAllSessions}
          startDate={formData.startDate}
          endDate = {formData.endDate}
          startTime = {formData.startTime}
          endTime = {formData.endTime}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 3 && (
        <Step3ReviewSubmit
          formData={formData}
          sessions={allSessions}
          image={image}
          prevStep={prevStep}
        />
      )}
    </div>
  );
};

export default EventWizard;
