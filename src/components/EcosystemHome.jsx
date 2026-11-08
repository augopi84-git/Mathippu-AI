import { ArrowRight, Blocks, ChartNoAxesCombined, ChevronRight, Network, Sparkles } from 'lucide-react';

const applications = [
  {
    name: 'Value AI',
    description: 'Global equity valuation, market radar and AI-powered investment research.',
    icon: ChartNoAxesCombined,
    active: true,
  },
  {
    name: 'Prism AI',
    description: 'Intelligent financial modelling and scenario planning.',
    icon: Blocks,
    active: false,
  },
  {
    name: 'Network AI',
    description: 'Connected knowledge discovery and decision intelligence.',
    icon: Network,
    active: false,
  },
  {
    name: 'Future App',
    description: 'A new intelligent workspace joining the Mathippu ecosystem.',
    icon: Sparkles,
    active: false,
  },
];

export default function EcosystemHome() {
  const launchValueAI = () => {
    window.location.hash = '/value-ai';
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ecosystem-home min-h-screen overflow-hidden bg-[#0b1220] text-white">
      <a
        href="#platform"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-slate-950"
      >
        Skip to main content
      </a>
      <header className="relative z-20 border-b border-white/[0.07] bg-[#0b1220]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="#" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
            <img
              src="./mathippu-ai-logo-44.jpg"
              alt=""
              width="44"
              height="44"
              decoding="async"
              className="h-11 w-11 rounded-lg object-contain bg-white/95 p-1"
            />
            <span className="text-lg font-semibold tracking-tight">Mathippu AI</span>
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <button onClick={() => scrollTo('platform')} className="transition-colors hover:text-cyan-300">Platform</button>
            <button onClick={() => scrollTo('solutions')} className="transition-colors hover:text-cyan-300">Solutions</button>
            <a href="#docs" className="transition-colors hover:text-cyan-300">Docs</a>
          </nav>

          <button
            onClick={launchValueAI}
            className="rounded-lg border border-cyan-400/60 bg-cyan-400/[0.07] px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition-all duration-100 hover:border-cyan-300 hover:bg-cyan-400/[0.12] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Log In
          </button>
        </div>
      </header>

      <main>
        <section id="platform" className="relative isolate px-5 pb-24 pt-20 text-center md:px-8 md:pt-28">
          <div className="ecosystem-grid absolute inset-x-0 top-0 -z-20 h-[520px] opacity-45" />
          <div className="absolute left-1/2 top-20 -z-10 h-72 w-[min(90vw,760px)] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[100px]" />

          <div className="mx-auto max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-xs font-medium text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
              AI ecosystem for intelligent decisions
            </div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl md:text-7xl">
              One Suite. Infinite
              <span className="ecosystem-gradient block pb-2">Intelligent Solutions.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Accelerate your workflows with a centralized ecosystem of powerful AI applications.
            </p>

            <div className="ecosystem-network relative mx-auto mt-14 h-[210px] max-w-3xl md:h-[260px]" aria-hidden="true">
              <div className="network-core absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((node) => (
                <span key={node} className={`network-node network-node-${node + 1}`} />
              ))}
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <span key={line} className={`network-stream network-stream-${line + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <section id="solutions" className="relative mx-auto max-w-7xl px-5 pb-24 md:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Mathippu ecosystem</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Our Applications</h2>
            </div>
            <span className="hidden text-sm text-slate-400 sm:block">One identity. Many intelligent tools.</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((application) => {
              const Icon = application.icon;
              return (
                <article
                  key={application.name}
                  className={`ecosystem-app-card relative min-h-[270px] overflow-hidden rounded-2xl border p-5 ${
                    application.active
                      ? 'border-cyan-300/30 bg-gradient-to-br from-slate-800/95 to-slate-900/95 shadow-[0_20px_70px_rgba(8,145,178,0.10)]'
                      : 'border-dashed border-slate-600 bg-slate-900/70'
                  }`}
                >
                  <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl border ${application.active ? 'border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300' : 'border-slate-700 bg-slate-800/50 text-slate-500'}`}>
                    <Icon aria-hidden="true" focusable="false" className="h-5 w-5" />
                  </div>
                  <p className="text-xl font-semibold">{application.name}</p>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{application.description}</p>

                  {application.active ? (
                    <button
                      onClick={launchValueAI}
                      className="mt-7 flex w-full items-center justify-between rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all duration-100 hover:bg-blue-500 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      Launch App
                      <ArrowRight aria-hidden="true" focusable="false" className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Coming Soon
                      <ChevronRight aria-hidden="true" focusable="false" className="h-4 w-4" />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer id="docs" className="border-t border-white/[0.07] px-5 py-7 text-sm text-slate-400 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mathippu AI</span>
          <span>Intelligence, connected.</span>
        </div>
      </footer>
    </div>
  );
}
