import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Calendar, TrendingUp, History, BarChart2, Filter, Info, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import {
  MONTHLY_HISTORICAL_TRENDS,
  YEARLY_HISTORICAL_TRENDS,
  COUNTRY_BENCHMARK_TRAJECTORIES
} from '../data/historicalTrendData';
import { VALUATION_CATEGORIES } from '../data/countryMarketData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HistoricalTrends() {
  const [timeHorizon, setTimeHorizon] = useState('monthly'); // 'monthly', 'yearly', 'trajectory'
  const [selectedCountryKey, setSelectedCountryKey] = useState('USA');
  const [tableSearch, setTableSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Filtered dataset based on search & category
  const activeDataset = useMemo(() => {
    const list = timeHorizon === 'monthly' ? MONTHLY_HISTORICAL_TRENDS : YEARLY_HISTORICAL_TRENDS;
    return list.filter(item => {
      const label = item.period || item.year;
      const matchesSearch = label.toLowerCase().includes(tableSearch.toLowerCase()) ||
                            (item.macroTheme && item.macroTheme.toLowerCase().includes(tableSearch.toLowerCase()));
      const matchesCategory = categoryFilter === 'ALL' || item.dominantCategory === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [timeHorizon, tableSearch, categoryFilter]);

  // Chart 1: Global Valuation Distribution Over Time
  const distributionChartData = useMemo(() => {
    const rawData = timeHorizon === 'monthly' ? MONTHLY_HISTORICAL_TRENDS : YEARLY_HISTORICAL_TRENDS;
    const labels = rawData.map(d => d.period || d.year);

    return {
      labels,
      datasets: [
        {
          label: 'Undervalued Markets',
          data: rawData.map(d => d.undervaluedCount),
          backgroundColor: '#10b981',
          borderRadius: 4,
        },
        {
          label: 'Fairly Valued (Neutral)',
          data: rawData.map(d => d.fairCount),
          backgroundColor: '#f59e0b',
          borderRadius: 4,
        },
        {
          label: 'Overvalued Markets',
          data: rawData.map(d => d.overvaluedCount),
          backgroundColor: '#f43f5e',
          borderRadius: 4,
        },
        {
          label: 'Bubble / Severe',
          data: rawData.map(d => d.extremeCount),
          backgroundColor: '#a855f7',
          borderRadius: 4,
        },
      ]
    };
  }, [timeHorizon]);

  const distributionChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      y: {
        stacked: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } },
        title: { display: true, text: 'Number of Global Markets', color: '#64748b', font: { size: 11 } }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true, boxWidth: 8 }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12
      }
    }
  };

  // Chart 2: Benchmark Index Trajectory (Index Price vs CAPE)
  const trajectoryData = COUNTRY_BENCHMARK_TRAJECTORIES[selectedCountryKey];
  const trajectoryChartData = useMemo(() => {
    if (!trajectoryData) return null;
    const labels = trajectoryData.history.map(h => h.period);

    return {
      labels,
      datasets: [
        {
          label: `${trajectoryData.benchmark} Index Price`,
          data: trajectoryData.history.map(h => h.indexPrice),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
          yAxisID: 'yIndex',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: 'Shiller CAPE Multiple (x)',
          data: trajectoryData.history.map(h => h.cape),
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0.3,
          yAxisID: 'yCape',
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };
  }, [trajectoryData]);

  const trajectoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { size: 10 } }
      },
      yIndex: {
        type: 'linear',
        position: 'left',
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#60a5fa', font: { size: 10 } },
        title: { display: true, text: 'Index Price Level', color: '#60a5fa', font: { size: 11 } }
      },
      yCape: {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#fbbf24', font: { size: 10 } },
        title: { display: true, text: 'Shiller CAPE (x)', color: '#fbbf24', font: { size: 11 } }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#cbd5e1', font: { size: 11 }, usePointStyle: true }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Section Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <History className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white">Historical Valuation & Index Trend Analytics</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Month-by-Month & Year-by-Year breakdown of global equity valuation cycles (Undervalued, Neutral, Overvalued, Bubble) and benchmark index price trajectories.
          </p>
        </div>

        {/* View Horizon Controls */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setTimeHorizon('monthly')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              timeHorizon === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Month-Wise (2024–2026)
          </button>

          <button
            onClick={() => setTimeHorizon('yearly')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              timeHorizon === 'yearly' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Year-Wise (2018–2026)
          </button>

          <button
            onClick={() => setTimeHorizon('trajectory')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              timeHorizon === 'trajectory' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Country Index Trajectory
          </button>
        </div>
      </div>

      {/* Main Visual Content */}
      {timeHorizon !== 'trajectory' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart (2 cols) */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Global Valuation Distribution Shift ({timeHorizon === 'monthly' ? 'Month-by-Month' : 'Year-by-Year'})
                </h3>
                <p className="text-xs text-slate-400">
                  Total market count categorized by valuation tier across monitored time periods.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Undervalued
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Neutral / Fair
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Overvalued
                </span>
                <span className="flex items-center gap-1 text-purple-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> Bubble
                </span>
              </div>
            </div>

            <div className="h-80 w-full">
              <Bar data={distributionChartData} options={distributionChartOptions} />
            </div>
          </div>

          {/* Side Analytics Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Key Valuation Takeaways
              </div>
              <h4 className="text-lg font-bold text-white mt-1">Current Cycle Context</h4>
              
              <div className="space-y-3 mt-4 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Valuation Peak vs Low</span>
                  <p className="text-slate-200">
                    Average Shiller CAPE peaked at <strong className="text-purple-400">25.8x (2021)</strong> and bottomed at <strong className="text-emerald-400">17.5x (2018)</strong>. Current average stands at <strong className="text-blue-400">23.4x</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Category Ratio Shift</span>
                  <p className="text-slate-200">
                    Undervalued opportunities represent <strong className="text-emerald-400">22%</strong> of markets, Fairly Valued markets at <strong className="text-amber-400">34%</strong>, while Overvalued/Bubble indices account for <strong className="text-rose-400">44%</strong>.
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[11px]">Macro Regime Theme</span>
                  <p className="text-slate-200 font-medium text-amber-300">
                    "Synchronized Central Bank Easing & Tech Earnings Concentration"
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Updated Monthly via Yale Shiller Feed</span>
              <span className="text-blue-400">v2.4.8 Engine</span>
            </div>
          </div>
        </div>
      ) : (
        /* Trajectory Country Selector & Chart */
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                Benchmark Index Price Level vs Shiller CAPE Trajectory
              </h3>
              <p className="text-xs text-slate-400">
                Track historical index appreciation alongside valuation multiple expansion/contraction.
              </p>
            </div>

            {/* Country Trajectory Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {Object.keys(COUNTRY_BENCHMARK_TRAJECTORIES).map(key => {
                const item = COUNTRY_BENCHMARK_TRAJECTORIES[key];
                const isSelected = selectedCountryKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCountryKey(key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                    <span className="text-[10px] opacity-75">({item.benchmark})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-80 w-full">
            {trajectoryChartData && <Line data={trajectoryChartData} options={trajectoryChartOptions} />}
          </div>
        </div>
      )}

      {/* Historical Breakdown Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Historical Valuation Matrix Log
            </h3>
            <p className="text-xs text-slate-400">
              Complete {timeHorizon === 'monthly' ? 'month-by-month' : 'year-by-year'} valuation record archive.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter by year or month..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-xs rounded-xl px-3 py-1.5 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Time Period</th>
                <th className="py-3 px-4 text-center">Undervalued</th>
                <th className="py-3 px-4 text-center">Fairly Valued</th>
                <th className="py-3 px-4 text-center">Overvalued</th>
                <th className="py-3 px-4 text-center">Bubble / Severe</th>
                <th className="py-3 px-4 text-center">Avg CAPE (x)</th>
                <th className="py-3 px-4 text-center">Avg P/E (x)</th>
                <th className="py-3 px-4">Market Cycle / Theme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {activeDataset.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-mono flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {row.period || row.year}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {row.undervaluedCount} markets
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      {row.fairCount} markets
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
                      {row.overvaluedCount} markets
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                      {row.extremeCount} markets
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-200">
                    {row.avgCape}x
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-300">
                    {row.avgPe}x
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {row.macroTheme || row.dominantCategory + ' Market Dominance'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
