import { useState, useEffect } from "react";
import {
  Building,
  Building2,
  LoaderCircle,
  PersonStanding,
  Map,
  Flame,
} from "lucide-react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import SearchAndFilter from "./SearchAndFilter";
import Table from "./EventsTable";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Conference {
  id: string | number;
  name: string;
  status: string;
  state: "Accepted" | "Rejected" | "Not Assigned";
  companyName: string;
  organizerName: string;
  createdDate: string;
  lastUpdated: string;
}

interface DashboardData {
  totalEvents: number;
  activeEvents: number;
  pendingEvents: number;
  submittedEvents: number;
  draftEvents: number;
  totalOrganizers: number;
  totalAttendees: number;
  totalVenues: number;
  recentEvents: Array<{
    id: string | number;
    title: string;
    imageUrl?: string;
    startDate?: string;
    endDate?: string;
    status: string;
    organizerName: string;
    venueName: string;
    createdDate: string;
    lastUpdated: string;
    sessionCount?: number;
  }>;
}

const AdminHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "https://192.168.201.124:5001/api/Admin/dashboard",
          { headers: { "Content-Type": "application/json" } }
        );

        const data: DashboardData = response.data;
        setDashboard(data);

        const mappedConferences: Conference[] = (data.recentEvents || []).map(
          (event: any) => ({
            id: event.id ?? `CONF-${Math.random().toString(36).substr(2, 9)}`,
            name: event.title || "Untitled Event",
            status: event.status || "Draft",
            state: mapEventState(
              event.state || event.approval_status || "pending"
            ),
            organizerName: event.organizerName || "Unknown Organizer",
            companyName: event.organizerName || "Unknown Company",
            createdDate: formatDate(event.createdDate),
            lastUpdated: formatDate(event.lastUpdated || event.createdDate),
          })
        );

        setConferences(mappedConferences);
      } catch (err: any) {
        setError("Failed to load dashboard");
        setConferences(getDummyData());
        setDashboard({
          totalEvents: 6,
          activeEvents: 2,
          pendingEvents: 0,
          submittedEvents: 2,
          draftEvents: 2,
          totalOrganizers: 3,
          totalAttendees: 6,
          totalVenues: 3,
          recentEvents: [],
        });

        mySwal.fire({
          icon: "error",
          title: "Error Loading Data",
          text:
            err.response?.data?.message ||
            "Failed to fetch dashboard from server. Using sample data.",
          confirmButtonColor: "#1E293B",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
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
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays <= 7) return `${diffDays} days ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  const getDummyData = (): Conference[] => [
    {
      id: "CONF-001",
      name: "Tech Summit 2024",
      status: "Draft",
      state: "Rejected",
      companyName: "Tech Innovators",
      organizerName: "Ahmed Hassan",
      createdDate: "Apr 18, 2024",
      lastUpdated: "Today",
    },
    {
      id: "CONF-002",
      name: "Guc Dr Hany Ai Lecture",
      status: "Active",
      state: "Accepted",
      companyName: "GUC AI Research",
      organizerName: "Fatima El-Sayed",
      createdDate: "Mar 29, 2024",
      lastUpdated: "Yesterday",
    },
  ];

  const goToEventManager = () => navigate("/admin/events");

  const filteredConferences = conferences.filter((conf) => {
    const q = (searchTerm || "").trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      conf.name?.toLowerCase().includes(q) ||
      conf.id?.toString().toLowerCase().includes(q) ||
      conf.companyName?.toLowerCase().includes(q) ||
      conf.organizerName?.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "all" ||
      conf.status?.toLowerCase() === (statusFilter || "").toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex md:flex-row">
        <SideBar />
        <main className="flex-1 p-3 md:p-8 min-w-0 overflow-auto">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <LoaderCircle className="animate-spin w-12 h-12 mx-auto mb-4 text-gray-500" />
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex md:flex-row ">
      <SideBar />
      <main className="flex-1 p-3 md:p-8 min-w-0 overflow-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative bg-green-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Venues</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.totalVenues ?? 0}
              </p>
              <p className="text-sm opacity-90">Venues</p>
            </div>
            <Map className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-orange-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.totalEvents ?? 0}
              </p>
              <p className="text-sm opacity-90">Events</p>
            </div>
            <Flame className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-purple-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Attendees</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.totalAttendees ?? 0}
              </p>
              <p className="text-sm opacity-90">People</p>
            </div>
            <PersonStanding className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-blue-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Active Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.activeEvents ?? 0}
              </p>
              <p className="text-sm opacity-90">Running</p>
            </div>
            <Building className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>
        </div>

        {/* More Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative bg-yellow-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Pending Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.pendingEvents ?? 0}
              </p>
              <p className="text-sm opacity-90">Awaiting Review</p>
            </div>
            <Building2 className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-indigo-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Submitted Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.submittedEvents ?? 0}
              </p>
              <p className="text-sm opacity-90">Under Review</p>
            </div>
            <Building2 className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-gray-300 rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Draft Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {dashboard?.draftEvents ?? 0}
              </p>
              <p className="text-sm opacity-90">In Progress</p>
            </div>
            <Building2 className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>
        </div>

        {/* Table */}
        <Table
          conferences={filteredConferences}
          title="Recent Events"
          showFullPageButton
          onFullPageClick={goToEventManager}
          limit={6}
        />
      </main>
    </div>
  );
};

export default AdminHome;
