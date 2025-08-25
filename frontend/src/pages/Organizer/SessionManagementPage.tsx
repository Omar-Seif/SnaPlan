import React, { useState, useEffect } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { eventsDummy } from "../../data/events";
import type { Session } from "../../types/Session";
import DraggableSessions from "../../components/DraggableSessions";
import Droppable from "../../components/DroppableSections";
import Sidebar from "../../components/Sidebar";
import SessionForm from "../../components/SessionForm";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<
    (Session & { slottedAt?: string | null })[]
  >([]);

  // 🔹 Hard-coded list of days
  const allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [selectedDay, setSelectedDay] = useState<string>(allDays[0]);

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

    // show unassigned for the first selected day
    const daySessions = enriched.filter((s) => s.timeSlot.day === allDays[0]);
    setDroppableSessions({
      unassigned: daySessions,
      "9:00-10:00": [],
      "10:00-11:00": [],
      "11:00-12:00": [],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [],
      "15:00-16:00": [],
      "16:00-17:00": [],
      "17:00-18:00": [],
      "18:00-19:00": [],
      "19:00-20:00": [],
      "20:00-21:00": [],
    });
  }, []);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);

    const daySessions = sessions.filter((s) => s.timeSlot.day === day);
    setDroppableSessions({
      unassigned: daySessions,
      "9:00-10:00": [],
      "10:00-11:00": [],
      "11:00-12:00": [],
      "12:00-13:00": [],
      "13:00-14:00": [],
      "14:00-15:00": [],
      "15:00-16:00": [],
      "16:00-17:00": [],
      "17:00-18:00": [],
      "18:00-19:00": [],
      "19:00-20:00": [],
      "20:00-21:00": [],
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
        slottedAt:
          targetDroppable === "unassigned"
            ? null
            : `${selectedDay}, ${targetDroppable}`,
      };

      return {
        ...prev,
        [sourceKey]: prev[sourceKey].filter(
          (s) => s.id?.toString() !== sessionId
        ),
        [targetDroppable]: [...prev[targetDroppable], updatedSession],
      };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Sidebar />
      <h1 className="text-center text-3xl font-bold mb-6">Session Timetable</h1>

      {/* Day Selector */}
      <div className="flex justify-center gap-3 mb-6">
        {allDays.map((day) => (
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
      <section className="flex flex-col md:flex-row gap-10 p-4 items-center justify-center w-full max-w-6xl mx-auto">
        {/* Left: Time Slots */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 items-center">
          {Object.entries(droppableSessions)
            .filter(([id]) => id !== "unassigned")
            .map(([id, sessions]) => (
              <Droppable id={id} key={id}>
                <h3 className="text-lg font-semibold mb-2 text-center">{id}</h3>
                {sessions.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center italic">
                    Drop sessions here
                  </p>
                ) : (
                  sessions.map((session) => (
                    <DraggableSessions
                      key={session.id}
                      session={session}
                      day={selectedDay}
                      time={id}
                    />
                  ))
                )}
              </Droppable>
            ))}
        </div>

        {/* Right: Unassigned */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center mx-auto min-h-screen gap-1">
          <SessionForm />
          <div className="flex items-center justify-center">
            <Droppable id="unassigned">
              <h3 className="text-lg font-semibold mb-2 text-center">
                Unassigned
              </h3>
              {droppableSessions.unassigned.length === 0 ? (
                <p className="text-sm text-gray-500 text-center italic">
                  No unassigned sessions
                </p>
              ) : (
                droppableSessions.unassigned.map((session) => (
                  <DraggableSessions
                    key={session.id}
                    session={session}
                    day=""
                    time=""
                  />
                ))
              )}
            </Droppable>
          </div>
        </div>
      </section>
    </DndContext>
  );
}
