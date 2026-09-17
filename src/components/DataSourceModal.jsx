import React from 'react';
import { X, Database, Clock, RefreshCw, CheckCircle2, ShieldCheck, Cpu, Zap, Layers } from 'lucide-react';
import { DATA_PROVIDERS } from '../utils/liveDataService';

export default function DataSourceModal({ isOpen, onClose, dbMetadata, onRefreshData, isRefreshing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Data Architecture & Sources</h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Database Metadata, Timestamp Protocols, and Real-Time Synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
          
          {/* Timestamp & Freshness Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Last Dataset Sync</span>
              </div>
              <div className="text-base font-bold text-white font-mono">{dbMetadata.formattedDate}</div>
              <div className="text-[11px] text-slate-500 font-mono">{dbMetadata.formattedTime}</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Engine Version</span>
              </div>
              <div className="text-base font-bold text-white">{dbMetadata.version}</div>
              <div className="text-[11px] text-slate-500">Multi-Factor Valuation Weights</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80 space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Data Quality Index</span>
              </div>
              <div className="text-base font-bold text-white">{dbMetadata.dataQualityScore}%</div>
              <div className="text-[11px] text-slate-500">32 Global Economies Monitored</div>
            </div>
          </div>

          {/* Explanation Box: How Data is Fetched & Real-Time Status */}
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-2xl p-4 space-y-2">
            <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              How Data is Fetched & Real-Time Mechanism
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Multi-Source Synthesis:</strong> Valuation indicators are collected from institutional macroeconomic data hubs (Yale Shiller CAPE Dataset, IMF World Economic Outlook, and Yahoo Finance/Bloomberg market closing prices).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Real-Time Refresh Protocol:</strong> Fundamental ratios like CAPE and Buffett Indicators update on monthly and quarterly cycles, whereas price-derived multiples (Trailing P/E, Forward P/E, Dividend Yields) sync dynamically with real-time market movements. Clicking <strong className="text-blue-400">"Fetch Latest Live Data"</strong> recalculates up-to-the-second valuation scores.
            </p>
          </div>

          {/* Data Providers List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Connected Data Providers & Feeds
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DATA_PROVIDERS.map((provider) => (
                <div
                  key={provider.id}
                  className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{provider.icon}</span>
                      <h4 className="font-bold text-white text-xs">{provider.name}</h4>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {provider.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <div>
                      <span className="text-slate-500 block">Type</span>
                      <span className="text-slate-200">{provider.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Sync Frequency</span>
                      <span className="text-slate-200">{provider.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>All 32 Global Market Feeds Verified</span>
          </div>

          <button
            onClick={onRefreshData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/25"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing Live Feeds...' : 'Fetch Latest Live Market Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
