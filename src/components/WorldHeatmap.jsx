import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info, Sparkles, ChevronRight } from 'lucide-react';
import { worldMapPaths } from '../data/worldMapPaths';

export default function WorldHeatmap({ countries, onSelectCountry, selectedCountryId }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1000, h: 500 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeCategoryHighlight, setActiveCategoryHighlight] = useState(null);

  // Map country ID lookup map
  const countryMap = React.useMemo(() => {
    const map = {};
    countries.forEach(c => {
      map[c.id] = c;
    });
    return map;
  }, [countries]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.3, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.3, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setViewBox({ x: 0, y: 0, w: 1000, h: 500 });
  };

  const handleMouseMove = (e, countryId) => {
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltipPos({ x, y });

    if (countryMap[countryId]) {
      setHoveredCountry(countryMap[countryId]);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <div className="relative glass-panel rounded-2xl p-4 md:p-6 overflow-hidden border border-slate-800 shadow-2xl">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            Global Valuation Heatmap
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Color-coded equity valuation index per economy. Click any country for full AI market research.
          </p>
        </div>

        {/* Map Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-slate-300">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Reset Map"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative w-full h-[360px] md:h-[480px] bg-slate-950/70 rounded-xl overflow-hidden border border-slate-900 flex items-center justify-center">
        <svg
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="500" fill="url(#grid)" />

          {/* Render Countries */}
          {worldMapPaths.map((pathObj) => {
            const country = countryMap[pathObj.id];
            const isSelected = selectedCountryId === pathObj.id;
            const isHovered = hoveredCountry?.id === pathObj.id;

            let fillColor = '#1e293b'; // Unmonitored default slate
            let strokeColor = '#334155';
            let strokeWidth = isSelected ? 2.5 : 1;
            let opacity = 0.85;

            if (country) {
              fillColor = country.valuation.category.color;

              if (activeCategoryHighlight && country.valuation.categoryKey !== activeCategoryHighlight) {
                opacity = 0.25;
              }

              if (isHovered || isSelected) {
                opacity = 1;
                strokeColor = '#ffffff';
                strokeWidth = 2;
              }
            }

            return (
              <path
                key={pathObj.id}
                d={pathObj.d}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                opacity={opacity}
                className="transition-all duration-200 cursor-pointer hover:filter hover:brightness-125"
                onMouseMove={(e) => handleMouseMove(e, pathObj.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => country && onSelectCountry(country)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredCountry && (
          <div
            className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-full mb-3 glass-modal rounded-xl p-3 shadow-2xl border border-slate-700/80 w-64 text-left transition-all duration-150"
            style={{
              left: `${Math.min(Math.max(tooltipPos.x, 140), 850)}px`,
              top: `${Math.max(tooltipPos.y - 12, 100)}px`
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{hoveredCountry.flag}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{hoveredCountry.name}</h4>
                  <p className="text-[11px] text-slate-400">{hoveredCountry.benchmarkIndex}</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${hoveredCountry.valuation.category.bgClass}`}>
                {hoveredCountry.valuation.category.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Valuation Score</span>
                <span className="text-sm font-bold text-white">{hoveredCountry.valuation.score} <span className="text-[10px] text-slate-500">/ 100</span></span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Shiller CAPE</span>
                <span className="text-sm font-bold text-emerald-400">{hoveredCountry.metrics.cape}x</span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Trailing P/E</span>
                <span className="text-sm font-bold text-slate-200">{hoveredCountry.metrics.pe}x</span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Div Yield</span>
                <span className="text-sm font-bold text-amber-400">{hoveredCountry.metrics.divYield}%</span>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-blue-400 flex items-center justify-between font-medium pt-1 border-t border-slate-800/60">
              <span>Click for AI Research Report</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>

      {/* Legend & Filter Badges */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Valuation Scale:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'UNDERVALUED', label: 'Undervalued (< 35)', color: '#10b981' },
            { key: 'FAIR', label: 'Fairly Valued (35 - 62)', color: '#f59e0b' },
            { key: 'OVERVALUED', label: 'Overvalued (63 - 78)', color: '#f43f5e' },
            { key: 'EXTREME', label: 'Bubble Risk (> 78)', color: '#a855f7' }
          ].map((cat) => {
            const count = countries.filter(c => c.valuation.categoryKey === cat.key).length;
            const isHighlighted = activeCategoryHighlight === cat.key;

            return (
              <button
                key={cat.key}
                onMouseEnter={() => setActiveCategoryHighlight(cat.key)}
                onMouseLeave={() => setActiveCategoryHighlight(null)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border transition-all ${
                  isHighlighted
                    ? 'bg-slate-800 border-white text-white scale-105 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.label}</span>
                <span className="bg-slate-800 px-1.5 py-0.2 text-[10px] rounded-full text-slate-400 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
