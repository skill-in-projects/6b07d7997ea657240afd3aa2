// The animal theme: each word has a picture, a Hebrew hint and the sounds a kid may type.
export const ANIMALS = [
  { word: 'cat', emoji: '🐱', hebrew: 'חתול', answers: ['meow'] },
  { word: 'dog', emoji: '🐶', hebrew: 'כלב', answers: ['woof', 'bark'] },
  { word: 'cow', emoji: '🐮', hebrew: 'פרה', answers: ['moo'] },
  { word: 'frog', emoji: '🐸', hebrew: 'צפרדע', answers: ['ribbit'] },
  { word: 'duck', emoji: '🦆', hebrew: 'ברווז', answers: ['quack'] },
  { word: 'pig', emoji: '🐷', hebrew: 'חזיר', answers: ['oink'] },
  { word: 'horse', emoji: '🐴', hebrew: 'סוס', answers: ['neigh'] },
  { word: 'sheep', emoji: '🐑', hebrew: 'כבשה', answers: ['baa'] },
]

export const PRAISE = ['Yes! Great job!', 'You got it!', 'Super!', 'Well done!']

// Pip gets a new outfit at each star milestone.
export const OUTFITS = [
  { at: 0, icon: '', name: 'No outfit' },
  { at: 5, icon: '🧣', name: 'Scarf' },
  { at: 10, icon: '🎩', name: 'Top hat' },
  { at: 15, icon: '👑', name: 'Crown' },
]

export function outfitFor(stars) {
  return [...OUTFITS].reverse().find((outfit) => stars >= outfit.at)
}

export function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5)
}

// Typed answers are compared as plain lowercase letters only ("Moo!" becomes "moo").
export function normalize(text) {
  return text.toLowerCase().replace(/[^a-z]/g, '')
}
