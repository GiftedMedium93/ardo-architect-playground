import { Mic, MicOff, Volume2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface VoiceCommandsProps {
  onCommand: (command: string) => void;
}

export default function VoiceCommands({ onCommand }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const startListening = () => {
    if (!isSupported) {
      toast.error("Voice commands not supported in this browser");
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast.success("Listening...");
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        processCommand(transcriptText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast.error(`Voice error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript("");
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Command mapping
    const commandMap: Record<string, string> = {
      'open ai partners': 'ai-partners',
      'show ai partners': 'ai-partners',
      'open materials': 'materials',
      'show material library': 'materials',
      'open rendering': 'rendering',
      'show rendering': 'rendering',
      'open compliance': 'compliance',
      'check compliance': 'compliance',
      'open cost optimizer': 'cost',
      'show cost': 'cost',
      'open contractors': 'contractors',
      'find contractors': 'contractors',
      'open scheduling': 'scheduling',
      'show schedule': 'scheduling',
      'open inventory': 'inventory',
      'show inventory': 'inventory',
      'open marketplace': 'marketplace',
      'show marketplace': 'marketplace',
      'open invoicing': 'invoicing',
      'show invoices': 'invoicing',
      'open timeline': 'timeline',
      'show timeline': 'timeline',
      'open analytics': 'analytics',
      'show analytics': 'analytics',
      'undo': 'undo',
      'redo': 'redo',
      'save project': 'save',
      'load model': 'load-model',
      'toggle theme': 'theme',
      'switch theme': 'theme',
      'help': 'help',
      'show help': 'help',
    };

    // Find matching command
    for (const [phrase, action] of Object.entries(commandMap)) {
      if (lowerCommand.includes(phrase)) {
        onCommand(action);
        toast.success(`Executing: ${phrase}`);
        setTranscript("");
        return;
      }
    }

    // No match found
    toast.info(`Command not recognized: "${command}"`);
    setTranscript("");
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="flex flex-col items-end gap-2">
        {/* Transcript Display */}
        {transcript && (
          <div className="bg-[#0f1419] border border-teal-500/50 rounded-lg p-3 max-w-xs shadow-lg">
            <div className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
              <p className="text-white text-sm">{transcript}</p>
            </div>
          </div>
        )}

        {/* Voice Button */}
        <Button
          onClick={isListening ? stopListening : startListening}
          className={`w-14 h-14 rounded-full shadow-lg transition-all ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-teal-500 hover:bg-teal-600'
          }`}
          disabled={!isSupported}
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </Button>

        {/* Help Text */}
        {!isListening && (
          <div className="text-xs text-gray-500 text-right">
            {isSupported ? 'Click to speak' : 'Not supported'}
          </div>
        )}
      </div>
    </div>
  );
}

