import { X, Bell, Check, AlertTriangle, Info, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  onClose: () => void;
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem("ardo_notifications");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifications(
        parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
      );
    } else {
      // Add some initial notifications
      const initial: Notification[] = [
        {
          id: "1",
          type: "success",
          title: "Welcome to ARDO",
          message: "Your architectural design platform is ready to use!",
          timestamp: new Date(),
          read: false,
        },
        {
          id: "2",
          type: "info",
          title: "Tip: Keyboard Shortcuts",
          message: "Press '?' to view all available keyboard shortcuts",
          timestamp: new Date(Date.now() - 60000),
          read: false,
        },
      ];
      setNotifications(initial);
      localStorage.setItem("ardo_notifications", JSON.stringify(initial));
    }
  }, []);

  const saveNotifications = (notifs: Notification[]) => {
    localStorage.setItem("ardo_notifications", JSON.stringify(notifs));
    setNotifications(notifs);
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  };

  const clearAll = () => {
    saveNotifications([]);
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-green-400" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/30";
      case "error":
        return "bg-red-500/10 border-red-500/30";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "info":
        return "bg-blue-500/10 border-blue-500/30";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 z-50 animate-in fade-in duration-200">
      <div className="bg-[#0f1419] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-top duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-light text-white">Notifications</h2>
              <p className="text-sm text-gray-500">
                {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
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

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-teal-500/20 text-teal-400"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "unread"
                ? "bg-teal-500/20 text-teal-400"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Unread ({unreadCount})
          </button>

          <div className="flex-1" />

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 text-lg">No notifications</p>
              <p className="text-gray-600 text-sm mt-2">
                You're all caught up!
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-all ${
                  notification.read
                    ? "bg-white/5 border-white/10"
                    : `${getTypeColor(notification.type)} border`
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-sm font-medium ${
                          notification.read ? "text-gray-400" : "text-white"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to add notifications from anywhere in the app
export function addNotification(
  type: Notification["type"],
  title: string,
  message: string
) {
  const stored = localStorage.getItem("ardo_notifications");
  const notifications: Notification[] = stored ? JSON.parse(stored) : [];

  const newNotification: Notification = {
    id: Date.now().toString(),
    type,
    title,
    message,
    timestamp: new Date(),
    read: false,
  };

  notifications.unshift(newNotification);
  localStorage.setItem("ardo_notifications", JSON.stringify(notifications));

  // Dispatch custom event to update UI
  window.dispatchEvent(new CustomEvent("ardo-notification-added"));
}

