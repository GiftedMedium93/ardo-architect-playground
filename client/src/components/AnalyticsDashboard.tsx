import { X, TrendingUp, Clock, MousePointer, Layers, BarChart3, Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalyticsData {
  totalSessions: number;
  totalTime: number; // in minutes
  toolUsage: { [key: string]: number };
  panelsOpened: { [key: string]: number };
  projectsCreated: number;
  modelsLoaded: number;
  lastSession: Date;
}

interface AnalyticsDashboardProps {
  onClose: () => void;
}

export default function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    totalTime: 0,
    toolUsage: {},
    panelsOpened: {},
    projectsCreated: 0,
    modelsLoaded: 0,
    lastSession: new Date(),
  });

  useEffect(() => {
    // Load analytics from localStorage
    const stored = localStorage.getItem("ardo_analytics");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnalytics({
        ...parsed,
        lastSession: new Date(parsed.lastSession),
      });
    }
  }, []);

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTopTools = () => {
    return Object.entries(analytics.toolUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getTopPanels = () => {
    return Object.entries(analytics.panelsOpened)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const stats = [
    {
      icon: Activity,
      label: "Total Sessions",
      value: analytics.totalSessions,
      color: "text-teal-400",
      bg: "bg-teal-500/10",
    },
    {
      icon: Clock,
      label: "Total Time",
      value: formatTime(analytics.totalTime),
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Layers,
      label: "Projects Created",
      value: analytics.projectsCreated,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      icon: MousePointer,
      label: "Models Loaded",
      value: analytics.modelsLoaded,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-12 z-50 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-6xl m-6 animate-in slide-in-from-top duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-light text-white">Analytics Dashboard</h2>
              <p className="text-sm text-gray-500">
                Track your usage and productivity
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border border-white/10 ${stat.bg} backdrop-blur-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
                <div className="text-3xl font-light text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Tools */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-teal-400" />
                Top Tools Used
              </h3>
              <div className="space-y-3">
                {getTopTools().length > 0 ? (
                  getTopTools().map(([tool, count], index) => {
                    const maxCount = Math.max(...Object.values(analytics.toolUsage));
                    const percentage = (count / maxCount) * 100;
                    return (
                      <div key={tool}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300 capitalize">
                            {tool.replace("-", " ")}
                          </span>
                          <span className="text-sm text-gray-500">{count} uses</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No tool usage data yet
                  </p>
                )}
              </div>
            </div>

            {/* Top Panels */}
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                Most Opened Panels
              </h3>
              <div className="space-y-3">
                {getTopPanels().length > 0 ? (
                  getTopPanels().map(([panel, count]) => {
                    const maxCount = Math.max(...Object.values(analytics.panelsOpened));
                    const percentage = (count / maxCount) * 100;
                    return (
                      <div key={panel}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300 capitalize">
                            {panel.replace("-", " ")}
                          </span>
                          <span className="text-sm text-gray-500">{count} opens</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No panel usage data yet
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-light text-white mb-4">Session Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Last Session</div>
                <div className="text-white">
                  {analytics.lastSession.toLocaleDateString()} at{" "}
                  {analytics.lastSession.toLocaleTimeString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Average Session</div>
                <div className="text-white">
                  {analytics.totalSessions > 0
                    ? formatTime(Math.round(analytics.totalTime / analytics.totalSessions))
                    : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Tools per Session</div>
                <div className="text-white">
                  {analytics.totalSessions > 0
                    ? Math.round(
                        Object.values(analytics.toolUsage).reduce((a, b) => a + b, 0) /
                          analytics.totalSessions
                      )
                    : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions to track analytics
export function trackToolUsage(toolName: string) {
  const stored = localStorage.getItem("ardo_analytics");
  const analytics: AnalyticsData = stored
    ? JSON.parse(stored)
    : {
        totalSessions: 0,
        totalTime: 0,
        toolUsage: {},
        panelsOpened: {},
        projectsCreated: 0,
        modelsLoaded: 0,
        lastSession: new Date(),
      };

  analytics.toolUsage[toolName] = (analytics.toolUsage[toolName] || 0) + 1;
  localStorage.setItem("ardo_analytics", JSON.stringify(analytics));
}

export function trackPanelOpen(panelName: string) {
  const stored = localStorage.getItem("ardo_analytics");
  const analytics: AnalyticsData = stored
    ? JSON.parse(stored)
    : {
        totalSessions: 0,
        totalTime: 0,
        toolUsage: {},
        panelsOpened: {},
        projectsCreated: 0,
        modelsLoaded: 0,
        lastSession: new Date(),
      };

  analytics.panelsOpened[panelName] = (analytics.panelsOpened[panelName] || 0) + 1;
  localStorage.setItem("ardo_analytics", JSON.stringify(analytics));
}

export function trackSession() {
  const stored = localStorage.getItem("ardo_analytics");
  const analytics: AnalyticsData = stored
    ? JSON.parse(stored)
    : {
        totalSessions: 0,
        totalTime: 0,
        toolUsage: {},
        panelsOpened: {},
        projectsCreated: 0,
        modelsLoaded: 0,
        lastSession: new Date(),
      };

  analytics.totalSessions += 1;
  analytics.lastSession = new Date();
  localStorage.setItem("ardo_analytics", JSON.stringify(analytics));

  // Track session time
  const sessionStart = Date.now();
  window.addEventListener("beforeunload", () => {
    const sessionEnd = Date.now();
    const sessionTime = Math.round((sessionEnd - sessionStart) / 60000); // Convert to minutes
    const current = localStorage.getItem("ardo_analytics");
    if (current) {
      const data = JSON.parse(current);
      data.totalTime += sessionTime;
      localStorage.setItem("ardo_analytics", JSON.stringify(data));
    }
  });
}

