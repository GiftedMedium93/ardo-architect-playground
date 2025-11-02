import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, Bug } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Here you could send error to an error reporting service
    // Example: Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-[#0a0e14] via-[#0f1419] to-[#0a0e14]">
          <div className="flex flex-col items-center w-full max-w-3xl p-8">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mb-6 animate-pulse">
              <AlertTriangle
                size={40}
                className="text-red-500"
              />
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-light text-white mb-2">Something went wrong</h1>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              We apologize for the inconvenience. An unexpected error has occurred in the ARDO platform.
            </p>

            {/* Error Details (Collapsible) */}
            <details className="w-full mb-6">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300 mb-2 flex items-center gap-2">
                <Bug size={16} />
                View technical details
              </summary>
              <div className="p-4 w-full rounded-lg bg-black/30 border border-white/10 overflow-auto max-h-64">
                <div className="text-xs text-red-400 font-semibold mb-2">
                  {this.state.error?.name}: {this.state.error?.message}
                </div>
                <pre className="text-xs text-gray-500 whitespace-pre-wrap break-words">
                  {this.state.error?.stack}
                </pre>
              </div>
            </details>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg",
                  "bg-gradient-to-r from-teal-500 to-cyan-500",
                  "hover:from-teal-400 hover:to-cyan-400",
                  "text-white font-medium transition-all",
                  "shadow-lg shadow-teal-500/20"
                )}
              >
                <RotateCcw size={18} />
                Reload Application
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-lg",
                  "bg-white/5 border border-white/10",
                  "hover:bg-white/10",
                  "text-white font-medium transition-all"
                )}
              >
                <Home size={18} />
                Go to Home
              </button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-600 mt-8 text-center max-w-md">
              If this problem persists, please contact support or try clearing your browser cache.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
