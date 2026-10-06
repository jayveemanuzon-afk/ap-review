import React, { useState, useCallback, useMemo } from 'react';
import { CONCEPT_NODES } from './data/conceptMapData';
import { ConceptNode, NodeState, ReviewFeedback } from './types';
import { ConceptMapSvg } from './components/ConceptMapSvg';
import { WordBankSidebar } from './components/WordBankSidebar';
import { ReviewModal } from './components/ReviewModal';
import { StudyReferenceModal } from './components/StudyReferenceModal';
import { HeaderStats } from './components/HeaderStats';
import { soundManager } from './utils/audio';
import { CheckCircle2, RotateCcw, Trophy, Award, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  // State for all 31 nodes
  const [nodeStates, setNodeStates] = useState<Record<string, NodeState>>(() => {
    const initial: Record<string, NodeState> = {};
    CONCEPT_NODES.forEach((n) => {
      initial[n.id] = {
        placedText: null,
        status: 'empty',
        mistakes: 0,
      };
    });
    return initial;
  });

  // Selected item from word bank (for click-to-place support)
  const [selectedBankItem, setSelectedBankItem] = useState<string | null>(null);

  // Active review feedback popup
  const [reviewFeedback, setReviewFeedback] = useState<ReviewFeedback | null>(null);

  // Shake animation trigger
  const [shakeNodeId, setShakeNodeId] = useState<string | null>(null);

  // Study reference guide modal
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState(false);

  // Audio mute
  const [isMuted, setIsMuted] = useState(false);

  // Zoom level for map
  const [zoomLevel, setZoomLevel] = useState(1);

  // Completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Handle placement logic for a target slot
  const handlePlaceItem = useCallback(
    (nodeId: string, itemText: string) => {
      const targetNode = CONCEPT_NODES.find((n) => n.id === nodeId);
      if (!targetNode) return;

      const currentState = nodeStates[nodeId] || {
        placedText: null,
        status: 'empty',
        mistakes: 0,
      };

      // Don't overwrite already correct or automated nodes
      if (currentState.status === 'correct' || currentState.status === 'autofilled') {
        return;
      }

      // Check if dropped text matches target text
      // (Handles multiple occurrences like "Kita", "Buwis", "Pag-iimpok", etc.)
      const isMatch = targetNode.text.trim().toLowerCase() === itemText.trim().toLowerCase();

      if (isMatch) {
        // Correct answer!
        soundManager.playSuccess();
        setSelectedBankItem(null);

        setNodeStates((prev) => {
          const next: Record<string, NodeState> = {
            ...prev,
            [nodeId]: {
              ...prev[nodeId],
              placedText: targetNode.text,
              status: 'correct',
            },
          };

          // Check if all nodes are filled
          const allFilled = CONCEPT_NODES.every(
            (n) => n.id === nodeId || !!next[n.id]?.placedText
          );
          if (allFilled) {
            setTimeout(() => setShowCompletionModal(true), 600);
          }

          return next;
        });
      } else {
        // Incorrect answer!
        const newMistakeCount = currentState.mistakes + 1;
        soundManager.playError();

        // Shake visual effect
        setShakeNodeId(nodeId);
        setTimeout(() => setShakeNodeId(null), 800);

        if (newMistakeCount >= 2) {
          // Rule: After 2 tries, automated the correct answer!
          soundManager.playAutofill();

          setNodeStates((prev) => {
            const next: Record<string, NodeState> = {
              ...prev,
              [nodeId]: {
                placedText: targetNode.text,
                status: 'autofilled',
                mistakes: 2,
                lastErrorText: itemText,
              },
            };

            const allFilled = CONCEPT_NODES.every(
              (n) => n.id === nodeId || !!next[n.id]?.placedText
            );
            if (allFilled) {
              setTimeout(() => setShowCompletionModal(true), 1200);
            }

            return next;
          });

          // Show automated explanation review modal
          setReviewFeedback({
            isOpen: true,
            nodeId,
            nodeTitle: targetNode.text,
            attemptedText: itemText,
            correctText: targetNode.text,
            mistakesCount: 2,
            isAutofilled: true,
            reviewHint: targetNode.reviewHint,
            detailedReview: targetNode.detailedReview,
          });
        } else {
          // 1st mistake: highlight error and suggest brief review
          setNodeStates((prev) => ({
            ...prev,
            [nodeId]: {
              ...prev[nodeId],
              status: 'error',
              mistakes: 1,
              lastErrorText: itemText,
            },
          }));

          setReviewFeedback({
            isOpen: true,
            nodeId,
            nodeTitle: targetNode.text,
            attemptedText: itemText,
            correctText: targetNode.text,
            mistakesCount: 1,
            isAutofilled: false,
            reviewHint: targetNode.reviewHint,
            detailedReview: targetNode.detailedReview,
          });
        }
      }
    },
    [nodeStates]
  );

  // Slot clicked on map
  const handleSlotClick = useCallback(
    (nodeId: string) => {
      soundManager.playClick();
      if (selectedBankItem) {
        handlePlaceItem(nodeId, selectedBankItem);
      } else {
        // If empty slot clicked without an item, show a helpful hint
        const node = CONCEPT_NODES.find((n) => n.id === nodeId);
        const state = nodeStates[nodeId];
        if (node && state && (state.status === 'correct' || state.status === 'autofilled')) {
          setReviewFeedback({
            isOpen: true,
            nodeId,
            nodeTitle: node.text,
            attemptedText: state.placedText || node.text,
            correctText: node.text,
            mistakesCount: state.mistakes,
            isAutofilled: state.status === 'autofilled',
            reviewHint: node.reviewHint,
            detailedReview: node.detailedReview,
          });
        }
      }
    },
    [selectedBankItem, handlePlaceItem, nodeStates]
  );

  // Remove a manually placed item (if not autofilled)
  const handleRemoveItem = useCallback((nodeId: string) => {
    soundManager.playClick();
    setNodeStates((prev) => ({
      ...prev,
      [nodeId]: {
        placedText: null,
        status: 'empty',
        mistakes: prev[nodeId]?.mistakes || 0,
      },
    }));
  }, []);

  // Reset entire activity
  const handleReset = useCallback(() => {
    if (window.confirm('Nais mo bang simulan muli ang pagsusuri mula sa simula?')) {
      const resetState: Record<string, NodeState> = {};
      CONCEPT_NODES.forEach((n) => {
        resetState[n.id] = {
          placedText: null,
          status: 'empty',
          mistakes: 0,
        };
      });
      setNodeStates(resetState);
      setSelectedBankItem(null);
      setReviewFeedback(null);
      setShowCompletionModal(false);
    }
  }, []);

  // Stats computation
  const stats = useMemo(() => {
    let completed = 0;
    let mistakes = 0;
    let automated = 0;

    Object.values(nodeStates).forEach((st) => {
      if (st.placedText && (st.status === 'correct' || st.status === 'autofilled')) {
        completed++;
      }
      mistakes += st.mistakes;
      if (st.status === 'autofilled') {
        automated++;
      }
    });

    return {
      completed,
      mistakes,
      automated,
      total: CONCEPT_NODES.length,
    };
  }, [nodeStates]);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-stone-950 text-stone-100 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <HeaderStats
        totalNodes={stats.total}
        completedNodes={stats.completed}
        totalMistakes={stats.mistakes}
        automatedCount={stats.automated}
        isMuted={isMuted}
        zoomLevel={zoomLevel}
        onToggleMute={toggleMute}
        onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
        onReset={handleReset}
        onZoomIn={() => setZoomLevel((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))}
        onZoomOut={() => setZoomLevel((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
        onResetZoom={() => setZoomLevel(1)}
      />

      {/* Main Workspace: Map Canvas + Word Bank Sidebar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Concept Map Canvas Area */}
        <main className="flex-1 overflow-auto p-3 sm:p-5 flex items-center justify-center bg-stone-950/60 relative">
          <div
            className="w-full h-full max-w-6xl max-h-[880px] flex items-center justify-center transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <ConceptMapSvg
              nodes={CONCEPT_NODES}
              nodeStates={nodeStates}
              selectedBankItem={selectedBankItem}
              onSlotDrop={handlePlaceItem}
              onSlotClick={handleSlotClick}
              onRemoveItem={handleRemoveItem}
              shakeNodeId={shakeNodeId}
            />
          </div>

          {/* Quick Helper Banner at bottom left of canvas */}
          <div className="absolute bottom-4 left-4 bg-stone-900/90 backdrop-blur border border-stone-800 text-[11px] text-stone-300 px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>I-drag ang mga salita o i-click ang salita bago i-click ang bakanteng slot.</span>
          </div>
        </main>

        {/* Word Bank Sidebar */}
        <WordBankSidebar
          nodes={CONCEPT_NODES}
          nodeStates={nodeStates}
          selectedBankItem={selectedBankItem}
          onSelectItem={setSelectedBankItem}
        />
      </div>

      {/* Review Feedback Dialog (Mistake review & 2-tries auto-fill) */}
      <ReviewModal
        feedback={reviewFeedback}
        onClose={() => setReviewFeedback(null)}
      />

      {/* Study Reference Guide Modal */}
      <StudyReferenceModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
      />

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-stone-900 border border-amber-500/60 p-6 text-center text-stone-100 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center ring-4 ring-amber-500/30">
              <Trophy className="w-9 h-9" />
            </div>

            <h2 className="text-xl font-black text-amber-300">
              Mahusay! Buo na ang Concept Map!
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Matagumpay mong narepaso ang lahat ng 31 konsepto, sektor, at daloy sa Ikalimang Modelo ng Pambansang Ekonomiya!
            </p>

            <div className="grid grid-cols-3 gap-2 py-3 text-left">
              <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                <div className="text-[10px] text-stone-400 uppercase font-semibold">Kabuuang Slot</div>
                <div className="text-lg font-black text-white">{stats.total}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                <div className="text-[10px] text-stone-400 uppercase font-semibold">Mga Mali</div>
                <div className="text-lg font-black text-rose-400">{stats.mistakes}</div>
              </div>
              <div className="p-3 rounded-xl bg-stone-800 border border-stone-700">
                <div className="text-[10px] text-stone-400 uppercase font-semibold">Awtomatiko</div>
                <div className="text-lg font-black text-amber-400">{stats.automated}</div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
              >
                Tingnan ang Mapa
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ulitin Muli
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
