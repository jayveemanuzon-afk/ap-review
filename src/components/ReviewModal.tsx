import React from 'react';
import { ReviewFeedback } from '../types';
import { AlertTriangle, CheckCircle, Sparkles, BookOpen, ArrowRight, X } from 'lucide-react';

interface ReviewModalProps {
  feedback: ReviewFeedback | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ feedback, onClose }) => {
  if (!feedback || !feedback.isOpen) return null;

  const isAuto = feedback.isAutofilled;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl border p-6 transition-all transform animate-scaleUp ${
          isAuto
            ? 'bg-amber-950/95 border-amber-500/70 text-amber-50'
            : 'bg-stone-900/95 border-rose-500/60 text-stone-100'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl ${
                isAuto
                  ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/40'
                  : 'bg-rose-500/20 text-rose-400 ring-2 ring-rose-500/40'
              }`}
            >
              {isAuto ? (
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              ) : (
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isAuto
                  ? 'Awtomatikong Inilagay ang Sagot!'
                  : `Maling Pagkakalagay (Subok ${feedback.mistakesCount} ng 2)`}
              </h3>
              <p className="text-xs text-stone-300">
                {isAuto
                  ? 'Naabot mo na ang 2 maling subok sa slot na ito.'
                  : 'Mayroon ka pang 1 subok bago ito awtomatikong itama.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Comparison */}
        <div className="my-4 space-y-3">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-400">
              <span>Iyong Inilagay:</span>
              <span className="font-semibold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                "{feedback.attemptedText}"
              </span>
            </div>

            {isAuto && (
              <div className="flex items-center justify-between text-stone-300 pt-1 border-t border-white/10">
                <span>Tamang Konsepto:</span>
                <span className="font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700">
                  "{feedback.correctText}"
                </span>
              </div>
            )}
          </div>

          {/* Educational Review Hint */}
          <div
            className={`p-4 rounded-xl border ${
              isAuto
                ? 'bg-amber-900/30 border-amber-500/40'
                : 'bg-rose-950/30 border-rose-500/40'
            }`}
          >
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <BookOpen className="w-4 h-4" />
              <span>Mungkahing Pagbabalik-Aral (Concept Review):</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-200">
              {feedback.detailedReview}
            </p>
            {!isAuto && feedback.reviewHint && (
              <div className="mt-2.5 pt-2 border-t border-white/10 text-xs text-amber-200 italic">
                💡 <span className="font-semibold">Pahiwatig:</span> {feedback.reviewHint}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
              isAuto
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
            }`}
          >
            <span>{isAuto ? 'Salamat, Ipagpatuloy ang Pagsasanay' : 'Naiintindihan ko, Susubukan Muli'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
