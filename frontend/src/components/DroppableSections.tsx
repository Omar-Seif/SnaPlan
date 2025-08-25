import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type DroppableProps = {
  id: string;
  children: React.ReactNode;
};

export function Droppable({ id, children }: DroppableProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  

  return (
    <div ref={setNodeRef} className="bg-gray-200 p-5 ">
      {children}
    </div>
  );
}

export default Droppable;
