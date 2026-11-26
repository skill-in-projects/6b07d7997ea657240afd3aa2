# Pip's Animal Friends: project notes

## What the app is for
A simple web game that helps kids aged 6 to 9 (Hebrew speakers, beginner English) learn English words by playing with Pip, a friendly fox buddy. Each session takes 3 to 5 minutes.

## Screens
- Home (/): Pip, star and sticker counts, Start playing button.
- Play (/#/play): one session of 9 questions in 3 mini-games on the animals theme.
  - Find the picture: Pip says a word, the kid taps the matching picture.
  - Finish the sentence: "This is a ___." with word buttons.
  - Answer Pip: typed answer to "What sound does a dog make?".
  - Each word has a Hebrew hint (button) and can be heard again (Hear it).
  - Ends with "Great job! See you tomorrow!", stars and a new sticker.
- Sticker book (/#/stickers): the 8 animal stickers, collected ones shown.

## Rules built in
- Pip speaks short English and never says "wrong"; mistakes are corrected by repeating the right word.
- Two tries per question, then Pip shows the right answer.
- Difficulty: 2 misses in a row = easier (fewer choices); 3 correct in a row = harder (up to 4 choices).
- Stars: 1 per correct answer. Pip gets outfits at 5 (scarf), 10 (top hat) and 15 (crown) stars.
- No timers, no penalties for missed days, no login, no personal data.
- Pip only uses the scripted lines in the app. There is no free chat, so nothing off-topic can be asked of it.

## API endpoints
None. The app does not call the backend yet.

## Trial: progress kept in page memory only
Nothing is saved yet. These screens hold progress in the page only, lost on reload:
- Home: star and sticker totals (ProgressProvider in src/game/).
- Play: session stars, the session's new sticker and outfit message.
- Sticker book: collected stickers.
After upgrading, switch ProgressProvider to real saving so stars and stickers persist. The "Not saved yet" labels go away then.

## Decisions so far
- One theme only (animals). More themes come later.
- Typed answers only. Spoken answers (speech recognition) not built yet.
- Speech uses the device's English voice (Web Speech API); sounds are simple tones.
