import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import WorldHeatmap from './components/WorldHeatmap';
import ValuationCharts from './components/ValuationCharts';
import HistoricalTrends from './components/HistoricalTrends';
import InvestmentAnalysisPage from './components/InvestmentAnalysisPage';
import CountryResearchModal from './components/CountryResearchModal';
import WeightsModal from './components/WeightsModal';
import CompareModal from './components/CompareModal';
import AiDisclaimerBanner from './components/AiDisclaimerBanner';
import DataSourceModal from './components/DataSourceModal';

import { COUNTRY_MARKET_DATA, DEFAULT_WEIGHTS } from './data/countryMarketData';
import { getEnrichedCountries } from './utils/valuationEngine';
import { fetchLatestMarketData, INITIAL_DATABASE_METADATA } from './utils/liveDataService';
import { Download, Sparkles, TrendingDown, Percent, BarChart3, ChevronRight, Filter, Clock, Database, BriefcaseBusiness, ArrowUpRight } from 'lucide-react';

const INVESTMENT_TIME_BUCKETS = [
  { key: 'daily', label: 'Daily', hint: 'Tactical swing', returnRange: '+0.5% to +2.5%' },
  { key: 'week', label: 'Week', hint: 'Short-term trend', returnRange: '+1% to +5%' },
  { key: 'month', label: 'Month', hint: 'Momentum follow-through', returnRange: '+2% to +8%' },
  { key: 'year', label: '1 Year', hint: 'Annual compounding', returnRange: '+8% to +18%' },
  { key: '2year', label: '2 Year', hint: 'Re-rating cycle', returnRange: '+12% to +25%' },
  { key: '3year', label: '3 Year', hint: 'Macro/theme expansion', returnRange: '+15% to +35%' },
  { key: '5year', label: '5 Year', hint: 'Compounded secular growth', returnRange: '+18% to +45%' },
  { key: '10year', label: '10 Year', hint: 'Long-duration compounding', returnRange: '+20% to +60%' },
  { key: '15to20year', label: '15-20 Year', hint: 'Structural capital allocation', returnRange: '+25% to +100%+' }
];

