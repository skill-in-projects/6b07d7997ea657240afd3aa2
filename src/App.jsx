import { HashRouter, Routes, Route } from 'react-router-dom'
import ProgressProvider from './game/ProgressProvider.jsx'
import Home from './pages/Home.jsx'
import Play from './pages/Play.jsx'
import Stickers from './pages/Stickers.jsx'
import './App.css'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/stickers" element={<Stickers />} />
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}
