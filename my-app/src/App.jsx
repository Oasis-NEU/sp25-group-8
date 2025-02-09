import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<HomePage />} />
        <Route path = "/schedule" element = {<SchedulePage />} />
      </Routes>
    </Router>
  )
}
// this is a test
export default App
