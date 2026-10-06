import React, { useState, useMemo } from 'react';
import { ConceptNode, NodeState, CategoryType } from '../types';
import { CATEGORIES } from '../data/conceptMapData';
import { Search, Sparkles, Move, MousePointerClick, RefreshCw, CheckCircle } from 'lucide-react';

interface WordBankSidebarProps {
  nodes: ConceptNode[];
  nodeStates: Record<string, NodeState>;
  selectedBankItem: string | null;
  onSelectItem: (itemText: string | null) => void;
  onShuffle?: () => void;
}

export const WordBankSidebar: React.FC<WordBankSidebarProps> = ({
  nodes,
  nodeStates,
  selectedBankItem,
  onSelectItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('lahat');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate available counts for each unique label
  const { availableItems, totalPlaced, totalNodes } = useMemo(() => {
    // Total count of each label in the original map
    const totalRequiredCount: Record<string, number> = {};
    const itemCategories: Record<string, CategoryType> = {};
    const itemFlowTypes: Record<string, 'actor' | 'flow'> = {};

    nodes.forEach((n) => {
      totalRequiredCount[n.text] = (totalRequiredCount[n.text] || 0) + 1;
      itemCategories[n.text] = n.category;
      itemFlowTypes[n.text] = n.flowType;
    });

    // Count how many times each label has been successfully placed (or autofilled)
    const currentPlacedCount: Record<string, number> = {};
    let placedTotal = 0;

    Object.values(nodeStates).forEach((st) => {
      if (st.placedText && (st.status === 'correct' || st.status === 'autofilled')) {
        currentPlacedCount[st.placedText] = (currentPlacedCount[st.placedText] || 0) + 1;
        placedTotal++;
      }
    });

    const items: {
      text: string;
      category: CategoryType;
      flowType: 'actor' | 'flow';
      remaining: number;
      total: number;
    }[] = [];

    Object.keys(totalRequiredCount).forEach((text) => {
      const remaining = totalRequiredCount[text] - (currentPlacedCount[text] || 0);
      items.push({
        text,
        category: itemCategories[text] || 'lahat',
        flowType: itemFlowTypes[text] || 'flow',
        remaining,
        total: totalRequiredCount[text],
      });
    });

    return {
      availableItems: items,
      totalPlaced: placedTotal,
      totalNodes: nodes.length,
    };
  }, [nodes, nodeStates]);

  // Filter items
  const filteredItems = useMemo(() => {
    return availableItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'lahat' || item.category === selectedCategory;
      const matchesSearch = item.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [availableItems, selectedCategory, searchQuery]);

  const handleDragStart = (e: React.DragEvent, text: string) => {
    e.dataTransfer.setData('text/plain', text);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <aside className="w-80 lg:w-96 flex flex-col bg-stone-900 border-l border-stone-800 text-stone-100 h-full shadow-2xl shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-stone-800 bg-stone-950/70">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Move className="w-4 h-4" />
            </span>
            <h2 className="font-bold text-stone-100 text-sm tracking-wide">
              BANGKO NG MGA SALITA (WORD BANK)
            </h2>
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-800 text-stone-300">
            {totalPlaced}/{totalNodes}
          </span>
        </div>
        <p className="text-xs text-stone-400">
          I-drag ang mga salita o i-click upang piliin at ilagay sa mapa.
        </p>

        {/* Selected Item Indicator */}
        {selectedBankItem && (
          <div className="mt-2.5 p-2 rounded-lg bg-blue-950/80 border border-blue-500/50 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 overflow-hidden">
              <MousePointerClick className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
              <div className="truncate text-xs">
                <span className="text-blue-300 font-medium">Napili: </span>
                <span className="font-semibold text-white">"{selectedBankItem}"</span>
              </div>
            </div>
            <button
              onClick={() => onSelectItem(null)}
              className="text-xs px-2 py-0.5 rounded bg-blue-800 hover:bg-blue-700 text-blue-100"
            >
              Kanselahin
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Maghanap ng konsepto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-800/90 text-stone-200 text-xs pl-8 pr-3 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-1.5 overflow-x-auto py-2 no-scrollbar scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-[11px] whitespace-nowrap px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Draggable Word Cards List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredItems.map((item) => {
          const isExhausted = item.remaining <= 0;
          const isSelected = selectedBankItem === item.text;
          const isActor = item.flowType === 'actor';

          return (
            <div
              key={item.text}
              draggable={!isExhausted}
              onDragStart={(e) => handleDragStart(e, item.text)}
              onClick={() => {
                if (!isExhausted) {
                  onSelectItem(isSelected ? null : item.text);
                }
              }}
              className={`group relative p-2.5 rounded-xl border transition-all duration-150 select-none ${
                isExhausted
                  ? 'bg-stone-900/40 border-stone-800/40 opacity-40 cursor-not-allowed'
                  : isSelected
                  ? 'bg-blue-900/40 border-blue-500 shadow-md ring-2 ring-blue-500/30 cursor-pointer'
                  : 'bg-stone-800/70 hover:bg-stone-800 border-stone-700/80 hover:border-amber-500/50 cursor-grab active:cursor-grabbing hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isExhausted
                        ? 'bg-stone-600'
                        : isActor
                        ? 'bg-blue-400 ring-2 ring-blue-500/30'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold truncate ${
                      isExhausted
                        ? 'text-stone-500 line-through'
                        : isSelected
                        ? 'text-blue-200 font-bold'
                        : 'text-stone-200 group-hover:text-amber-200'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Actor tag */}
                  {isActor && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      Sektor
                    </span>
                  )}

                  {/* Quantity Badge */}
                  {item.total > 1 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isExhausted
                          ? 'bg-stone-800 text-stone-600'
                          : item.remaining === 1
                          ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                          : 'bg-stone-700 text-stone-200'
                      }`}
                    >
                      {item.remaining} / {item.total}
                    </span>
                  )}

                  {isExhausted && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-stone-500 text-xs">
            Walang nahanap na salita para sa kategoryang ito.
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-stone-950 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ika-5 Modelo ng Ekonomiya</span>
        </div>
        <span className="text-stone-400 font-mono">
          {Math.round((totalPlaced / totalNodes) * 100)}% Tapos
        </span>
      </div>
    </aside>
  );
};
