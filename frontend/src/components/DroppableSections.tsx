import { useDroppable } from "@dnd-kit/core";

type DroppableProps = {
  id: string;
  children?: React.ReactNode;
};

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded min-h-[100px] transition-colors
        ${isOver ? "bg-blue-200 border-blue-500" : "bg-gray-100 border-gray-300"}
      `}
    >
      {children}
    </div>
  );
}

export default Droppable;
