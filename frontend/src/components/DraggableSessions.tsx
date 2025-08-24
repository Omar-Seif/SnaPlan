import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Session } from "../types/Session";
import SessionCard from "../components/SessionCard";

type DraggableSessionsProps = {
  session: Session;
  day: string;
  time: string;
};

export default function DraggableSessions({
  session,
  day,
  time,
}: DraggableSessionsProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: session.id?.toString() ?? crypto.randomUUID(),
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing active:bg-orange-400 active:text-gray-200"
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-4 border rounded-lg p-4 bg-white shadow-sm active:bg-orange-400 active:text-white ">
        <div className="text-sm font-medium text-gray-500 w-24 md:w-auto mr-auto md:mr-2">
          {`${day}, ${time}`}
        </div>

        <div className="flex flex-1 justify-between items-center">
          <div className="text-lg font-medium">{session.name}</div>

          <div className="flex items-center gap-2 text-sm text-gray-500 ml-4 mr-2">
            <img
              src={session.speaker.profile}
              alt={session.speaker.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{session.speaker.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
