import { Link } from 'react-router-dom'
import { ANIMALS } from '../game/content.js'
import { useProgress } from '../game/useProgress.js'

export default function Stickers() {
  const { stickers } = useProgress()

  return (
    <main className="page">
      <h1>Sticker book</h1>
      <p className="stats">
        {stickers.length} of {ANIMALS.length} collected
      </p>
      <div className="sticker-grid">
        {ANIMALS.map((animal) => {
          const got = stickers.includes(animal.emoji)
          return (
            <div key={animal.word} className={`sticker-slot ${got ? '' : 'locked'}`} title={got ? animal.word : 'Not yet'}>
              {got ? animal.emoji : '?'}
            </div>
          )
        })}
      </div>
      <p className="note">Not saved yet: upgrade to keep your changes</p>
      <Link className="btn" to="/">Home</Link>
    </main>
  )
}
