import React, { useState, useEffect } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { eventsDummy } from "../../data/events";
import type { Session } from "../../types/Session";
import DraggableSessions from "../../components/DraggableSessions";
import Droppable from "../../components/DroppableSections";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<(Session & { slottedAt?: string | null })[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");

  const [droppableSessions, setDroppableSessions] = useState<
    Record<string, (Session & { slottedAt?: string | null })[]>
  >({
    unassigned: [],
    "9:00-10:00": [],
    "10:00-11:00": [],
    "11:00-12:00": [],
    "13:00-14:00": [],
  });

  // Simulate API call
  useEffect(() => {
    const fetched = eventsDummy.flatMap((event) => event.sessions ?? []);

    // add slottedAt metadata
    const enriched = fetched.map((s) => ({ ...s, slottedAt: null }));
    setSessions(enriched);

    const uniqueDays = Array.from(new Set(fetched.map((s) => s.timeSlot.day)));
    setDays(uniqueDays);
    setSelectedDay(uniqueDays[0] ?? "");

    if (uniqueDays.length > 0) {
      const daySessions = enriched.filter((s) => s.timeSlot.day === uniqueDays[0]);
      setDroppableSessions({
        unassigned: daySessions,
        "9:00-10:00": [],
        "10:00-11:00": [],
        "11:00-12:00": [],
        "13:00-14:00": [],
      });
    }
  }, []);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);

    const daySessions = sessions.filter((s) => s.timeSlot.day === day);
    setDroppableSessions({
      unassigned: daySessions,
      "9:00-10:00": [],
      "10:00-11:00": [],
      "11:00-12:00": [],
      "13:00-14:00": [],
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sessionId = active.id as string;
    const targetDroppable = over.id as string;

    setDroppableSessions((prev) => {
      let sourceKey: string = "unassigned";

      // Find the source droppable that currently contains this session
      for (const [key, list] of Object.entries(prev)) {
        if (list.some((s) => s.id?.toString() === sessionId)) {
          sourceKey = key;
          break;
        }
      }

      if (sourceKey === targetDroppable) return prev;

      const sessionToMove = prev[sourceKey].find(
        (s) => s.id?.toString() === sessionId
      );
      if (!sessionToMove) return prev;

      // Update slottedAt (null if unassigned)
      const updatedSession = {
        ...sessionToMove,
        slottedAt: targetDroppable === "unassigned" ? null : `${selectedDay}, ${targetDroppable}`,
      };

      return {
        ...prev,
        [sourceKey]: prev[sourceKey].filter((s) => s.id?.toString() !== sessionId),
        [targetDroppable]: [...prev[targetDroppable], updatedSession],
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <h1 className="text-center text-3xl font-bold mb-6">Session Timetable</h1>

      {/* Day Selector */}
      <div className="flex justify-center gap-3 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedDay === day
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Layout: Time slots left, Unassigned right */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        {/* Left: Time Slots */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {Object.entries(droppableSessions)
            .filter(([id]) => id !== "unassigned")
            .map(([id, sessions]) => (
              <Droppable
                id={id}
                key={id}
                className="border-2 border-dashed border-gray-400 rounded-lg p-4 min-h-[150px] flex flex-col gap-3 bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2 text-center">{id}</h3>
                
                {sessions.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center italic">
                    Drop sessions here
                  </p>
                ) : (
                  sessions.map((session) => (
                    <DraggableSessions key={session.id} session={session} day={selectedDay} time={id}/>
                  ))
                )}
              </Droppable>
            ))}
        </div>

        {/* Right: Unassigned */}
        <div className="md:col-span-1">
          <Droppable
            id="unassigned"
            className="border-2 border-dashed border-gray-400 rounded-lg p-4 min-h-[500px] flex flex-col gap-3 bg-white shadow"
          >
            <h3 className="text-lg font-semibold mb-2 text-center">
              Unassigned
            </h3>
            {droppableSessions.unassigned.length === 0 ? (
              <p className="text-sm text-gray-500 text-center italic">
                No unassigned sessions
              </p>
            ) : (
              droppableSessions.unassigned.map((session) => (
                <DraggableSessions key={session.id} session={session} day="" time="" />
              ))
            )}
          </Droppable>
        </div>
      </section>
    </DndContext>
  );
}
