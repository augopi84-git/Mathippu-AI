import React, { useState } from 'react';
import { X, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Zap, Layers, Play, RefreshCw, BarChart2 } from 'lucide-react';

export default function CountryResearchModal({ country, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'thesis', 'scenarios'
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [simulatedReturnDelta, setSimulatedReturnDelta] = useState(0);

  if (!isOpen || !country) return null;

  const handleApplyScenario = (sc) => {
    if (selectedScenario?.name === sc.name) {
      setSelectedScenario(null);
      setSimulatedReturnDelta(0);
    } else {
      setSelectedScenario(sc);
      setSimulatedReturnDelta(sc.expectedReturnChange);
    }
  };

  const baseReturn = country.aiResearch.returnForecasts.base;
  const simulatedReturn = Math.round((baseReturn + simulatedReturnDelta) * 10) / 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-modal max-w-4xl w-full rounded-2xl border border-slate-700 shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">

        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl md:text-5xl drop-shadow-md">{country.flag}</span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl md:text-3xl font-black text-white">{country.name}</h2>
                <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded-md">
                  {country.id}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${country.valuation.category.bgClass}`}>
                  {country.valuation.category.label} ({country.valuation.score}/100)
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-400 mt-1 flex items-center gap-2">
                <span>Benchmark: <strong className="text-slate-200">{country.benchmarkIndex}</strong></span>
                <span>•</span>
                <span>Type: <strong className="text-blue-400">{country.type} Market</strong></span>
                <span>•</span>
                <span>Region: <strong className="text-slate-300">{country.region}</strong></span>
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 md:px-6 pt-3 bg-slate-950/50 border-b border-slate-800/80 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('thesis')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'thesis'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Investment Thesis & Risks
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'scenarios'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            AI Scenario Simulator
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-6 text-xs md:text-sm">

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Shiller CAPE</span>
              <span className="text-base font-bold text-emerald-400">{country.metrics.cape}x</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Trailing P/E</span>
              <span className="text-base font-bold text-slate-100">{country.metrics.pe}x</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Forward P/E</span>
              <span className="text-base font-bold text-blue-400">{country.metrics.forwardPe}x</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Price to Book</span>
              <span className="text-base font-bold text-indigo-400">{country.metrics.pb}x</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Div Yield</span>
              <span className="text-base font-bold text-amber-400">{country.metrics.divYield}%</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Buffett Indicator</span>
              <span className="text-base font-bold text-purple-400">{country.metrics.buffettIndicator}%</span>
            </div>
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* AI Macro Synthesis Box */}
              <div className="p-4 bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  AI Macro Synthesis Report
                </div>
                <p className="text-slate-200 text-sm leading-relaxed font-normal">
                  {country.aiResearch.summary}
                </p>
              </div>

              {/* AI Expected Return Outlook & Confidence */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    AI 5-Year Annualized Return Scenarios
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-mono">
                    <span>AI Confidence:</span>
                    <strong className="text-white">{country.aiResearch.returnForecasts.aiConfidence}%</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-center">
                    <span className="text-[10px] text-rose-300 font-medium block">Bear Case 5Y CAGR</span>
                    <span className="text-xl font-black text-rose-400">
                      {country.aiResearch.returnForecasts.bear > 0 ? '+' : ''}{country.aiResearch.returnForecasts.bear}%
                    </span>
                  </div>
                  <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-center shadow-lg shadow-blue-500/10">
                    <span className="text-[10px] text-blue-300 font-medium block">Base Case 5Y CAGR</span>
                    <span className="text-2xl font-black text-white">
                      {simulatedReturn > 0 ? '+' : ''}{simulatedReturn}%
                    </span>
                    {selectedScenario && (
                      <span className="text-[10px] text-emerald-400 block mt-0.5">
                        (Simulated: {selectedScenario.name})
                      </span>
                    )}
                  </div>
                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-center">
                    <span className="text-[10px] text-emerald-300 font-medium block">Bull Case 5Y CAGR</span>
                    <span className="text-xl font-black text-emerald-400">
                      +{country.aiResearch.returnForecasts.bull}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Sector Composition Bar */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Leading Index Sector Breakdown
                </h4>

                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex">
                  {Object.entries(country.aiResearch.sectorWeights).map(([sector, pct], idx) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];
                    return (
                      <div
                        key={sector}
                        style={{ width: `${pct}%`, backgroundColor: colors[idx % colors.length] }}
                        className="h-full"
                        title={`${sector}: ${pct}%`}
                      />
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 text-[11px]">
                  {Object.entries(country.aiResearch.sectorWeights).map(([sector, pct], idx) => {
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];
                    return (
                      <div key={sector} className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                        <span>{sector}: <strong>{pct}%</strong></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVESTMENT THESIS & RISKS */}
          {activeTab === 'thesis' && (
            <div className="space-y-4">
              {/* Strategic Thesis */}
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Core Investment Thesis
                </h4>
                <p className="text-slate-200 leading-relaxed text-sm">
                  {country.aiResearch.thesis}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Growth Catalysts */}
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Key Growth Drivers & Catalysts
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {country.aiResearch.growthDrivers.map((driver, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risk Factors */}
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                  <h4 className="font-bold text-rose-400 text-xs uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Macro Downside Risks
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {country.aiResearch.riskFactors.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-rose-400 font-bold mt-0.5">•</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCENARIO SIMULATOR */}
          {activeTab === 'scenarios' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Play className="w-4 h-4 text-blue-400" />
                  Interactive AI Macro Scenario Simulator
                </h4>
                <p className="text-xs text-slate-400">
                  Select a macro shock event to simulate its impact on the country's expected valuation index and CAGR returns.
                </p>
              </div>

              <div className="space-y-2.5">
                {country.aiResearch.scenarios.map((sc, i) => {
                  const isSelected = selectedScenario?.name === sc.name;
                  return (
                    <div
                      key={i}
                      onClick={() => handleApplyScenario(sc)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-blue-950/60 border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-white text-sm flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-400 animate-ping' : 'bg-slate-600'}`} />
                          {sc.name}
                        </span>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className={sc.scoreImpact < 0 ? 'text-emerald-400' : 'text-rose-400'}>
                            Valuation Impact: {sc.scoreImpact > 0 ? '+' : ''}{sc.scoreImpact} pts
                          </span>
                          <span className={sc.expectedReturnChange > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            CAGR Delta: {sc.expectedReturnChange > 0 ? '+' : ''}{sc.expectedReturnChange}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic">{sc.comment}</p>
                    </div>
                  );
                })}
              </div>

              {selectedScenario && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between">
                  <div className="text-xs text-emerald-300">
                    Active Scenario Simulation: <strong>{selectedScenario.name}</strong>
                  </div>
                  <button
                    onClick={() => handleApplyScenario(selectedScenario)}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 underline"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Simulation
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[10px]">
            AI Research Model: GPT-Synthesizer-4o | Data Verified Sept 2026
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
}
