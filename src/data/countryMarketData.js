// Global Equity Market Valuation & AI Market Research Dataset
// Synthesized from Shiller CAPE estimates, IMF Macro Indicators, and AI Quantitative Valuation Models.

export const DEFAULT_WEIGHTS = {
  cape: 0.30,           // Cyclically Adjusted Price-to-Earnings (30%)
  pe: 0.20,             // Trailing P/E (20%)
  forwardPe: 0.15,      // Forward P/E (15%)
  pb: 0.15,             // Price to Book (15%)
  buffettIndicator: 0.10, // Market Cap / GDP (10%)
  divYield: 0.10,       // Dividend Yield Inverse (10%)
};

export const VALUATION_CATEGORIES = {
  UNDERVALUED: { label: 'Undervalued', color: '#10b981', bgClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', glowClass: 'glow-emerald' },
  FAIR: { label: 'Fairly Valued', color: '#f59e0b', bgClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30', glowClass: 'glow-amber' },
  OVERVALUED: { label: 'Overvalued', color: '#f43f5e', bgClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30', glowClass: 'glow-rose' },
  EXTREME: { label: 'Bubble / Severe', color: '#a855f7', bgClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30', glowClass: 'glow-purple' }
};

export const COUNTRY_MARKET_DATA = [
  {
    id: 'USA',
    iso2: 'US',
    name: 'United States',
    region: 'Americas',
    type: 'Developed',
    flag: '🇺🇸',
    benchmarkIndex: 'S&P 500',
    currency: 'USD',
    metrics: {
      cape: 35.8,
      pe: 27.4,
      forwardPe: 22.1,
      pb: 4.8,
      divYield: 1.3,
      buffettIndicator: 198.5,
      historicalCagr5Y: 14.2,
      gdpGrowth: 2.4,
      inflation: 2.8,
      interestRate: 4.75,
    },
    aiResearch: {
      summary: 'US equity valuations remain elevated driven by mega-cap technology and AI infrastructure investments. Premium multiples reflect high profitability and tech dominance but leave slim margin for error.',
      thesis: 'Quality and growth momentum remain strong, but entry valuations are at historical upper deciles. Diversification into broader equal-weight indices or defensive sectors is recommended.',
      growthDrivers: [
        'GenAI adoption and semiconductor capital expenditure dominance',
        'Strong corporate balance sheets with high return on equity (ROE > 18%)',
        'Dominant global liquidity pool and capital inflows'
      ],
      riskFactors: [
        'Extreme market concentration (Top 10 stocks represent >33% of S&P 500)',
        'Elevated real interest rates impacting debt refinancing',
        'High valuation multiple compression risk if earnings growth slows'
      ],
      sectorWeights: {
        'Information Tech': 31.5,
        'Financials': 12.8,
        'Healthcare': 11.9,
        'Consumer Disc.': 10.2,
        'Communication Services': 8.9,
        'Others': 24.7
      },
      returnForecasts: {
        bear: 1.5,
        base: 6.2,
        bull: 11.4,
        aiConfidence: 89
      },
      scenarios: [
        { name: 'Fed Rate Cuts 100bps', scoreImpact: -4.2, expectedReturnChange: +2.1, comment: 'Multiple expansion offsets macro drag.' },
        { name: 'Big Tech Earnings Surprise (+15%)', scoreImpact: +3.5, expectedReturnChange: +3.8, comment: 'Re-ignites momentum in Magnificent 7.' },
        { name: 'Inflation Re-acceleration (>4%)', scoreImpact: +8.1, expectedReturnChange: -5.2, comment: 'Causes severe multiple contraction.' }
      ]
    }
  },
  {
    id: 'CHN',
    iso2: 'CN',
    name: 'China',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇨🇳',
    benchmarkIndex: 'CSI 300 / Hang Seng',
    currency: 'CNY',
    metrics: {
      cape: 12.4,
      pe: 11.2,
      forwardPe: 9.8,
      pb: 1.2,
      divYield: 3.4,
      buffettIndicator: 62.1,
      historicalCagr5Y: -2.8,
      gdpGrowth: 4.8,
      inflation: 0.6,
      interestRate: 3.10,
    },
    aiResearch: {
      summary: 'Chinese equities trade at steep historical discounts following real estate restructuring and regulatory shifts. Aggressive central bank monetary stimulus provides tactical upside potential.',
      thesis: 'Deep value opportunity for long-term contrarian investors. High dividend yields and low valuation floor offset geopolitical discount.',
      growthDrivers: [
        'Unprecedented monetary & fiscal liquidity injection support packages',
        'Global dominance in EV, green energy, and battery supply chains',
        'Extremely low baseline valuations with significant room for mean-reversion'
      ],
      riskFactors: [
        'Property sector balance sheet overhang and consumer sentiment lag',
        'Geopolitical trade tariffs and technology export restrictions',
        'Policy unpredictability and RMB currency fluctuations'
      ],
      sectorWeights: {
        'Financials': 22.1,
        'Consumer Disc.': 18.5,
        'Communication': 14.2,
        'Industrials': 12.8,
        'Technology': 10.4,
        'Others': 22.0
      },
      returnForecasts: {
        bear: -2.1,
        base: 9.8,
        bull: 18.5,
        aiConfidence: 78
      },
      scenarios: [
        { name: 'Direct Consumer Stimulus ($500B+)', scoreImpact: -8.5, expectedReturnChange: +7.2, comment: 'Triggers explosive re-rating of consumer tech.' },
        { name: 'Escalating Trade Tariffs', scoreImpact: +5.0, expectedReturnChange: -4.5, comment: 'Pressures export-oriented manufacturing.' }
      ]
    }
  },
  {
    id: 'JPN',
    iso2: 'JP',
    name: 'Japan',
    region: 'Asia-Pacific',
    type: 'Developed',
    flag: '🇯🇵',
    benchmarkIndex: 'Nikkei 225',
    currency: 'JPY',
    metrics: {
      cape: 21.3,
      pe: 16.5,
      forwardPe: 14.8,
      pb: 1.45,
      divYield: 2.2,
      buffettIndicator: 128.4,
      historicalCagr5Y: 10.8,
      gdpGrowth: 1.2,
      inflation: 2.5,
      interestRate: 0.25,
    },
    aiResearch: {
      summary: 'Japan is experiencing a structural renaissance driven by Tokyo Stock Exchange governance reforms, unwinding of cross-shareholdings, and a transition out of deflation.',
      thesis: 'Highly attractive risk-reward profile supported by corporate governance momentum, share buybacks, and favorable export competitiveness.',
      growthDrivers: [
        'TSE mandate forcing P/B ratio improvement above 1.0x',
        'Moderate inflation driving corporate pricing power and wage growth',
        'Foreign institutional capital rotation into Japanese blue-chips'
      ],
      riskFactors: [
        'Rapid Yen appreciation reducing exporter earnings in domestic currency',
        'Bank of Japan monetary policy normalization trajectory',
        'Demographic workforce decline'
      ],
      sectorWeights: {
        'Industrials': 24.2,
        'Consumer Disc.': 18.1,
        'Technology': 15.6,
        'Financials': 13.0,
        'Healthcare': 9.2,
        'Others': 19.9
      },
      returnForecasts: {
        bear: 2.8,
        base: 8.9,
        bull: 14.5,
        aiConfidence: 91
      },
      scenarios: [
        { name: 'BOJ Hikes Rates to 1.0%', scoreImpact: -1.8, expectedReturnChange: +1.2, comment: 'Benefits bank margins, headwinds exporters.' },
        { name: 'Global Supply Chain Reshoring', scoreImpact: -3.2, expectedReturnChange: +3.5, comment: 'Boosts Japanese robotics and automation.' }
      ]
    }
  },
  {
    id: 'IND',
    iso2: 'IN',
    name: 'India',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇮🇳',
    benchmarkIndex: 'Nifty 50 / BSE Sensex',
    currency: 'INR',
    metrics: {
      cape: 34.2,
      pe: 24.8,
      forwardPe: 20.6,
      pb: 3.75,
      divYield: 1.1,
      buffettIndicator: 112.0,
      historicalCagr5Y: 16.8,
      gdpGrowth: 6.8,
      inflation: 4.5,
      interestRate: 6.50,
    },
    aiResearch: {
      summary: 'India offers the world\'s strongest macroeconomic growth narrative, backed by favorable demographics, massive digital infrastructure, and manufacturing shift.',
      thesis: 'Premium valuation is justified by high nominal GDP growth (>10%), strong domestic SIP retail inflows, and structural earnings expansion.',
      growthDrivers: [
        'World-leading real GDP growth expected at 6.5%-7.2%',
        'Massive domestic retail mutual fund monthly inflows ($2.5B+ monthly SIPs)',
        'Global "China+1" manufacturing investment redirection'
      ],
      riskFactors: [
        'High valuation multiple leaves market vulnerable to earnings misses',
        'Dependence on imported crude oil and energy price volatility',
        'Monsoon impact on rural consumption'
      ],
      sectorWeights: {
        'Financials': 33.4,
        'Information Tech': 13.8,
        'Oil & Gas / Energy': 11.5,
        'Consumer Goods': 9.2,
        'Automobile': 7.6,
        'Others': 24.5
      },
      returnForecasts: {
        bear: 4.2,
        base: 11.8,
        bull: 17.4,
        aiConfidence: 87
      },
      scenarios: [
        { name: 'Oil Prices Drop Below $65', scoreImpact: -4.5, expectedReturnChange: +4.2, comment: 'Dramatically improves current account balance.' },
        { name: 'Global Tech Slowdown', scoreImpact: +3.1, expectedReturnChange: -2.8, comment: 'Pressures IT export services.' }
      ]
    }
  },
  {
    id: 'DEU',
    iso2: 'DE',
    name: 'Germany',
    region: 'Europe',
    type: 'Developed',
    flag: '🇩🇪',
    benchmarkIndex: 'DAX 40',
    currency: 'EUR',
    metrics: {
      cape: 18.5,
      pe: 14.2,
      forwardPe: 12.4,
      pb: 1.55,
      divYield: 3.5,
      buffettIndicator: 58.2,
      historicalCagr5Y: 6.4,
      gdpGrowth: 0.3,
      inflation: 2.1,
      interestRate: 3.25,
    },
    aiResearch: {
      summary: 'German market trades at attractive low valuation multiples due to macroeconomic stagnation and industrial energy cost adjustment.',
      thesis: 'Deep value play with strong global industrial leaders. Global economic recovery and ECB rate easing provide catalyst for upward re-rating.',
      growthDrivers: [
        'Global industrial equipment and premium auto global market share',
        'ECB monetary easing lowering corporate borrowing costs',
        'High dividend yield (3.5%) providing solid cash return baseline'
      ],
      riskFactors: [
        'Structural energy costs affecting chemical and heavy manufacturing',
        'Automotive transition pressure from Chinese EV competitors',
        'Underinvestment in domestic digital infrastructure'
      ],
      sectorWeights: {
        'Industrials': 26.5,
        'Financials': 18.2,
        'Consumer Disc.': 15.4,
        'Technology (SAP)': 14.1,
        'Healthcare': 11.0,
        'Others': 14.8
      },
      returnForecasts: {
        bear: 1.2,
        base: 7.5,
        bull: 13.2,
        aiConfidence: 84
      },
      scenarios: [
        { name: 'ECB Cuts Rates by 150bps', scoreImpact: -3.8, expectedReturnChange: +3.4, comment: 'Stimulates industrial credit & export financing.' }
      ]
    }
  },
  {
    id: 'GBR',
    iso2: 'GB',
    name: 'United Kingdom',
    region: 'Europe',
    type: 'Developed',
    flag: '🇬🇧',
    benchmarkIndex: 'FTSE 100',
    currency: 'GBP',
    metrics: {
      cape: 16.2,
      pe: 12.8,
      forwardPe: 11.2,
      pb: 1.65,
      divYield: 3.9,
      buffettIndicator: 94.5,
      historicalCagr5Y: 5.8,
      gdpGrowth: 1.0,
      inflation: 2.3,
      interestRate: 4.75,
    },
    aiResearch: {
      summary: 'UK market continues to trade at one of the highest structural valuation discounts among major developed nations, offering rich 3.9% dividend yield.',
      thesis: 'Undervalued defensive market heavy in energy, healthcare, and financial multinationals with revenue generated predominantly outside the UK.',
      growthDrivers: [
        'Over 75% of FTSE 100 corporate revenues generated outside UK borders',
        'High dividend yield and aggressive corporate buyback programs',
        'Potential domestic pension fund allocation mandates toward UK assets'
      ],
      riskFactors: [
        'Lack of high-growth technology sector representation',
        'Underperformance relative to US equity benchmarks driving delisting risk',
        'Sticky domestic service inflation'
      ],
      sectorWeights: {
        'Financials': 21.4,
        'Healthcare': 15.8,
        'Consumer Staples': 14.9,
        'Energy': 13.2,
        'Materials': 9.8,
        'Others': 24.9
      },
      returnForecasts: {
        bear: 2.1,
        base: 8.4,
        bull: 14.1,
        aiConfidence: 88
      },
      scenarios: [
        { name: 'Global Commodities Rally', scoreImpact: -4.2, expectedReturnChange: +4.8, comment: 'Drives shell, BP, and mining giants higher.' }
      ]
    }
  },
  {
    id: 'FRA',
    iso2: 'FR',
    name: 'France',
    region: 'Europe',
    type: 'Developed',
    flag: '🇫🇷',
    benchmarkIndex: 'CAC 40',
    currency: 'EUR',
    metrics: {
      cape: 20.1,
      pe: 15.1,
      forwardPe: 13.2,
      pb: 1.72,
      divYield: 3.3,
      buffettIndicator: 88.4,
      historicalCagr5Y: 8.1,
      gdpGrowth: 1.1,
      inflation: 1.9,
      interestRate: 3.25,
    },
    aiResearch: {
      summary: 'French market is dominated by global luxury giants (LVMH, Hermès) and industrial champions (Schneider, TotalEnergies), offering solid international exposure.',
      thesis: 'Fairly valued market offering balanced exposure to luxury brand pricing power, energy transition infrastructure, and European blue chips.',
      growthDrivers: [
        'Unrivaled global pricing power of French luxury brands',
        'Leadership in global industrial automation and electrical grid hardware',
        'Strong ESG and green infrastructure corporate capabilities'
      ],
      riskFactors: [
        'Slowing Chinese luxury consumer demand',
        'Domestic political fiscal deficit volatility',
        'European Union regulatory burdens'
      ],
      sectorWeights: {
        'Consumer Disc. (Luxury)': 24.8,
        'Industrials': 20.1,
        'Financials': 12.4,
        'Healthcare': 10.9,
        'Energy': 8.5,
        'Others': 23.3
      },
      returnForecasts: {
        bear: 1.8,
        base: 7.8,
        bull: 13.0,
        aiConfidence: 85
      },
      scenarios: [
        { name: 'China Luxury Demand Rebound', scoreImpact: -3.5, expectedReturnChange: +4.1, comment: 'LVMH and Hermès lead sharp market rally.' }
      ]
    }
  },
  {
    id: 'BRA',
    iso2: 'BR',
    name: 'Brazil',
    region: 'Americas',
    type: 'Emerging',
    flag: '🇧🇷',
    benchmarkIndex: 'Bovespa (Ibovespa)',
    currency: 'BRL',
    metrics: {
      cape: 10.8,
      pe: 8.5,
      forwardPe: 7.2,
      pb: 1.35,
      divYield: 6.8,
      buffettIndicator: 45.2,
      historicalCagr5Y: 4.2,
      gdpGrowth: 2.8,
      inflation: 4.1,
      interestRate: 11.25,
    },
    aiResearch: {
      summary: 'Brazil is one of the most undervalued emerging markets globally, boasting a massive 6.8% dividend yield and P/E single-digit multiples.',
      thesis: 'High-conviction value play. Central bank rate cut cycle and global commodity demand provide immense upside for patient investors.',
      growthDrivers: [
        'World agricultural superpower (soybeans, beef, sugar, coffee)',
        'Extremely low valuation multiple (Trailing P/E < 9.0x)',
        'Substantial real yields and massive cash dividend distributions'
      ],
      riskFactors: [
        'Fiscal deficit sustainability and political intervention in state enterprises',
        'Currency volatility (BRL/USD)',
        'Global commodity price cycles (iron ore, oil)'
      ],
      sectorWeights: {
        'Financials': 28.5,
        'Materials / Mining': 22.1,
        'Energy (Petrobras)': 16.4,
        'Utilities': 10.2,
        'Consumer': 8.1,
        'Others': 14.7
      },
      returnForecasts: {
        bear: 0.5,
        base: 12.4,
        bull: 22.1,
        aiConfidence: 81
      },
      scenarios: [
        { name: 'Commodity Supercycle Trigger', scoreImpact: -6.4, expectedReturnChange: +8.5, comment: 'Petrobras and Vale trigger explosive market surge.' }
      ]
    }
  },
  {
    id: 'CAN',
    iso2: 'CA',
    name: 'Canada',
    region: 'Americas',
    type: 'Developed',
    flag: '🇨🇦',
    benchmarkIndex: 'TSX Composite',
    currency: 'CAD',
    metrics: {
      cape: 19.8,
      pe: 16.1,
      forwardPe: 14.2,
      pb: 1.88,
      divYield: 3.2,
      buffettIndicator: 118.6,
      historicalCagr5Y: 8.9,
      gdpGrowth: 1.3,
      inflation: 2.2,
      interestRate: 3.75,
    },
    aiResearch: {
      summary: 'Canadian equity market provides stable, resource-backed dividend growth driven by oligopolistic banking institutions and global commodity reserves.',
      thesis: 'Fairly valued defensive market providing inflation-hedged resource exposure and high dividend stability.',
      growthDrivers: [
        'Strong banking sector oligopoly with stable capital ratios',
        'Vast oil, natural gas, uranium, and critical mineral reserves',
        'Bank of Canada rate cuts supporting real estate and credit growth'
      ],
      riskFactors: [
        'High household debt-to-income ratio',
        'Heavy index weighting in cyclical commodities and financials',
        'Slower productivity growth compared to US counterpart'
      ],
      sectorWeights: {
        'Financials': 31.2,
        'Energy': 17.5,
        'Industrials': 13.8,
        'Materials': 11.4,
        'Utilities': 5.8,
        'Others': 20.3
      },
      returnForecasts: {
        bear: 2.2,
        base: 8.1,
        bull: 13.4,
        aiConfidence: 87
      },
      scenarios: [
        { name: 'Uranium & Critical Minerals Boom', scoreImpact: -2.8, expectedReturnChange: +3.2, comment: 'Boosts Canadian mining and clean tech exports.' }
      ]
    }
  },
  {
    id: 'KOR',
    iso2: 'KR',
    name: 'South Korea',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇰🇷',
    benchmarkIndex: 'KOSPI',
    currency: 'KRW',
    metrics: {
      cape: 14.1,
      pe: 11.8,
      forwardPe: 9.5,
      pb: 0.95,
      divYield: 2.4,
      buffettIndicator: 86.4,
      historicalCagr5Y: 3.8,
      gdpGrowth: 2.2,
      inflation: 2.0,
      interestRate: 3.00,
    },
    aiResearch: {
      summary: 'South Korea trades at a structural "Korea Discount" with P/B below 1.0x. The government\'s "Corporate Value-up Program" aims to unlock substantial shareholder value.',
      thesis: 'High upside potential anchored in global memory semiconductor supercycle (HBM memory chips for AI) and corporate governance reforms.',
      growthDrivers: [
        'Global monopoly in High Bandwidth Memory (HBM) for AI servers (Samsung, SK Hynix)',
        'Government Corporate Value-up Program incentivizing buybacks and dividends',
        'Low valuation baseline (Price to Book < 1.0x)'
      ],
      riskFactors: [
        'Geopolitical risk with North Korea and trade tension with China',
        'High cyclicality of memory chip spot prices',
        'Chaebol family corporate structure governance challenges'
      ],
      sectorWeights: {
        'Information Tech': 36.8,
        'Industrials': 14.2,
        'Financials': 11.5,
        'Consumer Disc.': 9.8,
        'Healthcare': 7.6,
        'Others': 20.1
      },
      returnForecasts: {
        bear: 0.8,
        base: 10.5,
        bull: 19.2,
        aiConfidence: 83
      },
      scenarios: [
        { name: 'Value-Up Tax Reform Passed', scoreImpact: -5.1, expectedReturnChange: +6.4, comment: 'Triggers multi-year re-rating toward 1.3x P/B.' }
      ]
    }
  },
  {
    id: 'TWN',
    iso2: 'TW',
    name: 'Taiwan',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇹🇼',
    benchmarkIndex: 'TAIEX',
    currency: 'TWD',
    metrics: {
      cape: 25.8,
      pe: 21.2,
      forwardPe: 16.8,
      pb: 2.65,
      divYield: 2.8,
      buffettIndicator: 245.0,
      historicalCagr5Y: 18.4,
      gdpGrowth: 3.5,
      inflation: 1.8,
      interestRate: 2.00,
    },
    aiResearch: {
      summary: 'Taiwan is the undisputed semiconductor powerhouse of the world (TSMC), benefiting immensely from the global artificial intelligence compute boom.',
      thesis: 'High growth tech play with robust dividends. Valuation is elevated relative to history but backed by unmatched foundry moat.',
      growthDrivers: [
        'Near-monopoly in advanced semiconductor manufacturing (<3nm node technology)',
        'Direct beneficiary of global hyperscaler AI chip investments',
        'Strong dividend payout culture among technology tech supply chain vendors'
      ],
      riskFactors: [
        'Cross-strait geopolitical tail risk',
        'Extreme concentration risk in TSMC (>35% of total index)',
        'Global tech hardware capital expenditure cyclicality'
      ],
      sectorWeights: {
        'Information Tech': 62.4,
        'Financials': 14.1,
        'Materials': 6.2,
        'Industrials': 5.8,
        'Others': 11.5
      },
      returnForecasts: {
        bear: 1.2,
        base: 11.2,
        bull: 18.9,
        aiConfidence: 86
      },
      scenarios: [
        { name: 'AI Server Chip Supply Shortage', scoreImpact: +2.5, expectedReturnChange: +5.2, comment: 'Drives TSMC margins and TAIEX to new high.' }
      ]
    }
  },
  {
    id: 'AUS',
    iso2: 'AU',
    name: 'Australia',
    region: 'Asia-Pacific',
    type: 'Developed',
    flag: '🇦🇺',
    benchmarkIndex: 'ASX 200',
    currency: 'AUD',
    metrics: {
      cape: 20.4,
      pe: 17.8,
      forwardPe: 15.6,
      pb: 2.15,
      divYield: 3.8,
      buffettIndicator: 115.2,
      historicalCagr5Y: 7.9,
      gdpGrowth: 1.5,
      inflation: 2.8,
      interestRate: 4.35,
    },
    aiResearch: {
      summary: 'Australia offers high dividend yield stability anchored by global mining giants (BHP, Rio Tinto) and mandatory superannuation pension capital inflows.',
      thesis: 'Fairly valued yield-haven market with critical mineral export upside and resilient banking sector.',
      growthDrivers: [
        'Mandatory 11.5% Superannuation pension contribution inflows into domestic equities',
        'World leader in lithium, iron ore, copper, and green energy metals',
        'Strong population and immigration growth driving consumer demand'
      ],
      riskFactors: [
        'Sensitivity to Chinese industrial demand for iron ore',
        'High domestic mortgage rates weighing on household discretionary spend',
        'Bank sector net interest margin compression'
      ],
      sectorWeights: {
        'Financials': 30.5,
        'Materials / Mining': 23.8,
        'Healthcare': 9.4,
        'Real Estate': 6.2,
        'Industrials': 6.0,
        'Others': 24.1
      },
      returnForecasts: {
        bear: 2.0,
        base: 7.9,
        bull: 12.8,
        aiConfidence: 89
      },
      scenarios: [
        { name: 'Green Energy Metals Surge', scoreImpact: -3.1, expectedReturnChange: +3.8, comment: 'Lithium & copper miners lead index surge.' }
      ]
    }
  },
  {
    id: 'SAU',
    iso2: 'SA',
    name: 'Saudi Arabia',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇸🇦',
    benchmarkIndex: 'TASI',
    currency: 'SAR',
    metrics: {
      cape: 22.1,
      pe: 18.4,
      forwardPe: 15.8,
      pb: 2.05,
      divYield: 3.4,
      buffettIndicator: 78.4,
      historicalCagr5Y: 9.2,
      gdpGrowth: 3.8,
      inflation: 1.7,
      interestRate: 5.50,
    },
    aiResearch: {
      summary: 'Saudi Arabia is undergoing massive non-oil economic transformation under Vision 2030, fueling gigaprojects, banking credit expansion, and technology initiatives.',
      thesis: 'Balanced growth & dividend story supported by PIF sovereign wealth investments and non-oil GDP acceleration.',
      growthDrivers: [
        'Vision 2030 infrastructure and gigaprojects driving corporate credit',
        'Fast-growing non-oil real GDP growth (>4.5%)',
        'High dividend distributions backed by Aramco cash flow'
      ],
      riskFactors: [
        'OPEC+ oil production cuts impacting headline GDP',
        'Geopolitical regional tensions',
        'Tight liquidity in banking system during high global interest rates'
      ],
      sectorWeights: {
        'Financials': 42.1,
        'Energy (Aramco)': 22.5,
        'Materials': 12.4,
        'Telecom': 7.1,
        'Others': 15.9
      },
      returnForecasts: {
        bear: 1.5,
        base: 8.8,
        bull: 15.0,
        aiConfidence: 82
      },
      scenarios: [
        { name: 'OPEC Production Unwind', scoreImpact: -3.5, expectedReturnChange: +4.2, comment: 'Increases oil volume exports and state revenue.' }
      ]
    }
  },
  {
    id: 'SGP',
    iso2: 'SG',
    name: 'Singapore',
    region: 'Asia-Pacific',
    type: 'Developed',
    flag: '🇸🇬',
    benchmarkIndex: 'STI (Straits Times)',
    currency: 'SGD',
    metrics: {
      cape: 14.8,
      pe: 11.5,
      forwardPe: 10.2,
      pb: 1.15,
      divYield: 5.2,
      buffettIndicator: 142.0,
      historicalCagr5Y: 6.2,
      gdpGrowth: 2.6,
      inflation: 2.1,
      interestRate: 3.65,
    },
    aiResearch: {
      summary: 'Singapore offers one of the world\'s safest high-yield equity markets (5.2% yield) supported by elite wealth management banks and regional trade hub status.',
      thesis: 'Top defensive dividend play. Undervalued banking giants (DBS, OCBC, UOB) provide stable cash flow in regional Asian wealth hub.',
      growthDrivers: [
        'Record capital inflows into Singapore private wealth management hub',
        'Top tier dividend yields (>5.0%) with low payout ratio risk',
        'Triple-A rated sovereign risk environment'
      ],
      riskFactors: [
        'Index heavily concentrated in 3 major banks (>48%)',
        'Global trade slowdown impact on port logistics',
        'Commercial real estate rate sensitivity'
      ],
      sectorWeights: {
        'Financials': 48.5,
        'Real Estate / REITs': 18.2,
        'Industrials': 12.4,
        'Telecom': 7.5,
        'Others': 13.4
      },
      returnForecasts: {
        bear: 2.5,
        base: 7.8,
        bull: 12.5,
        aiConfidence: 92
      },
      scenarios: [
        { name: 'Asian Wealth Hub Inflow Acceleration', scoreImpact: -2.8, expectedReturnChange: +2.9, comment: 'Drives Singapore bank assets under management higher.' }
      ]
    }
  },
  {
    id: 'MEX',
    iso2: 'MX',
    name: 'Mexico',
    region: 'Americas',
    type: 'Emerging',
    flag: '🇲🇽',
    benchmarkIndex: 'IPC',
    currency: 'MXN',
    metrics: {
      cape: 13.5,
      pe: 11.2,
      forwardPe: 9.8,
      pb: 1.62,
      divYield: 4.1,
      buffettIndicator: 38.5,
      historicalCagr5Y: 7.1,
      gdpGrowth: 2.1,
      inflation: 4.5,
      interestRate: 10.50,
    },
    aiResearch: {
      summary: 'Mexico is the premier nearshoring beneficiary of North American supply chain reconfiguration, driving industrial real estate and consumer expansion.',
      thesis: 'Attractive valuation with nearshoring secular catalyst. Central bank Banxico interest rate cuts will provide stock re-rating potential.',
      growthDrivers: [
        'Secular "Nearshoring" trend replacing Asian manufacturing for US market',
        'Banxico interest rate cut cycle starting from 10.5% benchmark',
        'Strong US dollar remittance inflows'
      ],
      riskFactors: [
        'US trade policy tariff changes or USMCA renegotiation risks',
        'Infrastructure bottlenecks (water, electricity grid availability)',
        'Domestic judicial reform uncertainties'
      ],
      sectorWeights: {
        'Consumer Staples': 28.4,
        'Financials': 21.2,
        'Industrials / Airports': 18.5,
        'Materials': 14.1,
        'Others': 17.8
      },
      returnForecasts: {
        bear: 1.0,
        base: 9.5,
        bull: 17.1,
        aiConfidence: 84
      },
      scenarios: [
        { name: 'Nearshoring FDI Surge (+25%)', scoreImpact: -4.8, expectedReturnChange: +6.1, comment: 'Drives airport operators, logistics, and banks.' }
      ]
    }
  },
  {
    id: 'ZAF',
    iso2: 'ZA',
    name: 'South Africa',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇿🇦',
    benchmarkIndex: 'FTSE/JSE Top 40',
    currency: 'ZAR',
    metrics: {
      cape: 12.8,
      pe: 10.4,
      forwardPe: 8.9,
      pb: 1.25,
      divYield: 4.5,
      buffettIndicator: 245.0,
      historicalCagr5Y: 5.4,
      gdpGrowth: 1.2,
      inflation: 4.4,
      interestRate: 8.00,
    },
    aiResearch: {
      summary: 'South Africa market trades at low valuation multiples following government of national unity (GNU) formation and structural energy grid repairs.',
      thesis: 'Turnaround value opportunity. Stabilization of state power utility Eskom and logistic ports triggers major re-rating.',
      growthDrivers: [
        'Government of National Unity (GNU) business-friendly reform momentum',
        'End of severe Eskom power load-shedding blackouts',
        'Global precious metals export pricing (gold, platinum group metals)'
      ],
      riskFactors: [
        'Transnet rail and port logistics operational bottlenecks',
        'High unemployment and social spending pressuring budget balance',
        'Currency vulnerability (ZAR volatility)'
      ],
      sectorWeights: {
        'Materials / Mining': 28.5,
        'Financials': 26.4,
        'Consumer Disc. (Naspers/Prosus)': 22.1,
        'Telecom': 8.2,
        'Others': 14.8
      },
      returnForecasts: {
        bear: -1.2,
        base: 9.8,
        bull: 18.2,
        aiConfidence: 79
      },
      scenarios: [
        { name: 'Gold & Platinum Super-Rally', scoreImpact: -5.2, expectedReturnChange: +6.8, comment: 'Drives mining stocks and Rand currency higher.' }
      ]
    }
  },
  {
    id: 'TUR',
    iso2: 'TR',
    name: 'Turkey',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇹🇷',
    benchmarkIndex: 'BIST 100',
    currency: 'TRY',
    metrics: {
      cape: 9.2,
      pe: 6.8,
      forwardPe: 5.4,
      pb: 1.15,
      divYield: 2.1,
      buffettIndicator: 32.5,
      historicalCagr5Y: 34.2, // Nominal high return due to inflation hyper-devaluation
      gdpGrowth: 3.2,
      inflation: 48.6,
      interestRate: 50.00,
    },
    aiResearch: {
      summary: 'Turkish market is a high-beta orthodox economic policy transition play. Central bank orthodox interest rate hikes (to 50%) are stabilizing the Lira and attracting foreign inflows.',
      thesis: 'High risk / high reward speculative value story. Disinflation progress in 2025-2026 will unlock massive international institutional buy orders.',
      growthDrivers: [
        'Return to orthodox monetary policy by CBRT',
        'Extremely low earnings valuation multiple (Forward P/E < 5.5x)',
        'Domestic equity participation acting as real inflation hedge'
      ],
      riskFactors: [
        'Elevated headline CPI inflation (>45%)',
        'Political macroeconomic policy reversal risk',
        'Currency depreciation drag in hard currency terms'
      ],
      sectorWeights: {
        'Financials / Banking': 32.4,
        'Industrials': 24.1,
        'Airlines / Transport (THY)': 14.5,
        'Consumer Staples': 11.2,
        'Others': 17.8
      },
      returnForecasts: {
        bear: -8.5,
        base: 14.2,
        bull: 28.5,
        aiConfidence: 72
      },
      scenarios: [
        { name: 'Inflation Drops Below 20%', scoreImpact: -7.2, expectedReturnChange: +12.4, comment: 'Triggers global emerging market fund allocation boom.' }
      ]
    }
  },
  {
    id: 'NLD',
    iso2: 'NL',
    name: 'Netherlands',
    region: 'Europe',
    type: 'Developed',
    flag: '🇳🇱',
    benchmarkIndex: 'AEX Index',
    currency: 'EUR',
    metrics: {
      cape: 24.5,
      pe: 19.8,
      forwardPe: 16.2,
      pb: 2.85,
      divYield: 2.4,
      buffettIndicator: 135.0,
      historicalCagr5Y: 11.2,
      gdpGrowth: 0.9,
      inflation: 2.2,
      interestRate: 3.25,
    },
    aiResearch: {
      summary: 'Netherlands equity market is Europe\'s premier technology ecosystem index, dominated by semiconductor equipment titan ASML and fintech giants.',
      thesis: 'Quality tech growth market. Premium valuation backed by monopoly semiconductor photolithography equipment global dominance.',
      growthDrivers: [
        'ASML global monopoly in Extreme Ultraviolet (EUV) chip manufacturing machines',
        'Strong corporate governance and tech ecosystem',
        'High international institutional ownership'
      ],
      riskFactors: [
        'US-China semiconductor export control restrictions',
        'High reliance on ASML earnings performance (>30% index weight)',
        'Housing market constraints'
      ],
      sectorWeights: {
        'Technology (ASML, ASM, Prosus)': 48.2,
        'Financials (ING)': 16.5,
        'Consumer Staples (Unilever)': 14.1,
        'Healthcare': 8.2,
        'Others': 13.0
      },
      returnForecasts: {
        bear: 1.5,
        base: 9.8,
        bull: 16.4,
        aiConfidence: 87
      },
      scenarios: [
        { name: 'Next-Gen EUV Lithography Demand Surge', scoreImpact: +2.8, expectedReturnChange: +5.5, comment: 'ASML order backlog surges to record highs.' }
      ]
    }
  },
  {
    id: 'CHE',
    iso2: 'CH',
    name: 'Switzerland',
    region: 'Europe',
    type: 'Developed',
    flag: '🇨🇭',
    benchmarkIndex: 'SMI (Swiss Market Index)',
    currency: 'CHF',
    metrics: {
      cape: 23.4,
      pe: 18.9,
      forwardPe: 15.8,
      pb: 2.95,
      divYield: 3.0,
      buffettIndicator: 215.0,
      historicalCagr5Y: 7.4,
      gdpGrowth: 1.2,
      inflation: 1.1,
      interestRate: 1.00,
    },
    aiResearch: {
      summary: 'Switzerland offers the ultimate safe-haven equity market globally, featuring recession-proof pharmaceutical giants (Novartis, Roche) and consumer staples (Nestlé).',
      thesis: 'Premier low-volatility defensive allocation. Strong Swiss Franc (CHF) currency protects foreign investor purchasing power.',
      growthDrivers: [
        'Global dominance in defensive pharmaceuticals, healthcare, and high-end foods',
        'Ultra-low inflation environment (1.1%) and Swiss Franc (CHF) currency strength',
        'Consistently high return on equity (ROE > 16%)'
      ],
      riskFactors: [
        'Over-concentration in top 3 names (Nestlé, Novartis, Roche = ~50% SMI)',
        'Strong CHF currency weighing on exporter translation margins',
        'US drug pricing reform risks'
      ],
      sectorWeights: {
        'Healthcare': 38.5,
        'Consumer Staples': 21.2,
        'Financials (UBS)': 18.4,
        'Industrials': 11.2,
        'Others': 10.7
      },
      returnForecasts: {
        bear: 3.2,
        base: 7.2,
        bull: 11.5,
        aiConfidence: 94
      },
      scenarios: [
        { name: 'Global Recession Volatility Spike', scoreImpact: -1.2, expectedReturnChange: +2.8, comment: 'Defensive cashflows outshine cyclical markets.' }
      ]
    }
  },
  {
    id: 'ARG',
    iso2: 'AR',
    name: 'Argentina',
    region: 'Americas',
    type: 'Emerging',
    flag: '🇦🇷',
    benchmarkIndex: 'S&P Merval',
    currency: 'ARS',
    metrics: {
      cape: 11.2,
      pe: 8.9,
      forwardPe: 6.8,
      pb: 1.45,
      divYield: 1.8,
      buffettIndicator: 28.4,
      historicalCagr5Y: 48.5, // Nominal currency hyper-rally
      gdpGrowth: 1.5,
      inflation: 193.0,
      interestRate: 40.00,
    },
    aiResearch: {
      summary: 'Argentina is undergoing an extraordinary free-market economic shock therapy overhaul under President Javier Milei, achieving historic monthly fiscal surpluses.',
      thesis: 'High risk contrarian turnaround play. Fiscal deficit elimination and deregulation foster explosive equity upside if stabilization holds.',
      growthDrivers: [
        'First sustained monthly fiscal surplus in over two decades',
        'Vast shale oil/gas reserves (Vaca Muerta) and lithium deposits',
        'Dramatically falling monthly inflation metrics'
      ],
      riskFactors: [
        'Social tolerance limits to severe austerity measures',
        'Foreign exchange capital control unwinding risks',
        'Legislative reform approval hurdles'
      ],
      sectorWeights: {
        'Energy (YPF)': 34.2,
        'Financials': 31.5,
        'Utilities': 14.8,
        'Materials': 9.2,
        'Others': 10.3
      },
      returnForecasts: {
        bear: -15.0,
        base: 18.5,
        bull: 45.0,
        aiConfidence: 68
      },
      scenarios: [
        { name: 'Dollarization or FX Restrictions Fully Lifted', scoreImpact: -8.0, expectedReturnChange: +18.2, comment: 'Unlocks massive foreign institutional inflows.' }
      ]
    }
  },
  {
    id: 'ARE',
    iso2: 'AE',
    name: 'United Arab Emirates',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇦🇪',
    benchmarkIndex: 'DFM GI / ADX',
    currency: 'AED',
    metrics: {
      cape: 16.5,
      pe: 12.8,
      forwardPe: 10.5,
      pb: 1.82,
      divYield: 4.8,
      buffettIndicator: 95.0,
      historicalCagr5Y: 12.4,
      gdpGrowth: 3.9,
      inflation: 2.1,
      interestRate: 4.90,
    },
    aiResearch: {
      summary: 'The UAE is the premier global hub for wealth migration, fintech innovation, and real estate growth in the Middle East, offering a 4.8% dividend yield.',
      thesis: 'Attractive growth & dividend nexus. Rapid population growth and zero corporate income tax for qualifying freezone entities spur business.',
      growthDrivers: [
        'High net worth individual (HNWI) global relocation inflow',
        'Robust tourism, real estate transactions, and financial services growth',
        'High dividend yields from state-backed telecom and bank IPOs'
      ],
      riskFactors: [
        'Regional geopolitical conflicts spillover',
        'Global real estate cycle slowdown',
        'USD peg monetary policy constraints'
      ],
      sectorWeights: {
        'Financials': 41.5,
        'Real Estate & Construction': 26.2,
        'Telecom': 12.4,
        'Utilities': 9.1,
        'Others': 10.8
      },
      returnForecasts: {
        bear: 1.2,
        base: 9.5,
        bull: 16.8,
        aiConfidence: 87
      },
      scenarios: [
        { name: 'Global Tech & Crypto Hub Expansion', scoreImpact: -3.2, expectedReturnChange: +4.1, comment: 'Boosts commercial real estate and bank liquidity.' }
      ]
    }
  },
  {
    id: 'IDN',
    iso2: 'ID',
    name: 'Indonesia',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇮🇩',
    benchmarkIndex: 'IDX Composite',
    currency: 'IDR',
    metrics: {
      cape: 15.2,
      pe: 13.1,
      forwardPe: 11.2,
      pb: 1.75,
      divYield: 3.6,
      buffettIndicator: 48.5,
      historicalCagr5Y: 6.8,
      gdpGrowth: 5.0,
      inflation: 2.6,
      interestRate: 6.00,
    },
    aiResearch: {
      summary: 'Indonesia is Southeast Asia\'s largest economy, leveraging its massive nickel reserves for EV supply chains alongside a young population of 275M+.',
      thesis: 'Under-owned demographic and commodity powerhouse. Low market cap to GDP (48%) signals significant long-term financial deepening room.',
      growthDrivers: [
        'Monopoly control over global nickel supply for EV batteries',
        'Favorable demographic dividend with median age under 30',
        'Stable 5.0%+ real annual GDP growth track record'
      ],
      riskFactors: [
        'Export nickel price fluctuations',
        'Fiscal deficit widening from new national social initiatives',
        'Currency volatility (IDR)'
      ],
      sectorWeights: {
        'Financials': 38.4,
        'Consumer Goods': 16.2,
        'Materials / Mining': 14.5,
        'Telecom': 9.8,
        'Others': 21.1
      },
      returnForecasts: {
        bear: 1.5,
        base: 10.2,
        bull: 17.5,
        aiConfidence: 83
      },
      scenarios: [
        { name: 'EV Battery Smelting Expansion', scoreImpact: -4.1, expectedReturnChange: +5.2, comment: 'Drives mining conglomerates and banking credit.' }
      ]
    }
  },
  {
    id: 'VNM',
    iso2: 'VN',
    name: 'Vietnam',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇻🇳',
    benchmarkIndex: 'VN-Index',
    currency: 'VND',
    metrics: {
      cape: 13.8,
      pe: 12.2,
      forwardPe: 9.6,
      pb: 1.55,
      divYield: 2.2,
      buffettIndicator: 62.0,
      historicalCagr5Y: 7.8,
      gdpGrowth: 6.5,
      inflation: 3.5,
      interestRate: 4.50,
    },
    aiResearch: {
      summary: 'Vietnam is the premier Asian electronics export growth engine, anticipating MSCI Emerging Market index upgrade classification by 2026.',
      thesis: 'High potential frontier-to-emerging growth story. Beneficiary of Apple, Samsung, and Foxconn electronics assembly relocation.',
      growthDrivers: [
        'Global electronics manufacturing hub (Apple, Samsung supply chain expansion)',
        'Anticipated MSCI & FTSE Emerging Markets index upgrade catalyst',
        'Strong FDI inflows and rapid urban middle class growth'
      ],
      riskFactors: [
        'Domestic banking sector real estate exposure',
        'Power grid capacity strains during peak export seasons',
        'Global trade volume sensitivity'
      ],
      sectorWeights: {
        'Financials': 35.2,
        'Real Estate': 22.4,
        'Consumer Disc.': 12.1,
        'Industrials': 10.5,
        'Others': 19.8
      },
      returnForecasts: {
        bear: 0.2,
        base: 12.8,
        bull: 21.5,
        aiConfidence: 81
      },
      scenarios: [
        { name: 'MSCI Emerging Market Upgrade Approved', scoreImpact: -6.5, expectedReturnChange: +9.2, comment: 'Triggers multi-billion dollar index fund tracking buy orders.' }
      ]
    }
  },
  {
    id: 'POL',
    iso2: 'PL',
    name: 'Poland',
    region: 'Europe',
    type: 'Emerging',
    flag: '🇵🇱',
    benchmarkIndex: 'WIG20',
    currency: 'PLN',
    metrics: {
      cape: 12.5,
      pe: 10.1,
      forwardPe: 8.4,
      pb: 1.22,
      divYield: 4.2,
      buffettIndicator: 35.8,
      historicalCagr5Y: 5.2,
      gdpGrowth: 3.1,
      inflation: 4.2,
      interestRate: 5.75,
    },
    aiResearch: {
      summary: 'Poland is Central Europe\'s economic powerhouse, benefiting from massive EU fund disbursements and nearshoring manufacturing demand from Western Europe.',
      thesis: 'Undervalued European growth play with high 4.2% dividend yield and single-digit forward P/E multiple.',
      growthDrivers: [
        'Unlocking of €137B in European Union Recovery and Cohesion funds',
        'Strong consumer wage growth and domestic retail purchasing power',
        'Leading nearshoring manufacturing and IT outsourcing hub for Europe'
      ],
      riskFactors: [
        'Geopolitical proximity to Russia-Ukraine conflict',
        'Bank sector CHF mortgage litigation provisions',
        'Energy grid decarbonization costs'
      ],
      sectorWeights: {
        'Financials': 42.1,
        'Energy / Utilities': 16.5,
        'Consumer Staples / Retail': 14.2,
        'Materials / Copper': 10.8,
        'Others': 16.4
      },
      returnForecasts: {
        bear: 0.5,
        base: 10.5,
        bull: 18.2,
        aiConfidence: 82
      },
      scenarios: [
        { name: 'EU Infrastructure Disbursement Acceleration', scoreImpact: -4.5, expectedReturnChange: +5.8, comment: 'Drives Polish construction, banking, and utilities.' }
      ]
    }
  },
  {
    id: 'ITA',
    iso2: 'IT',
    name: 'Italy',
    region: 'Europe',
    type: 'Developed',
    flag: '🇮🇹',
    benchmarkIndex: 'FTSE MIB',
    currency: 'EUR',
    metrics: {
      cape: 15.8,
      pe: 10.8,
      forwardPe: 9.2,
      pb: 1.32,
      divYield: 5.4,
      buffettIndicator: 42.5,
      historicalCagr5Y: 10.5,
      gdpGrowth: 0.8,
      inflation: 1.6,
      interestRate: 3.25,
    },
    aiResearch: {
      summary: 'Italy\'s equity market has outperformed major European peers driven by highly profitable banking consolidation (UniCredit, Intesa Sanpaolo) and a 5.4% dividend yield.',
      thesis: 'High dividend value play. Resilient banking profits and European NextGenEU fund inflows support attractive shareholder distribution.',
      growthDrivers: [
        'Strong net interest income margins for Italian banking giants',
        'Generous 5.4% dividend yield backed by aggressive buybacks',
        'Luxury auto and industrial precision export excellence (Ferrari)'
      ],
      riskFactors: [
        'High public debt-to-GDP ratio (>135%)',
        'Sensitivity of Italian BTP government bond spreads',
        'Weak domestic demographic trends'
      ],
      sectorWeights: {
        'Financials': 38.5,
        'Consumer Disc. (Ferrari)': 18.2,
        'Utilities (Enel)': 16.4,
        'Energy (Eni)': 10.1,
        'Others': 16.8
      },
      returnForecasts: {
        bear: 1.2,
        base: 8.4,
        bull: 14.2,
        aiConfidence: 86
      },
      scenarios: [
        { name: 'BTP Bond Spread Narrowing', scoreImpact: -3.2, expectedReturnChange: +3.5, comment: 'Lowers Italian bank funding cost further.' }
      ]
    }
  },
  {
    id: 'ESP',
    iso2: 'ES',
    name: 'Spain',
    region: 'Europe',
    type: 'Developed',
    flag: '🇪🇸',
    benchmarkIndex: 'IBEX 35',
    currency: 'EUR',
    metrics: {
      cape: 16.1,
      pe: 11.5,
      forwardPe: 9.8,
      pb: 1.38,
      divYield: 4.9,
      buffettIndicator: 65.2,
      historicalCagr5Y: 8.4,
      gdpGrowth: 2.5,
      inflation: 2.4,
      interestRate: 3.25,
    },
    aiResearch: {
      summary: 'Spain leads Southern European GDP growth, driven by record tourism, renewable energy adoption (Iberdrola), and global Latin American banking expansion (BBVA, Santander).',
      thesis: 'Attractive value market offering 4.9% dividend yield and strong exposure to fast-growing Latin American consumer finance.',
      growthDrivers: [
        'Outperforming GDP growth relative to Eurozone average (2.5% vs 0.8%)',
        'Global leadership in utility green transition (Iberdrola)',
        'Heavy exposure of major Spanish banks to high-margin Latin American markets'
      ],
      riskFactors: [
        'Political parliamentary fragmentation and tax policies on banks/utilities',
        'Tourism sector saturation caps',
        'Youth unemployment'
      ],
      sectorWeights: {
        'Financials (Santander, BBVA)': 34.2,
        'Utilities (Iberdrola)': 22.1,
        'Consumer Disc. (Inditex/Zara)': 16.5,
        'Telecom (Telefónica)': 8.2,
        'Others': 19.0
      },
      returnForecasts: {
        bear: 1.5,
        base: 8.6,
        bull: 14.5,
        aiConfidence: 87
      },
      scenarios: [
        { name: 'Inditex Global Retail Expansion', scoreImpact: -2.8, expectedReturnChange: +3.2, comment: 'Drives consumer discretionary sub-index.' }
      ]
    }
  },
  {
    id: 'SWE',
    iso2: 'SE',
    name: 'Sweden',
    region: 'Europe',
    type: 'Developed',
    flag: '🇸🇪',
    benchmarkIndex: 'OMX Stockholm 30',
    currency: 'SEK',
    metrics: {
      cape: 22.8,
      pe: 18.2,
      forwardPe: 15.1,
      pb: 2.45,
      divYield: 3.2,
      buffettIndicator: 155.0,
      historicalCagr5Y: 9.5,
      gdpGrowth: 1.1,
      inflation: 1.9,
      interestRate: 2.75,
    },
    aiResearch: {
      summary: 'Sweden is the innovation engine of Scandinavia, renowned for high-quality industrial engineering export champions (Atlas Copco, Volvo, ABB) and tech scaleups.',
      thesis: 'High ROE quality-growth market. Riksbank interest rate cuts stimulate domestic real estate and industrial capital expenditures.',
      growthDrivers: [
        'Superior engineering innovation and high ROE (>18%) industrial exporters',
        'Riksbank proactive monetary easing policy ahead of ECB',
        'Strong ESG leadership attracting global sustainable capital'
      ],
      riskFactors: [
        'Commercial real estate debt sensitivity',
        'Export demand slowdown in Germany and China',
        'SEK currency volatility'
      ],
      sectorWeights: {
        'Industrials': 44.5,
        'Financials': 22.1,
        'Technology': 11.2,
        'Healthcare': 8.5,
        'Others': 13.7
      },
      returnForecasts: {
        bear: 2.0,
        base: 9.2,
        bull: 15.5,
        aiConfidence: 88
      },
      scenarios: [
        { name: 'Global Industrial Capex Recovery', scoreImpact: -3.4, expectedReturnChange: +4.2, comment: 'Atlas Copco and Sandvik order intakes surge.' }
      ]
    }
  },
  {
    id: 'THA',
    iso2: 'TH',
    name: 'Thailand',
    region: 'Asia-Pacific',
    type: 'Emerging',
    flag: '🇹🇭',
    benchmarkIndex: 'SET Index',
    currency: 'THB',
    metrics: {
      cape: 17.5,
      pe: 15.2,
      forwardPe: 12.8,
      pb: 1.35,
      divYield: 3.8,
      buffettIndicator: 82.4,
      historicalCagr5Y: 1.8,
      gdpGrowth: 2.6,
      inflation: 0.8,
      interestRate: 2.25,
    },
    aiResearch: {
      summary: 'Thailand market offers attractive low P/B multiples (1.35x) and a 3.8% dividend yield, underpinned by Chinese tourism recovery and digital wallet stimulus.',
      thesis: 'Valuation discount play with catalyst in tourism rebound, medical hub leadership, and central bank interest rate easing.',
      growthDrivers: [
        'Global medical tourism and wellness hospital hub',
        'Government fiscal digital handout consumer stimulus',
        'Automotive manufacturing hub adapting to EV assembly'
      ],
      riskFactors: [
        'High household debt-to-GDP ratio (>90%)',
        'Political party coalition friction',
        'Slower manufacturing export momentum'
      ],
      sectorWeights: {
        'Energy': 21.2,
        'Financials': 18.5,
        'Commerce / Retail': 14.8,
        'Healthcare': 11.2,
        'Tourism & Transport': 10.4,
        'Others': 23.9
      },
      returnForecasts: {
        bear: 0.2,
        base: 7.8,
        bull: 14.2,
        aiConfidence: 80
      },
      scenarios: [
        { name: 'Chinese Tourist Inflow Double', scoreImpact: -3.8, expectedReturnChange: +4.8, comment: 'Airport operators, hotels, and retail rally.' }
      ]
    }
  },
  {
    id: 'ISR',
    iso2: 'IL',
    name: 'Israel',
    region: 'Middle East & Africa',
    type: 'Developed',
    flag: '🇮🇱',
    benchmarkIndex: 'TA-125',
    currency: 'ILS',
    metrics: {
      cape: 18.2,
      pe: 14.5,
      forwardPe: 12.1,
      pb: 1.95,
      divYield: 2.9,
      buffettIndicator: 92.0,
      historicalCagr5Y: 7.2,
      gdpGrowth: 2.0,
      inflation: 3.2,
      interestRate: 4.50,
    },
    aiResearch: {
      summary: 'Israel\'s equity market features global cybersecurity, software, and defense tech leaders trading at discount multiples due to regional security risk overhang.',
      thesis: 'High-tech valuation discount opportunity. De-escalation or ceasefire triggers rapid multi-multiple expansion back to historical tech premiums.',
      growthDrivers: [
        'World-leading tech innovation ecosystem ("Silicon Wadi")',
        'Global leadership in cybersecurity, artificial intelligence, and defense systems',
        'Strong population growth and high domestic tech R&D expenditure'
      ],
      riskFactors: [
        'Geopolitical regional conflict uncertainty',
        'Budget deficit expansion from security spending',
        'Shekel (ILS) currency swings'
      ],
      sectorWeights: {
        'Technology': 32.4,
        'Financials': 28.5,
        'Real Estate': 14.2,
        'Healthcare': 9.8,
        'Others': 15.1
      },
      returnForecasts: {
        bear: -2.5,
        base: 9.8,
        bull: 22.0,
        aiConfidence: 77
      },
      scenarios: [
        { name: 'Regional De-escalation Accord', scoreImpact: -6.2, expectedReturnChange: +11.5, comment: 'Triggers massive institutional re-rating of tech & banks.' }
      ]
    }
  },
  {
    id: 'CHL',
    iso2: 'CL',
    name: 'Chile',
    region: 'Americas',
    type: 'Emerging',
    flag: '🇨🇱',
    benchmarkIndex: 'IPSA',
    currency: 'CLP',
    metrics: {
      cape: 12.8,
      pe: 9.8,
      forwardPe: 8.2,
      pb: 1.28,
      divYield: 6.2,
      buffettIndicator: 72.0,
      historicalCagr5Y: 4.9,
      gdpGrowth: 2.3,
      inflation: 3.8,
      interestRate: 5.25,
    },
    aiResearch: {
      summary: 'Chile is the world\'s largest copper exporter and holds the world\'s largest lithium reserves, making it indispensable to global green energy electrification.',
      thesis: 'Top resource value play. Single-digit P/E multiple (9.8x) combined with 6.2% dividend yield provides superb downside cushion.',
      growthDrivers: [
        'Unmatched global copper and lithium supply reserves',
        'Central bank interest rate cut cycle progressing smoothly',
        'Moderating political constitutional risks'
      ],
      riskFactors: [
        'Copper mining ore grade degradation and water supply costs',
        'National lithium policy implementation speed',
        'China economic slowdown impacting copper demand'
      ],
      sectorWeights: {
        'Materials / Mining (SQM)': 32.1,
        'Financials': 26.5,
        'Utilities / Energy': 18.2,
        'Retail / Consumer': 12.4,
        'Others': 10.8
      },
      returnForecasts: {
        bear: 0.5,
        base: 10.8,
        bull: 19.5,
        aiConfidence: 83
      },
      scenarios: [
        { name: 'Copper Price Hits $5.00/lb', scoreImpact: -5.8, expectedReturnChange: +8.2, comment: 'Massive windfall earnings for mining sub-index.' }
      ]
    }
  },
  {
    id: 'NGA',
    iso2: 'NG',
    name: 'Nigeria',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇳🇬',
    benchmarkIndex: 'NGX 30',
    currency: 'NGN',
    metrics: {
      cape: 8.5,
      pe: 6.2,
      forwardPe: 4.8,
      pb: 0.95,
      divYield: 5.8,
      buffettIndicator: 18.5,
      historicalCagr5Y: 22.4, // High nominal inflation returns
      gdpGrowth: 3.2,
      inflation: 32.1,
      interestRate: 27.25,
    },
    aiResearch: {
      summary: 'Nigeria is undergoing sweeping economic reforms, including fuel subsidy removal and foreign exchange unification under President Bola Tinubu.',
      thesis: 'Speculative frontier value play. Unification of Naira FX rate and Dangote refinery operation pave way for long-term industrialization.',
      growthDrivers: [
        'Africa\'s largest population (220M+) with rapid fintech adoption',
        'Dangote mega-refinery operation reducing fuel import bill',
        'Ultra-low valuation multiple (Forward P/E < 5.0x)'
      ],
      riskFactors: [
        'High food and headline inflation (>30%)',
        'Central bank interest rate hikes (27.25%) curbing credit growth',
        'Naira currency devaluation impact'
      ],
      sectorWeights: {
        'Financials (Tier-1 Banks)': 42.5,
        'Industrial Goods (Dangote Cement)': 28.4,
        'Consumer Goods': 16.2,
        'Telecom (MTN Nigeria)': 8.5,
        'Others': 4.4
      },
      returnForecasts: {
        bear: -10.0,
        base: 12.5,
        bull: 32.0,
        aiConfidence: 66
      },
      scenarios: [
        { name: 'FX Market Stabilization Achieved', scoreImpact: -8.2, expectedReturnChange: +15.4, comment: 'Attracts major foreign institutional capital return.' }
      ]
    }
  },
  {
    id: 'EGY',
    iso2: 'EG',
    name: 'Egypt',
    region: 'Middle East & Africa',
    type: 'Emerging',
    flag: '🇪🇬',
    benchmarkIndex: 'EGX 30',
    currency: 'EGP',
    metrics: {
      cape: 9.8,
      pe: 7.1,
      forwardPe: 5.5,
      pb: 1.12,
      divYield: 4.5,
      buffettIndicator: 24.5,
      historicalCagr5Y: 18.5,
      gdpGrowth: 3.5,
      inflation: 26.2,
      interestRate: 27.25,
    },
    aiResearch: {
      summary: 'Egypt market has stabilized following a landmark $35B Ras El Hekma investment agreement with the UAE and an expanded IMF support program.',
      thesis: 'Post-devaluation rebound play. Massive foreign direct investment inflows eliminate FX backlog and catalyze equity re-rating.',
      growthDrivers: [
        '$35 Billion UAE Ras El Hekma coastal development investment',
        'IMF and European Union multi-billion financial support packages',
        'Commercial banking sector high net interest income'
      ],
      riskFactors: [
        'Suez Canal revenue drop from Red Sea shipping disruptions',
        'Elevated domestic borrowing costs',
        'Inflation pressure on household purchasing power'
      ],
      sectorWeights: {
        'Financials (CIB)': 45.2,
        'Real Estate': 21.4,
        'Materials / Fertilizer': 14.8,
        'Industrials': 9.5,
        'Others': 9.1
      },
      returnForecasts: {
        bear: -5.0,
        base: 11.4,
        bull: 26.0,
        aiConfidence: 71
      },
      scenarios: [
        { name: 'Red Sea Maritime Transport Normalization', scoreImpact: -4.5, expectedReturnChange: +6.8, comment: 'Restores vital Suez Canal dollar revenue stream.' }
      ]
    }
  }
];
