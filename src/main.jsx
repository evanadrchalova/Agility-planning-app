import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RecordsView from './RecordsView.jsx'
import AddTrainingView from './AddTrainingView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/records" element={<RecordsView />} />
        <Route path="/add-training" element={<AddTrainingView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
