import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Scatter, Radar } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Activity, Filter } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ValuationCharts({ countries, selectedCountry, onSelectCountry }) {
  const [activeTab, setActiveTab] = useState('ranking'); // 'ranking', 'scatter', 'radar'
  const [metricFilter, setMetricFilter] = useState('score'); // 'score', 'cape', 'pe', 'divYield'

  // Sort countries according to active metricFilter
  const sortedCountries = React.useMemo(() => {
    const list = [...countries];
    if (metricFilter === 'cape') {
      return list.sort((a, b) => a.metrics.cape - b.metrics.cape);
    }
    if (metricFilter === 'pe') {
      return list.sort((a, b) => a.metrics.pe - b.metrics.pe);
    }
    if (metricFilter === 'divYield') {
      return list.sort((a, b) => b.metrics.divYield - a.metrics.divYield);
    }
    return list.sort((a, b) => a.valuation.score - b.valuation.score);
  }, [countries, metricFilter]);

  // 1. Bar Chart Data
  const barChartData = {
    labels: sortedCountries.map(c => `${c.flag} ${c.name}`),
    datasets: [
      {
        label: metricFilter === 'score' ? 'Valuation Index (0-100)' :
               metricFilter === 'cape' ? 'Shiller CAPE (x)' :
               metricFilter === 'pe' ? 'Trailing P/E (x)' : 'Dividend Yield (%)',
        data: sortedCountries.map(c => {
          if (metricFilter === 'cape') return c.metrics.cape;
          if (metricFilter === 'pe') return c.metrics.pe;
          if (metricFilter === 'divYield') return c.metrics.divYield;
          return c.valuation.score;
        }),
        backgroundColor: sortedCountries.map(c => c.valuation.category.color),
        borderColor: sortedCountries.map(c => c.id === selectedCountry?.id ? '#ffffff' : c.valuation.category.color),
        borderWidth: sortedCountries.map(c => c.id === selectedCountry?.id ? 2 : 1),
        borderRadius: 6,
        hoverBackgroundColor: '#ffffff'
      }
    ]
  };

  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const country = sortedCountries[context.dataIndex];
            return [
              ` Valuation Index: ${country.valuation.score} / 100 (${country.valuation.category.label})`,
              ` Benchmark: ${country.benchmarkIndex}`,
              ` CAPE Ratio: ${country.metrics.cape}x`,
              ` Trailing P/E: ${country.metrics.pe}x`,
              ` Dividend Yield: ${country.metrics.divYield}%`,
              ` Buffett Indicator: ${country.metrics.buffettIndicator}%`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#f1f5f9', font: { size: 11 } }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onSelectCountry(sortedCountries[index]);
      }
    }
  };

  // 2. Scatter Plot Data (Valuation Score vs 5Y Expected CAGR)
  const scatterData = {
    datasets: [
      {
        label: 'Countries Matrix',
        data: countries.map(c => ({
          x: c.valuation.score,
          y: c.valuation.dynamicCagr,
          country: c
        })),
        backgroundColor: countries.map(c => c.valuation.category.color),
        pointRadius: countries.map(c => c.id === selectedCountry?.id ? 10 : 6),
        pointHoverRadius: 10,
        borderColor: '#ffffff',
        borderWidth: countries.map(c => c.id === selectedCountry?.id ? 3 : 1)
      }
    ]
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 12,
        callbacks: {
          label: (context) => {
            const raw = context.raw;
            const c = raw.country;
            return [
              `${c.flag} ${c.name} (${c.id})`,
              ` Valuation Score: ${raw.x} (${c.valuation.category.label})`,
              ` Expected 5Y Annualized CAGR: ${raw.y}%`,
              ` Shiller CAPE: ${c.metrics.cape}x`,
              ` GDP Growth: ${c.metrics.gdpGrowth}%`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Equity Valuation Index (Cheaper ← 0 - 100 → More Expensive)', color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' },
        min: 0,
        max: 100
      },
      y: {
        title: { display: true, text: 'Expected 5-Year Annualized CAGR (%)', color: '#94a3b8', font: { size: 11 } },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      }
    },
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onSelectCountry(countries[index]);
      }
    }
  };

  // 3. Radar Chart Data for Selected Country vs Global Average
  const targetCountry = selectedCountry || countries[0];
  const globalSubScores = {
    cape: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.cape, 0) / countries.length),
    pe: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.pe, 0) / countries.length),
    forwardPe: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.forwardPe, 0) / countries.length),
    pb: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.pb, 0) / countries.length),
    buffett: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.buffett, 0) / countries.length),
    div: Math.round(countries.reduce((acc, c) => acc + c.valuation.subScores.div, 0) / countries.length)
  };

  const radarData = {
    labels: ['Shiller CAPE', 'Trailing P/E', 'Forward P/E', 'Price to Book', 'Buffett Indicator', 'Yield Expense'],
    datasets: [
      {
        label: `${targetCountry.flag} ${targetCountry.name}`,
        data: [
          targetCountry.valuation.subScores.cape,
          targetCountry.valuation.subScores.pe,
          targetCountry.valuation.subScores.forwardPe,
          targetCountry.valuation.subScores.pb,
          targetCountry.valuation.subScores.buffett,
          targetCountry.valuation.subScores.div
        ],
        backgroundColor: `${targetCountry.valuation.category.color}40`,
        borderColor: targetCountry.valuation.category.color,
        borderWidth: 2.5,
        pointBackgroundColor: targetCountry.valuation.category.color
      },
      {
        label: 'Global Average Benchmark',
        data: [
          globalSubScores.cape,
          globalSubScores.pe,
          globalSubScores.forwardPe,
          globalSubScores.pb,
          globalSubScores.buffett,
          globalSubScores.div
        ],
        backgroundColor: 'rgba(148, 163, 184, 0.15)',
        borderColor: '#94a3b8',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointBackgroundColor: '#94a3b8'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#cbd5e1', font: { size: 12 } }
      }
    },
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        pointLabels: { color: '#cbd5e1', font: { size: 11 } },
        ticks: { display: false, min: 0, max: 100 }
      }
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 border border-slate-800 shadow-2xl flex flex-col justify-between">
      {/* Chart Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'ranking'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Country Ranking
          </button>
          <button
            onClick={() => setActiveTab('scatter')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'scatter'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Valuation vs Return
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'radar'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Metric Radar
          </button>
        </div>

        {/* Filter dropdown for Ranking tab */}
        {activeTab === 'ranking' && (
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 hidden sm:inline">Sort By:</span>
            <select
              value={metricFilter}
              onChange={(e) => setMetricFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500"
            >
              <option value="score">Valuation Index Score</option>
              <option value="cape">Shiller CAPE Ratio</option>
              <option value="pe">Trailing P/E Ratio</option>
              <option value="divYield">Dividend Yield %</option>
            </select>
          </div>
        )}
      </div>

      {/* Chart View Area */}
      <div className="mt-4 w-full h-[380px] md:h-[450px]">
        {activeTab === 'ranking' && (
          <div className="w-full h-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        )}

        {activeTab === 'scatter' && (
          <div className="w-full h-full relative">
            <Scatter data={scatterData} options={scatterOptions} />
            {/* Visual Quadrant Hint */}
            <div className="absolute top-2 left-10 pointer-events-none text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-md">
              🎯 Value Sweet Spot (Cheaper & High Expected CAGR)
            </div>
            <div className="absolute top-2 right-10 pointer-events-none text-[10px] bg-purple-500/10 border border-purple-500/30 text-purple-400 px-2 py-1 rounded-md">
              ⚠️ Premium Multiple (Expensive / Higher Risk)
            </div>
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <div className="text-center mb-2">
              <span className="text-xs text-slate-400">Comparing Sub-Scores for: </span>
              <span className="text-sm font-bold text-white">{targetCountry.flag} {targetCountry.name}</span>
            </div>
            <div className="w-full h-[340px]">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
