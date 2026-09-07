// @title SwitchAngel
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

//samples('http://localhost:5432')
setCpm(140/4)

// BASE PATTERNS (no filter)
const leadBase = n("0@2 <-7 [-5 -2]>@3 <0 -3 2 1>@3".add(7)
  .add("<5 4 0 <0 2>>"))
  .scale("g:minor")
  .s("supersaw").trancegate(1.5,45,1).o(3)
  .delay(.7).pan(rand)
  .lpenv(2)._pianoroll()

const kick = s("rolandtr909_bd:2!4")._scope()

const snareFadeIn = s("rolandtr909_sd*16").decay(0.2).gain(saw.range(0, 1).slow(4))
const hats        = s("[rolandtr909_hh rolandtr909_hh](3,8)").gain(0.5)
  .delay(0.5).delaytime(1/3).delayfeedback(0.3)
const openHats    = s("~ rolandtr909_oh").fast(4).gain(0.5).decay(0.08)

const basslineBase = n("<3@3 4 5 @3 6>*2".add("-14, -21")).scale("g:minor")
  .s("supersaw")
  .trancegate(1.5,45,1).o(2)
  .seg(16)
  .lpenv(2)

// CHORDS (progression = 8 bars: 4 chords × slow(2))
const chordsBase = chord("<Gm7 Eb^7 Cm7 Dm7>").dict('ireal')
  .voicing()
  .s("supersaw")
  .slow(2).seg(16)
  .detune(0.2)
  .room(3).size(0.95)
  .gain(0.5)
  .orbit(5)

const chordsFull    = chordsBase.rlpf(0.8)
const chordsGated   = chordsBase.rlpf(0.8).trancegate(1.5, 45, 1).room(0)
const chordsOpening = chordsBase.rlpf(saw.range(0.4, 0.8).slow(8))

// FILTER VARIANTS
const leadIntro     = leadBase.rlpf(saw.range(0.2, 0.8).slow(8))
const leadFull      = leadBase.rlpf(0.8)
const leadBreakdown = leadBase.rlpf(saw.range(0.8, 0.4).slow(8))  // closes over first 8 bars of break
const leadClosed    = leadBase.rlpf(0.4)

const basslineFull      = basslineBase.rlpf(0.75)
const basslineBreakdown = basslineBase.rlpf(saw.range(0.75, 0.4).slow(8))

// ARRANGEMENT (total: 8+8+8+8+16+8 = 56 bars)
// Drop 1c: lead filter closes
// Break = 16 bars: chords open (8, no bass), chords open + bass + snare (8)
lead$: arrange(
  [8,  leadIntro],      // intro: filter sweeps open, lead solo
  [8,  leadFull],       // drop 1a: kick only
  [8,  leadFull],       // drop 1b: closed hats
  [8,  leadBreakdown],  // drop 1c: lead filter closes
  [8,  leadClosed],     // break pt 1: chords open up, no bass
  [8,  leadClosed],     // break pt 2: chords open, bass returns, snare
  [8,  leadFull],       // drop 2
)

kick$: arrange(
  [8,  silence],        // intro
  [8,  kick],           // drop 1a
  [8,  kick],           // drop 1b
  [8,  kick],           // drop 1c
  [16, silence],        // break
  [8,  kick],           // drop 2
)

bassline$: arrange(
  [8,  silence],             // intro
  [8,  basslineFull],        // drop 1a
  [8,  basslineFull],        // drop 1b
  [8,  basslineFull],        // drop 1c
  [8,  silence],             // break pt 1: silent while chords open
  [8,  basslineFull],        // break pt 2: returns with snare
  [8,  basslineFull],        // drop 2
)

hats$: arrange(
  [16, silence],               // intro + drop 1a
  [8,  hats],                  // drop 1b: closed hats euclidean
  [8,  stack(hats, openHats)], // drop 1c: closed + open hats
  [16, silence],               // break
  [8,  stack(hats, openHats)], // drop 2
)

crash$: arrange(
  [31, silence],             // intro + 1a + 1b + 1c minus last bar
  [1,  s("tr909_cr!4").gain("0.25 0.5 0.75 1")], // 4 crashes on the beat, getting louder
  [24, silence],             // break + drop 2
)

snare$: arrange(
  [44, silence],             // intro + 1a + 1b + 1c + break pt 1 + 4 bars (8*5+4)
  [4,  snareFadeIn],         // break pt 2 last 4 bars: snare rolls in
  [8,  silence],             // drop 2: kick takes over
)

chords$: arrange(
  [8,  silence],             // intro
  [8,  silence],             // drop 1a
  [8,  silence],             // drop 1b
  [8,  silence],             // drop 1c: lead closes
  [8,  chordsOpening],       // break pt 1: chords open from closed, no bass
  [8,  chordsFull],          // break pt 2: fully open, bass + snare
  [8,  chordsGated],         // drop 2: kick in, chords gated
)
