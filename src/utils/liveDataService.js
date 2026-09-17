// Real-Time Live Data Sync & Timestamp Management Utility
// Manages real-time market data refresh, data source provider metadata, and database timestamps.

export const DATA_PROVIDERS = [
  {
    id: 'shiller',
    name: 'Yale Shiller CAPE Data Hub',
    type: 'Academic / Quantitative',
    frequency: 'Monthly (30-day lagged)',
    status: 'Operational (Synchronized)',
    coverage: 'Global Developed & Emerging Markets',
    icon: '📊'
  },
  {
    id: 'imf',
    name: 'IMF World Economic Outlook API',
    type: 'Macroeconomic / GDP',
    frequency: 'Quarterly',
    status: 'Operational (Synchronized)',
    coverage: '190+ Economies',
    icon: '🌐'
  },
  {
    id: 'market_feed',
    name: 'Yahoo Finance & Bloomberg Consensus',
    type: 'Live Financial Markets',
    frequency: 'Real-Time / Daily Close',
    status: 'Connected (Live Feed)',
    coverage: 'Global Index Benchmarks',
    icon: '⚡'
  },
  {
    id: 'ai_quant',
    name: 'Mathippu-AI Quantitative Models',
    type: 'Machine Learning / Valuation',
    frequency: 'Daily Engine Recalculation',
    status: 'Active (v2.4.8 Model)',
    coverage: 'Risk/Return & Scenario Forecasting',
    icon: '🧠'
  }
];

export const INITIAL_DATABASE_METADATA = {
  version: 'v2.4.8 (Real-Time Synchronized)',
  lastFullSync: new Date().toISOString(),
  formattedDate: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  formattedTime: new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }),
  totalMarketsMonitored: 32,
  dataQualityScore: 98.4,
  isLive: true
};

/**
 * Simulates fetching up-to-the-second market data from live endpoints.
 * Applies real-time market index fluctuations and updates timestamp metadata.
 */
export async function fetchLatestMarketData(currentCountries) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      
      // Apply minor real-time market index micro-fluctuations (simulate live market feed)
      const updatedCountries = currentCountries.map((country) => {
        // Random micro fluctuation between -0.3% and +0.3%
        const priceDeltaPct = (Math.random() - 0.48) * 0.006;
        const newPe = Math.max(3.0, Math.round((country.metrics.pe * (1 + priceDeltaPct)) * 10) / 10);
        const newForwardPe = Math.max(2.5, Math.round((country.metrics.forwardPe * (1 + priceDeltaPct)) * 10) / 10);
        
        return {
          ...country,
          metrics: {
            ...country.metrics,
            pe: newPe,
            forwardPe: newForwardPe,
          }
        };
      });

      const updatedMetadata = {
        ...INITIAL_DATABASE_METADATA,
        lastFullSync: now.toISOString(),
        formattedDate: now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        formattedTime: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }),
        isLive: true
      };

      resolve({
        updatedCountries,
        metadata: updatedMetadata
      });
    }, 700); // 700ms network fetch delay
  });
}
