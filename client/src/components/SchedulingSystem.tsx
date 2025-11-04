import { Calendar, Clock, Users, AlertTriangle, Check, X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { contractors } from "@/lib/contractorData";
import { Button } from "@/components/ui/button";

interface ScheduleEvent {
  id: string;
  title: string;
  contractorId: string;
  contractorName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // hours
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

interface SchedulingSystemProps {
  onClose: () => void;
}

export default function SchedulingSystem({ onClose }: SchedulingSystemProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: 'e1',
      title: 'Foundation Pour',
      contractorId: 'c1',
      contractorName: 'Martinez Construction Group',
      date: new Date(2025, 10, 5, 8, 0),
      startTime: '08:00',
      endTime: '16:00',
      duration: 8,
      status: 'scheduled',
      notes: 'Weather dependent',
    },
    {
      id: 'e2',
      title: 'Electrical Rough-In',
      contractorId: 'c2',
      contractorName: 'Chen Electrical Services',
      date: new Date(2025, 10, 6, 9, 0),
      startTime: '09:00',
      endTime: '17:00',
      duration: 8,
      status: 'scheduled',
    },
    {
      id: 'e3',
      title: 'Plumbing Installation',
      contractorId: 'c3',
      contractorName: 'Johnson Plumbing & HVAC',
      date: new Date(2025, 10, 6, 10, 0),
      startTime: '10:00',
      endTime: '15:00',
      duration: 5,
      status: 'scheduled',
      notes: 'Conflict detected with electrical work',
    },
  ]);

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const detectConflicts = (event: ScheduleEvent) => {
    const conflicts = events.filter(e => {
      if (e.id === event.id) return false;
      const sameDate = new Date(e.date).toDateString() === new Date(event.date).toDateString();
      if (!sameDate) return false;
      
      const e1Start = parseInt(e.startTime.replace(':', ''));
      const e1End = parseInt(e.endTime.replace(':', ''));
      const e2Start = parseInt(event.startTime.replace(':', ''));
      const e2End = parseInt(event.endTime.replace(':', ''));
      
      return (e2Start < e1End && e2End > e1Start);
    });
    return conflicts;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const weekDays = getWeekDays(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                📅 Project Scheduling
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {events.length} scheduled events • {events.filter(e => detectConflicts(e).length > 0).length} conflicts detected
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(currentDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <div className="text-white font-semibold min-w-[200px] text-center">
                {monthName}
              </div>
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(currentDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors ml-2"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowNewEvent(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((date) => {
              const dayEvents = getEventsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === date.toDateString();

              return (
                <div
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`min-h-[150px] p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-500/20 border-teal-500/50'
                      : isToday
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isToday ? 'text-teal-400' : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.map((event) => {
                      const conflicts = detectConflicts(event);
                      const hasConflict = conflicts.length > 0;

                      return (
                        <div
                          key={event.id}
                          className={`p-2 rounded border text-xs ${getStatusColor(event.status)}`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span className="font-medium truncate">{event.title}</span>
                            {hasConflict && (
                              <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs opacity-75">
                            {event.startTime} - {event.endTime}
                          </div>
                          <div className="text-xs opacity-75 truncate mt-1">
                            {event.contractorName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Event Details */}
          {selectedDate && (
            <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">
                Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No events scheduled</p>
              ) : (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => {
                    const conflicts = detectConflicts(event);
                    const hasConflict = conflicts.length > 0;

                    return (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border ${
                          hasConflict
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{event.title}</h4>
                            <p className="text-gray-400 text-sm">{event.contractorName}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{event.startTime} - {event.endTime} ({event.duration}h)</span>
                          </div>
                          {event.notes && (
                            <div className="text-gray-400">
                              Note: {event.notes}
                            </div>
                          )}
                        </div>

                        {hasConflict && (
                          <div className="mt-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                            <div className="flex items-center gap-2 text-red-400 text-sm font-medium mb-2">
                              <AlertTriangle className="w-4 h-4" />
                              Scheduling Conflict Detected
                            </div>
                            <div className="text-xs text-gray-400">
                              Overlaps with: {conflicts.map(c => c.title).join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30" />
              <span className="text-gray-400">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30" />
              <span className="text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30" />
              <span className="text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-red-400" />
              <span className="text-gray-400">Conflict</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

