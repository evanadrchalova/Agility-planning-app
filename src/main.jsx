import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RecordsView from './RecordsView.jsx'
import AddTrainingView from './AddTrainingView.jsx'
import VoiceNoteView from './VoiceNoteView.jsx'
import WeeklyPlanView from './WeeklyPlanView.jsx'
import InProgressView from './InProgressView.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/records" element={<RecordsView />} />
        <Route path="/add-training" element={<AddTrainingView />} />
        <Route path="/voice-note" element={<VoiceNoteView />} />
        <Route path="/weekly-plan" element={<WeeklyPlanView />} />
        <Route path="/in-progress" element={<InProgressView />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
