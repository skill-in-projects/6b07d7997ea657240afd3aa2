// Sounds and spoken English for the buddy. Both are optional: the game still works without them.
let audio

export function playTone(freq, delay = 0) {
  try {
    if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audio.createOscillator()
    const gain = audio.createGain()
    const start = audio.currentTime + delay
    osc.frequency.value = freq
    osc.connect(gain)
    gain.connect(audio.destination)
    gain.gain.setValueAtTime(0.15, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)
    osc.start(start)
    osc.stop(start + 0.25)
  } catch {
    // No sound available on this device.
  }
}

export function celebrate() {
  playTone(660)
  playTone(880, 0.12)
  playTone(1320, 0.24)
}

export function oops() {
  playTone(196)
  playTone(165, 0.15)
}

export function speak(text) {
  if (!text || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const line = new SpeechSynthesisUtterance(text)
  line.lang = 'en-US'
  line.rate = 0.85
  window.speechSynthesis.speak(line)
}
