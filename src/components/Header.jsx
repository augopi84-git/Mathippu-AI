import React from 'react';
import { Search, Sliders, ArrowLeftRight, Sparkles, ShieldAlert, Globe, RefreshCw, Database, History, BarChart3, LayoutGrid } from 'lucide-react';

export default function Header({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedRegion,
  onRegionSelect,
  onOpenWeights,
  onOpenCompare,
  onOpenDisclaimer,
  onOpenDataSource,
  onRefreshData,
  isRefreshing,
  dbMetadata,
  activeTab,
  onTabChange,
  countryCount
}) {
  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-slate-800 shadow-xl px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Logo, AI Badge & Timestamp */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Globe className="w-6 h-6 animate-pulse-glow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400">
                  ValuaGlobe AI
                </h1>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Research
                </span>
                {/* Live Freshness & Timestamp Badge */}
                <button
                  onClick={onOpenDataSource}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 transition-all"
                  title="Click to view Data Architecture & Source Protocols"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{dbMetadata.formattedDate} • Live</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Global Equity Valuation Radar • Real-Time Macro & Historical Index Trends
              </p>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-blue-400 hover:text-white"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onOpenWeights}
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white"
              title="Weights"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Main Views) */}
        <div className="flex items-center bg-slate-950/90 p-1 rounded-xl border border-slate-800 self-center text-xs font-semibold">
          <button
            onClick={() => onTabChange('radar')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'radar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Market Radar
          </button>

          <button
            onClick={() => onTabChange('historical')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'historical'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Historical Trends
          </button>

          <button
            onClick={() => onTabChange('charts')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'charts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Scatter & Radar
          </button>
        </div>

        {/* Search Bar & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search country or index..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-blue-500 text-slate-100 text-xs rounded-xl pl-9 pr-8 py-2 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Live Refresh Button */}
            <button
              onClick={onRefreshData}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-500 hover:to-indigo-500 border border-blue-500/40 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              title="Fetch Latest Up-to-the-Second Market Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Fetch Live Data'}
            </button>

            {/* Data Source Modal Trigger */}
            <button
              onClick={onOpenDataSource}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all"
              title="Data Architecture & Sources"
            >
              <Database className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={onOpenWeights}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all"
              title="Weight Sliders"
            >
              <Sliders className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={onOpenCompare}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-all"
              title="Compare Markets"
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Chips Toolbar */}
      {activeTab === 'radar' && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Category:</span>
            {['ALL', 'UNDERVALUED', 'FAIR', 'OVERVALUED', 'EXTREME'].map((cat) => (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Region:</span>
            {['ALL', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East & Africa'].map((reg) => (
              <button
                key={reg}
                onClick={() => onRegionSelect(reg)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedRegion === reg
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {reg === 'ALL' ? 'Global' : reg}
              </button>
            ))}

            <span className="ml-2 text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
              {countryCount} Markets Monitored
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
