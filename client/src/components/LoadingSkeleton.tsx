export function ToolPanelSkeleton() {
  return (
    <div className="h-full flex flex-col bg-[#0a0e14] animate-pulse">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-white/10">
        <div className="h-6 bg-white/10 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-2/3"></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 bg-white/5 rounded-xl">
            <div className="h-5 bg-white/10 rounded w-1/2 mb-3"></div>
            <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/10 animate-pulse">
      <div className="aspect-video bg-white/10 rounded-lg mb-3"></div>
      <div className="h-5 bg-white/10 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-white/5 rounded w-full mb-1"></div>
      <div className="h-4 bg-white/5 rounded w-2/3"></div>
    </div>
  );
}

export function MaterialCardSkeleton() {
  return (
    <div className="p-3 bg-white/5 rounded-lg border border-white/10 animate-pulse">
      <div className="aspect-square bg-white/10 rounded-lg mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-3/4 mb-1"></div>
      <div className="h-3 bg-white/5 rounded w-1/2"></div>
    </div>
  );
}

export function ChatMessageSkeleton() {
  return (
    <div className="flex items-start gap-3 animate-pulse">
      <div className="w-8 h-8 bg-white/10 rounded-full flex-shrink-0"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-5/6"></div>
        <div className="h-4 bg-white/5 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-[#0a0e14] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">Loading ARDO...</p>
      </div>
    </div>
  );
}

export function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mr-3"></div>
      <span className="text-gray-400 text-sm">{text}</span>
    </div>
  );
}

