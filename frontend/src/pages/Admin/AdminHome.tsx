import { useState } from 'react';
import {
  Calendar, Building, FileText, CreditCard, BarChart3,
  Settings, Eye, Building2, Frown, Search
} from 'lucide-react';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import SearchAndFilter from './SearchAndFilter';

interface Conference {
  id: string;
  name: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  state: 'Accepted' | 'Rejected' | 'Not Assigned';
  companyName: string;
  organizerName: string;
  createdDate: string;
  lastUpdated: string;
}

const AdminHome: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Conference['status']>('all');

  const [conferences] = useState<Conference[]>([
    { id: 'CONF-001', name: 'Tech Summit 2024', status: 'upcoming', state: 'Rejected', companyName: 'Tech Innovators', organizerName: 'Ahmed Hassan', createdDate: 'Apr 18, 2024', lastUpdated: 'Today' },
    { id: 'CONF-002', name: 'Guc Dr Hany Ai Lecture', status: 'ongoing', state: 'Accepted', companyName: 'GUC AI Research', organizerName: 'Fatima El-Sayed', createdDate: 'Mar 29, 2024', lastUpdated: 'Yesterday' },
    { id: 'CONF-003', name: 'Verto Wave Meeting', status: 'completed', state: 'Not Assigned', companyName: 'VertoWave Ltd.', organizerName: 'Omar Mahmoud', createdDate: 'Feb 10, 2024', lastUpdated: 'Feb 21, 2024' },
    { id: 'CONF-004', name: 'Cairo International Book Fair', status: 'completed', state: 'Accepted', companyName: 'CIBF Organizers', organizerName: 'Mona Abdel-Rahman', createdDate: 'Jan 25, 2024', lastUpdated: 'Feb 5, 2024' },
    { id: 'CONF-005', name: 'Egypt Economic Forum', status: 'upcoming', state: 'Accepted', companyName: 'Egypt Economic Board', organizerName: 'Khaled Ibrahim', createdDate: 'Aug 2, 2024', lastUpdated: 'Aug 10, 2024' },
    { id: 'CONF-006', name: 'Alexandria Film Festival', status: 'ongoing', state: 'Rejected', companyName: 'AlexFilm Productions', organizerName: 'Nadia Farouk', createdDate: 'Aug 9, 2024', lastUpdated: 'Today' },
    { id: 'CONF-007', name: 'Aswan Cultural Week', status: 'cancelled', state: 'Not Assigned', companyName: 'Aswan Cultural Council', organizerName: 'Youssef Ali', createdDate: 'Jun 14, 2024', lastUpdated: 'Jun 20, 2024' },
    { id: 'CONF-008', name: 'Going to the Pyramids', status: 'upcoming', state: 'Accepted', companyName: 'Pyramids Tours', organizerName: 'Sarah Mohamed', createdDate: 'Sep 15, 2024', lastUpdated: 'Sep 16, 2024' },
    { id: 'CONF-009', name: 'El Gouna Startup Summit', status: 'completed', state: 'Accepted', companyName: 'El Gouna Ventures', organizerName: 'Hassan Mostafa', createdDate: 'May 3, 2024', lastUpdated: 'May 12, 2024' },
    { id: 'CONF-010', name: 'me4 3arf', status: 'ongoing', state: 'Accepted', companyName: 'Me4 3arf Co.', organizerName: 'Layla Nasser', createdDate: 'Aug 5, 2024', lastUpdated: 'Yesterday' },
    { id: 'CONF-011', name: 'Cairo Tech Expo', status: 'upcoming', state: 'Accepted', companyName: 'Cairo Expo Center', organizerName: 'Mohamed Gamal', createdDate: 'Oct 1, 2024', lastUpdated: 'Oct 2, 2024' },
    { id: 'CONF-012', name: 'Nile Innovation Forum', status: 'ongoing', state: 'Accepted', companyName: 'Nile Ventures', organizerName: 'Amira Shawky', createdDate: 'Sep 20, 2024', lastUpdated: 'Today' },
    { id: 'CONF-013', name: 'Egyptian Developers Meetup', status: 'completed', state: 'Accepted', companyName: 'DevEgypt', organizerName: 'Tarek Zidan', createdDate: 'Jul 10, 2024', lastUpdated: 'Jul 15, 2024' },
    { id: 'CONF-014', name: 'Smart Cities Conference', status: 'upcoming', state: 'Not Assigned', companyName: 'Smart Egypt', organizerName: 'Rana Helmy', createdDate: 'Nov 5, 2024', lastUpdated: 'Nov 6, 2024' },
    { id: 'CONF-015', name: 'Suez Canal Business Summit', status: 'ongoing', state: 'Accepted', companyName: 'Suez Biz Group', organizerName: 'Mahmoud Saeed', createdDate: 'Aug 28, 2024', lastUpdated: 'Yesterday' },
    { id: 'CONF-016', name: 'Red Sea Tourism Conference', status: 'upcoming', state: 'Accepted', companyName: 'Red Sea Tourism', organizerName: 'Hala Kamal', createdDate: 'Dec 1, 2024', lastUpdated: 'Dec 2, 2024' },
    { id: 'CONF-017', name: 'Digital Marketing Summit', status: 'completed', state: 'Accepted', companyName: 'Digital Egypt', organizerName: 'Ramy Fouad', createdDate: 'Jun 5, 2024', lastUpdated: 'Jun 10, 2024' },
    { id: 'CONF-018', name: 'Fintech Cairo', status: 'ongoing', state: 'Not Assigned', companyName: 'FinTech Hub', organizerName: 'Dina Mansour', createdDate: 'Nov 15, 2024', lastUpdated: 'Today' },
    { id: 'CONF-019', name: 'Healthcare Innovation Forum', status: 'upcoming', state: 'Accepted', companyName: 'MedTech Egypt', organizerName: 'Ayman Salah', createdDate: 'Jan 10, 2025', lastUpdated: 'Jan 11, 2025' },
    { id: 'CONF-020', name: 'Renewable Energy Expo', status: 'cancelled', state: 'Rejected', companyName: 'Green Energy Co.', organizerName: 'Yasmin Othman', createdDate: 'Mar 15, 2024', lastUpdated: 'Mar 20, 2024' }
  ]);

  const getStatusColor = (status: Conference['status']): string => {
    switch (status) {
      case 'upcoming': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Conference['status']): string => {
    switch (status) {
      case 'upcoming': return 'UPCOMING';
      case 'ongoing': return 'ONGOING';
      case 'completed': return 'COMPLETED';
      case 'cancelled': return 'CANCELLED';
      default: return 'UNKNOWN';
    }
  };

  const navigate = useNavigate();
  function goToEventManager() {
      navigate('/admin/events');
  }

  const filteredConferences = conferences.filter(conf => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      conf.name.toLowerCase().includes(q) ||
      conf.id.toLowerCase().includes(q) ||
      conf.companyName.toLowerCase().includes(q) ||
      conf.organizerName.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || conf.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get only first 8 entries for display
  const displayedConferences = filteredConferences.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#212121] flex md:flex-row">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <main className="flex-1 p-3 md:p-8 bg-[#212121] min-w-0 overflow-auto">
        {/* Search + Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative bg-green-800 text-white rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Upcoming Events</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {filteredConferences.filter(conf => conf.status === 'upcoming').length}
              </p>
              <p className="text-sm opacity-90">Events</p>
            </div>
            <Calendar className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-orange-800 text-white rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Companies</h3>
              <p className="text-2xl md:text-3xl font-bold">{filteredConferences.length}</p>
              <p className="text-sm opacity-90">Company</p>
            </div>
            <Building2 className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-purple-800 text-white rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Conferences Still Not Flagged</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {filteredConferences.filter(conf => conf.state === 'Not Assigned').length}
              </p>
              <p className="text-sm opacity-90">Events</p>
            </div>
            <Frown className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>

          <div className="relative bg-blue-700 text-white rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Active Conferences</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {filteredConferences.filter(conf => conf.status === 'ongoing').length}
              </p>
              <p className="text-sm opacity-90">Running</p>
            </div>
            <Building className="w-12 h-12 opacity-30 absolute top-6 right-6" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#2d2d2d] rounded-lg shadow border border-gray-900 overflow-x-auto min-w-0">
          <div className="p-6 border-b border-gray-600 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">Recent Conferences</h2>
            <button onClick={goToEventManager} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center space-x-2 cursor-pointer">
              <Eye className="w-4 h-4" /><span>Full Page</span>
            </button>
          </div>

          <table className="w-full table-auto">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Conference #</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Event Name</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Company Name</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Organizer Name</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Status</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">State</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Created</th>
              </tr>
            </thead>
            <tbody>
              {displayedConferences.map((conference) => (
                <tr key={conference.id} className="border-b border-gray-600 hover:bg-[#3d3d3d]">
                  <td className="py-4 px-6 text-sm md:text-base text-gray-300 truncate max-w-xs">{conference.id}</td>
                  <td className="py-4 px-6 text-sm md:text-base text-white font-medium truncate max-w-xs">{conference.name}</td>
                  <td className="py-4 px-6 text-sm md:text-base text-gray-300">{conference.companyName}</td>
                  <td className="py-4 px-6 text-sm md:text-base text-gray-300">{conference.organizerName}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(conference.status)}`}>
                      {getStatusText(conference.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm md:text-base text-gray-300">
                    {conference.state === 'Accepted' ? '✅' :
                      conference.state === 'Rejected' ? '❌' : '🔎'}
                  </td>
                  <td className="py-4 px-6 text-sm md:text-base text-gray-300">{conference.createdDate}</td>
                </tr>
              ))}
              {displayedConferences.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">No conferences found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminHome;