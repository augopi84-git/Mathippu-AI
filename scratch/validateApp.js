// Automated Application Data & Engine Validator
import { COUNTRY_MARKET_DATA, DEFAULT_WEIGHTS, VALUATION_CATEGORIES } from '../src/data/countryMarketData.js';
import { getEnrichedCountries, calculateValuationScore } from '../src/utils/valuationEngine.js';
import http from 'http';

console.log('=== STARTING AUTOMATED VALUAGLOBE AI VALIDATION ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
    failCount++;
  }
}

// 1. Validate Dataset Structure
assert(Array.isArray(COUNTRY_MARKET_DATA), 'Dataset is an array');
assert(COUNTRY_MARKET_DATA.length >= 30, `Dataset contains 30+ economies (Found: ${COUNTRY_MARKET_DATA.length})`);

COUNTRY_MARKET_DATA.forEach((country, idx) => {
  assert(country.id && country.name && country.flag, `Country #${idx + 1} (${country.name || 'Unknown'}) has required ID, name, and flag`);
  assert(country.metrics && typeof country.metrics.cape === 'number', `${country.name} has valid numeric Shiller CAPE (${country.metrics?.cape})`);
  assert(country.metrics && typeof country.metrics.pe === 'number', `${country.name} has valid numeric Trailing P/E (${country.metrics?.pe})`);
  assert(country.metrics && typeof country.metrics.divYield === 'number', `${country.name} has valid numeric Div Yield (${country.metrics?.divYield}%)`);
  assert(country.aiResearch && country.aiResearch.summary && country.aiResearch.thesis, `${country.name} has complete AI Research summary and investment thesis`);
  assert(country.aiResearch.returnForecasts && typeof country.aiResearch.returnForecasts.base === 'number', `${country.name} has base case return forecast`);
});

// 2. Validate Valuation Calculation Engine
console.log('\n--- Testing Valuation Calculation Engine ---');
const enriched = getEnrichedCountries(COUNTRY_MARKET_DATA, DEFAULT_WEIGHTS);
assert(enriched.length === COUNTRY_MARKET_DATA.length, 'Enriched countries count matches dataset count');

const lowestScore = enriched[0];
const highestScore = enriched[enriched.length - 1];
assert(lowestScore.valuation.score <= highestScore.valuation.score, `Enriched array is properly sorted by valuation score (${lowestScore.name}: ${lowestScore.valuation.score} <= ${highestScore.name}: ${highestScore.valuation.score})`);

assert(lowestScore.valuation.category && lowestScore.valuation.category.label, 'Valuation score assigns valid category badge');

// 3. Test Custom Weight Adjustment
console.log('\n--- Testing Custom Weight Calculation ---');
const customWeights = { cape: 0.50, pe: 0.50, forwardPe: 0, pb: 0, buffettIndicator: 0, divYield: 0 };
const customScore = calculateValuationScore(COUNTRY_MARKET_DATA[0], COUNTRY_MARKET_DATA, customWeights);
assert(typeof customScore.score === 'number' && customScore.score >= 0 && customScore.score <= 100, `Custom weighting calculates valid 0-100 score (${customScore.score})`);

// 4. Test Local HTTP Dev Server Response
console.log('\n--- Testing Local Dev Server Endpoint ---');
http.get('http://127.0.0.1:5173/', (res) => {
  assert(res.statusCode === 200, `Dev Server HTTP status code is 200 OK (Received: ${res.statusCode})`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    assert(data.includes('<div id="root"></div>'), 'Dev Server outputs React root mount element');
    assert(data.includes('/src/main.jsx'), 'Dev Server outputs main.jsx entrypoint script');

    console.log('\n=== VALIDATION SUMMARY ===');
    console.log(`Passed Checks: ${passCount}`);
    console.log(`Failed Checks: ${failCount}`);
    if (failCount === 0) {
      console.log('🎉 ALL APPLICATION COMPONENT & ENGINE CHECKS PASSED PERFECTLY!');
    }
  });
}).on('error', (err) => {
  assert(false, `Dev server HTTP request failed: ${err.message}`);
});
