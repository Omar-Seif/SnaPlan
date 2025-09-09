import DraftGrid from "../../components/DraftGrid";
import Sidebar from "../../components/Sidebar";
import StatusCard from "../../components/StatusCard";
import {useState, useEffect } from "react";
import axios from "axios"
import type { DraftEvent } from "../../types/Event";
const DraftEvents = () => {
  const [draftEvents , setDraftEvents] = useState<DraftEvent[]>([])
  useEffect(() => {
    // const fetchDraftEvents = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);
    //     const draftEvents: DraftEvent[] = await getDraftEventsMock();
    //     setDraftEvents(draftEvents);
    //   } catch (err) {
    //     console.log(err);
    //     setLoading(false);
    //     setError(err instanceof Error ? err.message : "Failed to load events");
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchDraftEvents();
    axios
      .get("https://192.168.201.124:5001/api/Organizer/draft-events")
      .then((res) => setDraftEvents(res.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 md:ml-48 transition-all duration-300">
        <div className="p-5 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <StatusCard title="Total Drafts" info={`${draftEvents.length}`} />
            <StatusCard title="Last Updates" info="3 days ago" />
          </div>

          <DraftGrid draftEvents={draftEvents} setDraftEvents={setDraftEvents} />
        </div>
      </div>
    </div>
  );
};

export default DraftEvents;
