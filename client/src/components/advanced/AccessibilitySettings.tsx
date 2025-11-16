import { ChevronLeft, Eye, Contrast, Type, Keyboard, Volume2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AccessibilitySettingsProps {
  onClose: () => void;
}

type ColorBlindnessMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
type ContrastMode = 'normal' | 'high' | 'ultra';
type FontSize = 'normal' | 'large' | 'extra-large';

export default function AccessibilitySettings({ onClose }: AccessibilitySettingsProps) {
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindnessMode>(() => {
    return (localStorage.getItem('ardo-color-blind-mode') as ColorBlindnessMode) || 'none';
  });
  
  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    return (localStorage.getItem('ardo-contrast-mode') as ContrastMode) || 'normal';
  });
  
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('ardo-font-size') as FontSize) || 'normal';
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    return localStorage.getItem('ardo-reduced-motion') === 'true';
  });
  
  const [screenReaderMode, setScreenReaderMode] = useState(() => {
    return localStorage.getItem('ardo-screen-reader') === 'true';
  });
  
  const [keyboardNavigation, setKeyboardNavigation] = useState(() => {
    return localStorage.getItem('ardo-keyboard-nav') === 'true';
  });

  // Apply color blindness filter
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all existing filters
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
    
    if (colorBlindMode !== 'none') {
      root.classList.add(colorBlindMode);
    }
    
    localStorage.setItem('ardo-color-blind-mode', colorBlindMode);
  }, [colorBlindMode]);

  // Apply contrast mode
  useEffect(() => {
    const root = document.documentElement;
    
    root.classList.remove('contrast-high', 'contrast-ultra');
    
    if (contrastMode === 'high') {
      root.classList.add('contrast-high');
    } else if (contrastMode === 'ultra') {
      root.classList.add('contrast-ultra');
    }
    
    localStorage.setItem('ardo-contrast-mode', contrastMode);
  }, [contrastMode]);

  // Apply font size
  useEffect(() => {
    const root = document.documentElement;
    
    root.classList.remove('font-large', 'font-extra-large');
    
    if (fontSize === 'large') {
      root.classList.add('font-large');
    } else if (fontSize === 'extra-large') {
      root.classList.add('font-extra-large');
    }
    
    localStorage.setItem('ardo-font-size', fontSize);
  }, [fontSize]);

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement;
    
    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    localStorage.setItem('ardo-reduced-motion', reducedMotion.toString());
  }, [reducedMotion]);

  // Apply screen reader mode
  useEffect(() => {
    const root = document.documentElement;
    
    if (screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }
    
    localStorage.setItem('ardo-screen-reader', screenReaderMode.toString());
  }, [screenReaderMode]);

  // Apply keyboard navigation
  useEffect(() => {
    const root = document.documentElement;
    
    if (keyboardNavigation) {
      root.classList.add('keyboard-nav-enabled');
    } else {
      root.classList.remove('keyboard-nav-enabled');
    }
    
    localStorage.setItem('ardo-keyboard-nav', keyboardNavigation.toString());
  }, [keyboardNavigation]);

  const colorBlindModes = [
    { id: 'none', name: 'None', description: 'Standard color vision' },
    { id: 'protanopia', name: 'Protanopia', description: 'Red-blind (1% of males)' },
    { id: 'deuteranopia', name: 'Deuteranopia', description: 'Green-blind (1% of males)' },
    { id: 'tritanopia', name: 'Tritanopia', description: 'Blue-blind (rare)' },
    { id: 'achromatopsia', name: 'Achromatopsia', description: 'Complete color blindness (very rare)' }
  ];

  const resetAllSettings = () => {
    setColorBlindMode('none');
    setContrastMode('normal');
    setFontSize('normal');
    setReducedMotion(false);
    setScreenReaderMode(false);
    setKeyboardNavigation(false);
    toast.success('All accessibility settings reset to defaults');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-[#0f1419]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-all"
              aria-label="Close accessibility settings"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h3 className="text-lg font-light tracking-wide">Accessibility Settings</h3>
              <p className="text-xs text-gray-500">WCAG AA/AAA Compliance & Universal Design</p>
            </div>
          </div>
          <button
            onClick={resetAllSettings}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all"
          >
            Reset All
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Color Blindness Modes */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Color Blindness Modes</h4>
            </div>
            <div className="space-y-2">
              {colorBlindModes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setColorBlindMode(mode.id as ColorBlindnessMode);
                    toast.success(`Color blindness mode: ${mode.name}`);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                    colorBlindMode === mode.id
                      ? 'bg-teal-500/20 border-teal-500/30 text-teal-400'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                  aria-pressed={colorBlindMode === mode.id}
                >
                  <div className="text-left">
                    <div className="font-medium">{mode.name}</div>
                    <div className="text-xs text-gray-400">{mode.description}</div>
                  </div>
                  {colorBlindMode === mode.id && <CheckCircle2 className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </section>

          {/* Contrast Mode */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Contrast className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Contrast Mode</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'normal', name: 'Normal', description: 'Standard contrast' },
                { id: 'high', name: 'High Contrast', description: 'WCAG AA compliant' },
                { id: 'ultra', name: 'Ultra High', description: 'WCAG AAA compliant' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setContrastMode(mode.id as ContrastMode);
                    toast.success(`Contrast mode: ${mode.name}`);
                  }}
                  className={`p-4 rounded-lg border transition-all ${
                    contrastMode === mode.id
                      ? 'bg-teal-500/20 border-teal-500/30 text-teal-400'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                  aria-pressed={contrastMode === mode.id}
                >
                  <div className="font-medium mb-1">{mode.name}</div>
                  <div className="text-xs text-gray-400">{mode.description}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Font Size */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Font Size</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'normal', name: 'Normal', size: '100%' },
                { id: 'large', name: 'Large', size: '125%' },
                { id: 'extra-large', name: 'Extra Large', size: '150%' }
              ].map(size => (
                <button
                  key={size.id}
                  onClick={() => {
                    setFontSize(size.id as FontSize);
                    toast.success(`Font size: ${size.name}`);
                  }}
                  className={`p-4 rounded-lg border transition-all ${
                    fontSize === size.id
                      ? 'bg-teal-500/20 border-teal-500/30 text-teal-400'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                  aria-pressed={fontSize === size.id}
                >
                  <div className="font-medium mb-1">{size.name}</div>
                  <div className="text-xs text-gray-400">{size.size}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Motion & Animation */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Motion & Animation</h4>
            </div>
            <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
              <div>
                <div className="font-medium text-white">Reduce Motion</div>
                <div className="text-xs text-gray-400">Minimize animations and transitions</div>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => {
                  setReducedMotion(e.target.checked);
                  toast.success(e.target.checked ? 'Reduced motion enabled' : 'Reduced motion disabled');
                }}
                className="w-5 h-5 accent-teal-500"
                aria-label="Reduce motion"
              />
            </label>
          </section>

          {/* Screen Reader */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Screen Reader</h4>
            </div>
            <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
              <div>
                <div className="font-medium text-white">Screen Reader Optimization</div>
                <div className="text-xs text-gray-400">Enhanced ARIA labels and descriptions</div>
              </div>
              <input
                type="checkbox"
                checked={screenReaderMode}
                onChange={(e) => {
                  setScreenReaderMode(e.target.checked);
                  toast.success(e.target.checked ? 'Screen reader mode enabled' : 'Screen reader mode disabled');
                }}
                className="w-5 h-5 accent-teal-500"
                aria-label="Screen reader optimization"
              />
            </label>
          </section>

          {/* Keyboard Navigation */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Keyboard className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-medium text-white">Keyboard Navigation</h4>
            </div>
            <label className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
              <div>
                <div className="font-medium text-white">Enhanced Keyboard Navigation</div>
                <div className="text-xs text-gray-400">Visible focus indicators and skip links</div>
              </div>
              <input
                type="checkbox"
                checked={keyboardNavigation}
                onChange={(e) => {
                  setKeyboardNavigation(e.target.checked);
                  toast.success(e.target.checked ? 'Keyboard navigation enhanced' : 'Keyboard navigation standard');
                }}
                className="w-5 h-5 accent-teal-500"
                aria-label="Enhanced keyboard navigation"
              />
            </label>
          </section>

          {/* WCAG Compliance Info */}
          <section className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-400 mb-2">WCAG Compliance Status</h4>
            <div className="space-y-1 text-xs text-blue-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>WCAG 2.1 Level AA: {contrastMode !== 'normal' ? 'Compliant' : 'Standard'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>WCAG 2.1 Level AAA: {contrastMode === 'ultra' ? 'Compliant' : 'Not enabled'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>Keyboard Accessible: {keyboardNavigation ? 'Enhanced' : 'Standard'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3" />
                <span>Screen Reader Compatible: {screenReaderMode ? 'Optimized' : 'Standard'}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

