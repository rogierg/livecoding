# Live coding: making music with code

## Curious?

We work with code every day, but music is also built on patterns and logical structures. In this live demo I'll show how we can generate music directly in the browser using only code, and how musical ideas like rhythm, harmony, and progression can be expressed through simple logic and repetition.

The patterns file has uncommentable blocks for explaining effects. This is a live demo so typing is kept to a minimum. Patterns will be loaded between major steps which may lead to errors.

---

## Keyboard shortcuts

- `Ctrl+Enter` — run the current code
- `Ctrl+.` — stop all sound

---

## What you need

- A PC with a modern browser (Chrome or Firefox recommended)
- Speakers or headphones
- [strudel.cc](https://strudel.cc) — no installation required, runs entirely in the browser

---

## References

- [Strudel Workshop Documentation](strudel-docs.md) — full local copy of the strudel.cc workshop and reference pages
- [strudel-samples.alternet.site](https://strudel-samples.alternet.site) — community-hosted sample packs, load with `samples('github:user/repo')` or direct URL

## Credits

The vocal samples and song idea in [breakingties.js](breakingties.js) are based on [Breaking Ties by OceanLab](https://open.spotify.com/track/2cdITcC7b0fnoPtI5F2IHk?si=e5808b3b006c47ed).

---

## Outline

### 0. Why live coding?

Different ways of making music give different results. A DAW gives you full control but infinite choices. An instrument gives you feel but takes years to master. Live coding is different: it is structured by nature, which forces focus on patterns and repetition. The constraints are the point — restrictions feed the creative process, and happy accidents happen when the code does something unexpected.

### 1. Synthesis: Waveforms and Envelopes
See [1-synthesis.js](1-synthesis.js).

To make music we need sound.

- Waveforms: how do they sound?
- Envelope: attack, decay, release
- Subtractive synthesis: low-pass filter on sawtooth/squarewave

### 2. Patterns
See [2-patterns.js](2-patterns.js).

Music is basically patterns of sounds.

- Numbers become notes, `.add(62)` sets the base note (D4), `~` is a rest
- Intervals matter, not the numbers:
  - `0 1 2 3` — mechanical (chromatic)
  - `0 2 4 7` — familiar (major feel)
  - `0 3 7 10` — more interesting
  - `~ 0 ~ 5 ~ 8 ~ 12` — musical (rests add groove)
  - `~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>` — alternates every 4 bars

### 3. Filters, Effects and LFOs

Effects and LFO's add movement. The same pattern becomes more interesting.

- Low-pass filter, reverb, delay on the arpeggio
- LFO on the filter for movement

### 4. Chords
- Supersaw chords as a second layer
- Harmony, stacking, chord progressions

### 5. Rhythm

Rythm provides, well, rythm. It is the percussive elements that accompany the sounds.

See [6-rythm.js](6-rythm.js).
- Build a drum pattern, swap sounds, add dynamics
- Euclidean rhythms: `bd(3,8)` = tresillo, `hh(5,8)` = bossa nova, third arg rotates

---

## TODO

- Add a Strudel basics intro (cycles, mini-notation, how the REPL works)
- Explain chords
- Rhythm: explain struct
- Have a way to set everything ready 

## FEEDBACK

- What are notes, why so high, what is a filter
- Why am I listening to stupid sounds: why are we going to do this?
- Show the song we are going to work to
- Can I play along? Or record? No you can't but that helps with restriction comes creativity
- Too fast on the synthesis bit
- Chords maybe a bit more details
- Explain the different types of sounds bassline
- Uncomment lines one at a time

- Suggestion for flow
    - 1st third lot of detail
    - 2nd third this is what you can do (not so much detail)
    - 3rd third let's make a song (add details)

- Add call to action

