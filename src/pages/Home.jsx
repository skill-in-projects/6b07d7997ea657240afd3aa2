import { Link } from 'react-router-dom'
import Pip from '../components/Pip.jsx'
import { outfitFor } from '../game/content.js'
import { useProgress } from '../game/useProgress.js'

export default function Home() {
  const { stars, stickers } = useProgress()

  return (
    <main className="page">
      <h1>{"Pip's Animal Friends"}</h1>
      <Pip outfit={outfitFor(stars).icon} />
      <p className="bubble">{"Hi! I'm Pip. Let's play with animals!"}</p>
      <p className="stats">⭐ {stars} stars · 🏅 {stickers.length} stickers</p>
      <p className="note">Not saved yet: upgrade to keep your changes</p>
      <Link className="btn big-btn" to="/play">Start playing</Link>
      <Link className="btn ghost" to="/stickers">Sticker book</Link>
    </main>
  )
}
