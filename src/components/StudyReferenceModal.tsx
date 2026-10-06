import React from 'react';
import { X, BookOpen, Layers, CheckCircle2, Globe, Building2, Landmark, Home, Factory } from 'lucide-react';
import { CONCEPT_NODES } from '../data/conceptMapData';

interface StudyReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudyReferenceModal: React.FC<StudyReferenceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-stone-900 border border-stone-700 text-stone-100 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-100">
                Gabay sa Pag-aaral: Paikot na Daloy ng Ekonomiya
              </h2>
              <p className="text-xs text-stone-400">
                Ikalimang Modelo (Open Economy / May Panlabas na Sektor)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm">
          {/* Key Overview */}
          <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/60 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Ano ang Ikalimang Modelo ng Pambansang Ekonomiya?
            </h3>
            <p className="text-stone-300 leading-relaxed">
              Ito ang pinakakomprehensibong modelo ng pambansang ekonomiya. Sa modelong ito, bukas ang ekonomiya (Open Economy) kung saan ang pambansang pamahalaan at mga mamamayan ay nakikipagkalakalan sa iba pang bansa (Panlabas ng Sektor) sa pamamagitan ng pag-aangkat (import) at pagluluwas (export).
            </p>
          </div>

          {/* Sektor Breakdown */}
          <div>
            <h3 className="font-bold text-stone-200 text-sm mb-3">
              1. Ang Pangunahing mga Sektor at Pamilihan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-blue-400 flex items-center gap-2">
                  <Home className="w-4 h-4" /> SAMBAHAYAN (Household)
                </div>
                <p className="text-xs text-stone-300">
                  Nagmamay-ari ng mga salik ng produksyon (lupa, paggawa, kapital) at kumokonsumo ng mga tapos na produkto.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-blue-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> BAHAY-KALAKAL (Firm/Business)
                </div>
                <p className="text-xs text-stone-300">
                  Lumilikha ng mga produkto at serbisyo gamit ang mga salik ng produksyon mula sa sambahayan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-purple-400 flex items-center gap-2">
                  <Landmark className="w-4 h-4" /> PAMAHALAAN (Government)
                </div>
                <p className="text-xs text-stone-300">
                  Nangongolekta ng buwis at nagbibigay ng pampublikong produkto, serbisyo, at transfer payments (tulad ng 4Ps).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-rose-400 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> PANLABAS NG SEKTOR (Foreign Sector)
                </div>
                <p className="text-xs text-stone-300">
                  Kumakatawan sa mga banyagang bansa kung saan nagaganap ang pag-aangkat (import) at pagluluwas (export).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-2">
                  <Factory className="w-4 h-4" /> Pamilihan ng Salik at Produkto
                </div>
                <p className="text-xs text-stone-300">
                  Pamilihan ng Salik: Nagtatagpo ang supply ng manggagawa/lupa at demand ng negosyo. Pamilihan ng Produkto: Bentahan ng tapos na kalakal.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-800/40 border border-stone-700/50 space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <Landmark className="w-4 h-4" /> Pamilihang Pampinansiyal
                </div>
                <p className="text-xs text-stone-300">
                  Nagtatagpo ang mga nag-iimpok (savings ng sambahayan/negosyo) at mga namumuhunan (loans/investment).
                </p>
              </div>
            </div>
          </div>

          {/* Quick List of All 31 Flow Terms */}
          <div>
            <h3 className="font-bold text-stone-200 text-sm mb-3">
              2. Buong Talaan ng mga Daloy (Word List & Terminology)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {Array.from(new Set(CONCEPT_NODES.map((n) => n.text))).map((text) => (
                <div
                  key={text}
                  className="px-3 py-2 rounded-lg bg-stone-800/70 border border-stone-700 text-xs flex items-center justify-between text-stone-200"
                >
                  <span className="font-medium">{text}</span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    ×{CONCEPT_NODES.filter((n) => n.text === text).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
          >
            Bumalik sa Pagsusuri
          </button>
        </div>
      </div>
    </div>
  );
};
