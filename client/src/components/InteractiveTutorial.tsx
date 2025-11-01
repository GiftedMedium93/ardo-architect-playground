import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to ARDO Architect Playground! 🎉",
    description: "Let's take a quick tour of the most powerful architectural design platform ever created. This will only take 2 minutes.",
    target: "center",
    position: "center",
  },
  {
    id: 2,
    title: "3D Design Canvas",
    description: "This is your main workspace. Rotate, zoom, and interact with 3D models using your mouse. Try dragging to rotate the view!",
    target: "canvas",
    position: "center",
  },
  {
    id: 3,
    title: "Design Tools Panel",
    description: "Access all 7 major design tools here: AI Design Partners, Real-time Rendering, Compliance Check, Cost Optimizer, Material Library, Acoustic Analysis, and VR/AR Preview.",
    target: "tools-panel",
    position: "left",
  },
  {
    id: 4,
    title: "AI Design Partners",
    description: "Chat with 14 specialized AI architects! Each partner brings unique expertise - from parametric design to sustainable architecture. Click to open and start a conversation.",
    target: "ai-partners",
    position: "left",
  },
  {
    id: 5,
    title: "Material Library",
    description: "Browse 6,000+ materials. Drag any material card onto the 3D canvas to apply it to objects. Try it now!",
    target: "materials",
    position: "left",
  },
  {
    id: 6,
    title: "Project Management",
    description: "Click 'File' in the top menu to create, save, and manage multiple projects. All your work is automatically saved to the cloud.",
    target: "file-menu",
    position: "bottom",
  },
  {
    id: 7,
    title: "Left Toolbar",
    description: "Quick access to essential tools: Select, Draw, 3D View, Materials, Lighting, and Measurements. Each tool has a keyboard shortcut shown below the icon.",
    target: "left-toolbar",
    position: "right",
  },
  {
    id: 8,
    title: "You're All Set! 🚀",
    description: "You now know the essentials of ARDO. Start creating your first architectural masterpiece, or explore the advanced features at your own pace. Happy designing!",
    target: "center",
    position: "center",
  },
];

interface InteractiveTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function InteractiveTutorial({ onComplete, onSkip }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = tutorialSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" />

      {/* Tutorial Card */}
      <div
        className={`fixed z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
          step.position === "center"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : step.position === "top"
            ? "top-24 left-1/2 -translate-x-1/2"
            : step.position === "bottom"
            ? "bottom-24 left-1/2 -translate-x-1/2"
            : step.position === "left"
            ? "top-1/2 right-24 -translate-y-1/2"
            : "top-1/2 left-24 -translate-y-1/2"
        }`}
      >
        <div className="w-[480px] bg-gradient-to-br from-[#0f1419] to-[#0a0e14] border-2 border-teal-400/50 rounded-2xl shadow-2xl shadow-teal-500/20 overflow-hidden">
          {/* Header */}
          <div className="relative p-6 pb-4 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-teal-400 font-medium">
                    Step {currentStep + 1} of {tutorialSteps.length}
                  </div>
                  <h3 className="text-xl font-medium text-white">{step.title}</h3>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            <p className="text-gray-300 leading-relaxed mb-6">{step.description}</p>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <Button
                onClick={handlePrevious}
                disabled={isFirstStep}
                variant="outline"
                className="bg-transparent border-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-1.5">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? "w-6 bg-teal-400"
                        : index < currentStep
                        ? "w-2 bg-teal-400/50"
                        : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
              >
                {isLastStep ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Finish
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Skip Link */}
            {!isLastStep && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Skip tutorial
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

