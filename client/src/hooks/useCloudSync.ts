import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface CloudSyncOptions {
  autoSync?: boolean;
  syncInterval?: number; // in milliseconds
  onSyncComplete?: () => void;
  onSyncError?: (error: Error) => void;
}

export function useCloudSync(
  projectId: string | null,
  options: CloudSyncOptions = {}
) {
  const {
    autoSync = true,
    syncInterval = 30000, // 30 seconds
    onSyncComplete,
    onSyncError,
  } = options;

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [pendingChanges, setPendingChanges] = useState(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastDataRef = useRef<string>('');

  // Sync function will be provided by the component using this hook
  const syncFunctionRef = useRef<((data: any) => Promise<void>) | null>(null);

  const syncToCloud = useCallback(
    async (data: { sceneData?: string; thumbnail?: string; name?: string; description?: string }) => {
      if (!projectId || !syncFunctionRef.current) return;

      const dataString = JSON.stringify(data);
      
      // Don't sync if data hasn't changed
      if (dataString === lastDataRef.current) {
        return;
      }

      lastDataRef.current = dataString;
      setSyncStatus('syncing');

      try {
        await syncFunctionRef.current(data);
        setSyncStatus('synced');
        setLastSyncTime(new Date());
        setPendingChanges(false);
        onSyncComplete?.();
        
        // Reset to idle after 2 seconds
        setTimeout(() => {
          setSyncStatus('idle');
        }, 2000);
      } catch (error) {
        console.error('Sync error:', error);
        setSyncStatus('error');
        onSyncError?.(error as any);
        toast.error('Failed to sync project');
      }
    },
    [projectId, onSyncComplete, onSyncError]
  );

  const markDirty = useCallback(() => {
    setPendingChanges(true);
    setSyncStatus('idle');
  }, []);

  const forceSyncNow = useCallback(() => {
    if (pendingChanges && projectId) {
      // Get current scene data from localStorage
      const sceneData = localStorage.getItem(`ardo_scene_${projectId}`);
      if (sceneData) {
        syncToCloud({ sceneData });
      }
    }
  }, [pendingChanges, projectId, syncToCloud]);

  // Auto-sync on interval
  useEffect(() => {
    if (!autoSync || !projectId || !pendingChanges) return;

    syncTimeoutRef.current = setTimeout(() => {
      forceSyncNow();
    }, syncInterval);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [autoSync, projectId, pendingChanges, syncInterval, forceSyncNow]);

  // Sync on window blur (user switching tabs)
  useEffect(() => {
    if (!autoSync || !projectId) return;

    const handleBlur = () => {
      if (pendingChanges) {
        forceSyncNow();
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [autoSync, projectId, pendingChanges, forceSyncNow]);

  // Sync before unload
  useEffect(() => {
    if (!autoSync || !projectId) return;

    const handleBeforeUnload = () => {
      if (pendingChanges) {
        // Synchronous save to localStorage as backup
        const sceneData = localStorage.getItem(`ardo_scene_${projectId}`);
        if (sceneData) {
          localStorage.setItem(`ardo_pending_sync_${projectId}`, sceneData);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [autoSync, projectId, pendingChanges]);

  const setSyncFunction = useCallback((fn: (data: any) => Promise<void>) => {
    syncFunctionRef.current = fn;
  }, []);

  return {
    syncStatus,
    lastSyncTime,
    pendingChanges,
    syncToCloud,
    markDirty,
    forceSyncNow,
    setSyncFunction,
  };
}

// Helper to format last sync time
export function formatSyncTime(date: Date | null): string {
  if (!date) return 'Never';

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

