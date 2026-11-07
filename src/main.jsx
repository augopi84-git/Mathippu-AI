import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EcosystemHome from './components/EcosystemHome.jsx'

function SiteRouter() {
  const [route, setRoute] = React.useState(window.location.hash)

  React.useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  return route === '#/value-ai' ? <App /> : <EcosystemHome />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteRouter />
  </StrictMode>,
)