const COUNTRY_INVESTMENT_IDEAS = {
  USA: {
    summary: 'Quality-growth + broad-market core portfolio tuned for AI, dividends and long-term compounding.',
    buckets: [
      { key: 'daily', picks: [{ name: 'NASDAQ 100 ETF', type: 'ETF' }, { name: 'AAPL', type: 'Stock' }], thesis: 'Momentum rotation into AI leaders remains intact.', returnRange: '+0.5% to +2.5%' },
      { key: 'week', picks: [{ name: 'QQQ', type: 'ETF' }, { name: 'MSFT', type: 'Stock' }], thesis: 'Cloud and AI monetization keeps the growth narrative alive.', returnRange: '+1% to +5%' },
      { key: 'month', picks: [{ name: 'VOO', type: 'ETF' }, { name: 'NVDA', type: 'Stock' }], thesis: 'Broad market breadth improves as semiconductor capex remains elevated.', returnRange: '+2% to +8%' },
      { key: 'year', picks: [{ name: 'VTI', type: 'ETF' }, { name: 'AMZN', type: 'Stock' }], thesis: 'Large-cap secular growth and consumer demand should support compounding.', returnRange: '+8% to +18%' },
      { key: '2year', picks: [{ name: 'SCHD', type: 'ETF' }, { name: 'GOOGL', type: 'Stock' }], thesis: 'Dividend quality and AI-driven ad/enterprise spending support the cycle.', returnRange: '+12% to +25%' },
      { key: '3year', picks: [{ name: 'SPY', type: 'ETF' }, { name: 'META', type: 'Stock' }], thesis: 'Ad monetization and enterprise AI spending should sustain above-trend earnings.', returnRange: '+15% to +35%' },
      { key: '5year', picks: [{ name: 'VXUS', type: 'ETF' }, { name: 'AVGO', type: 'Stock' }], thesis: 'AI infrastructure, networking, and global diversification remain highly attractive.', returnRange: '+18% to +45%' },
      { key: '10year', picks: [{ name: 'VTI', type: 'ETF' }, { name: 'MSFT', type: 'Stock' }], thesis: 'Compounding over a full market cycle benefits high-quality secular winners.', returnRange: '+20% to +60%' },
      { key: '15to20year', picks: [{ name: 'Vanguard Total Stock Market', type: 'ETF' }, { name: 'AAPL', type: 'Stock' }], thesis: 'Core equity exposure remains the strongest long-run wealth creator.', returnRange: '+25% to +100%+' }
    ]
  },
  CHN: {
    summary: 'Value and stimulus-driven recovery basket, focused on industrials, consumer reopening, and EV supply chains.',
    buckets: [
      { key: 'daily', picks: [{ name: 'Alibaba', type: 'Stock' }, { name: 'iShares China Large-Cap', type: 'ETF' }], thesis: 'Policy support and recovery liquidity keep high-beta China names active.', returnRange: '+0.8% to +3%' },
      { key: 'week', picks: [{ name: 'Tencent', type: 'Stock' }, { name: 'KWEB', type: 'ETF' }], thesis: 'Internet and online consumption are responding to stimulus and reopening.', returnRange: '+2% to +6%' },
      { key: 'month', picks: [{ name: 'CATL', type: 'Stock' }, { name: 'EV', type: 'ETF' }], thesis: 'Battery and EV supply chains offer visibility into policy-led industrial upgrade.', returnRange: '+4% to +10%' },
      { key: 'year', picks: [{ name: 'Pinduoduo', type: 'Stock' }, { name: 'CQQQ', type: 'ETF' }], thesis: 'Consumer resilience and digital commerce should recover with domestic demand.', returnRange: '+10% to +20%' },
      { key: '2year', picks: [{ name: 'BYD', type: 'Stock' }, { name: 'China A-Shares ETF', type: 'ETF' }], thesis: 'Re-rating from value discounts and manufacturing upgrades should improve multiple expansion.', returnRange: '+15% to +28%' },
      { key: '3year', picks: [{ name: 'Ping An', type: 'Stock' }, { name: 'China Dividend ETF', type: 'ETF' }], thesis: 'Policy stabilization and lower rates support financial and quality value plays.', returnRange: '+18% to +35%' },
      { key: '5year', picks: [{ name: 'CATL', type: 'Stock' }, { name: 'China EV ETF', type: 'ETF' }], thesis: 'Green-energy, battery, and industrial policy create a long structural tailwind.', returnRange: '+22% to +50%' },
      { key: '10year', picks: [{ name: 'China A-shares', type: 'ETF' }, { name: 'Alibaba', type: 'Stock' }], thesis: 'Mean reversion in valuation plus industrial upgrading supports durable returns.', returnRange: '+25% to +60%' },
      { key: '15to20year', picks: [{ name: 'China Broad Market', type: 'ETF' }, { name: 'BYD', type: 'Stock' }], thesis: 'Long-term structural earnings growth can outweigh temporary macro volatility.', returnRange: '+30% to +100%+' }
    ]
  },
  JPN: {
    summary: 'Corporate governance and export-led quality growth with strong buyback momentum and value unlocking.',
    buckets: [
      { key: 'daily', picks: [{ name: 'NVIDIA Japan Exposure', type: 'ETF' }, { name: 'Toyota', type: 'Stock' }], thesis: 'Export strength and yen sensitivity drive short-term trading setups.', returnRange: '+0.6% to +2.8%' },
      { key: 'week', picks: [{ name: 'EWJ', type: 'ETF' }, { name: 'Sony', type: 'Stock' }], thesis: 'Japanese quality growth remains attractive as governance improves.', returnRange: '+1.5% to +5.5%' },
      { key: 'month', picks: [{ name: 'Nkọkei 225 ETF', type: 'ETF' }, { name: 'Hitachi', type: 'Stock' }], thesis: 'Capex and industrial re-rating continue to support Japanese cyclicals.', returnRange: '+3% to +9%' },
      { key: 'year', picks: [{ name: 'iShares Nikkei 225', type: 'ETF' }, { name: 'Mitsubishi UFJ', type: 'Stock' }], thesis: 'Banking and industrial re-rating should sustain healthy earnings momentum.', returnRange: '+8% to +18%' },
      { key: '2year', picks: [{ name: 'Nikko Japan ETF', type: 'ETF' }, { name: 'Keyence', type: 'Stock' }], thesis: 'Quality exporters and automation leaders remain structurally favored.', returnRange: '+12% to +26%' },
      { key: '3year', picks: [{ name: 'EWJ', type: 'ETF' }, { name: 'Canon', type: 'Stock' }], thesis: 'Japan’s corporate governance and buyback cycle should improve shareholder returns.', returnRange: '+16% to +32%' },
      { key: '5year', picks: [{ name: 'Japan Broad Market ETF', type: 'ETF' }, { name: 'Honda', type: 'Stock' }], thesis: 'Strategic industrial/automotive growth and capital efficiency should compound.', returnRange: '+18% to +42%' },
      { key: '10year', picks: [{ name: 'Nikkei Exposure ETF', type: 'ETF' }, { name: 'Toyota', type: 'Stock' }], thesis: 'Long-term compounders benefit from stable earnings and low valuations.', returnRange: '+20% to +55%' },
      { key: '15to20year', picks: [{ name: 'Japan Core ETF', type: 'ETF' }, { name: 'Sony', type: 'Stock' }], thesis: 'Structural reforms, productivity and shareholder returns can sustain durable wealth creation.', returnRange: '+25% to +90%+' }
    ]
  },
  IND: {
    summary: 'High-growth domestic demand and infrastructure-led compounding with strong quality and bank exposure.',
    buckets: [
      { key: 'daily', picks: [{ name: 'HDFC Bank', type: 'Stock' }, { name: 'Nifty 50 ETF', type: 'ETF' }], thesis: 'Strong domestic flows and financials keep India active on the short term.', returnRange: '+0.7% to +3%' },
      { key: 'week', picks: [{ name: 'Infosys', type: 'Stock' }, { name: 'IVV', type: 'ETF' }], thesis: 'IT and quality financials remain resilient in global slowdowns.', returnRange: '+2% to +6%' },
      { key: 'month', picks: [{ name: 'Reliance', type: 'Stock' }, { name: 'Nifty 100 ETF', type: 'ETF' }], thesis: 'Energy, telecom and consumer demand remain the core growth engine.', returnRange: '+4% to +10%' },
      { key: 'year', picks: [{ name: 'ICICI Bank', type: 'Stock' }, { name: 'Nifty 50 ETF', type: 'ETF' }], thesis: 'Corporate credit, digital adoption and domestic consumption continue to drive earnings.', returnRange: '+10% to +20%' },
      { key: '2year', picks: [{ name: 'TCS', type: 'Stock' }, { name: 'India Growth ETF', type: 'ETF' }], thesis: 'Digital infrastructure and export service demand should keep multiples supported.', returnRange: '+14% to +28%' },
      { key: '3year', picks: [{ name: 'Bharti Airtel', type: 'Stock' }, { name: 'Nifty Next 50 ETF', type: 'ETF' }], thesis: 'New capex, telecom pricing power and infrastructure spend support long-term gains.', returnRange: '+18% to +35%' },
      { key: '5year', picks: [{ name: 'L&T', type: 'Stock' }, { name: 'India Infrastructure ETF', type: 'ETF' }], thesis: 'Capital expenditure and construction demand are structural, not cyclical.', returnRange: '+22% to +52%' },
      { key: '10year', picks: [{ name: 'ICICI Bank', type: 'Stock' }, { name: 'India Broad Market ETF', type: 'ETF' }], thesis: 'India’s long-run compounding remains among the strongest globally.', returnRange: '+25% to +70%' },
      { key: '15to20year', picks: [{ name: 'Nifty 50 ETF', type: 'ETF' }, { name: 'HDFC Bank', type: 'Stock' }], thesis: 'Domestic demand, financialization and demographic tailwinds make India a core long-horizon market.', returnRange: '+30% to +100%+' }
    ]
  },
  DEU: {
    summary: 'Defensive industrial value with appeal from rate cuts, auto, and industrial machinery momentum.',
    buckets: [
      { key: 'daily', picks: [{ name: 'SAP', type: 'Stock' }, { name: 'DAX ETF', type: 'ETF' }], thesis: 'Short-term rebounds can come from software and industrial orders.', returnRange: '+0.5% to +2.5%' },
      { key: 'week', picks: [{ name: 'Siemens', type: 'Stock' }, { name: 'Euro Stoxx 50 ETF', type: 'ETF' }], thesis: 'Industrial capex and automation keep the market broad and steady.', returnRange: '+1.5% to +5%' },
      { key: 'month', picks: [{ name: 'BMW', type: 'Stock' }, { name: 'iShares DAX', type: 'ETF' }], thesis: 'Auto and industrials benefit from better rates and easing expectations.', returnRange: '+3% to +9%' },
      { key: 'year', picks: [{ name: 'Volkswagen', type: 'Stock' }, { name: 'DAX ETF', type: 'ETF' }], thesis: 'Valuation recovery and industrial profitability should support gains.', returnRange: '+8% to +18%' },
      { key: '2year', picks: [{ name: 'SAP', type: 'Stock' }, { name: 'Germany Large-Cap ETF', type: 'ETF' }], thesis: 'Digital transformation and manufacturing investments create a durable growth platform.', returnRange: '+12% to +24%' },
      { key: '3year', picks: [{ name: 'Siemens', type: 'Stock' }, { name: 'Industrial ETF', type: 'ETF' }], thesis: 'Automation, net zero and infrastructure spend offer a multi-year tailwind.', returnRange: '+14% to +30%' },
      { key: '5year', picks: [{ name: 'Mercedes-Benz', type: 'Stock' }, { name: 'Euro Industrial ETF', type: 'ETF' }], thesis: 'Manufacturing and electric vehicle transition should improve long-term output.', returnRange: '+18% to +40%' },
      { key: '10year', picks: [{ name: 'DAX ETF', type: 'ETF' }, { name: 'SAP', type: 'Stock' }], thesis: 'Quality industrials and software compound despite cyclical swings.', returnRange: '+22% to +55%' },
      { key: '15to20year', picks: [{ name: 'German Broad Market ETF', type: 'ETF' }, { name: 'Siemens', type: 'Stock' }], thesis: 'Industrial durability and long dividend quality create strong wealth compounding.', returnRange: '+25% to +85%+' }
    ]
  },
  GBR: {
    summary: 'Defensive dividend and material-heavy portfolio with exposure to energy, financials and global cash generation.',
    buckets: [
      { key: 'daily', picks: [{ name: 'HSBC', type: 'Stock' }, { name: 'FTSE 100 ETF', type: 'ETF' }], thesis: 'Banking and defensive sectors continue to lead in volatile periods.', returnRange: '+0.5% to +2.5%' },
      { key: 'week', picks: [{ name: 'BP', type: 'Stock' }, { name: 'iShares FTSE 100', type: 'ETF' }], thesis: 'Energy and financials remain attractive on stable demand.', returnRange: '+1% to +5%' },
      { key: 'month', picks: [{ name: 'Shell', type: 'Stock' }, { name: 'FTSE Dividend ETF', type: 'ETF' }], thesis: 'Dividends and energy cash flows support a resilient portfolio structure.', returnRange: '+3% to +8%' },
      { key: 'year', picks: [{ name: 'Diageo', type: 'Stock' }, { name: 'FTSE 100 ETF', type: 'ETF' }], thesis: 'Defensive cash-generators should outperform in a slower macro backdrop.', returnRange: '+8% to +16%' },
      { key: '2year', picks: [{ name: 'Barclays', type: 'Stock' }, { name: 'UK Equity ETF', type: 'ETF' }], thesis: 'Financials and dividend yield create a solid midpoint-cycle re-rating story.', returnRange: '+12% to +22%' },
      { key: '3year', picks: [{ name: 'AstraZeneca', type: 'Stock' }, { name: 'UK Value ETF', type: 'ETF' }], thesis: 'Healthcare and cash returns should support compounding across the cycle.', returnRange: '+15% to +30%' },
      { key: '5year', picks: [{ name: 'Rio Tinto', type: 'Stock' }, { name: 'UK Materials ETF', type: 'ETF' }], thesis: 'Commodity, infrastructure and cash dividends create long-term resilience.', returnRange: '+18% to +40%' },
      { key: '10year', picks: [{ name: 'FTSE 100 ETF', type: 'ETF' }, { name: 'HSBC', type: 'Stock' }], thesis: 'Dividend and value bias continues to improve long-run wealth creation.', returnRange: '+20% to +55%' },
      { key: '15to20year', picks: [{ name: 'UK Broad Market ETF', type: 'ETF' }, { name: 'Shell', type: 'Stock' }], thesis: 'Long-term compounding remains strong when backed by dividends and regulation-safe sectors.', returnRange: '+25% to +90%+' }
    ]
  },
  AUS: {
    summary: 'Dividend-led, resource-backed basket with strong exposure to critical minerals and bank earnings.',
    buckets: [
      { key: 'daily', picks: [{ name: 'BHP', type: 'Stock' }, { name: 'ASX 200 ETF', type: 'ETF' }], thesis: 'Resource and bank strength keep Australia in sync with commodity cycles.', returnRange: '+0.5% to +2.5%' },
      { key: 'week', picks: [{ name: 'Commonwealth Bank', type: 'Stock' }, { name: 'Australia Dividend ETF', type: 'ETF' }], thesis: 'Bank earnings comfort and dividend income remain key catalysts.', returnRange: '+1.5% to +5%' },
      { key: 'month', picks: [{ name: 'Rio Tinto', type: 'Stock' }, { name: 'Global Resources ETF', type: 'ETF' }], thesis: 'Copper and iron ore demand support further commodity strength.', returnRange: '+3% to +9%' },
      { key: 'year', picks: [{ name: 'Fortescue', type: 'Stock' }, { name: 'ASX 200 ETF', type: 'ETF' }], thesis: 'Green metals and resource export leadership support a strong earnings cycle.', returnRange: '+8% to +18%' },
      { key: '2year', picks: [{ name: 'Wesfarmers', type: 'Stock' }, { name: 'Australia Value ETF', type: 'ETF' }], thesis: 'Defensive demand and commodity value recovery continue to re-rate.', returnRange: '+12% to +24%' },
      { key: '3year', picks: [{ name: 'CBA', type: 'Stock' }, { name: 'Mining ETF', type: 'ETF' }], thesis: 'Banks and resources remain the highest quality combinations in the market.', returnRange: '+15% to +32%' },
      { key: '5year', picks: [{ name: 'BHP', type: 'Stock' }, { name: 'Australia Broad ETF', type: 'ETF' }], thesis: 'Critical minerals and superannuation inflows offer a durable long-term edge.', returnRange: '+18% to +42%' },
      { key: '10year', picks: [{ name: 'ASX 200 ETF', type: 'ETF' }, { name: 'BHP', type: 'Stock' }], thesis: 'Resource-backed dividends and stable banks create strong long-term compounding.', returnRange: '+20% to +55%' },
      { key: '15to20year', picks: [{ name: 'Australia Market ETF', type: 'ETF' }, { name: 'CBA', type: 'Stock' }], thesis: 'A balanced mix of resources, banks, and dividends should compound reliably over decades.', returnRange: '+25% to +85%+' }
    ]
  },
  BRA: {
    summary: 'Deep-value, high-dividend basket with resource and financials playing the leading role.',
    buckets: [
      { key: 'daily', picks: [{ name: 'Petrobras', type: 'Stock' }, { name: 'Brazil ETF', type: 'ETF' }], thesis: 'Commodity focus and cheap valuation keep the market in focus for short swings.', returnRange: '+0.8% to +3%' },
      { key: 'week', picks: [{ name: 'Vale', type: 'Stock' }, { name: 'Brazil Dividend ETF', type: 'ETF' }], thesis: 'Brazil’s resource deep-value setup improves when commodity prices rise.', returnRange: '+2% to +6%' },
      { key: 'month', picks: [{ name: 'Itau', type: 'Stock' }, { name: 'Ibovespa ETF', type: 'ETF' }], thesis: 'Financials and cash yields remain a powerful blend in a rate-cut cycle.', returnRange: '+4% to +10%' },
      { key: 'year', picks: [{ name: 'Banco do Brasil', type: 'Stock' }, { name: 'Brazil Equity ETF', type: 'ETF' }], thesis: 'Strong dividends and nearshoring macro support mid-cycle earnings gains.', returnRange: '+10% to +20%' },
      { key: '2year', picks: [{ name: 'Petrobras', type: 'Stock' }, { name: 'Brazil Materials ETF', type: 'ETF' }], thesis: 'Commodity supercycle and valuation expansion support major upside.', returnRange: '+15% to +28%' },
      { key: '3year', picks: [{ name: 'Vale', type: 'Stock' }, { name: 'Brazil Broad ETF', type: 'ETF' }], thesis: 'Low prices and strong cash generation create a multi-year value opportunity.', returnRange: '+18% to +35%' },
      { key: '5year', picks: [{ name: 'Itau', type: 'Stock' }, { name: 'Brazil Market ETF', type: 'ETF' }], thesis: 'Market-quality financials and commodities can compound aggressively in a favorable cycle.', returnRange: '+22% to +50%' },
      { key: '10year', picks: [{ name: 'Brazil Broad Market ETF', type: 'ETF' }, { name: 'Petrobras', type: 'Stock' }], thesis: 'Deep value and commodity tailwinds can create exceptional long-run returns.', returnRange: '+25% to +60%' },
      { key: '15to20year', picks: [{ name: 'Brazil Equity Core ETF', type: 'ETF' }, { name: 'Vale', type: 'Stock' }], thesis: 'Resource-backed equity and dividend yield are among the highest compounding real-return engines.', returnRange: '+30% to +100%+' }
    ]
  }
};

