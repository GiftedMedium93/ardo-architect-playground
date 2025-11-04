import { Users } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
  cursor?: { x: number; y: number };
  lastActive: Date;
}

interface CollaborationPresenceProps {
  projectId: string | null;
}

export default function CollaborationPresence({ projectId }: CollaborationPresenceProps) {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    if (!projectId) {
      setActiveUsers([]);
      return;
    }

    // Simulate active users (in production, this would come from WebSocket/real-time service)
    const mockUsers: User[] = [
      {
        id: "current-user",
        name: "You",
        avatar: "👤",
        color: "#14b8a6", // teal
        lastActive: new Date(),
      },
      // Add mock collaborators occasionally
      ...(Math.random() > 0.7
        ? [
            {
              id: "user-2",
              name: "Sarah Chen",
              avatar: "👩‍💼",
              color: "#8b5cf6", // purple
              lastActive: new Date(Date.now() - 120000),
            },
          ]
        : []),
      ...(Math.random() > 0.8
        ? [
            {
              id: "user-3",
              name: "Mike Johnson",
              avatar: "👨‍🔧",
              color: "#f59e0b", // amber
              lastActive: new Date(Date.now() - 300000),
            },
          ]
        : []),
    ];

    setActiveUsers(mockUsers);

    // Update active users periodically
    const interval = setInterval(() => {
      setActiveUsers((prev) =>
        prev.map((user) => ({
          ...user,
          lastActive: user.id === "current-user" ? new Date() : user.lastActive,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [projectId]);

  const getTimeSinceActive = (date: Date) => {
    const diff = new Date().getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Active now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  if (!projectId || activeUsers.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserList(!showUserList)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        title={`${activeUsers.length} active user${activeUsers.length !== 1 ? "s" : ""}`}
      >
        <Users className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
        <div className="flex -space-x-2">
          {activeUsers.slice(0, 3).map((user) => (
            <div
              key={user.id}
              className="w-6 h-6 rounded-full border-2 border-[#0f1419] flex items-center justify-center text-xs"
              style={{ backgroundColor: user.color }}
              title={user.name}
            >
              {user.avatar}
            </div>
          ))}
          {activeUsers.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-[#0f1419] bg-gray-700 flex items-center justify-center text-xs text-gray-300">
              +{activeUsers.length - 3}
            </div>
          )}
        </div>
      </button>

      {showUserList && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-[#0f1419] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-medium text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-400" />
              Active Users ({activeUsers.length})
            </h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {activeUsers.map((user) => (
              <div
                key={user.id}
                className="p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getTimeSinceActive(user.lastActive)}
                    </div>
                  </div>
                  {user.id === "current-user" && (
                    <div className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs rounded">
                      You
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-white/10 bg-white/5">
            <button className="w-full px-3 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 text-sm rounded-lg transition-all">
              Invite Collaborators
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

