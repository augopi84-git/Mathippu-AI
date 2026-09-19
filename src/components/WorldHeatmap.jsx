import React, { useState, useCallback, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Sparkles,
  ChevronRight,
  Globe,
} from 'lucide-react';

// ── Free TopoJSON world map (Natural Earth, no API key needed) ─────────────────
const GEO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ── ISO numeric → ISO 3-letter mapping for countries in our dataset ───────────
// (Natural Earth uses numeric IDs, our data uses alpha-3)
const NUMERIC_TO_ALPHA3 = {
  4: 'AFG', 8: 'ALB', 12: 'DZA', 24: 'AGO', 32: 'ARG', 36: 'AUS',
  40: 'AUT', 50: 'BGD', 56: 'BEL', 68: 'BOL', 76: 'BRA', 100: 'BGR',
  116: 'KHM', 120: 'CMR', 124: 'CAN', 144: 'LKA', 152: 'CHL',
  156: 'CHN', 170: 'COL', 191: 'HRV', 196: 'CYP', 203: 'CZE',
  208: 'DNK', 218: 'ECU', 818: 'EGY', 231: 'ETH', 246: 'FIN',
  250: 'FRA', 276: 'DEU', 288: 'GHA', 300: 'GRC', 320: 'GTM',
  344: 'HKG', 348: 'HUN', 356: 'IND', 360: 'IDN', 364: 'IRN',
  368: 'IRQ', 372: 'IRL', 376: 'ISR', 380: 'ITA', 392: 'JPN',
  400: 'JOR', 398: 'KAZ', 404: 'KEN', 410: 'KOR', 414: 'KWT',
  458: 'MYS', 484: 'MEX', 504: 'MAR', 528: 'NLD', 554: 'NZL',
  566: 'NGA', 578: 'NOR', 586: 'PAK', 604: 'PER', 608: 'PHL',
  616: 'POL', 620: 'PRT', 634: 'QAT', 642: 'ROU', 643: 'RUS',
  682: 'SAU', 694: 'SLE', 703: 'SVK', 705: 'SVN', 710: 'ZAF',
  724: 'ESP', 752: 'SWE', 756: 'CHE', 158: 'TWN', 764: 'THA',
  792: 'TUR', 800: 'UGA', 804: 'UKR', 784: 'ARE', 826: 'GBR',
  840: 'USA', 858: 'URY', 862: 'VEN', 704: 'VNM', 887: 'YEM',
  716: 'ZWE', 702: 'SGP', 426: 'LSO', 516: 'NAM', 418: 'LAO',
  496: 'MNG', 524: 'NPL', 422: 'LBN', 440: 'LTU', 428: 'LVA',
  233: 'EST', 756: 'CHE', 703: 'SVK', 578: 'NOR', 208: 'DNK',
};

// ── Projection options ─────────────────────────────────────────────────────────
const PROJECTIONS = [
  { id: 'geoNaturalEarth1', label: 'Natural Earth' },
  { id: 'geoMercator', label: 'Mercator' },
  { id: 'geoEqualEarth', label: 'Equal Earth' },
];

