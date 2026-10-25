import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// BoardUI global styles (theme tokens + typography), installed by the
// BoardUI CLI at the project root — see styles/globals.css.
import '@/styles/globals.css'
import './sample.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
