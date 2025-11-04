import { Cloud, CloudOff, Check, Loader2, AlertCircle } from "lucide-react";
import { SyncStatus, formatSyncTime } from "@/hooks/useCloudSync";

interface CloudSyncIndicatorProps {
  status: SyncStatus;
  lastSyncTime: Date | null;
  pendingChanges: boolean;
  onSync?: () => void;
}

export default function CloudSyncIndicator({
  status,
  lastSyncTime,
  pendingChanges,
  onSync,
}: CloudSyncIndicatorProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'syncing':
        return <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'synced':
        return <Check className="w-4 h-4 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return pendingChanges ? (
          <Cloud className="w-4 h-4 text-yellow-400" />
        ) : (
          <Cloud className="w-4 h-4 text-gray-400" />
        );
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'syncing':
        return 'Syncing...';
      case 'synced':
        return `Synced ${formatSyncTime(lastSyncTime)}`;
      case 'error':
        return 'Sync failed';
      default:
        return pendingChanges ? 'Pending sync' : `Synced ${formatSyncTime(lastSyncTime)}`;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'syncing':
        return 'text-blue-400';
      case 'synced':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return pendingChanges ? 'text-yellow-400' : 'text-gray-500';
    }
  };

  return (
    <button
      onClick={onSync}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
      title={getStatusText()}
    >
      {getStatusIcon()}
      <span className={`text-xs font-medium ${getStatusColor()} group-hover:text-white transition-colors`}>
        {getStatusText()}
      </span>
    </button>
  );
}

