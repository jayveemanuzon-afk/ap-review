import React, { useState } from 'react';
import { ConceptNode, NodeState } from '../types';
import { CheckCircle2, Sparkles, HelpCircle, AlertCircle, X } from 'lucide-react';

interface ConceptMapSvgProps {
  nodes: ConceptNode[];
  nodeStates: Record<string, NodeState>;
  selectedBankItem: string | null;
  onSlotDrop: (nodeId: string, itemText: string) => void;
  onSlotClick: (nodeId: string) => void;
  onRemoveItem: (nodeId: string) => void;
  shakeNodeId: string | null;
}

export const ConceptMapSvg: React.FC<ConceptMapSvgProps> = ({
  nodes,
  nodeStates,
  selectedBankItem,
  onSlotDrop,
  onSlotClick,
  onRemoveItem,
  shakeNodeId,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [dragOverNodeId, setDragOverNodeId] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (dragOverNodeId !== nodeId) {
      setDragOverNodeId(nodeId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    if (dragOverNodeId === nodeId) {
      setDragOverNodeId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, nodeId: string) => {
    e.preventDefault();
    setDragOverNodeId(null);
    const itemText = e.dataTransfer.getData('text/plain');
    if (itemText) {
      onSlotDrop(nodeId, itemText);
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden rounded-2xl bg-[#faf6ea] shadow-inner border border-amber-200/80">
      <svg
        viewBox="0 0 1300 740"
        className="w-full h-full block"
        style={{ minWidth: '950px' }}
      >
        <defs>
          {/* Arrowhead Markers */}
          <marker
            id="arrow-brown"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#9c6439" />
          </marker>

          <marker
            id="arrow-black"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#1e1e1e" />
          </marker>

          <marker
            id="arrow-olive"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#788052" />
          </marker>

          <marker
            id="arrow-olive-dashed"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#788052" />
          </marker>

          {/* Gradients */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <linearGradient id="goldCoin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Subtle grid pattern background */}
        <rect width="1300" height="740" fill="#faf6ea" />

        {/* ========================================================
            ARROWS AND FLOW LINES (EXACT REPLICA OF CONCEPT MAP)
        ======================================================== */}
        <g id="flow-arrows" strokeLinecap="round" strokeLinejoin="round">
          {/* 1. TOP-LEFT FOREIGN TRADE (Panlabas <-> Bahay-Kalakal) */}
          {/* Pag-angkat para sa Produksyon (Topmost brown line) */}
          <path
            d="M 600 35 L 55 35 L 55 380"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Kita (Line 2: Bahay-kalakal -> Panlabas) */}
          <path
            d="M 68 380 L 68 70 L 600 70"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Kita (Line 3: Panlabas -> Bahay-kalakal) */}
          <path
            d="M 600 105 L 82 105 L 82 380"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Pagluwas ng tapos na produkto o serbisyo (Line 4: Bahay-kalakal -> Panlabas) */}
          <path
            d="M 95 380 L 95 140 L 600 140"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* 2. TOP-RIGHT FOREIGN TRADE (Panlabas <-> Sambahayan) */}
          {/* Pag-angkat para sa Pagkonsumo (Topmost brown line right) */}
          <path
            d="M 700 35 L 1245 35 L 1245 380"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Kita (Line 2 right: Sambahayan -> Panlabas) */}
          <path
            d="M 1230 380 L 1230 70 L 700 70"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Pagluwas ng Salik sa Produksyon (Line 3 right: Sambahayan -> Panlabas) */}
          <path
            d="M 1215 380 L 1215 105 L 700 105"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Kita (Line 4 right: Panlabas -> Sambahayan) */}
          <path
            d="M 700 140 L 1180 140 L 1180 380"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />

          {/* 3. GOODS MARKET & BAHAY-KALAKAL / SAMBAHAYAN */}
          {/* Thick Black Line: Gastusin sa Pagkonsumo -> Kita */}
          {/* From Sambahayan going up, turning left across to Bahay-kalakal downward */}
          <path
            d="M 1120 380 L 1120 185 L 195 185 L 195 380"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="6.5"
            markerEnd="url(#arrow-black)"
          />

          {/* Brown Line: Pagbenta ng produkto o serbisyo (Bahay-kalakal -> Pamilihan ng Produkto) */}
          <path
            d="M 245 380 L 245 228 L 545 228"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Brown Line: Pagbili ng produkto o serbisyo (Pamilihan ng Produkto -> Sambahayan) */}
          <path
            d="M 755 240 L 1060 240 L 1060 380"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Vertical brown arrows around Pamahalaan & Pamilihan ng Produkto */}
          <path
            d="M 580 380 L 580 290"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />
          <path
            d="M 720 290 L 720 380"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Vertical arrows around Panlabas ng Sektor */}
          <path
            d="M 580 170 L 580 115"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />
          <path
            d="M 720 115 L 720 170"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5"
            markerEnd="url(#arrow-brown)"
          />

          {/* 4. PAMAHALAAN FLOWS (Horizontal middle) */}
          {/* Left: Pamahalaan -> Bahay-Kalakal (Pampublikong produkto o serbisyo, transfer payments) */}
          <path
            d="M 545 388 L 245 388"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Left: Bahay-Kalakal -> Pamahalaan (Buwis) */}
          <path
            d="M 245 440 L 545 440"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Right: Pamahalaan -> Sambahayan (Pampublikong produkto o serbisyo, transfer payments) */}
          <path
            d="M 755 388 L 1025 388"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Right: Sambahayan -> Pamahalaan (Buwis) */}
          <path
            d="M 1025 440 L 755 440"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Vertical brown arrows around Pamahalaan & Pamilihan ng Salik */}
          <path
            d="M 580 560 L 580 470"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />
          <path
            d="M 720 470 L 720 560"
            fill="none"
            stroke="#788052"
            strokeWidth="5"
            markerEnd="url(#arrow-olive)"
          />

          {/* 5. FACTOR MARKET FLOWS (Pamilihan ng Salik ng Produksyon) */}
          {/* Brown Line: Input para sa produksyon (Pamilihan ng Salik -> Bahay-Kalakal) */}
          <path
            d="M 545 510 L 245 510 L 245 470"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Black Line: Gastusin sa Produksyon (Bahay-Kalakal -> Pamilihan ng Salik) */}
          <path
            d="M 195 470 L 195 555 L 545 555"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="6"
            markerEnd="url(#arrow-black)"
          />

          {/* Brown Line: Paggawa, Lupa at Kapital (Sambahayan -> Pamilihan ng Salik) */}
          <path
            d="M 1060 470 L 1060 510 L 755 510"
            fill="none"
            stroke="#9c6439"
            strokeWidth="5.5"
            markerEnd="url(#arrow-brown)"
          />

          {/* Black Line: Kita (Pamilihan ng Salik -> Sambahayan) */}
          <path
            d="M 755 555 L 1110 555 L 1110 470"
            fill="none"
            stroke="#1e1e1e"
            strokeWidth="6"
            markerEnd="url(#arrow-black)"
          />

          {/* 6. FINANCIAL MARKET FLOWS (Pamilihang Pampinansiyal - Dashed & Solid Olive) */}
          {/* Left Dashed: Pag-iimpok (Bahay-Kalakal -> Bangko) */}
          <path
            d="M 160 470 L 160 630 L 545 630"
            fill="none"
            stroke="#788052"
            strokeWidth="4.5"
            strokeDasharray="9 6"
            markerEnd="url(#arrow-olive-dashed)"
          />

          {/* Left Solid: Pamumuhunan (Bangko -> Bahay-Kalakal) */}
          <path
            d="M 545 675 L 130 675 L 130 470"
            fill="none"
            stroke="#788052"
            strokeWidth="4.5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Right Dashed: Pag-iimpok (Sambahayan -> Bangko) */}
          <path
            d="M 1150 470 L 1150 630 L 755 630"
            fill="none"
            stroke="#788052"
            strokeWidth="4.5"
            strokeDasharray="9 6"
            markerEnd="url(#arrow-olive-dashed)"
          />

          {/* Right Solid: Pangungutang (Bangko -> Sambahayan) */}
          <path
            d="M 755 675 L 1180 675 L 1180 470"
            fill="none"
            stroke="#788052"
            strokeWidth="4.5"
            markerEnd="url(#arrow-olive)"
          />

          {/* Financial Market to Government (Dashed vertical line) */}
          <path
            d="M 525 650 L 525 460"
            fill="none"
            stroke="#788052"
            strokeWidth="4.5"
            strokeDasharray="9 6"
            markerEnd="url(#arrow-olive-dashed)"
          />
        </g>

        {/* ========================================================
            DETAILED ILLUSTRATIONS / ICONS (MATCHING ORIGINAL IMAGE)
        ======================================================== */}
        <g id="entity-illustrations">
          {/* 1. PANLABAS NG SEKTOR (Top Center Globe + Coins) */}
          <g transform="translate(650, 48)">
            {/* Globe */}
            <circle cx="-12" cy="0" r="30" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
            <path
              d="M -30 -10 Q -15 -25 5 -18 Q 15 -10 10 5 Q -2 20 -25 15 Z"
              fill="#22c55e"
              opacity="0.9"
            />
            <path
              d="M -5 -25 Q 12 -28 15 -15 Q 18 0 8 10 Q -5 5 -5 -25 Z"
              fill="#16a34a"
              opacity="0.9"
            />
            <path
              d="M -22 -15 Q -10 -5 2 -2 Q 10 15 -5 26"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.4"
            />
            {/* Gold coin stacks */}
            <g transform="translate(14, -6)">
              {/* Stack 1 */}
              <ellipse cx="4" cy="22" rx="10" ry="4" fill="#d97706" />
              <rect x="-6" y="8" width="20" height="14" fill="#f59e0b" />
              <ellipse cx="4" cy="8" rx="10" ry="4" fill="#fde047" stroke="#d97706" strokeWidth="1" />

              {/* Stack 2 (taller) */}
              <ellipse cx="14" cy="24" rx="9" ry="3.5" fill="#d97706" />
              <rect x="5" y="-2" width="18" height="26" fill="#f59e0b" />
              <ellipse cx="14" cy="-2" rx="9" ry="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />

              {/* Stack 3 */}
              <ellipse cx="24" cy="26" rx="8" ry="3" fill="#d97706" />
              <rect x="16" y="14" width="16" height="12" fill="#f59e0b" />
              <ellipse cx="24" cy="14" rx="8" ry="3" fill="#fde047" stroke="#d97706" strokeWidth="1" />
            </g>
          </g>

          {/* 2. PAMILIHAN NG PRODUKTO AT SERBISYO (Market Storefront) */}
          <g transform="translate(650, 205)">
            {/* Roof / Awning */}
            <rect x="-62" y="-12" width="124" height="16" fill="#b91c1c" rx="3" />
            <path
              d="M -60 4 L -60 14 Q -50 20 -40 14 Q -30 20 -20 14 Q -10 20 0 14 Q 10 20 20 14 Q 30 20 40 14 Q 50 20 60 14 L 60 4 Z"
              fill="#dc2626"
            />
            {/* Awning stripes */}
            <path
              d="M -50 4 L -50 17 M -30 4 L -30 17 M -10 4 L -10 17 M 10 4 L 10 17 M 30 4 L 30 17 M 50 4 L 50 17"
              stroke="#fef08a"
              strokeWidth="6"
            />
            {/* Sign: MARKET */}
            <rect x="-35" y="-10" width="70" height="14" fill="#991b1b" rx="2" />
            <text
              x="0"
              y="1"
              fill="#fef08a"
              fontSize="9"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="2"
            >
              MARKET
            </text>
            {/* Shop walls */}
            <rect x="-56" y="16" width="112" height="42" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            {/* Windows / Display */}
            <rect x="-48" y="24" width="38" height="28" fill="#f0fdf4" stroke="#0284c7" strokeWidth="1" />
            <rect x="10" y="24" width="38" height="28" fill="#f0fdf4" stroke="#0284c7" strokeWidth="1" />
            {/* Products inside */}
            <circle cx="-38" cy="38" r="4" fill="#ef4444" />
            <circle cx="-28" cy="40" r="5" fill="#f59e0b" />
            <circle cx="20" cy="39" r="4" fill="#22c55e" />
            <circle cx="32" cy="38" r="5" fill="#a855f7" />
          </g>

          {/* 3. PAMAHALAAN (Government Building / Pillars & Dome) */}
          <g transform="translate(650, 400)">
            {/* Steps Base */}
            <rect x="-70" y="32" width="140" height="6" fill="#94a3b8" />
            <rect x="-65" y="26" width="130" height="6" fill="#cbd5e1" />
            {/* Main Hall */}
            <rect x="-56" y="-6" width="112" height="32" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Classical Pillars */}
            <g fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1">
              <rect x="-50" y="-4" width="10" height="30" rx="1" />
              <rect x="-30" y="-4" width="10" height="30" rx="1" />
              <rect x="-10" y="-4" width="10" height="30" rx="1" />
              <rect x="10" y="-4" width="10" height="30" rx="1" />
              <rect x="30" y="-4" width="10" height="30" rx="1" />
            </g>
            {/* Pediment (Triangle) */}
            <polygon points="-58,-6 0,-24 58,-6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Central Dome */}
            <path d="M -16 -24 A 16 16 0 0 1 16 -24 Z" fill="#94a3b8" />
            {/* Flagpole & Philippine Flag */}
            <line x1="0" y1="-24" x2="0" y2="-44" stroke="#475569" strokeWidth="1.5" />
            <polygon points="0,-44 14,-38 0,-32" fill="#2563eb" />
            <polygon points="0,-38 14,-38 0,-32" fill="#dc2626" />
            <polygon points="0,-44 5,-38 0,-32" fill="#ffffff" />
          </g>

          {/* 4. PAMILIHAN NG SALIK NG PRODUKSYON (Factory Smokestacks) */}
          <g transform="translate(650, 545)">
            {/* Smoke puffs */}
            <g fill="#cbd5e1" opacity="0.7">
              <circle cx="-16" cy="-42" r="8" />
              <circle cx="-12" cy="-52" r="11" />
              <circle cx="-6" cy="-62" r="14" />
              <circle cx="8" cy="-38" r="7" />
              <circle cx="12" cy="-46" r="9" />
            </g>
            {/* Smokestacks */}
            <polygon points="-22,-32 -20,10 -10,10 -12,-32" fill="#78350f" />
            <polygon points="4,-28 6,10 14,10 12,-28" fill="#92400e" />
            {/* Factory building */}
            <rect x="-48" y="-6" width="70" height="36" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            {/* Silo / Tank */}
            <path d="M 24 0 A 12 12 0 0 1 48 0 L 48 30 L 24 30 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            {/* Factory Windows */}
            <g fill="#fef3c7" stroke="#78350f" strokeWidth="0.8">
              <rect x="-42" y="2" width="8" height="10" />
              <rect x="-30" y="2" width="8" height="10" />
              <rect x="-18" y="2" width="8" height="10" />
              <rect x="-6" y="2" width="8" height="10" />
            </g>
          </g>

          {/* 5. PAMILIHANG PAMPINANSIYAL (Bank Building) */}
          <g transform="translate(650, 665)">
            {/* Base steps */}
            <rect x="-56" y="18" width="112" height="5" fill="#94a3b8" />
            <rect x="-52" y="14" width="104" height="4" fill="#cbd5e1" />
            {/* Bank facade */}
            <rect x="-44" y="-8" width="88" height="22" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
            {/* 4 Pillars */}
            <g fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1">
              <rect x="-40" y="-8" width="8" height="22" />
              <rect x="-18" y="-8" width="8" height="22" />
              <rect x="4" y="-8" width="8" height="22" />
              <rect x="26" y="-8" width="8" height="22" />
            </g>
            {/* Architrave / Sign "BANK" */}
            <rect x="-48" y="-15" width="96" height="8" fill="#94a3b8" />
            <text
              x="0"
              y="-9"
              fill="#ffffff"
              fontSize="7"
              fontWeight="bold"
              textAnchor="middle"
              letterSpacing="2"
            >
              BANK
            </text>
            {/* Triangular Pediment */}
            <polygon points="-50,-15 0,-28 50,-15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          </g>

          {/* 6. BAHAY-KALAKAL (Skyscrapers City Skyline - Left) */}
          <g transform="translate(145, 415)">
            {/* Tower 1 (Tall center glass) */}
            <rect x="-18" y="-55" width="26" height="65" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <polygon points="-18,-55 -5,-68 8,-55" fill="#0369a1" />
            {/* Tower 2 (Left modern) */}
            <rect x="-40" y="-40" width="24" height="50" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1" />
            {/* Tower 3 (Right modern) */}
            <rect x="6" y="-48" width="28" height="58" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
            {/* Tower 4 (Far right) */}
            <rect x="32" y="-30" width="20" height="40" fill="#0284c7" stroke="#075985" strokeWidth="1" />
            {/* Antenna spire */}
            <line x1="-5" y1="-68" x2="-5" y2="-82" stroke="#475569" strokeWidth="2" />
            <circle cx="-5" cy="-83" r="2.5" fill="#ef4444" />
            {/* Window Grid Patterns */}
            <g stroke="#ffffff" strokeWidth="0.8" opacity="0.6">
              <line x1="-34" y1="-32" x2="-22" y2="-32" />
              <line x1="-34" y1="-24" x2="-22" y2="-24" />
              <line x1="-34" y1="-16" x2="-22" y2="-16" />
              <line x1="-12" y1="-46" x2="2" y2="-46" />
              <line x1="-12" y1="-38" x2="2" y2="-38" />
              <line x1="-12" y1="-30" x2="2" y2="-30" />
              <line x1="-12" y1="-22" x2="2" y2="-22" />
              <line x1="12" y1="-40" x2="28" y2="-40" />
              <line x1="12" y1="-32" x2="28" y2="-32" />
              <line x1="12" y1="-24" x2="28" y2="-24" />
            </g>
          </g>

          {/* 7. SAMBAHAYAN (Residential House - Right) */}
          <g transform="translate(1075, 415)">
            {/* Chimney with smoke */}
            <rect x="18" y="-48" width="8" height="18" fill="#b91c1c" />
            <circle cx="22" cy="-55" r="4" fill="#cbd5e1" opacity="0.8" />
            <circle cx="26" cy="-63" r="6" fill="#cbd5e1" opacity="0.7" />
            {/* House body */}
            <rect x="-35" y="-22" width="70" height="44" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            {/* Gabled Red Roof */}
            <polygon points="-42,-22 0,-50 42,-22" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            {/* Red Door */}
            <rect x="8" y="-6" width="16" height="28" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            <circle cx="20" cy="8" r="1.5" fill="#fef08a" />
            {/* 4-Pane Window */}
            <rect x="-26" y="-8" width="22" height="18" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
            <line x1="-15" y1="-8" x2="-15" y2="10" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="-26" y1="1" x2="-4" y2="1" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        </g>

        {/* ========================================================
            INTERACTIVE DROP SLOTS (FOR ALL 31 CONCEPTS)
        ======================================================== */}
        <g id="interactive-nodes">
          {nodes.map((node) => {
            const state = nodeStates[node.id] || {
              placedText: null,
              status: 'empty',
              mistakes: 0,
            };

            const isShake = shakeNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;
            const isDragOver = dragOverNodeId === node.id;
            const isFilled = !!state.placedText;
            const isCorrect = state.status === 'correct';
            const isAutofilled = state.status === 'autofilled';
            const isError = state.status === 'error';
            const isActor = node.flowType === 'actor';

            // Coordinates for SVG slot centering
            const slotX = node.x - node.width / 2;
            const slotY = node.y - node.height / 2;

            // Border and background colors based on state
            let bgFill = '#ffffff';
            let strokeColor = '#94a3b8';
            let strokeDash = '4,3';
            let textColor = '#334155';

            if (isCorrect) {
              bgFill = '#ecfdf5';
              strokeColor = '#059669';
              strokeDash = 'none';
              textColor = '#065f46';
            } else if (isAutofilled) {
              bgFill = '#fffbeb';
              strokeColor = '#d97706';
              strokeDash = 'none';
              textColor = '#92400e';
            } else if (isError) {
              bgFill = '#fef2f2';
              strokeColor = '#dc2626';
              strokeDash = 'none';
              textColor = '#991b1b';
            } else if (isDragOver) {
              bgFill = '#f0fdf4';
              strokeColor = '#16a34a';
              strokeDash = 'none';
            } else if (selectedBankItem) {
              bgFill = '#f8fafc';
              strokeColor = '#3b82f6';
              strokeDash = '3,2';
            }

            return (
              <g
                key={node.id}
                className={`cursor-pointer transition-transform duration-150 ${
                  isShake ? 'animate-bounce' : ''
                }`}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => onSlotClick(node.id)}
                onDragOver={(e) => handleDragOver(e, node.id)}
                onDragLeave={(e) => handleDragLeave(e, node.id)}
                onDrop={(e) => handleDrop(e, node.id)}
              >
                {/* Glow ring when selected bank item is active */}
                {selectedBankItem && !isFilled && (
                  <rect
                    x={slotX - 3}
                    y={slotY - 3}
                    width={node.width + 6}
                    height={node.height + 6}
                    rx="10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    className="animate-pulse"
                  />
                )}

                {/* Main Slot Container */}
                <rect
                  x={slotX}
                  y={slotY}
                  width={node.width}
                  height={node.height}
                  rx={isActor ? 8 : 6}
                  fill={bgFill}
                  stroke={strokeColor}
                  strokeWidth={isHovered || isDragOver ? 2.5 : isActor ? 2 : 1.5}
                  strokeDasharray={strokeDash}
                  filter="url(#cardShadow)"
                  className="transition-all duration-200"
                />

                {/* Slot Content: Text or Empty Placeholder */}
                {isFilled ? (
                  <g>
                    {/* Status icon badge */}
                    {isCorrect && (
                      <g transform={`translate(${slotX + node.width - 15}, ${slotY + 6})`}>
                        <circle cx="0" cy="0" r="5.5" fill="#10b981" />
                        <path
                          d="M -2.5 0 L -0.5 2 L 2.5 -2"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                    {isAutofilled && (
                      <g transform={`translate(${slotX + node.width - 15}, ${slotY + 6})`}>
                        <circle cx="0" cy="0" r="5.5" fill="#f59e0b" />
                        <path
                          d="M 0 -3 L 1 -1 L 3 0 L 1 1 L 0 3 L -1 1 L -3 0 L -1 -1 Z"
                          fill="#ffffff"
                        />
                      </g>
                    )}

                    {/* Placed Label Text */}
                    <text
                      x={node.x}
                      y={node.y + 4}
                      fill={textColor}
                      fontSize={isActor ? '13' : '11'}
                      fontWeight={isActor ? 'bold' : '600'}
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {state.placedText}
                    </text>

                    {/* Remove button on hover (if filled) */}
                    {isHovered && !isAutofilled && (
                      <g
                        transform={`translate(${slotX + 10}, ${slotY + 8})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveItem(node.id);
                        }}
                      >
                        <circle cx="0" cy="0" r="6" fill="#ef4444" opacity="0.9" />
                        <line x1="-2.5" y1="-2.5" x2="2.5" y2="2.5" stroke="#ffffff" strokeWidth="1.2" />
                        <line x1="2.5" y1="-2.5" x2="-2.5" y2="2.5" stroke="#ffffff" strokeWidth="1.2" />
                      </g>
                    )}
                  </g>
                ) : (
                  /* Empty state */
                  <g>
                    <text
                      x={node.x}
                      y={node.y + 3.5}
                      fill={isDragOver ? '#16a34a' : selectedBankItem ? '#3b82f6' : '#94a3b8'}
                      fontSize="10"
                      fontWeight="500"
                      textAnchor="middle"
                      className="select-none pointer-events-none"
                    >
                      {isDragOver
                        ? 'I-bitaw Dito'
                        : selectedBankItem
                        ? 'I-click para Ilagay'
                        : isActor
                        ? '[ Pangalan ng Sektor ]'
                        : '[ I-drop ang Daloy ]'}
                    </text>

                    {/* Error strike counter (if 1 mistake recorded) */}
                    {state.mistakes === 1 && (
                      <g transform={`translate(${slotX + node.width - 12}, ${slotY + 8})`}>
                        <circle cx="0" cy="0" r="5" fill="#f87171" />
                        <text
                          x="0"
                          y="2.5"
                          fill="#ffffff"
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          1
                        </text>
                      </g>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
