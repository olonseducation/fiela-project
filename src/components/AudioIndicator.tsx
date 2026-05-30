import { Mic, Volume2 } from 'lucide-react';

interface AudioIndicatorProps {
  isCustomAudio: boolean;
  className?: string;
}

/**
 * Visual indicator to show whether custom audio or computer voice is being used
 * This helps users know when they're hearing their own recordings vs. synthetic voice
 */
export function AudioIndicator({ isCustomAudio, className = '' }: AudioIndicatorProps) {
  if (isCustomAudio) {
    return (
      <div className={`inline-flex items-center gap-1 text-xs text-green-600 ${className}`}>
        <Mic className="h-3 w-3" />
        <span>Your Voice</span>
      </div>
    );
  }
  
  return (
    <div className={`inline-flex items-center gap-1 text-xs text-gray-500 ${className}`}>
      <Volume2 className="h-3 w-3" />
      <span>Computer Voice</span>
    </div>
  );
}
