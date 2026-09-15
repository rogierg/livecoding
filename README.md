# Live coding: making music with code

## Curious?

We work with code every day, but music is also built on patterns and logical structures. In this live demo I'll show how we can generate music directly in the browser using only code, and how musical ideas like rhythm, harmony, and progression can be expressed through simple logic and repetition.

The patterns file has uncommentable blocks for explaining effects. This is a live demo so typing is kept to a minimum. Patterns will be loaded between major steps which may lead to errors.

---

## What you need

- A PC with a modern browser (Chrome or Firefox recommended)
- Speakers or headphones
- [strudel.cc](https://strudel.cc) — no installation required, runs entirely in the browser

---

## References

- [Strudel Workshop Documentation](strudel-docs.md) — full local copy of the strudel.cc workshop and reference pages
- [strudel-samples.alternet.site](https://strudel-samples.alternet.site) — community-hosted sample packs, load with `samples('github:user/repo')` or direct URL

---

## Outline

### 1. Synthesis: Waveforms and Envelopes
See [synthesis.js](synthesis.js).
- Waveforms
- Envelope: attack, decay, release
- Subtractive synthesis: low-pass filter on sawtooth

### 2. Patterns
See [patterns.js](patterns.js).
- Numbers become notes, `.add(62)` sets the base note (D4), `~` is a rest
- Intervals matter, not the numbers:
  - `0 1 3 5` — boring
  - `0 3 7 10` — more interesting
  - `~ 0 ~ 5 ~ 8 ~ 12` — musical (rests add groove)
  - `~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>` — alternates every 4 bars

### 3. Filters, Effects and LFOs
- Low-pass filter, reverb, delay on the arpeggio
- LFO on the filter for movement

### 4. Chords
- Supersaw chords as a second layer
- Harmony, stacking, chord progressions

### 5. Rhythm
See [rhythm.js](rhythm.js).
- Build a drum pattern, swap sounds, add dynamics
- Euclidean rhythms: `bd(3,8)` = tresillo, `hh(5,8)` = bossa nova, third arg rotates

---

## TODO

- Add a Strudel basics intro (cycles, mini-notation, how the REPL works)
- Move Effects + LFOs to directly after Patterns — introduce filter and LFO before chords, not after
- Move Rhythm to directly after Patterns as well — drum patterns before harmony may flow better
- LFO section: make clear that LFOs add movement — modulating effects over time, not just static values
- Rhythm: explore other algorithmic approaches beyond Euclidean (e.g. polyrhythm, `off`, `struct`)

