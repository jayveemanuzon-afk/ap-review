import React from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trophy,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface HeaderStatsProps {
  totalNodes: number;
  completedNodes: number;
  totalMistakes: number;
  automatedCount: number;
  isMuted: boolean;
  zoomLevel: number;
  onToggleMute: () => void;
  onOpenStudyGuide: () => void;
  onReset: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const HeaderStats: React.FC<HeaderStatsProps> = ({
  totalNodes,
  completedNodes,
  totalMistakes,
  automatedCount,
  isMuted,
  zoomLevel,
  onToggleMute,
  onOpenStudyGuide,
  onReset,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const progressPercent = Math.round((completedNodes / totalNodes) * 100);

  return (
    <header className="bg-stone-900 border-b border-stone-800 text-stone-100 px-4 py-2.5 shadow-md shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/20 text-stone-950 font-black text-lg">
            ₱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                Paikot na Daloy ng Ekonomiya
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Ika-5 Modelo
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              Interactive Blank Concept Map Memory Reviewer
            </p>
          </div>
        </div>

        {/* Stats & Progress Bar */}
        <div className="flex items-center gap-4 text-xs">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="w-28 sm:w-36 h-2.5 bg-stone-800 rounded-full overflow-hidden border border-stone-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-stone-200 min-w-8">
              {progressPercent}%
            </span>
          </div>

          {/* Quick Counter Badges */}
          <div className="hidden sm:flex items-center gap-2 text-[11px]">
            <span className="px-2 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 flex items-center gap-1 font-medium">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedNodes}/{totalNodes}</span>
            </span>

            {totalMistakes > 0 && (
              <span className="px-2 py-1 rounded-lg bg-rose-950/80 text-rose-300 border border-rose-800/80 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>{totalMistakes} Mali</span>
              </span>
            )}

            {automatedCount > 0 && (
              <span className="px-2 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/80 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{automatedCount} Awtomatiko</span>
              </span>
            )}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-stone-800/80 border border-stone-700 rounded-lg p-0.5">
            <button
              onClick={onZoomOut}
              title="Zoom out"
              disabled={zoomLevel <= 0.7}
              className="p-1 rounded text-stone-300 hover:text-white disabled:opacity-40"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onResetZoom}
              title="Reset Zoom"
              className="px-1.5 text-[10px] font-mono text-stone-300 hover:text-white"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={onZoomIn}
              title="Zoom in"
              disabled={zoomLevel >= 1.6}
              className="p-1 rounded text-stone-300 hover:text-white disabled:opacity-40"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'I-on ang Tunog' : 'I-mute ang Tunog'}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {/* Study Guide Button */}
          <button
            onClick={onOpenStudyGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gabay / Review</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Ulitin ang Pagsusuri"
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
