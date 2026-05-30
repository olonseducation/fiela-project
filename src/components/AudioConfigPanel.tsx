import { useState, useEffect } from 'react';
import { AudioLines, FileAudio, Music } from 'lucide-react';
import { allAudioConfigs, getAudioStats } from '../utils/audioConfigHelper';

interface AudioConfigPanelProps {
  visible?: boolean;
}

export function AudioConfigPanel({ visible = false }: AudioConfigPanelProps) {
  const [isOpen, setIsOpen] = useState(visible);
  const [stats] = useState(getAudioStats());
  const [, setUnitBreakdown] = useState<any[]>([]);

  useEffect(() => {
    // Calculate stats per unit
    const breakdown = [1, 2, 3, 4, 5].map(unitId => {
      const unitWords = allAudioConfigs.filter(c => c.word && c.unitId === unitId);
      const unitScenes = allAudioConfigs.filter(c => c.unitId === unitId && c.sceneId);
      
      // Get unique words for this unit (cross-reference with units.ts)
      
      return {
        unitId,
        wordsConfigured: unitWords.length,
        scenesConfigured: unitScenes.length,
        totalWords: 10,
        totalScenes: 8,
      };
    });
    
    setUnitBreakdown(breakdown);
  }, []);

  const unitNames = [
    'My Morning Routine',
    'My Family',
    'In the Classroom',
    'My Favorite Food',
    'My Daily Activities'
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
        title="Open Audio Configuration Panel"
      >
        <FileAudio className="w-6 h-6" />
        <span className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Audio Config Helper
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-md z-50 border-4 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AudioLines className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-lg text-gray-800">Audio Configuration</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      {/* Overall Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Vocabulary</div>
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalWords}/50
            </div>
            <div className="text-xs text-gray-500">{stats.wordPercentage}% complete</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Scenes</div>
            <div className="text-2xl font-bold text-pink-600">
              {stats.totalScenes}/40
            </div>
            <div className="text-xs text-gray-500">{stats.scenePercentage}% complete</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm">
        <p className="text-blue-800 font-medium mb-1">📝 How to add audio:</p>
        <ol className="text-blue-700 text-xs space-y-1 ml-4 list-decimal">
          <li>Add MP3 files to <code className="bg-blue-100 px-1 rounded">/public/audio/</code></li>
          <li>Edit <code className="bg-blue-100 px-1 rounded">/utils/audioConfigHelper.ts</code></li>
          <li>Uncomment lines for your files</li>
        </ol>
      </div>

      {/* Per-Unit Breakdown */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {[1, 2, 3, 4, 5].map((unitId, idx) => {
          const unitScenes = allAudioConfigs.filter(
            c => c.unitId === unitId && c.sceneId
          ).length;
          
          const scenesProgress = (unitScenes / 8) * 100;
          
          return (
            <div
              key={unitId}
              className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-gray-700">
                  Unit {unitId}: {unitNames[idx]}
                </span>
                <Music className="w-4 h-4 text-purple-400" />
              </div>
              
              <div className="space-y-1">
                {/* Scenes Progress */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-16">Scenes:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${scenesProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-12 text-right">
                    {unitScenes}/8
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-200 text-center">
        <a
          href="/AUDIO_INTEGRATION_GUIDE.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-purple-600 hover:text-purple-700 underline"
        >
          📖 View Complete Guide
        </a>
      </div>
    </div>
  );
}
