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

---

## Outline

### 1. Synthesis: Waveforms and Envelopes
Start with a single note and explore the four basic waveforms — sine, square, sawtooth, triangle — with a scope to show the difference visually. Introduce three stages of the envelope (attack, sustain, release) to shape how a sound evolves over time. See [synthesis.js](synthesis.js).

### 2. Patterns
Move to sequences — start with `0 1 2 3` to show how numbers become notes, introduce rests (`~`) to create rhythm, and build up to the full arpeggio. The pianoroll makes the pattern visible. See [patterns.js](patterns.js).

The key insight is in the **intervals between the numbers**, not the numbers themselves:
- `0 1 2 3` — jumps of +1, boring and mechanical
- `0 2 4 6` — jumps of +2, more interesting
- `0 3 5 7` — jumps of +3 +2 +2, this is where it becomes musical

### 3. Filters, Effects and LFOs
Return to synthesis and shape the arpeggio — low-pass filter to add warmth or brightness, reverb for space, delay for echo. Then animate the filter with an LFO (sine/saw signals) to create movement and evolving textures.

### 4. Chords
Introduce a second layer — supersaw chords alongside the arpeggio. Show how harmony works and how multiple patterns stack. Explore transposing to create chord progressions.

### 5. Rhythm
Add the drum section — build a pattern from scratch, swap sounds, and use dynamics to make it hit. See [rhythm.js](rhythm.js).
