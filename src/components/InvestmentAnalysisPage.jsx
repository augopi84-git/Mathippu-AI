import React, { useMemo, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, ShieldCheck, TrendingUp, Landmark, Sparkles } from 'lucide-react';

const TOP_COUNT_OPTIONS = [1, 3, 5];
const ASSET_TYPES = [
  { id: 'stocks', label: 'Stocks', accent: 'from-emerald-500/20 to-emerald-600/10', chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  { id: 'etfs', label: 'ETFs', accent: 'from-blue-500/20 to-blue-600/10', chip: 'bg-blue-500/15 text-blue-300 border-blue-500/30' }
];

const ASSET_ANALYSIS_LIBRARY = {
  USA: {
    stocks: [
      { ticker: 'NVDA', name: 'NVIDIA', score: 97, expectedReturn: '+20% to +35%', rationale: 'AI infrastructure leader with sustained hyperscale capex spending.' },
      { ticker: 'MSFT', name: 'Microsoft', score: 94, expectedReturn: '+14% to +26%', rationale: 'Cloud, productivity and enterprise AI monetization remain highly durable.' },
      { ticker: 'AMZN', name: 'Amazon', score: 92, expectedReturn: '+12% to +24%', rationale: 'E-commerce and AWS expansion continue to compound operating leverage.' },
      { ticker: 'AAPL', name: 'Apple', score: 88, expectedReturn: '+10% to +20%', rationale: 'Services mix and installed base support resilient long-term growth.' },
      { ticker: 'AVGO', name: 'Broadcom', score: 90, expectedReturn: '+16% to +28%', rationale: 'AI networking and custom silicon exposure remains underappreciated.' }
    ],
    etfs: [
      { ticker: 'QQQ', name: 'NASDAQ 100', score: 95, expectedReturn: '+15% to +30%', rationale: 'Best pure-play growth exposure with strong secular AI beneficiaries.' },
      { ticker: 'VTI', name: 'Vanguard Total Stock Market', score: 90, expectedReturn: '+10% to +18%', rationale: 'Broad core equity exposure for long-term compounding.' },
      { ticker: 'SCHD', name: 'Schwab U.S. Dividend Equity', score: 89, expectedReturn: '+9% to +17%', rationale: 'Strong blend of quality, yield and lower volatility.' },
      { ticker: 'SPY', name: 'SPDR S&P 500', score: 87, expectedReturn: '+9% to +16%', rationale: 'Institutional benchmark ETF for steady core exposure.' },
      { ticker: 'VXUS', name: 'Vanguard Total International Stock', score: 80, expectedReturn: '+8% to +15%', rationale: 'Useful diversifier for international equity exposure.' }
    ]
  },
  CHN: {
    stocks: [
      { ticker: 'BYD', name: 'BYD', score: 91, expectedReturn: '+17% to +30%', rationale: 'EV demand and battery integration remain critical growth drivers.' },
      { ticker: 'PDD', name: 'Pinduoduo', score: 88, expectedReturn: '+12% to +24%', rationale: 'Consumer basket and digital commerce recovery can unlock rerating.' },
      { ticker: 'TME', name: 'Tencent Music', score: 84, expectedReturn: '+10% to +20%', rationale: 'Digital entertainment and ad monetization continue to improve.' },
      { ticker: 'BABA', name: 'Alibaba', score: 86, expectedReturn: '+11% to +22%', rationale: 'Cloud and e-commerce restructuring provide strong value optionality.' },
      { ticker: 'CATL', name: 'CATL', score: 92, expectedReturn: '+18% to +34%', rationale: 'Battery leadership remains central to the EV and energy transition story.' }
    ],
    etfs: [
      { ticker: 'KWEB', name: 'KraneShares China Internet', score: 89, expectedReturn: '+14% to +28%', rationale: 'China internet recovery remains one of the most levered policy plays.' },
      { ticker: 'CQQQ', name: 'China Growth ETF', score: 85, expectedReturn: '+12% to +22%', rationale: 'Captures thematic growth rebound in Chinese digital and industrial demand.' },
      { ticker: 'FXI', name: 'iShares China Large-Cap', score: 83, expectedReturn: '+10% to +20%', rationale: 'Useful benchmark for broad China large-cap recovery.' },
      { ticker: 'CHIN', name: 'China A-Shares ETF', score: 81, expectedReturn: '+9% to +18%', rationale: 'A-sample strategy for domestic policy-driven re-rating.' },
      { ticker: 'EVX', name: 'VanEck Electric Vehicles', score: 84, expectedReturn: '+12% to +25%', rationale: 'EV and battery theme creates durable multi-year exposure.' }
    ]
  },
  IND: {
    stocks: [
      { ticker: 'ICICIBANK', name: 'ICICI Bank', score: 94, expectedReturn: '+15% to +28%', rationale: 'Credit growth, digital adoption and strong asset quality support earnings.' },
      { ticker: 'RELIANCE', name: 'Reliance Industries', score: 90, expectedReturn: '+14% to +25%', rationale: 'Energy, telecom and retail integration create wide earnings optionality.' },
      { ticker: 'LTIM', name: 'LTIMindtree', score: 85, expectedReturn: '+12% to +20%', rationale: 'Digital transformation spending remains supportive in enterprise IT.' },
      { ticker: 'TCS', name: 'Tata Consultancy Services', score: 88, expectedReturn: '+11% to +21%', rationale: 'Strong balance sheet and resilient global outsourcing demand.' },
      { ticker: 'BHARTIARTL', name: 'Bharti Airtel', score: 89, expectedReturn: '+13% to +22%', rationale: 'Telecom pricing power and market share gains remain constructive.' }
    ],
    etfs: [
      { ticker: 'NIFTY50', name: 'Nifty 50 ETF', score: 90, expectedReturn: '+12% to +22%', rationale: 'Provides broad access to India’s top earnings growth stories.' },
      { ticker: 'INDIA', name: 'India Growth ETF', score: 88, expectedReturn: '+13% to +24%', rationale: 'Captures long-duration domestic consumption and infrastructure demand.' },
      { ticker: 'INFRA', name: 'India Infrastructure ETF', score: 86, expectedReturn: '+12% to +26%', rationale: 'Useful for capex-led domestic expansion themes.' },
      { ticker: 'NIFTYNXT', name: 'Nifty Next 50 ETF', score: 82, expectedReturn: '+11% to +20%', rationale: 'Mid-cap oriented quality exposure for domestic growth.' },
      { ticker: 'ITETF', name: 'India IT ETF', score: 80, expectedReturn: '+10% to +19%', rationale: 'Strong tailwind from global digital outsourcing cycles.' }
    ]
  },
  JPN: {
    stocks: [
      { ticker: 'SONY', name: 'Sony', score: 90, expectedReturn: '+12% to +22%', rationale: 'Strong gaming, content and device platform mix supports earnings quality.' },
      { ticker: 'KEYENCE', name: 'Keyence', score: 92, expectedReturn: '+15% to +27%', rationale: 'Industrial automation leader with sticky margins and compounding cash flow.' },
      { ticker: 'TOYOTA', name: 'Toyota', score: 88, expectedReturn: '+10% to +18%', rationale: 'Capital efficiency and efficiency-driven earnings resilience are attractive.' },
      { ticker: 'HITACHI', name: 'Hitachi', score: 86, expectedReturn: '+12% to +21%', rationale: 'Industrial and energy transitions create strong earnings breadth.' },
      { ticker: 'MUFJ', name: 'Mitsubishi UFJ', score: 84, expectedReturn: '+10% to +18%', rationale: 'Banking re-rating and buybacks remain constructive for value investors.' }
    ],
    etfs: [
      { ticker: 'EWJ', name: 'Japan ETF', score: 84, expectedReturn: '+10% to +18%', rationale: 'Diversified access to Japan’s governance-driven re-rating cycle.' },
      { ticker: 'N225', name: 'Nikkei 225 ETF', score: 87, expectedReturn: '+11% to +21%', rationale: 'Broad benchmark exposure to Japan’s corporate reform wave.' },
      { ticker: 'JPNQLTY', name: 'Japan Quality ETF', score: 88, expectedReturn: '+12% to +24%', rationale: 'Quality-capital efficiency names underpinned by governance improvements.' },
      { ticker: 'JPS', name: 'SPDR S&P Japan', score: 82, expectedReturn: '+9% to +17%', rationale: 'Strong diversified access to large-cap Japanese equities.' },
      { ticker: 'JEPQ', name: 'Japan High Dividend ETF', score: 80, expectedReturn: '+8% to +16%', rationale: 'Useful for investors seeking yield plus valuation support.' }
    ]
  },
  DEU: {
    stocks: [
      { ticker: 'SAP', name: 'SAP', score: 89, expectedReturn: '+12% to +20%', rationale: 'Enterprise software and cloud migration remain structurally strong.' },
      { ticker: 'SIE', name: 'Siemens', score: 88, expectedReturn: '+11% to +20%', rationale: 'Industrial modernization and automation pose durable tailwinds.' },
      { ticker: 'BMW', name: 'BMW', score: 82, expectedReturn: '+9% to +18%', rationale: 'Auto cycle recovery and premium segment resilience remain attractive.' },
      { ticker: 'VOW3', name: 'Volkswagen', score: 80, expectedReturn: '+9% to +17%', rationale: 'EV transition and margin expansion still underappreciated.' },
      { ticker: 'DTE', name: 'Deutsche Telekom', score: 81, expectedReturn: '+8% to +16%', rationale: 'Stable cash generation in telecom and digital infrastructure.' }
    ],
    etfs: [
      { ticker: 'DAX', name: 'DAX ETF', score: 84, expectedReturn: '+9% to +18%', rationale: 'A clean benchmark for Germany’s industrial and software leaders.' },
      { ticker: 'EWG', name: 'Germany ETF', score: 80, expectedReturn: '+8% to +16%', rationale: 'Broad exposure to large-cap quality European equities.' },
      { ticker: 'EUNL', name: 'iShares Euro Dividend', score: 79, expectedReturn: '+7% to +14%', rationale: 'Higher-quality dividend basket with defensive appeal.' },
      { ticker: 'IEMG', name: 'iShares Core MSCI Emerging', score: 76, expectedReturn: '+8% to +15%', rationale: 'Useful geographic diversification outside the domestic market.' },
      { ticker: 'STOXX', name: 'European Industrial ETF', score: 82, expectedReturn: '+9% to +18%', rationale: 'Tracks industrial equity strength and macro easing support.' }
    ]
  }
};

function getCountryRecommendations(countryId) {
  return ASSET_ANALYSIS_LIBRARY[countryId] || ASSET_ANALYSIS_LIBRARY.USA;
}

export default function InvestmentAnalysisPage({ country, onCountryChange }) {
  const [assetType, setAssetType] = useState('stocks');
  const [topN, setTopN] = useState(3);

  const countryId = country?.id || 'USA';
  const recommendations = useMemo(() => getCountryRecommendations(countryId), [countryId]);
  const assetList = recommendations[assetType] || recommendations.stocks;
  const topItems = assetList.slice(0, topN);

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl border border-slate-800 p-5 md:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold uppercase tracking-[0.18em]">
              <BriefcaseBusiness className="w-4 h-4" />
              Investment Analysis
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">Stocks & ETFs by Country</h2>
            <p className="text-sm text-slate-400 mt-1">
              Top opportunities for {country?.name || 'United States'} across multiple time horizons and strategy styles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2">
              <span>Country</span>
              <select
                value={countryId}
                onChange={(event) => onCountryChange?.(event.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-100 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
              >
                {Object.keys(ASSET_ANALYSIS_LIBRARY).map((countryKey) => (
                  <option key={countryKey} value={countryKey}>{countryKey === 'USA' ? 'United States' : countryKey === 'CHN' ? 'China' : countryKey === 'IND' ? 'India' : countryKey === 'JPN' ? 'Japan' : countryKey === 'DEU' ? 'Germany' : countryKey}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {ASSET_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setAssetType(type.id)}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                  assetType === type.id
                    ? `${type.chip} shadow-lg`
                    : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Top</span>
            <div className="flex gap-2">
              {TOP_COUNT_OPTIONS.map((count) => (
                <button
                  key={count}
                  onClick={() => setTopN(count)}
                  className={`w-10 h-10 rounded-xl border text-sm font-bold transition-all ${
                    topN === count
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {topItems.map((item, index) => (
          <div
            key={`${assetType}-${item.ticker}-${index}`}
            className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${assetType === 'stocks' ? 'from-emerald-500/10 to-slate-900/90' : 'from-blue-500/10 to-slate-900/90'} p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">#{index + 1} Pick</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-xs font-black text-white">
                    {item.ticker.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.ticker}</div>
                  </div>
                </div>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
                {item.score}/100
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Expected return</span>
              <span className="font-bold text-white">{item.expectedReturn}</span>
            </div>

            <div className="mt-4 h-2.5 w-full rounded-full bg-slate-950 overflow-hidden">
              <div
                className={`h-full rounded-full ${assetType === 'stocks' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                style={{ width: `${item.score}%` }}
              />
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
              <ArrowUpRight className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
              <span>{item.rationale}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Momentum</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Select the highest-conviction {assetType === 'stocks' ? 'equity names' : 'ETF vehicles'} with the strongest earnings and macro support.
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Landmark className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Diversification</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Mixed core allocation across sector, geography and risk profile helps reduce single-name concentration without losing upside.
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-purple-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Risk Control</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Framework is designed to expand into crypto, real estate, debt, or thematic baskets with the same score, filter, and ranking pipeline.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 p-5">
        <div className="flex items-center gap-2 text-sm text-slate-300 font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Expansion-ready architecture
        </div>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          This page is intentionally structured around an asset-type registry so new datasets such as crypto, private markets, REITs, commodities or thematic baskets can be added without redesigning the UI.
        </p>
      </div>
    </div>
  );
}
