import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import PreferencesPage from './pages/PreferencesPage'
import FinalPage from './pages/FinalPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path = "/final" element={<FinalPage/>}/>
      </Routes>
    </Router>
  )
}
// this is a test
export default App
