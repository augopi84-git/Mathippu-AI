import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WorldHeatmap from './components/WorldHeatmap';
import ValuationCharts from './components/ValuationCharts';
import HistoricalTrends from './components/HistoricalTrends';
import CountryResearchModal from './components/CountryResearchModal';
import WeightsModal from './components/WeightsModal';
import CompareModal from './components/CompareModal';
import AiDisclaimerBanner from './components/AiDisclaimerBanner';
import DataSourceModal from './components/DataSourceModal';

import { COUNTRY_MARKET_DATA, DEFAULT_WEIGHTS } from './data/countryMarketData';
import { getEnrichedCountries } from './utils/valuationEngine';
import { fetchLatestMarketData, INITIAL_DATABASE_METADATA } from './utils/liveDataService';
import { Download, Sparkles, TrendingDown, Percent, BarChart3, ChevronRight, Filter, Clock, Database } from 'lucide-react';

export default function App() {
  const [countriesData, setCountriesData] = useState(COUNTRY_MARKET_DATA);
  const [dbMetadata, setDbMetadata] = useState(INITIAL_DATABASE_METADATA);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeTab, setActiveTab] = useState('radar'); // 'radar', 'historical', 'charts'

  // Modals
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isDataSourceModalOpen, setIsDataSourceModalOpen] = useState(false);

  // Real-Time Live Data Fetch Handler
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    try {
      const { updatedCountries, metadata } = await fetchLatestMarketData(countriesData);
      setCountriesData(updatedCountries);
      setDbMetadata(metadata);
    } catch (err) {
      console.error('Failed to fetch live data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Enriched & Sorted Countries
  const enrichedCountries = useMemo(() => {
    return getEnrichedCountries(countriesData, weights);
  }, [countriesData, weights]);

  // Filtered Countries
  const filteredCountries = useMemo(() => {
    return enrichedCountries.filter(country => {
      // Search term matching
      const matchesSearch =
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.benchmarkIndex.toLowerCase().includes(searchTerm.toLowerCase());

      // Category matching
      const matchesCategory =
        selectedCategory === 'ALL' || country.valuation.categoryKey === selectedCategory;

      // Region matching
      const matchesRegion =
        selectedRegion === 'ALL' || country.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [enrichedCountries, searchTerm, selectedCategory, selectedRegion]);

  // Top Key Highlights
  const mostUndervalued = enrichedCountries[0];
  const highestYielding = [...enrichedCountries].sort((a, b) => b.metrics.divYield - a.metrics.divYield)[0];
  const avgCape = Math.round((enrichedCountries.reduce((acc, c) => acc + c.metrics.cape, 0) / enrichedCountries.length) * 10) / 10;

  // CSV Data Export
  const handleExportCSV = () => {
    const headers = ['ID,Country,Region,Type,Benchmark,Valuation Score,Category,Shiller CAPE,Trailing PE,Forward PE,PB,Div Yield %,Buffett Indicator %,Expected 5Y CAGR %'];
    const rows = filteredCountries.map(c => [
      c.id,
      `"${c.name}"`,
      c.region,
      c.type,
      `"${c.benchmarkIndex}"`,
      c.valuation.score,
      c.valuation.category.label,
      c.metrics.cape,
      c.metrics.pe,
      c.metrics.forwardPe,
      c.metrics.pb,
      c.metrics.divYield,
      c.metrics.buffettIndicator,
      c.valuation.dynamicCagr
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `global_equity_valuation_index_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white pb-12">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        selectedRegion={selectedRegion}
        onRegionSelect={setSelectedRegion}
        onOpenWeights={() => setIsWeightsModalOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenDataSource={() => setIsDataSourceModalOpen(true)}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
        dbMetadata={dbMetadata}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        countryCount={filteredCountries.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-6 space-y-6 flex-1 w-full">

        {/* Hero Quick Stat Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Monitored Markets */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Global Economies</span>
              <div className="text-xl font-bold text-white flex items-center gap-1.5">
                <span>{filteredCountries.length} Markets</span>
                <span className="text-xs text-slate-500 font-normal">/ {enrichedCountries.length} Total</span>
              </div>
            </div>
          </div>

          {/* Most Undervalued */}
          <div
            onClick={() => setSelectedCountry(mostUndervalued)}
            className="glass-panel glass-panel-hover cursor-pointer rounded-2xl p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{mostUndervalued.flag}</span>
              <div>
                <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> Most Undervalued
                </span>
                <div className="text-base font-bold text-white">{mostUndervalued.name}</div>
                <div className="text-[11px] text-slate-400">Score: {mostUndervalued.valuation.score}/100 • CAPE {mostUndervalued.metrics.cape}x</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Highest Dividend Yield */}
          <div
            onClick={() => setSelectedCountry(highestYielding)}
            className="glass-panel glass-panel-hover cursor-pointer rounded-2xl p-4 border border-amber-500/30 bg-amber-500/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{highestYielding.flag}</span>
              <div>
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider block flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Top Dividend Market
                </span>
                <div className="text-base font-bold text-white">{highestYielding.name}</div>
                <div className="text-[11px] text-slate-400">{highestYielding.metrics.divYield}% Dividend Yield</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </div>

          {/* Global CAPE Average & Live Timestamp */}
          <div
            onClick={() => setIsDataSourceModalOpen(true)}
            className="glass-panel glass-panel-hover cursor-pointer rounded-2xl p-4 border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">Avg CAPE Ratio</span>
                <div className="text-xl font-bold text-white">{avgCape}x</div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {dbMetadata.formattedDate}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        {/* View Switcher Routing */}
        {activeTab === 'radar' && (
          <>
            {/* Section 1: Interactive Heatmap */}
            <WorldHeatmap
              countries={filteredCountries}
              onSelectCountry={(c) => setSelectedCountry(c)}
              selectedCountryId={selectedCountry?.id}
            />

            {/* Section 2: Detailed Filterable Country Grid Table */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                    Market Valuation Index Rankings
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Showing {filteredCountries.length} countries sorted from cheapest to most expensive valuation score.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-all self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  Export CSV Dataset
                </button>
              </div>

              {/* Cards Grid / Responsive Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => setSelectedCountry(country)}
                    className="glass-panel glass-panel-hover rounded-xl p-4 border border-slate-800/90 cursor-pointer flex flex-col justify-between space-y-3"
                  >
                    {/* Card Top */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h4 className="font-bold text-white text-base leading-tight hover:text-blue-400 transition-colors">
                            {country.name}
                          </h4>
                          <span className="text-[11px] text-slate-400">{country.benchmarkIndex}</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${country.valuation.category.bgClass}`}>
                        {country.valuation.category.label}
                      </span>
                    </div>

                    {/* Score Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Valuation Score:</span>
                        <span className="font-bold text-white font-mono">{country.valuation.score} <span className="text-[10px] text-slate-500">/ 100</span></span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${country.valuation.score}%`,
                            backgroundColor: country.valuation.category.color
                          }}
                        />
                      </div>
                    </div>

                    {/* Sub-Metrics Grid */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1 border-t border-slate-800/60">
                      <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-400 block">CAPE</span>
                        <span className="font-bold text-emerald-400">{country.metrics.cape}x</span>
                      </div>
                      <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-400 block">Forward P/E</span>
                        <span className="font-bold text-blue-400">{country.metrics.forwardPe}x</span>
                      </div>
                      <div className="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-400 block">Div Yield</span>
                        <span className="font-bold text-amber-400">{country.metrics.divYield}%</span>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="flex items-center justify-between pt-2 text-xs text-blue-400 font-semibold border-t border-slate-800/60">
                      <span>View AI Research & Thesis</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredCountries.length === 0 && (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Filter className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-white">No markets found matching filters</p>
                  <p className="text-xs text-slate-500">Try clearing your search keyword or switching category filter.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Section: Historical Trends View */}
        {activeTab === 'historical' && (
          <HistoricalTrends />
        )}

        {/* Section: Scatter & Radar Charts View */}
        {activeTab === 'charts' && (
          <ValuationCharts
            countries={filteredCountries}
            selectedCountry={selectedCountry}
            onSelectCountry={(c) => setSelectedCountry(c)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-slate-800/80 w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span className="font-bold text-white">ValuaGlobe AI</span> — Global Equity Market Valuation & Research Explorer.
          <span className="block text-[11px] text-slate-500">
            Last Synced: <strong className="text-slate-300 font-mono">{dbMetadata.formattedDate} ({dbMetadata.formattedTime})</strong> • Engine {dbMetadata.version}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <button onClick={() => setIsDataSourceModalOpen(true)} className="hover:text-white underline flex items-center gap-1 text-emerald-400">
            <Database className="w-3.5 h-3.5" /> Data Sources & Timestamp
          </button>
          <span>•</span>
          <button onClick={() => setIsDisclaimerOpen(true)} className="hover:text-white underline">
            AI Methodology & Disclaimer
          </button>
          <span>•</span>
          <button onClick={() => setIsWeightsModalOpen(true)} className="hover:text-white underline">
            Valuation Sliders
          </button>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CountryResearchModal
        country={selectedCountry}
        isOpen={Boolean(selectedCountry)}
        onClose={() => setSelectedCountry(null)}
      />

      <WeightsModal
        weights={weights}
        onWeightsChange={setWeights}
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
      />

      <CompareModal
        countries={enrichedCountries}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onSelectCountry={(c) => setSelectedCountry(c)}
      />

      <AiDisclaimerBanner
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <DataSourceModal
        isOpen={isDataSourceModalOpen}
        onClose={() => setIsDataSourceModalOpen(false)}
        dbMetadata={dbMetadata}
        onRefreshData={handleRefreshData}
        isRefreshing={isRefreshing}
      />
    </div>
  );
}
