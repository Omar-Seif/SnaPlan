import { Search } from 'lucide-react';
import React from 'react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: 'all' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled') => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex items-center bg-[#2d2d2d] px-4 py-2 rounded-lg w-full md:w-1/3">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search Events..."
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
  );
};

export default SearchAndFilter;