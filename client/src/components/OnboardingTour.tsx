import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right";
  action?: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to ARDO!",
    description: "The world's most advanced architectural design and construction management platform. Let's take a quick tour of the key features.",
    target: "body",
    position: "bottom"
  },
  {
    title: "Command Palette",
    description: "Press Cmd+K (or Ctrl+K) anytime to instantly access all 45+ features with fuzzy search. This is the fastest way to navigate ARDO.",
    target: "[data-tour='command-palette']",
    position: "bottom",
    action: "Try pressing Cmd+K now!"
  },
  {
    title: "Design Tools",
    description: "Access 12 comprehensive design panels including Material Library (6,000+ materials), Real-time Rendering, Acoustic Analysis, and more.",
    target: "[data-tour='design-tools']",
    position: "right"
  },
  {
    title: "AI Design Partners",
    description: "Get instant design advice from 14 AI partners, each with unique architectural styles from Zaha Hadid to Frank Lloyd Wright.",
    target: "[data-tour='ai-partners']",
    position: "bottom"
  },
  {
    title: "Voice Commands",
    description: "Click the microphone button for hands-free operation. Say commands like 'open materials' or 'show contractors' to control ARDO with your voice.",
    target: "[data-tour='voice-commands']",
    position: "top",
    action: "Try saying a command!"
  },
  {
    title: "3D Product Visualizer",
    description: "Browse 62 real-world products and drag them directly into your 3D design. See exactly how materials and fixtures will look in your space.",
    target: "[data-tour='3d-products']",
    position: "left"
  },
  {
    title: "AI Suggestions",
    description: "Get real-time intelligent recommendations for material optimization, energy efficiency, code compliance, and design trends.",
    target: "[data-tour='ai-suggestions']",
    position: "left"
  },
  {
    title: "Construction Management",
    description: "Access contractor directory (18 contractors), scheduling, inventory, marketplace, invoicing, and project timeline—all in one place.",
    target: "[data-tour='construction']",
    position: "bottom",
    action: "Open via Command Palette (Cmd+K)"
  },
  {
    title: "Quick Actions",
    description: "Use the quick actions toolbar for instant save, undo/redo, export, and import. Keyboard shortcuts available for power users.",
    target: "[data-tour='quick-actions']",
    position: "bottom"
  },
  {
    title: "You're All Set!",
    description: "You now know the essentials of ARDO. Explore at your own pace, and remember: Cmd+K opens the command palette anytime you need help finding a feature.",
    target: "body",
    position: "bottom"
  }
];

interface OnboardingTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const target = document.querySelector(step.target);
      if (!target) {
        // Center on screen if target not found
        setPosition({
          top: window.innerHeight / 2,
          left: window.innerWidth / 2
        });
        return;
      }

      const rect = target.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (step.position) {
        case "top":
          top = rect.top - 20;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + 20;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - 20;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + 20;
          break;
      }

      setPosition({ top, left });

      // Highlight target element
      target.classList.add('tour-highlight');
      return () => target.classList.remove('tour-highlight');
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep, step, isVisible]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('ardo-tour-completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('ardo-tour-skipped', 'true');
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] pointer-events-none" />

      {/* Tour Card */}
      <div
        className="fixed z-[101] transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <div className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 border border-purple-500/50 rounded-2xl shadow-2xl p-6 max-w-md backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {currentStep + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <div className="flex gap-1 mb-3">
                {tourSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx <= currentStep ? 'bg-purple-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-gray-200 leading-relaxed mb-3">{step.description}</p>
            {step.action && (
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                <p className="text-purple-300 text-sm font-medium">💡 {step.action}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Finish
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Skip Option */}
          {!isLastStep && (
            <div className="mt-4 text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Skip tour
              </button>
            </div>
          )}
        </div>

        {/* Pointer Arrow */}
        <div
          className={`absolute w-0 h-0 border-8 ${
            step.position === 'top' ? 'border-t-purple-900/95 border-x-transparent border-b-transparent -bottom-4 left-1/2 -translate-x-1/2' :
            step.position === 'bottom' ? 'border-b-purple-900/95 border-x-transparent border-t-transparent -top-4 left-1/2 -translate-x-1/2' :
            step.position === 'left' ? 'border-l-purple-900/95 border-y-transparent border-r-transparent -right-4 top-1/2 -translate-y-1/2' :
            'border-r-purple-900/95 border-y-transparent border-l-transparent -left-4 top-1/2 -translate-y-1/2'
          }`}
        />
      </div>

      {/* CSS for highlight effect */}
      <style>{`
        .tour-highlight {
          position: relative;
          z-index: 99;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
          border-radius: 8px;
          animation: pulse-highlight 2s infinite;
        }
        
        @keyframes pulse-highlight {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.5);
          }
        }
      `}</style>
    </>
  );
}

