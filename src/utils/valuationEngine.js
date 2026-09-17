import { VALUATION_CATEGORIES } from '../data/countryMarketData.js';

/**
 * Normalizes a metric value between 0 and 100 across a dataset array.
 * @param {number} val - Target metric value
 * @param {number} min - Minimum value in dataset
 * @param {number} max - Maximum value in dataset
 * @param {boolean} inverse - If true, lower numerical value yields higher score (e.g. Div Yield)
 */
function normalizeMetric(val, min, max, inverse = false) {
  if (max === min) return 50;
  let normalized = ((val - min) / (max - min)) * 100;
  if (inverse) {
    normalized = 100 - normalized;
  }
  return Math.min(Math.max(normalized, 0), 100);
}

/**
 * Calculates custom valuation index score for a single country given metric weights.
 */
export function calculateValuationScore(country, allCountries, customWeights) {
  // Extract min and max ranges for normalization
  const capes = allCountries.map(c => c.metrics.cape);
  const pes = allCountries.map(c => c.metrics.pe);
  const fPes = allCountries.map(c => c.metrics.forwardPe);
  const pbs = allCountries.map(c => c.metrics.pb);
  const buffetts = allCountries.map(c => c.metrics.buffettIndicator);
  const divYields = allCountries.map(c => c.metrics.divYield);

  const capeScore = normalizeMetric(country.metrics.cape, Math.min(...capes), Math.max(...capes));
  const peScore = normalizeMetric(country.metrics.pe, Math.min(...pes), Math.max(...pes));
  const fPeScore = normalizeMetric(country.metrics.forwardPe, Math.min(...fPes), Math.max(...fPes));
  const pbScore = normalizeMetric(country.metrics.pb, Math.min(...pbs), Math.max(...pbs));
  const buffettScore = normalizeMetric(country.metrics.buffettIndicator, Math.min(...buffetts), Math.max(...buffetts));
  // Dividend yield inverse: higher dividend yield = lower valuation score (more attractive)
  const divScore = normalizeMetric(country.metrics.divYield, Math.min(...divYields), Math.max(...divYields), true);

  const w = customWeights;
  const totalWeight = (w.cape || 0) + (w.pe || 0) + (w.forwardPe || 0) + (w.pb || 0) + (w.buffettIndicator || 0) + (w.divYield || 0);

  if (totalWeight === 0) return 50;

  const rawWeightedScore = (
    capeScore * (w.cape || 0) +
    peScore * (w.pe || 0) +
    fPeScore * (w.forwardPe || 0) +
    pbScore * (w.pb || 0) +
    buffettScore * (w.buffettIndicator || 0) +
    divScore * (w.divYield || 0)
  ) / totalWeight;

  const valuationScore = Math.round(rawWeightedScore * 10) / 10;

  // Determine category
  let categoryKey = 'FAIR';
  if (valuationScore < 35) {
    categoryKey = 'UNDERVALUED';
  } else if (valuationScore <= 62) {
    categoryKey = 'FAIR';
  } else if (valuationScore <= 78) {
    categoryKey = 'OVERVALUED';
  } else {
    categoryKey = 'EXTREME';
  }

  const category = VALUATION_CATEGORIES[categoryKey];

  // Dynamic Expected 5Y Annualized CAGR estimation based on CAPE & Valuation Score
  // Formula: Base GDP growth + Div Yield + (Historical Mean CAPE Adjustment)
  const meanCapeAdjustment = (20 - country.metrics.cape) * 0.25;
  const dynamicCagr = Math.round((country.metrics.gdpGrowth + country.metrics.divYield + meanCapeAdjustment) * 10) / 10;

  return {
    score: valuationScore,
    categoryKey,
    category,
    dynamicCagr,
    subScores: {
      cape: Math.round(capeScore),
      pe: Math.round(peScore),
      forwardPe: Math.round(fPeScore),
      pb: Math.round(pbScore),
      buffett: Math.round(buffettScore),
      div: Math.round(divScore)
    }
  };
}

/**
 * Processes all countries and returns them sorted by valuation score.
 */
export function getEnrichedCountries(countries, customWeights) {
  const enriched = countries.map(country => {
    const valuation = calculateValuationScore(country, countries, customWeights);
    return {
      ...country,
      valuation
    };
  });

  return enriched.sort((a, b) => a.valuation.score - b.valuation.score);
}
