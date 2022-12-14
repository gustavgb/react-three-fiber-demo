import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

const el = document.getElementById('root')
if (el) {
  createRoot(el).render(<App />)
}
