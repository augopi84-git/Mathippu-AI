import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check, Sparkles, Award } from 'lucide-react';
import { DEFAULT_WEIGHTS } from '../data/countryMarketData';

export default function WeightsModal({ weights, onWeightsChange, isOpen, onClose }) {
  const [localWeights, setLocalWeights] = useState({ ...weights });

  if (!isOpen) return null;

  const handleSliderChange = (key, val) => {
    setLocalWeights(prev => ({
      ...prev,
      [key]: parseFloat(val)
    }));
  };

  const applyPreset = (presetWeights) => {
    setLocalWeights(presetWeights);
  };

  const handleSave = () => {
    onWeightsChange(localWeights);
    onClose();
  };

  const handleReset = () => {
    setLocalWeights(DEFAULT_WEIGHTS);
  };

  const totalSum = Math.round(
    Object.values(localWeights).reduce((a, b) => a + b, 0) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-modal max-w-xl w-full rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Sliders className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Custom Valuation Factor Weights
            </h3>
            <p className="text-xs text-slate-400">
              Customize metric weighting parameters to recalculate global equity scores live.
            </p>
          </div>
        </div>

        {/* Preset Strategies */}
        <div className="mb-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Investor Profile Presets:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => applyPreset({ cape: 0.35, pe: 0.25, forwardPe: 0.15, pb: 0.15, buffettIndicator: 0.05, divYield: 0.05 })}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-left transition-all"
            >
              <div className="font-bold text-emerald-400 text-[11px]">Deep Value</div>
              <div className="text-[10px] text-slate-400">CAPE & Trailing P/E</div>
            </button>
            <button
              onClick={() => applyPreset({ cape: 0.10, pe: 0.15, forwardPe: 0.40, pb: 0.15, buffettIndicator: 0.15, divYield: 0.05 })}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-left transition-all"
            >
              <div className="font-bold text-blue-400 text-[11px]">Forward Growth</div>
              <div className="text-[10px] text-slate-400">Forward P/E Heavy</div>
            </button>
            <button
              onClick={() => applyPreset({ cape: 0.10, pe: 0.15, forwardPe: 0.10, pb: 0.15, buffettIndicator: 0.10, divYield: 0.40 })}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-left transition-all"
            >
              <div className="font-bold text-amber-400 text-[11px]">High Yield</div>
              <div className="text-[10px] text-slate-400">Dividend Focus</div>
            </button>
            <button
              onClick={() => applyPreset(DEFAULT_WEIGHTS)}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg text-left transition-all"
            >
              <div className="font-bold text-purple-400 text-[11px]">Balanced AI</div>
              <div className="text-[10px] text-slate-400">Multi-Factor Default</div>
            </button>
          </div>
        </div>

        {/* Sliders List */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
          {[
            { key: 'cape', label: 'Shiller CAPE Ratio', desc: '10-Year inflation-adjusted earnings multiple' },
            { key: 'pe', label: 'Trailing 12M P/E', desc: 'Current trailing earnings ratio' },
            { key: 'forwardPe', label: 'Forward 12M P/E', desc: 'Consensus 12-month expected earnings' },
            { key: 'pb', label: 'Price to Book (P/B)', desc: 'Equity asset valuation ratio' },
            { key: 'buffettIndicator', label: 'Buffett Indicator', desc: 'Market Cap / GDP ratio' },
            { key: 'divYield', label: 'Dividend Yield', desc: 'Cash distribution yield' }
          ].map((item) => {
            const valPct = Math.round((localWeights[item.key] || 0) * 100);
            return (
              <div key={item.key} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1 text-xs">
                  <div>
                    <span className="font-bold text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                  </div>
                  <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {valPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  value={localWeights[item.key] || 0}
                  onChange={(e) => handleSliderChange(item.key, e.target.value)}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
            >
              <Check className="w-4 h-4" />
              Recalculate Map & Charts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
