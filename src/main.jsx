import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import './styles/global.css'

const baseUrl = import.meta.env.BASE_URL || '/'
const routerBaseName = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBaseName}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
