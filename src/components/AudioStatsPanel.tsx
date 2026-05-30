import { useState } from 'react';
import { customAudioManager } from '../utils/customAudio';
import { Button } from './ui/button';
import { Info, X } from 'lucide-react';

/**
 * Debug panel to show custom audio statistics
 * Shows how many custom recordings are configured
 * This is helpful while you're adding your recordings
 */
export function AudioStatsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const stats = customAudioManager.getStats();

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 rounded-full shadow-lg bg-white/90 hover:bg-white"
      >
        <Info className="h-4 w-4 mr-2" />
        Audio Stats
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-purple-700 flex items-center gap-2">
          <Info className="h-5 w-5" />
          Custom Audio Stats
        </h3>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Vocabulary Words</span>
            <span className="text-sm font-semibold text-purple-600">
              {stats.words} / 50
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.percentage.words}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {stats.percentage.words}% complete
          </span>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Story Scenes</span>
            <span className="text-sm font-semibold text-blue-600">
              {stats.scenes} / 40
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.percentage.scenes}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {stats.percentage.scenes}% complete
          </span>
        </div>

        {stats.examples > 0 && (
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Example Sentences</span>
              <span className="text-sm font-semibold text-green-600">
                {stats.examples}
              </span>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">Total Recordings</span>
            <span className="text-lg font-bold text-purple-600">
              {stats.total}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 Add more in <code className="bg-gray-100 px-1 rounded">/utils/customAudio.ts</code>
      </p>
    </div>
  );
}
