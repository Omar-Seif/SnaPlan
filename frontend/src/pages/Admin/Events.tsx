import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import SearchAndFilter from "./SearchAndFilter";
import { LoaderCircle } from "lucide-react";

interface Conference {
  id: string | number;
  name: string;
  status: string;
  state: "Accepted" | "Rejected" | "Not Assigned";
  companyName: string;
  organizerName: string;
  organizerId: string | number;
  createdDate: string;
  lastUpdated: string;
}

const Events: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://192.168.201.124:5001/api/Admin/events",
          { headers: { "Content-Type": "application/json" } }
        );

        // Handle if API returns object or array
        const events = Array.isArray(response.data)
          ? response.data
          : response.data.recentEvents || [];

        const mapped: Conference[] = events.map((event: any, idx: number) => ({
          id: event.id ?? `CONF-${idx + 1}`,
          name: event.title || "Untitled Event",
          status: event.status || "Draft",
          state: mapEventState(
            event.state || event.approval_status || "pending"
          ),
          organizerName: event.organizerName || "Unknown Organizer",
          organizerId: event.organizerId || 0,
          companyName: event.companyName || "Unknown Company",
          createdDate: formatDate(event.createdDate),
          lastUpdated: formatDate(event.lastUpdated || event.createdDate),
        }));

        setConferences(mapped);
      } catch (err) {
        console.error("❌ Failed to fetch conferences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  const mapEventState = (apiState: string): Conference["state"] => {
    if (!apiState) return "Not Assigned";
    const stateMap: { [key: string]: Conference["state"] } = {
      approved: "Accepted",
      accepted: "Accepted",
      rejected: "Rejected",
      declined: "Rejected",
      pending: "Not Assigned",
      not_assigned: "Not Assigned",
      submitted: "Not Assigned",
    };
    return stateMap[apiState.toLowerCase()] || "Not Assigned";
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "Unknown";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const fetchEventDetails = async (id: string | number) => {
    try {
      const res = await axios.get(
        `https://192.168.201.124:5001/api/Events/${id}`
      );
      return res.data;
    } catch (err) {
      console.error(`❌ Failed to fetch event details for ${id}:`, err);
      return null;
    }
  };

  const handleSubmitStatus = async (id: string | number) => {
    try {
      setLoading(true);

      await axios.post(
        `https://192.168.201.124:5001/api/Events/${id}/publish`,
        null,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Update UI after publish
      setConferences((prev) =>
        prev.map((conf) =>
          conf.id === id
            ? { ...conf, status: "Published", lastUpdated: "Just now" }
            : conf
        )
      );

      console.log(`Event ${id} published successfully`);
    } catch (err) {
      console.error(`❌ Failed to publish event ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };
  const handleRejectStatus = async (id: string | number) => {
    try {
      setLoading(true);

      await axios.post(
        `https://192.168.201.124:5001/api/Admin/events/${id}/reject`,
        null,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Update UI state after rejection
      setConferences((prev) =>
        prev.map((conf) =>
          conf.id === id
            ? { ...conf, status: "Rejected", lastUpdated: "Just now" }
            : conf
        )
      );

      console.log(`Event ${id} rejected successfully`);
    } catch (err) {
      console.error(`❌ Failed to reject event ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const filteredConferences = conferences.filter((conf) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      q === "" ||
      conf.name.toLowerCase().includes(q) ||
      conf.id.toString().toLowerCase().includes(q) ||
      conf.companyName.toLowerCase().includes(q) ||
      conf.organizerName.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ||
      conf.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex md:flex-row">
        <SideBar />
        <main className="flex-1 p-3 md:p-8 min-w-0 overflow-auto">
          <div className="flex items-center justify-center min-h-96">
            <LoaderCircle className="animate-spin w-12 h-12 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-600">Loading events...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex md:flex-row">
      <SideBar />
      <main className="flex-1 p-3 md:p-8 min-w-0 overflow-auto">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">State</th>
                <th className="px-6 py-3">Organizer</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredConferences.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-6 py-4">{c.id}</td>
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">{c.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubmitStatus(c.id)}
                        className="px-3 py-1 bg-green-100 text-green-800 border border-green-300 rounded text-xs font-medium hover:bg-green-200"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleRejectStatus(c.id)
                        }
                        className="px-3 py-1 bg-red-100 text-red-800 border border-red-300 rounded text-xs font-medium hover:bg-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">{c.organizerName}</td>
                  <td className="px-6 py-4">{c.companyName}</td>
                  <td className="px-6 py-4">{c.createdDate}</td>
                  <td className="px-6 py-4">{c.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Events;
