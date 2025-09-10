import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Ban,
  Calendar,
  Check,
  X,
  Eye,
  Sidebar,
} from "lucide-react";
import SideBarComponent from "../Admin/SideBar";

const API_BASE_URL = "https://192.168.201.124:5001/api/Admin";

const initialPendingOrganizers = [
  {
    id: 101,
    name: "Mariam Nasser",
    email: "mariam.nasser@gmail.com",
    appliedDate: "2024-08-10",
    location: "Cairo",
    phone: "+20 105 678 9012",
    experience: "3 years event management",
  },
  {
    id: 102,
    name: "Mohamed Ali",
    email: "mohamed.ali@yahoo.com",
    appliedDate: "2024-08-11",
    location: "Alexandria",
    phone: "+20 106 789 0123",
    experience: "5 years conference organizing",
  },
  {
    id: 103,
    name: "Nour El-Din",
    email: "nour.eldin@hotmail.com",
    appliedDate: "2024-08-12",
    location: "Luxor",
    phone: "+20 107 890 1234",
    experience: "2 years tech events",
  },
];

function Organizers() {
  const [organizers, setOrganizers] = useState([]);
  const [pendingOrganizers, setPendingOrganizers] = useState(
    initialPendingOrganizers
  );
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showPending, setShowPending] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch organizers from API
  const fetchOrganizers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/organizers`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform API data to match component structure
      const transformedData = data.map((org) => ({
        id: org.id,
        name: `${org.firstName} ${org.lastName}`,
        email: org.email,
        joinedDate: org.createdAt
          ? org.createdAt.split("T")[0]
          : new Date().toISOString().split("T")[0],
        status: org.isActive ? "active" : "inactive",
        eventsCount: 0, // This would need to come from another API endpoint
        location: org.organization || "N/A",
        phone: "N/A", // Not provided in API response
        organization: org.organization,
        lastLoginAt: org.lastLoginAt,
        role: org.role,
      }));

      setOrganizers(transformedData);
    } catch (err) {
      console.error("Error fetching organizers:", err);
      setError("Failed to load organizers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete organizer via API
  const deleteOrganizerAPI = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/organizers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from local state after successful API call
      setOrganizers(organizers.filter((org) => org.id !== id));
    } catch (err) {
      console.error("Error deleting organizer:", err);
      alert("Failed to delete organizer. Please try again.");
    }
  };

  // Load organizers on component mount
  useEffect(() => {
    fetchOrganizers();
  }, []);

  // Handle edit
  const startEdit = (organizer) => {
    setEditingId(organizer.id);
    setEditForm(organizer);
  };

  const saveEdit = () => {
    // TODO: Implement API call for updating organizer
    setOrganizers(
      organizers.map((org) => (org.id === editingId ? editForm : org))
    );
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Handle delete
  const deleteOrganizer = (id) => {
    if (window.confirm("Are you sure you want to delete this organizer?")) {
      deleteOrganizerAPI(id);
    }
  };

  // Handle ban/unban
  const toggleBan = (id) => {
    // TODO: Implement API call for banning/unbanning organizer
    setOrganizers(
      organizers.map((org) =>
        org.id === id
          ? {
              ...org,
              status: org.status === "inactive" ? "active" : "inactive",
            }
          : org
      )
    );
  };

  // Handle pending organizer approval
  const approveOrganizer = (pendingOrg) => {
    const newOrganizer = {
      id: Date.now(),
      name: pendingOrg.name,
      email: pendingOrg.email,
      joinedDate: new Date().toISOString().split("T")[0],
      status: "active",
      eventsCount: 0,
      location: pendingOrg.location,
      phone: pendingOrg.phone,
    };

    setOrganizers([...organizers, newOrganizer]);
    setPendingOrganizers(
      pendingOrganizers.filter((org) => org.id !== pendingOrg.id)
    );
  };

  const rejectOrganizer = (id) => {
    setPendingOrganizers(pendingOrganizers.filter((org) => org.id !== id));
  };

  // Filter organizers based on search
  const filteredOrganizers = organizers.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <SideBarComponent />
        <div className="flex justify-center items-center min-h-96">
          <div className="text-lg text-gray-600">Loading organizers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <SideBarComponent />
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-4">{error}</div>
            <button
              onClick={fetchOrganizers}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SideBarComponent />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Sna<span className="text-red-700 text-extrabold">Plan</span>{" "}
          Organizers Dashboard
        </h1>
      </div>

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search organizers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={fetchOrganizers}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {organizers.filter((o) => o.status === "active").length}
          </div>
          <div className="text-sm text-blue-600">Active Organizers</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {organizers.filter((o) => o.status === "inactive").length}
          </div>
          <div className="text-sm text-red-600">Inactive Organizers</div>
        </div>
        {/* <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {pendingOrganizers.length}
            </div>
            <div className="text-sm text-orange-600">Pending Applications</div>
          </div> */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {organizers.reduce((sum, org) => sum + org.eventsCount, 0)}
          </div>
          <div className="text-sm text-green-600">Total Events</div>
        </div>
      </div>

      {/* Active Organizers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Organizers ({filteredOrganizers.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrganizers.map((organizer) => (
                <tr key={organizer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === organizer.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editForm.name || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          value={editForm.email || ""}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Email"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {organizer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {organizer.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {organizer.role}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {organizer.organization || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(organizer.joinedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {organizer.lastLoginAt
                        ? new Date(organizer.lastLoginAt).toLocaleDateString()
                        : "Never"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        organizer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {organizer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === organizer.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(organizer)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => toggleBan(organizer.id)}
                          className={`transition-colors ${
                            organizer.status === "inactive"
                              ? "text-green-600 hover:text-green-900"
                              : "text-yellow-600 hover:text-yellow-900"
                          }`}
                          title={
                            organizer.status === "inactive"
                              ? "Activate"
                              : "Deactivate"
                          }
                        >
                          <Ban size={16} />
                        </button>
                        <button
                          onClick={() => deleteOrganizer(organizer.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="View Events"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrganizers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              No organizers found matching your search.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Organizers;