// ── Memoised individual Geography to avoid full re-renders on hover ───────────
const CountryPath = memo(function CountryPath({
  geo,
  country,
  isSelected,
  isHovered,
  activeCategoryHighlight,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  let fill = '#1e293b';
  let stroke = '#334155';
  let strokeWidth = 0.5;
  let opacity = 0.9;

  if (country) {
    fill = country.valuation.category.color;
    stroke = '#0f172a';
    strokeWidth = isSelected ? 2 : 0.6;
    opacity =
      activeCategoryHighlight &&
      country.valuation.categoryKey !== activeCategoryHighlight
        ? 0.18
        : 1;

    if (isHovered || isSelected) {
      stroke = '#ffffff';
      strokeWidth = isSelected ? 2 : 1.5;
    }
  }

  return (
    <Geography
      geography={geo}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      style={{
        default: { opacity, outline: 'none', transition: 'all 0.15s ease' },
        hover: {
          opacity: 1,
          fill: country ? country.valuation.category.color : '#334155',
          filter: country ? 'brightness(1.3)' : 'brightness(1.1)',
          outline: 'none',
          cursor: country ? 'pointer' : 'default',
        },
        pressed: { outline: 'none' },
      }}
      onMouseEnter={(e) => onMouseEnter(e, geo)}
      onMouseLeave={onMouseLeave}
      onClick={() => country && onClick(country)}
    />
  );
});

export default function WorldHeatmap({ countries, onSelectCountry, selectedCountryId }) {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 20]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeCategoryHighlight, setActiveCategoryHighlight] = useState(null);
  const [projection, setProjection] = useState('geoNaturalEarth1');

  // Build lookup by alpha-3
  const countryMap = React.useMemo(() => {
    const map = {};
    countries.forEach((c) => { map[c.id] = c; });
    return map;
  }, [countries]);

  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.5, 8));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.5, 1));
  const handleReset = () => { setZoom(1); setCenter([0, 20]); };

  const handleMoveEnd = useCallback(({ coordinates, zoom: z }) => {
    setCenter(coordinates);
    setZoom(z);
  }, []);

  const handleMouseEnter = useCallback((e, geo) => {
    const numericId = parseInt(geo.id, 10);
    const alpha3 = NUMERIC_TO_ALPHA3[numericId];
    const country = alpha3 ? countryMap[alpha3] : null;
    if (country) {
      setHoveredCountry(country);
      setTooltipPos({ x: e.clientX, y: e.clientY });
    } else {
      setHoveredCountry(null);
    }
  }, [countryMap]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (hoveredCountry) {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    }
  }, [hoveredCountry]);

  const legendItems = [
    { key: 'UNDERVALUED', label: 'Undervalued', range: '< 35', color: '#10b981' },
    { key: 'FAIR', label: 'Fairly Valued', range: '35–62', color: '#f59e0b' },
    { key: 'OVERVALUED', label: 'Overvalued', range: '63–78', color: '#f43f5e' },
    { key: 'EXTREME', label: 'Bubble Risk', range: '> 78', color: '#a855f7' },
  ];

  return (
    <div className="relative glass-panel rounded-2xl p-4 md:p-6 overflow-hidden border border-slate-800 shadow-2xl">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
            Global Valuation Heatmap
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Color-coded equity valuation index per economy. Click any country for full AI market research.
          </p>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Projection switcher */}
          <div className="flex items-center gap-1 bg-slate-900/90 rounded-xl p-1 border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            <select
              value={projection}
              onChange={(e) => setProjection(e.target.value)}
              className="bg-transparent text-slate-300 text-xs py-1 px-1.5 rounded-lg focus:outline-none cursor-pointer"
            >
              {PROJECTIONS.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Zoom buttons */}
          <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-slate-300">
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom badge */}
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900/80 border border-slate-800 px-2 py-1 rounded-lg">
            {zoom.toFixed(1)}×
          </span>
        </div>
      </div>

      {/* ── Map Canvas ── */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-slate-900 bg-slate-950/70"
        style={{ height: '460px' }}
        onMouseMove={handleMouseMove}
      >
        {/* Ocean background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(15,23,42,0.6) 0%, rgba(2,6,23,0.95) 100%)',
          }}
        />

        <ComposableMap
          projection={projection}
          projectionConfig={{ scale: 155, center: [0, 20] }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Subtle graticule */}
          <defs>
            <linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c1a2e" />
              <stop offset="100%" stopColor="#060d1a" />
            </linearGradient>
          </defs>

          <ZoomableGroup
            zoom={zoom}
            center={center}
            onMoveEnd={handleMoveEnd}
            minZoom={0.9}
            maxZoom={8}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const numericId = parseInt(geo.id, 10);
                  const alpha3 = NUMERIC_TO_ALPHA3[numericId];
                  const country = alpha3 ? countryMap[alpha3] : null;
                  const isSelected = selectedCountryId && alpha3 === selectedCountryId;
                  const isHovered = hoveredCountry?.id === alpha3;

                  return (
                    <CountryPath
                      key={geo.rsmKey}
                      geo={geo}
                      country={country}
                      isSelected={isSelected}
                      isHovered={isHovered}
                      activeCategoryHighlight={activeCategoryHighlight}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={onSelectCountry}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* ── Hover Tooltip (fixed to viewport) ── */}
        {hoveredCountry && (
          <div
            className="pointer-events-none fixed z-50 glass-modal rounded-xl p-3 shadow-2xl border border-slate-700/80 w-64 text-left"
            style={{
              left: `${Math.min(tooltipPos.x + 16, window.innerWidth - 280)}px`,
              top: `${Math.max(tooltipPos.y - 10, 10)}px`,
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{hoveredCountry.flag}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{hoveredCountry.name}</h4>
                  <p className="text-[11px] text-slate-400">{hoveredCountry.benchmarkIndex}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${hoveredCountry.valuation.category.bgClass}`}
              >
                {hoveredCountry.valuation.category.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Valuation Score</span>
                <span className="text-sm font-bold text-white">
                  {hoveredCountry.valuation.score}{' '}
                  <span className="text-[10px] text-slate-500">/ 100</span>
                </span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Shiller CAPE</span>
                <span className="text-sm font-bold text-emerald-400">
                  {hoveredCountry.metrics.cape}x
                </span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Trailing P/E</span>
                <span className="text-sm font-bold text-slate-200">
                  {hoveredCountry.metrics.pe}x
                </span>
              </div>
              <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Div Yield</span>
                <span className="text-sm font-bold text-amber-400">
                  {hoveredCountry.metrics.divYield}%
                </span>
              </div>
            </div>

            <div className="mt-2 text-[10px] text-blue-400 flex items-center justify-between font-medium pt-1 border-t border-slate-800/60">
              <span>Click for AI Research Report</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* ── Coverage badge ── */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-600 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800/60 pointer-events-none">
          {countries.length} markets tracked
        </div>
      </div>

      {/* ── Legend & Category Filters ── */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Valuation Scale:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {legendItems.map((cat) => {
            const count = countries.filter(
              (c) => c.valuation.categoryKey === cat.key
            ).length;
            const isHighlighted = activeCategoryHighlight === cat.key;

            return (
              <button
                key={cat.key}
                onMouseEnter={() => setActiveCategoryHighlight(cat.key)}
                onMouseLeave={() => setActiveCategoryHighlight(null)}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border transition-all ${
                  isHighlighted
                    ? 'bg-slate-800 border-white text-white scale-105 shadow-md'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span>
                  {cat.label}{' '}
                  <span className="text-slate-500">({cat.range})</span>
                </span>
                <span className="bg-slate-800 px-1.5 rounded-full text-[10px] text-slate-400 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
