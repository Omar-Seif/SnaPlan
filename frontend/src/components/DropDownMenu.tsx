import React, { useState, useRef, useEffect } from "react";
import type { Speaker } from "../types/Speaker";
import {UserPlus} from "lucide-react"
import { useNavigate } from "react-router-dom";
type DropdownProps = {
  options: Speaker[];
  selected: Speaker | null;
  onSelect: (value: Speaker) => void;
  placeholder?: string;
};

export default function Dropdown({
  options,
  selected,
  onSelect,
  placeholder = "Select a speaker",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64">
      {/* Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-300 rounded-md p-2 flex items-center justify-between"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <img
              src={selected.profile}
              alt={selected.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{selected.name}</span>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <span className="ml-2">▼</span>
      </button>

      {/* Options */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md z-10 max-h-60 overflow-y-auto">
          <li className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2" onClick={()=>navigate('/organizer/createSpeaker')}>
            <UserPlus size={18}/>
            Add new speaker...
          </li>
          {options.map((speaker) => (
            <li
              key={speaker.id}
              onClick={() => {
                onSelect(speaker);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <img
                src={speaker.profile}
                alt={speaker.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{speaker.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
