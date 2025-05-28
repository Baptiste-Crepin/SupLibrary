import { ThemeProvider } from '@emotion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { theme } from './theme.ts'

// async function enableMocking() {
//   const { worker } = await import('./mocks/browser')
//   return worker.start()
// }

// enableMocking().then(() => {
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
// })
