import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pip from '../components/Pip.jsx'
import { ANIMALS, PRAISE, outfitFor, shuffle, normalize } from '../game/content.js'
import { celebrate, oops, speak } from '../game/feedback.js'
import { useProgress } from '../game/useProgress.js'

// One session = three mini-games with three words each.
const KINDS = ['picture', 'sentence', 'question']
const PER_KIND = 3
// A kid gets two tries per word; after that Pip shows the right answer.
const MAX_TRIES = 2

const TITLES = { picture: 'Find the picture', sentence: 'Finish the sentence', question: 'Answer Pip' }

function buildSession() {
  return KINDS.flatMap((kind) => shuffle(ANIMALS).slice(0, PER_KIND).map((animal) => ({ kind, animal })))
}

// Level 1 shows 2 choices, level 2 shows 3, level 3 shows 4.
function makeChoices(animal, level) {
  const others = shuffle(ANIMALS.filter((a) => a.word !== animal.word)).slice(0, level)
  return shuffle([animal, ...others])
}

function introFor({ kind, animal }) {
  if (kind === 'picture') return `Find the ${animal.word}!`
  if (kind === 'sentence') return 'Pick the missing word.'
  return `What sound does a ${animal.word} make?`
}

export default function Play() {
  const { stars, stickers, finishSession } = useProgress()
  const [items] = useState(buildSession)
  const [index, setIndex] = useState(0)
  const [level, setLevel] = useState(1)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [tries, setTries] = useState(0)
  const [wrong, setWrong] = useState([])
  const [status, setStatus] = useState('open') // open | right | missed
  const [choices, setChoices] = useState(() => makeChoices(items[0].animal, 1))
  const [typed, setTyped] = useState('')
  const [hint, setHint] = useState(false)
  const [say, setSay] = useState('')
  const [sessionStars, setSessionStars] = useState(0)
  const [summary, setSummary] = useState(null)

  const item = items[index]

  // Pip reads out each new word or question.
  useEffect(() => {
    const line = introFor(items[index])
    setSay(line)
    speak(line)
  }, [index, items])

  function judge(isRight, attempt) {
    const word = item.animal.word
    if (isRight) {
      setStatus('right')
      setSessionStars((s) => s + 1)
      setMisses(0)
      setHits(hits + 1)
      if (hits + 1 >= 3) {
        setLevel(Math.min(3, level + 1))
        setHits(0)
      }
      const praise = PRAISE[index % PRAISE.length]
      setSay(praise)
      speak(praise)
      celebrate()
      return
    }

    oops()
    setWrong((w) => [...w, attempt])
    setHits(0)
    if (misses + 1 >= 2) {
      setLevel(Math.max(1, level - 1))
      setMisses(0)
    } else {
      setMisses(misses + 1)
    }

    const nextTries = tries + 1
    setTries(nextTries)
    if (nextTries >= MAX_TRIES) {
      setStatus('missed')
      const line = item.kind === 'question' ? `Close! Say "${item.animal.answers[0]}".` : `Close! It is a ${word}.`
      setSay(line)
      speak(line)
    } else {
      setSay('Almost! Try again.')
      speak('Almost! Try again.')
    }
  }

  function pick(animal) {
    if (status !== 'open' || wrong.includes(animal.word)) return
    judge(animal.word === item.animal.word, animal.word)
  }

  function check(event) {
    event.preventDefault()
    if (status !== 'open' || !typed.trim()) return
    const clean = normalize(typed)
    judge(item.animal.answers.includes(clean), clean)
  }

  function showHint() {
    setHint(true)
    speak(item.animal.word)
  }

  function next() {
    const nextIndex = index + 1
    if (nextIndex >= items.length) {
      const sticker = ANIMALS.find((a) => !stickers.includes(a.emoji))?.emoji ?? ''
      const levelUp = outfitFor(stars).at !== outfitFor(stars + sessionStars).at
      setSummary({ sticker, levelUp })
      finishSession(sessionStars, sticker)
      return
    }
    setIndex(nextIndex)
    setStatus('open')
    setTries(0)
    setWrong([])
    setTyped('')
    setHint(false)
    setChoices(makeChoices(items[nextIndex].animal, level))
  }

  if (summary) {
    return (
      <main className="page">
        <Pip outfit={outfitFor(stars).icon} happy />
        <h1>Great job! See you tomorrow!</h1>
        <p className="stats">⭐ {sessionStars} stars</p>
        {summary.sticker ? (
          <p className="stats">
            New sticker: <span className="sticker">{summary.sticker}</span>
          </p>
        ) : (
          <p className="stats">You have every sticker!</p>
        )}
        {summary.levelUp && <p className="stats">Pip got a new outfit!</p>}
        <p className="note">Not saved yet: upgrade to keep your changes</p>
        <Link className="btn" to="/stickers">Sticker book</Link>
        <Link className="btn ghost" to="/">Home</Link>
      </main>
    )
  }

  const { animal, kind } = item
  const prompt = kind === 'picture' ? `Find the ${animal.word}` : kind === 'sentence' ? 'This is a ___.' : introFor(item)
  const cardClass = (a) => {
    if (status !== 'open' && a.word === animal.word) return 'is-right'
    return wrong.includes(a.word) ? 'is-wrong' : ''
  }

  return (
    <main className="page">
      <header className="top">
        <Link to="/">⬅ Home</Link>
        <span>⭐ {sessionStars}</span>
        <span>
          {index + 1} / {items.length}
        </span>
      </header>
      <Pip outfit={outfitFor(stars).icon} happy={status === 'right'} />
      <p className="bubble" aria-live="polite">
        {say}
      </p>
      <h2>{TITLES[kind]}</h2>
      <p className="sentence">{prompt}</p>

      {kind === 'picture' && (
        <div className="choices">
          {choices.map((a) => (
            <button
              key={a.word}
              className={`card emoji ${cardClass(a)}`}
              onClick={() => pick(a)}
              disabled={status !== 'open' || wrong.includes(a.word)}
            >
              {a.emoji}
            </button>
          ))}
        </div>
      )}

      {kind === 'sentence' && (
        <>
          <p className="emoji-big">{animal.emoji}</p>
          <div className="choices">
            {choices.map((a) => (
              <button
                key={a.word}
                className={`card word ${cardClass(a)}`}
                onClick={() => pick(a)}
                disabled={status !== 'open' || wrong.includes(a.word)}
              >
                {a.word}
              </button>
            ))}
          </div>
        </>
      )}

      {kind === 'question' && (
        <>
          <p className="emoji-big">{animal.emoji}</p>
          <form className="ask" onSubmit={check}>
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              maxLength={12}
              placeholder="Type here"
              aria-label="Your answer"
              disabled={status !== 'open'}
            />
            <button className="btn" type="submit" disabled={status !== 'open' || !typed.trim()}>
              Check
            </button>
          </form>
        </>
      )}

      <div className="row">
        <button className="btn ghost" onClick={() => speak(say)}>
          🔊 Hear it
        </button>
        {status === 'open' && (
          <button className="btn ghost" onClick={showHint}>
            💡 Hint
          </button>
        )}
        {status !== 'open' && (
          <button className="btn" onClick={next}>
            Next ➡
          </button>
        )}
      </div>
      {hint && (
        <p className="hint" dir="auto">
          {animal.hebrew} = {animal.word}
        </p>
      )}
    </main>
  )
}
