import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Coins, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { fetchLatestCryptoData } from '../utils/liveDataService';

const DEFAULT_CRYPTO_ASSETS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$62,400',
    marketCap: '$1.2T',
    score: 95,
    expectedReturn: '+12% to +28%',
    thesis: 'Institutional accumulation and supply scarcity continue to support its role as digital reserve capital.',
    tag: 'Store of value'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$3,420',
    marketCap: '$410B',
    score: 92,
    expectedReturn: '+15% to +32%',
    thesis: 'Layer-2 scaling and staking demand make Ethereum the strongest network-level growth engine in crypto.',
    tag: 'Smart money'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '$168',
    marketCap: '$77B',
    score: 88,
    expectedReturn: '+18% to +40%',
    thesis: 'High-throughput applications and ecosystem expansion give it outsized upside in the next bull cycle.',
    tag: 'High-beta growth'
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    price: '$19.4',
    marketCap: '$11B',
    score: 82,
    expectedReturn: '+10% to +22%',
    thesis: 'Oracle infrastructure remains critical for on-chain data connectivity and institutional token adoption.',
    tag: 'Infrastructure'
  }
];

export default function CryptoSection() {
  const [cryptoAssets, setCryptoAssets] = useState(DEFAULT_CRYPTO_ASSETS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLiveCryptoData = async () => {
      try {
        setIsLoading(true);
        const liveAssets = await fetchLatestCryptoData();
        if (isMounted) {
          setCryptoAssets(liveAssets);
          setError('');
        }
      } catch (err) {
        console.error('Failed to load live crypto data:', err);
        if (isMounted) {
          setError('Live crypto feed unavailable right now. Showing the latest cached snapshot.');
          setCryptoAssets(DEFAULT_CRYPTO_ASSETS);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLiveCryptoData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl border border-slate-800 p-5 md:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-amber-400 font-semibold uppercase tracking-[0.18em]">
              <Coins className="w-4 h-4" />
              Crypto Market Section
            </div>
            <h2 className="text-2xl font-bold text-white mt-2">Digital Asset Opportunity Map</h2>
            <p className="text-sm text-slate-400 mt-1">
              A dedicated view for the most liquid crypto assets, combining macro liquidity, network quality, and risk-adjusted upside.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isLoading ? 'Refreshing live pricing...' : 'CoinGecko live feed'}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cryptoAssets.map((asset, index) => (
          <div
            key={asset.symbol}
            className="rounded-2xl border border-slate-800 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-900 p-4 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">#{index + 1} Asset</div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/40 to-slate-950 border border-amber-500/30 flex items-center justify-center text-xs font-black text-white">
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{asset.name}</div>
                    <div className="text-xs text-slate-400">{asset.symbol}</div>
                  </div>
                </div>
              </div>
              <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-bold text-amber-300">
                {asset.score}/100
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Price</span>
              <span className="font-bold text-white">{asset.price}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">Market cap</span>
              <span className="font-bold text-slate-200">{asset.marketCap}</span>
            </div>

            <div className="mt-4 h-2.5 w-full rounded-full bg-slate-950 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                style={{ width: `${asset.score}%` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 text-[11px]">
              <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-amber-300 font-medium">
                {asset.tag}
              </span>
              <span className="font-semibold text-emerald-300">{asset.expectedReturn}</span>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
              <ArrowUpRight className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" />
              <span>{asset.thesis}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-amber-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Macro Drivers</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Liquidity expansion, institutional allocation, and risk-on rotation are still the strongest tailwinds for large-cap crypto assets.
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Coins className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Portfolio Role</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Bitcoin behaves like digital reserve capital while Ethereum and high-conviction altcoins provide growth exposure with higher volatility.
          </p>
        </div>

        <div className="glass-panel rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.18em] font-semibold">Risk Controls</span>
          </div>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Diversify across large-cap leaders, keep position sizing realistic, and combine crypto with equity exposure rather than treating it as a standalone bet.
          </p>
        </div>
      </div>
    </div>
  );
}
