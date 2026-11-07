import React from 'react';
import { Search, Sliders, ArrowLeftRight, Sparkles, ShieldAlert, RefreshCw, Database, History, BarChart3, LayoutGrid, Scale, BriefcaseBusiness, Coins } from 'lucide-react';

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
    <header className="market-header glass-panel sticky top-0 z-40 px-4 py-3 md:px-8">
      <div className="max-w-[92rem] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Logo, AI Badge & Timestamp */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="./mathippu-ai-logo.jpg"
              alt="Mathippu-AI"
              className="h-[72px] w-[132px] shrink-0 rounded-lg object-contain bg-white p-1 shadow-sm ring-1 ring-[#173f35]/10 sm:h-[76px] sm:w-[160px] lg:h-[82px] lg:w-[150px]"
            />

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#d8ff3e] text-[#173f35] border border-[#173f35]/10 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  மதிப்பு (Value AI)
                </span>
                {/* Live Freshness & Timestamp Badge */}
                <button
                  onClick={onOpenDataSource}
                  className="bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-700 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1.5 transition-colors duration-100"
                  title="Click to view Data Architecture & Source Protocols"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span>{dbMetadata.formattedDate} • Live</span>
                </button>
              </div>
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
        <div className="flex items-center overflow-x-auto bg-[#eeece5] p-1 rounded-xl border border-[#dcded7] self-center text-xs font-semibold">
          <button
            onClick={() => onTabChange('radar')}
            className={`px-3.5 py-1.5 rounded-md transition-colors duration-100 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              activeTab === 'radar'
                ? 'bg-[#173f35] text-white shadow-sm'
                : 'text-[#68716d] hover:text-[#17201d]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Market Radar
          </button>

          <button
            onClick={() => onTabChange('historical')}
            className={`px-3.5 py-1.5 rounded-md transition-colors duration-100 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
              activeTab === 'historical'
                ? 'bg-[#173f35] text-white shadow-sm'
                : 'text-[#68716d] hover:text-[#17201d]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Historical Trends
          </button>

          <button
            onClick={() => onTabChange('charts')}
            className={`px-3.5 py-1.5 rounded-md transition-colors duration-100 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              activeTab === 'charts'
                ? 'bg-[#173f35] text-white shadow-sm'
                : 'text-[#68716d] hover:text-[#17201d]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Scatter & Radar
          </button>

          <button
            onClick={() => onTabChange('investment')}
            className={`px-3.5 py-1.5 rounded-md transition-colors duration-100 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === 'investment'
                ? 'bg-[#173f35] text-white shadow-sm'
                : 'text-[#68716d] hover:text-[#17201d]'
            }`}
          >
            <BriefcaseBusiness className="w-3.5 h-3.5" />
            Stocks & ETFs
          </button>

          <button
            onClick={() => onTabChange('crypto')}
            className={`px-3.5 py-1.5 rounded-md transition-colors duration-100 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === 'crypto'
                ? 'bg-[#173f35] text-white shadow-sm'
                : 'text-[#68716d] hover:text-[#17201d]'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            Crypto
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
              className="w-full bg-white border border-[#dcded7] focus:border-[#173f35] text-[#17201d] placeholder:text-[#969d99] text-xs rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173f35]/30 transition-colors duration-100"
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
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-white rounded-lg text-xs font-bold transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              title="Fetch Latest Up-to-the-Second Market Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Fetch Live Data'}
            </button>

            {/* Data Source Modal Trigger */}
            <button
              onClick={onOpenDataSource}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-[color,background-color,border-color] duration-100 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              title="Data Architecture & Sources"
            >
              <Database className="w-4 h-4 text-blue-400" />
            </button>

            <button
              onClick={onOpenWeights}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-[color,background-color,border-color] duration-100 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              title="Weight Sliders"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={onOpenCompare}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl transition-[color,background-color,border-color] duration-100 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
                className={`px-2.5 py-1 rounded-lg font-medium transition-[color,background-color,border-color] duration-100 ease-out active:scale-[0.98] ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow shadow-emerald-500/20'
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
                className={`px-2.5 py-1 rounded-lg font-medium transition-[color,background-color,border-color] duration-100 ease-out active:scale-[0.98] ${
                  selectedRegion === reg
                    ? 'bg-indigo-600 text-white shadow shadow-indigo-500/20'
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
