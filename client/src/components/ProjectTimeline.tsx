import { Calendar, Clock, CheckCircle, AlertTriangle, Truck, Package, X, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TimelineTask {
  id: string;
  name: string;
  category: 'design' | 'permits' | 'site-prep' | 'foundation' | 'framing' | 'electrical' | 'plumbing' | 'finishing' | 'inspection';
  startDate: Date;
  endDate: Date;
  duration: number; // days
  progress: number; // percentage
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed' | 'blocked';
  dependencies: string[];
  assignedTo?: string;
  deliveries?: Delivery[];
  milestone?: boolean;
}

interface Delivery {
  id: string;
  item: string;
  vendor: string;
  scheduledDate: Date;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  trackingNumber?: string;
}

interface ProjectTimelineProps {
  onClose: () => void;
}

export default function ProjectTimeline({ onClose }: ProjectTimelineProps) {
  const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null);
  const [viewMode, setViewMode] = useState<'gantt' | 'list' | 'deliveries'>('gantt');

  const tasks: TimelineTask[] = [
    {
      id: 't1',
      name: 'Architectural Design',
      category: 'design',
      startDate: new Date(2025, 10, 1),
      endDate: new Date(2025, 10, 14),
      duration: 14,
      progress: 100,
      status: 'completed',
      dependencies: [],
      assignedTo: 'Design Studio Pro',
      milestone: true,
    },
    {
      id: 't2',
      name: 'Permit Applications',
      category: 'permits',
      startDate: new Date(2025, 10, 15),
      endDate: new Date(2025, 10, 30),
      duration: 15,
      progress: 80,
      status: 'in-progress',
      dependencies: ['t1'],
      assignedTo: 'City Planning Dept',
    },
    {
      id: 't3',
      name: 'Site Preparation',
      category: 'site-prep',
      startDate: new Date(2025, 11, 1),
      endDate: new Date(2025, 11, 7),
      duration: 7,
      progress: 0,
      status: 'not-started',
      dependencies: ['t2'],
      assignedTo: 'Martinez Construction Group',
      deliveries: [
        {
          id: 'd1',
          item: 'Excavation Equipment',
          vendor: 'Equipment Rentals Inc',
          scheduledDate: new Date(2025, 11, 1),
          status: 'pending',
        },
      ],
    },
    {
      id: 't4',
      name: 'Foundation Pour',
      category: 'foundation',
      startDate: new Date(2025, 11, 8),
      endDate: new Date(2025, 11, 15),
      duration: 8,
      progress: 0,
      status: 'not-started',
      dependencies: ['t3'],
      assignedTo: 'Martinez Construction Group',
      deliveries: [
        {
          id: 'd2',
          item: 'Concrete (50 cubic yards)',
          vendor: 'Concrete Direct',
          scheduledDate: new Date(2025, 11, 8),
          status: 'pending',
        },
        {
          id: 'd3',
          item: 'Rebar & Forms',
          vendor: 'Steel & Rebar Inc',
          scheduledDate: new Date(2025, 11, 7),
          status: 'pending',
        },
      ],
      milestone: true,
    },
    {
      id: 't5',
      name: 'Framing',
      category: 'framing',
      startDate: new Date(2025, 11, 16),
      endDate: new Date(2025, 11, 30),
      duration: 15,
      progress: 0,
      status: 'not-started',
      dependencies: ['t4'],
      assignedTo: 'Kim Carpentry & Millwork',
      deliveries: [
        {
          id: 'd4',
          item: 'Lumber Package',
          vendor: 'BuildMart Supply',
          scheduledDate: new Date(2025, 11, 15),
          status: 'pending',
        },
      ],
    },
    {
      id: 't6',
      name: 'Electrical Rough-In',
      category: 'electrical',
      startDate: new Date(2026, 0, 1),
      endDate: new Date(2026, 0, 10),
      duration: 10,
      progress: 0,
      status: 'not-started',
      dependencies: ['t5'],
      assignedTo: 'Chen Electrical Services',
      deliveries: [
        {
          id: 'd5',
          item: 'Electrical Materials',
          vendor: 'Electric Supply Co',
          scheduledDate: new Date(2025, 11, 30),
          status: 'pending',
        },
      ],
    },
    {
      id: 't7',
      name: 'Plumbing Installation',
      category: 'plumbing',
      startDate: new Date(2026, 0, 1),
      endDate: new Date(2026, 0, 12),
      duration: 12,
      progress: 0,
      status: 'not-started',
      dependencies: ['t5'],
      assignedTo: 'Johnson Plumbing & HVAC',
      deliveries: [
        {
          id: 'd6',
          item: 'Plumbing Fixtures',
          vendor: 'Plumbing Plus',
          scheduledDate: new Date(2025, 11, 30),
          status: 'pending',
        },
      ],
    },
    {
      id: 't8',
      name: 'Drywall & Finishing',
      category: 'finishing',
      startDate: new Date(2026, 0, 13),
      endDate: new Date(2026, 0, 27),
      duration: 15,
      progress: 0,
      status: 'not-started',
      dependencies: ['t6', 't7'],
      assignedTo: 'Taylor Painting & Finishes',
      deliveries: [
        {
          id: 'd7',
          item: 'Drywall Sheets',
          vendor: 'Gypsum Wholesale',
          scheduledDate: new Date(2026, 0, 12),
          status: 'pending',
        },
      ],
    },
    {
      id: 't9',
      name: 'Final Inspection',
      category: 'inspection',
      startDate: new Date(2026, 0, 28),
      endDate: new Date(2026, 0, 30),
      duration: 3,
      progress: 0,
      status: 'not-started',
      dependencies: ['t8'],
      assignedTo: 'City Building Dept',
      milestone: true,
    },
  ];

  const allDeliveries = tasks.flatMap(task => 
    (task.deliveries || []).map(delivery => ({ ...delivery, taskName: task.name }))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-500/20 text-gray-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'delayed': return 'bg-red-500/20 text-red-400';
      case 'blocked': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-400';
      case 'in-transit': return 'text-blue-400';
      case 'delivered': return 'text-green-400';
      case 'delayed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      design: 'bg-purple-500',
      permits: 'bg-yellow-500',
      'site-prep': 'bg-orange-500',
      foundation: 'bg-red-500',
      framing: 'bg-blue-500',
      electrical: 'bg-yellow-400',
      plumbing: 'bg-cyan-500',
      finishing: 'bg-green-500',
      inspection: 'bg-teal-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  const projectStart = new Date(Math.min(...tasks.map(t => t.startDate.getTime())));
  const projectEnd = new Date(Math.max(...tasks.map(t => t.endDate.getTime())));
  const totalDays = Math.ceil((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalProgress = Math.round((tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                📊 Project Timeline & Supply Chain
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {tasks.length} tasks • {totalDays} days • {totalProgress}% complete
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-gray-400 text-sm mb-1">Total Tasks</div>
              <div className="text-2xl font-bold text-white">{tasks.length}</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
              <div className="text-green-400 text-sm mb-1">Completed</div>
              <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="text-blue-400 text-sm mb-1">Overall Progress</div>
              <div className="text-2xl font-bold text-blue-400">{totalProgress}%</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-gray-400 text-sm mb-1">Deliveries</div>
              <div className="text-2xl font-bold text-white">{allDeliveries.length}</div>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2">
            {[
              { value: 'gantt', label: 'Gantt Chart', icon: '📊' },
              { value: 'list', label: 'Task List', icon: '📋' },
              { value: 'deliveries', label: 'Supply Chain', icon: '🚚' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setViewMode(tab.value as any)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === tab.value
                    ? 'bg-teal-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === 'gantt' && (
            <div className="space-y-2">
              {tasks.map(task => {
                const daysSinceStart = Math.ceil((task.startDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));
                const leftPercent = (daysSinceStart / totalDays) * 100;
                const widthPercent = (task.duration / totalDays) * 100;

                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTask?.id === task.id
                        ? 'bg-teal-500/20 border-teal-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{task.name}</span>
                          {task.milestone && (
                            <span className="text-yellow-400">⭐</span>
                          )}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()} • {task.duration} days
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>

                    {/* Gantt Bar */}
                    <div className="relative h-8 bg-white/5 rounded">
                      <div
                        className={`absolute top-0 bottom-0 rounded ${getCategoryColor(task.category)}`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                      >
                        <div
                          className="h-full bg-white/30 rounded-l"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{task.assignedTo}</span>
                      <span>{task.progress}% complete</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTask?.id === task.id
                      ? 'bg-teal-500/20 border-teal-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(task.category)}`} />
                        <span className="text-white font-semibold">{task.name}</span>
                        {task.milestone && <span className="text-yellow-400">⭐</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-gray-400">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
                        </div>
                        <div className="text-gray-400">
                          Duration: {task.duration} days
                        </div>
                        <div className="text-gray-400">
                          Assigned: {task.assignedTo}
                        </div>
                        <div className="text-gray-400">
                          Progress: {task.progress}%
                        </div>
                      </div>
                      {task.dependencies.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          Dependencies: {task.dependencies.join(', ')}
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'deliveries' && (
            <div className="space-y-4">
              {allDeliveries.map(delivery => (
                <div
                  key={delivery.id}
                  className="p-4 bg-white/5 border border-white/10 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-white font-semibold flex items-center gap-2">
                        <Package className="w-5 h-5 text-teal-400" />
                        {delivery.item}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">For: {delivery.taskName}</div>
                    </div>
                    <span className={`text-sm font-medium ${getDeliveryStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-400">
                      <Truck className="w-4 h-4 inline mr-1" />
                      Vendor: {delivery.vendor}
                    </div>
                    <div className="text-gray-400">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Scheduled: {delivery.scheduledDate.toLocaleDateString()}
                    </div>
                    {delivery.trackingNumber && (
                      <div className="text-gray-400 col-span-2">
                        Tracking: {delivery.trackingNumber}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-6 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500" />
              <span className="text-gray-400">Design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500" />
              <span className="text-gray-400">Permits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500" />
              <span className="text-gray-400">Site Prep</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-gray-400">Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              <span className="text-gray-400">Framing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-400" />
              <span className="text-gray-400">Electrical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-500" />
              <span className="text-gray-400">Plumbing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-gray-400">Finishing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-gray-400">Milestone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