export default function App() {
  const [countriesData, setCountriesData] = useState(COUNTRY_MARKET_DATA);
  const [dbMetadata, setDbMetadata] = useState(INITIAL_DATABASE_METADATA);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRadarCountry, setSelectedRadarCountry] = useState({ id: 'USA', name: 'United States' });
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

  const investmentCountryOptions = useMemo(() => {
    return enrichedCountries;
  }, [enrichedCountries]);

  const selectedInvestmentCountry = useMemo(() => {
    return enrichedCountries.find((country) => country.id === selectedRadarCountry?.id)
      || investmentCountryOptions[0]
      || { id: 'USA', name: 'United States' };
  }, [enrichedCountries, selectedRadarCountry, investmentCountryOptions]);

  const investmentIdeas = COUNTRY_INVESTMENT_IDEAS[selectedInvestmentCountry.id] || COUNTRY_INVESTMENT_IDEAS.USA;

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
              onSelectCountry={(c) => {
                setSelectedCountry(c);
                setSelectedRadarCountry(c);
              }}
              selectedCountryId={selectedCountry?.id}
            />

            {/* Section 2: Country Investment Ideas by Time Horizon */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 shadow-2xl space-y-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold uppercase tracking-[0.18em]">
                    <BriefcaseBusiness className="w-4 h-4" />
                    Country Investment Radar
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mt-2">
                    Stock & ETF Ideas for {selectedInvestmentCountry.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{investmentIdeas.summary}</p>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2">
                  <span>Country</span>
                  <select
                    value={selectedInvestmentCountry.id}
                    onChange={(event) => {
                      const nextCountry = enrichedCountries.find((entry) => entry.id === event.target.value);
                      if (nextCountry) {
                        setSelectedRadarCountry(nextCountry);
                      }
                    }}
                    className="bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  >
                    {investmentCountryOptions.map((country) => (
                      <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {INVESTMENT_TIME_BUCKETS.map((bucket) => {
                  const idea = investmentIdeas.buckets.find((entry) => entry.key === bucket.key) || investmentIdeas.buckets[0];

                  return (
                    <div key={bucket.key} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]">
                      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.18em] text-blue-400 font-semibold">{bucket.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{bucket.hint}</div>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                          {idea.returnRange}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {idea.picks.map((pick) => (
                          <span
                            key={`${bucket.key}-${pick.name}`}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-200"
                          >
                            <span className="font-semibold text-white">{pick.name}</span>
                            <span className="text-[9px] uppercase tracking-[0.12em] text-slate-400">{pick.type}</span>
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-300 leading-relaxed">
                        <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />
                        <span>{idea.thesis}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Detailed Filterable Country Grid Table */}
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
                    onClick={() => {
                      setSelectedCountry(country);
                      setSelectedRadarCountry(country);
                    }}
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

        {activeTab === 'investment' && (
          <InvestmentAnalysisPage
            country={selectedInvestmentCountry}
            onCountryChange={(countryId) => {
              const nextCountry = enrichedCountries.find((entry) => entry.id === countryId);
              if (nextCountry) {
                setSelectedRadarCountry(nextCountry);
              }
            }}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-6 border-t border-slate-800/80 w-full flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          <span className="font-bold text-white">Mathippu-AI</span> (<span className="text-emerald-400 font-medium">மதிப்பு</span> = Value AI) — Global Equity Market Valuation & Research Explorer.
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
