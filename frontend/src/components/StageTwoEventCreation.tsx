// Step2Sessions.tsx
import React from "react";
import type { Session } from "../types/Session";
import SessionsPage from "../pages/Organizer/SessionManagementPage";
import { useNavigate } from "react-router-dom";

interface Props {
  sessions: Session[];
  setAllSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2Sessions: React.FC<Props> = ({
  sessions,
  setAllSessions,
  startDate,
  endDate,
  startTime,
  endTime,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      {/* Main content takes all remaining space */}
      <div className="flex-grow">
        <SessionsPage
          startDay={startDate}
          endDay={endDate}
          startTime={startTime}
          endTime={endTime}
          setAllSessions = {setAllSessions}
        />
      </div>

      {/* Buttons pinned to bottom */}
      <div className="flex justify-center gap-4 p-4 border-t bg-white">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Next: Review
        </button>
      </div>
    </div>
  );
};

export default Step2Sessions;
