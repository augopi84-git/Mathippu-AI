import React, { useState } from 'react';
import { X, ArrowLeftRight, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function CompareModal({ countries, isOpen, onClose, onSelectCountry }) {
  const [selectedIds, setSelectedIds] = useState(['USA', 'IND', 'DEU']);

  if (!isOpen) return null;

  const selectedCountries = countries.filter(c => selectedIds.includes(c.id));

  const handleAddCountry = (id) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveCountry = (id) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-modal max-w-5xl w-full rounded-2xl border border-slate-700 shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ArrowLeftRight className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Side-by-Side Market Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Compare up to 3 global economies across valuation indices, fundamental ratios, and AI growth forecasts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Country Selector Toolbar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Selected Markets ({selectedIds.length}/3):</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedCountries.map(c => (
                <span
                  key={c.id}
                  className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg text-white font-bold flex items-center gap-1.5"
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                  {selectedIds.length > 1 && (
                    <button
                      onClick={() => handleRemoveCountry(c.id)}
                      className="text-slate-500 hover:text-rose-400 ml-1"
                    >
                      ✕
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {selectedIds.length < 3 && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Add Market:</span>
              <select
                onChange={(e) => e.target.value && handleAddCountry(e.target.value)}
                defaultValue=""
                className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled>Select country...</option>
                {countries.filter(c => !selectedIds.includes(c.id)).map(c => (
                  <option key={c.id} value={c.id}>{c.flag} {c.name} ({c.id})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="p-4 md:p-6 overflow-y-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-slate-400 font-semibold w-1/4 uppercase tracking-wider text-[11px]">Metric / Factor</th>
                {selectedCountries.map(c => (
                  <th key={c.id} className="p-3 text-center w-1/4">
                    <div className="text-2xl mb-1">{c.flag}</div>
                    <div className="font-bold text-white text-sm">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.benchmarkIndex}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {/* Valuation Score */}
              <tr>
                <td className="p-3 font-semibold text-slate-200">Valuation Score</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full font-bold border ${c.valuation.category.bgClass}`}>
                      {c.valuation.score} / 100 ({c.valuation.category.label})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Shiller CAPE */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Shiller CAPE Ratio</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-bold text-emerald-400 font-mono text-sm">
                    {c.metrics.cape}x
                  </td>
                ))}
              </tr>

              {/* Trailing P/E */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Trailing P/E Ratio</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-mono text-slate-200">
                    {c.metrics.pe}x
                  </td>
                ))}
              </tr>

              {/* Forward P/E */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Forward 12M P/E</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-mono text-blue-400">
                    {c.metrics.forwardPe}x
                  </td>
                ))}
              </tr>

              {/* Price to Book */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Price to Book (P/B)</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-mono text-indigo-400">
                    {c.metrics.pb}x
                  </td>
                ))}
              </tr>

              {/* Dividend Yield */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Dividend Yield</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-bold text-amber-400 font-mono">
                    {c.metrics.divYield}%
                  </td>
                ))}
              </tr>

              {/* Buffett Indicator */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Buffett Indicator (Market Cap/GDP)</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-mono text-purple-400">
                    {c.metrics.buffettIndicator}%
                  </td>
                ))}
              </tr>

              {/* GDP Growth */}
              <tr>
                <td className="p-3 font-medium text-slate-400">Real GDP Growth %</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-mono text-slate-300">
                    {c.metrics.gdpGrowth}%
                  </td>
                ))}
              </tr>

              {/* Expected 5Y CAGR */}
              <tr className="bg-blue-950/20">
                <td className="p-3 font-bold text-blue-300">Expected 5Y CAGR (AI Model)</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-center font-black text-white text-sm font-mono">
                    +{c.valuation.dynamicCagr}%
                  </td>
                ))}
              </tr>

              {/* AI Thesis Summary */}
              <tr>
                <td className="p-3 font-medium text-slate-400">AI Thesis Highlight</td>
                {selectedCountries.map(c => (
                  <td key={c.id} className="p-3 text-[11px] text-slate-300 italic text-left leading-relaxed">
                    "{c.aiResearch.thesis.slice(0, 110)}..."
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            Done Comparing
          </button>
        </div>

      </div>
    </div>
  );
}
