import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Session } from "../types/Session";

type DraggableSessionsProps = {
  session: Session;
  id?: string | number;
  day: string;
  time: string;
  isRoomsHidden: boolean;
};

export default function DraggableSessions({
  session,
  id,
  day,
  time,
  isRoomsHidden,
}: DraggableSessionsProps) {
  // ✅ ensure every draggable has a unique id
  const dragId = String(id ?? session.id ?? `session-${crypto.randomUUID()}`);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dragId,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1,
  };

  // Format time display for better readability
  const formatTimeDisplay = (timeString: string) => {
    if (timeString === "unassigned") return "Unassigned";

    // Handle time format like "09:00-10:00"
    if (timeString.includes("-")) {
      const [start, end] = timeString.split("-");
      return `${start} - ${end}`;
    }

    return timeString;
  };

  // Shorten day name for mobile view
  const shortenDayName = (dayName: string) => {
    if (dayName.length <= 6) return dayName;
    return dayName.substring(0, 3);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing w-full`}
      {...listeners}
      {...attributes}
    >
      <div
        className={`border rounded-xl p-3 bg-white shadow-sm transition-all ${
          isDragging
            ? "border-blue-400"
            : "border-gray-200 hover:border-blue-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Time/day indicator - responsive */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:flex-col sm:items-start sm:gap-0">
            <div className="text-[0.5rem] font-medium text-gray-500 uppercase tracking-wide hidden sm:block line-clamp-2">
              {session.name}
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide hidden sm:block">
              {day}
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide sm:hidden">
              {shortenDayName(day)}
            </div>
            <div className="text-sm font-semibold text-blue-600 whitespace-nowrap">
              {formatTimeDisplay(time)}
            </div>
          </div>

          {/* Session content - responsive */}
          <div className="flex-1 min-w-0 w-full">
            {!isRoomsHidden && (
              <div className="mt-2">
                <select
                  name="roomchosen"
                  className="border rounded-lg p-2 text-sm w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a room...</option>
                  {/* You would map through available rooms here */}
                </select>
              </div>
            )}
          </div>

          {/* Speaker info - responsive */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 self-end sm:self-auto">
            <div className="hidden xs:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[100px] xs:max-w-[120px]">
                {session.speaker.name}
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Speaker
              </span>
            </div>
            <img
              src={session.speaker.profile}
              alt={session.speaker.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
