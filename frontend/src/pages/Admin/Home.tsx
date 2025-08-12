import React, { useState } from 'react';
import {
  Calendar, Building, FileText, CreditCard, BarChart3,
  Settings, Eye, Building2, Frown, Search
} from 'lucide-react';

interface Conference {
  id: string;
  name: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  state: 'Accepted' | 'Rejected' | 'Not Assigned';
  revenue: string;
  createdDate: string;
  lastUpdated: string;
}

const ConferenceDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Conference['status']>('all');

  const conferences: Conference[] = [
    { id: 'CONF-001', name: 'Tech Summit 2024', status: 'upcoming', state: 'Rejected', revenue: '3,149.19 EGP', createdDate: 'Apr 18, 2024', lastUpdated: 'Today' },
    { id: 'CONF-002', name: 'Guc Dr Hany Ai Lecture', status: 'ongoing', state: 'Accepted', revenue: '830.78 EGP', createdDate: 'Mar 29, 2024', lastUpdated: 'Yesterday' },
    { id: 'CONF-003', name: 'Verto Wave Meeting', status: 'completed', state: 'Not Assigned', revenue: '928.84 EGP', createdDate: 'Feb 10, 2024', lastUpdated: 'Feb 21, 2024' },
    { id: 'CONF-004', name: 'Cairo International Book Fair', status: 'completed', state: 'Accepted', revenue: '12,450.00 USD', createdDate: 'Jan 25, 2024', lastUpdated: 'Feb 5, 2024' },
    { id: 'CONF-005', name: 'Egypt Economic Forum', status: 'upcoming', state: 'Accepted', revenue: '5,780.45 EGP', createdDate: 'Aug 2, 2024', lastUpdated: 'Aug 10, 2024' },
    { id: 'CONF-006', name: 'Alexandria Film Festival', status: 'ongoing', state: 'Rejected', revenue: '2,100.00 EGP', createdDate: 'Aug 9, 2024', lastUpdated: 'Today' },
    { id: 'CONF-007', name: 'Aswan Cultural Week', status: 'cancelled', state: 'Not Assigned', revenue: '0.00 USD', createdDate: 'Jun 14, 2024', lastUpdated: 'Jun 20, 2024' },
    { id: 'CONF-008', name: 'Going to the Pyramids', status: 'upcoming', state: 'Accepted', revenue: '6,320.99 USD', createdDate: 'Sep 15, 2024', lastUpdated: 'Sep 16, 2024' },
    { id: 'CONF-009', name: 'El Gouna Startup Summit', status: 'completed', state: 'Accepted', revenue: '4,879.10 EGP', createdDate: 'May 3, 2024', lastUpdated: 'May 12, 2024' },
    { id: 'CONF-010', name: 'me4 3arf', status: 'ongoing', state: 'Accepted', revenue: '7,230.75 USD', createdDate: 'Aug 5, 2024', lastUpdated: 'Yesterday' }
  ];

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

  const filteredConferences = conferences.filter(conf => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      conf.name.toLowerCase().includes(q) ||
      conf.id.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'all' || conf.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#212121] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-50 lg:w-50 bg-[#000000] text-white flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <span className="text-lg md:text-2xl font-bold">SnaPlan <span className='text-red-500'>Admin</span></span>
          </div>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-indigo-800 rounded-lg px-4 py-3">
              <BarChart3 className="w-5 h-5" /><span className="text-sm md:text-base">Overview</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-indigo-800 rounded-lg cursor-pointer">
              <Calendar className="w-5 h-5" /><span onClick={()=>alert('This should change the page (later)')} className="text-sm md:text-base">Conferences</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-indigo-800 rounded-lg cursor-pointer">
              <Building className="w-5 h-5" /><span onClick={()=>alert('This should change the page (later)')} className="text-sm md:text-base">Venues</span>
            </div>
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-indigo-800 rounded-lg cursor-pointer">
              <Settings className="w-5 h-5" /><span onClick={()=>alert('This should change the page (later)')} className="text-sm md:text-base">Settings</span>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content - allow shrink with min-w-0 */}
      <main className="flex-1 p-4 md:p-8 bg-[#212121] min-w-0 overflow-auto">
        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center bg-[#2d2d2d] px-4 py-2 rounded-lg w-full md:w-1/3">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search conferences..."
              className="bg-transparent text-white outline-none w-full text-sm md:text-base"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-[#2d2d2d] text-white px-4 py-2 rounded-lg outline-none text-sm md:text-base"
          >
            <option value="all">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative bg-green-800 text-white rounded-lg p-6 overflow-hidden">
            <div>
              <h3 className="text-sm opacity-90 mb-2">Total Revenue</h3>
              <p className="text-2xl md:text-3xl font-bold">
                {filteredConferences.reduce((total, conf) => {
                  const num = parseFloat(conf.revenue.replace(/[^0-9.-]+/g, ''));
                  return total + (isNaN(num) ? 0 : num);
                }, 0).toLocaleString()}
              </p>
              <p className="text-sm opacity-90">
                {filteredConferences.length > 0
                  ? (filteredConferences[0].revenue.includes('USD') ? 'USD' : 'EGP')
                  : ''}
              </p>
            </div>
            <CreditCard className="w-12 h-12 opacity-30 absolute top-6 right-6" />
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

        {/* Table*/}
        <div className="bg-[#2d2d2d] rounded-lg shadow border border-gray-900 overflow-x-auto min-w-0">
          <div className="p-6 border-b border-gray-600 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white">All Conferences</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center space-x-2">
              <Eye className="w-4 h-4" /><span>Full Page</span>
            </button>
          </div>

          <table className="w-full table-auto">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Conference #</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Event Name</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Status</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">State</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Created</th>
                <th className="text-left py-3 px-6 text-sm md:text-base text-gray-300">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {filteredConferences.map((conference) => (
                <tr key={conference.id} className="border-b border-gray-600 hover:bg-[#3d3d3d]">
                  <td className="py-4 px-6 text-sm md:text-xl text-gray-300 truncate max-w-xs">{conference.id}</td>
                  <td className="py-4 px-6 text-sm md:text-xl text-white font-medium truncate max-w-xs">{conference.name}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(conference.status)}`}>
                      {getStatusText(conference.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm md:text-xl text-gray-300">
                    {conference.state === 'Accepted' ? '✅' :
                      conference.state === 'Rejected' ? '❌' : '🔎'}
                  </td>
                  <td className="py-4 px-6 text-sm md:text-xl text-gray-300">{conference.createdDate}</td>
                  <td className="py-4 px-6 text-sm md:text-xl text-white">{conference.revenue}</td>
                </tr>
              ))}
              {filteredConferences.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">No conferences found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ConferenceDashboard;
