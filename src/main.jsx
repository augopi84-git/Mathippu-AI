import React, { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EcosystemHome from './components/EcosystemHome.jsx'

const App = lazy(() => import('./App.jsx'))

const VALUE_AI_TITLE = 'Value AI — Global Equity Market Valuation Index | Mathippu AI'
const ECOSYSTEM_TITLE = 'Mathippu AI — Connected Intelligence for Financial Decisions'

function setRouteMetadata(isValueAI) {
  document.title = isValueAI ? VALUE_AI_TITLE : ECOSYSTEM_TITLE
}

function SiteRouter() {
  const [route, setRoute] = React.useState(window.location.hash)

  React.useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  const isValueAI = route === '#/value-ai'
  React.useEffect(() => setRouteMetadata(isValueAI), [isValueAI])

  return (
    <Suspense fallback={null}>
      {isValueAI ? <App /> : <EcosystemHome />}
    </Suspense>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteRouter />
  </StrictMode>,
)
