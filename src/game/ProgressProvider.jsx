import { useState } from 'react'
import { ProgressContext } from './progressContext.js'

// Progress lives in page memory only: it resets on reload until saving is turned on after upgrading.
export default function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({ stars: 0, stickers: [] })

  function finishSession(stars, sticker) {
    setProgress((p) => ({
      stars: p.stars + stars,
      stickers: sticker && !p.stickers.includes(sticker) ? [...p.stickers, sticker] : p.stickers,
    }))
  }

  return <ProgressContext.Provider value={{ ...progress, finishSession }}>{children}</ProgressContext.Provider>
}
