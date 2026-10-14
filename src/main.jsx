import React from 'react'
import ReactDOM from 'react-dom/client'
import { Profiler } from 'react'
import App from './app.jsx'
import './app.css'

// PASO 1: Profiler callback para medir render commits
function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  if (actualDuration > 5) {
    // eslint-disable-next-line no-console
    console.log(
      `[Profiler] ${id} | ${phase} | ` +
      `actual: ${actualDuration.toFixed(2)}ms | ` +
      `base: ${baseDuration.toFixed(2)}ms | ` +
      `commit: ${commitTime.toFixed(2)}`
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Profiler id="ChessStoreApp" onRender={onRenderCallback}>
      <App />
    </Profiler>
  </React.StrictMode>
)