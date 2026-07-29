setcpm(130/4)

// ===== HARMONY (single control point) =====
let chords = chord("<Cm7 Fm7 Abmaj7 G7>").dict('ireal')

// ===== PIANO ARPEGGIO =====
// .n() picks individual chord tones by index (0=root, 1=3rd, 2=5th, 3=7th)
// anchor centers the voicing around a specific note
let piano = chords
  .n("0 2 1 3*2")
  .anchor("C4")
  .voicing()
  .s("piano")
  .gain(0.8)
  .room(0.4)

// ===== STRINGS (pads / chords) =====
let strings = chords
  .voicing()
  .s("gm_synth_strings_1")
  .slow(2)
  .lpf(800)
  .room(0.9)
  .gain(0.6)

// ===== BASS (root note following chord) =====
let bass = n("0")
  .set(chords)
  .mode("root:c2")
  .voicing()
  .s("gm_synth_bass_1")
  .sustain(0.4)
  .gain(0.9)

// ===== DRUMS =====
let drums = stack(
  s("bd bd bd bd"),
  s("~ sd ~ sd"),
  s("hh*8").gain(0.4)
).bank("RolandTR909")

// ===== OUTPUT =====
stack(
  piano,
  strings,
  bass,
  drums
)
