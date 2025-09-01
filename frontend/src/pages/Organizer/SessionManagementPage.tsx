import React, { useState, useEffect } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Session } from "../../types/Session";
import DraggableSessions from "../../components/DraggableSessions";
import Droppable from "../../components/DroppableSections";
import SessionForm from "../../components/SessionForm";

interface Props {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
  allSessions: Session[];
  setAllSessions: (sessions: Session[]) => void;
}

function generateDays(startDay: string, endDay: string): string[] {
  const days: string[] = [];
  const start = new Date(startDay);
  const end = new Date(endDay);

  while (start <= end) {
    days.push(start.toLocaleDateString("en-US", { weekday: "long" }));
    start.setDate(start.getDate() + 1);
  }
  return days;
}

function generateTimeSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = [];

  const parseTime = (t: string): [number, number] => {
    if (t.includes(":")) return t.split(":").map(Number) as [number, number];
    return [Number(t), 0];
  };

  const [startHour, startMinute] = parseTime(startTime);
  const [endHour, endMinute] = parseTime(endTime);

  const current = new Date();
  current.setHours(startHour, startMinute, 0, 0);
  const end = new Date();
  end.setHours(endHour, endMinute, 0, 0);

  while (current < end) {
    const next = new Date(current);
    next.setHours(current.getHours() + 1);
    const pad = (n: number) => String(n).padStart(2, "0");
    const slot = `${pad(current.getHours())}:00-${pad(next.getHours())}:00`;
    slots.push(slot);
    current.setTime(next.getTime());
  }
  return slots;
}

function parseTimeSlot(timeSlotString: string): { startDate: string; endDate: string } {
  if (timeSlotString === "unassigned") return { startDate: "", endDate: "" };
  const [start, end] = timeSlotString.split("-");
  return { startDate: start || "", endDate: end || "" };
}

export default function SessionsPage({
  startDay,
  endDay,
  startTime,
  endTime,
  allSessions,
  setAllSessions,
}: Props) {
  const allDays = generateDays(startDay, endDay);
  const timeSlots = generateTimeSlots(startTime, endTime);
  const [selectedDay, setSelectedDay] = useState<string>(allDays[0]);

  // Filter sessions for the currently selected day
  const sessionsForSelectedDay = allSessions.filter(
    (session) => !session.timeSlot?.day || session.timeSlot.day === selectedDay
  );

  // Derived droppable sessions
  const droppableSessions = sessionsForSelectedDay.reduce(
    (acc, session) => {
      if (!session.timeSlot || !session.timeSlot.day) {
        acc.unassigned.push(session);
      } else if (session.timeSlot.startDate && session.timeSlot.endDate) {
        const timeSlotKey = `${session.timeSlot.startDate}-${session.timeSlot.endDate}`;
        if (timeSlotKey && acc[timeSlotKey]) acc[timeSlotKey].push(session);
      }
      return acc;
    },
    { unassigned: [], ...Object.fromEntries(timeSlots.map((t) => [t, []])) } as Record<string, Session[]>
  );

  // Handle drag & drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const updatedSessions = allSessions.map((s) => {
      if (String(s.id) === activeId) {
        if (overId === "unassigned") {
          return { ...s, timeSlot: { day: "", startDate: "", endDate: "" } };
        } else {
          const { startDate, endDate } = parseTimeSlot(overId);
          return { ...s, timeSlot: { day: selectedDay, startDate, endDate } };
        }
      }
      return s;
    });

    setAllSessions(updatedSessions);
  };

  // Handle creating new sessions
  const handleCreateSession = (newSession: Omit<Session, "id" | "timeSlot">) => {
    const enriched: Session = {
      ...newSession,
      id: Date.now().toString(),
      timeSlot: { day: "", startDate: "", endDate: "" },
    };
    setAllSessions([...allSessions, enriched]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col">
        {/* Day Selector */}
        <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Day</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {allDays.map((day) => (
              <button
                key={day}
                className={`px-5 py-3 flex items-center rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedDay === day
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Timetable */}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            {/* Time Slots */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Time Slots - {selectedDay}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {timeSlots.map((slot) => (
                  <Droppable key={slot} id={slot}>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[220px] flex flex-col">
                      <h3 className="font-semibold mb-4 text-gray-700 text-lg">{slot}</h3>
                      <div className="space-y-4 flex-1">
                        {droppableSessions[slot]?.map((s) => (
                          <DraggableSessions
                            key={String(s.id)}
                            id={String(s.id)}
                            session={s}
                            day={selectedDay}
                            time={slot}
                            isRoomsHidden={true}
                          />
                        ))}
                        {(!droppableSessions[slot] || droppableSessions[slot].length === 0) && (
                          <div className="text-center py-6 text-gray-400 bg-gray-100 rounded-md border border-dashed border-gray-300">
                            Drop sessions here
                          </div>
                        )}
                      </div>
                    </div>
                  </Droppable>
                ))}
              </div>
            </div>

            {/* Right: Create + Unassigned */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Session</h2>
                <SessionForm handleCreateSession={handleCreateSession} />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <Droppable id="unassigned">
                  <h3 className="font-semibold mb-3 text-gray-700 text-lg">Unassigned Sessions</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {droppableSessions["unassigned"]?.map((s) => (
                      <DraggableSessions
                        key={String(s.id)}
                        id={String(s.id)}
                        session={s}
                        day={selectedDay}
                        time="unassigned"
                        isRoomsHidden={true}
                      />
                    ))}
                    {(!droppableSessions["unassigned"] || droppableSessions["unassigned"].length === 0) && (
                      <div className="text-center py-8 text-gray-400 bg-gray-100 rounded-md border border-dashed border-gray-300">
                        No unassigned sessions
                      </div>
                    )}
                  </div>
                </Droppable>
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}
