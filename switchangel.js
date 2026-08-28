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

const basslineBase = n("<3@3 4 5 @3 6>*2".add("-14, -21")).scale("g:minor")
  .s("supersaw")
  .trancegate(1.5,45,1).o(2)
  .seg(16)
  .lpenv(2)

// FILTER VARIANTS
const leadIntro     = leadBase.rlpf(saw.range(0.2, 0.8).slow(8))  // opens over 8 bars
const leadFull      = leadBase.rlpf(0.8)
const leadBreakdown = leadBase.rlpf(saw.range(0.8, 0.5).slow(4)) // closes but stays somewhat open
const leadClosed    = leadBase.rlpf(0.4)
const leadBuild     = leadBase.rlpf(saw.range(0.4, 0.8).slow(8))  // opens over 8 bars (with bass)

const basslineFull      = basslineBase.rlpf(0.75)
const basslineBreakdown = basslineBase.rlpf(saw.range(0.75, 0.4).slow(4))

const snareFadeIn = s("rolandtr909_sd*16").decay(0.2).gain(saw.range(0, 1).slow(4))

// ARRANGEMENT
// Edit cycle counts to change section lengths (in bars)
lead$: arrange(
  [8, leadIntro],      // intro: filter sweeps open, lead solo
  [8, leadFull],       // drop 1: full
  [4, leadBreakdown],  // breakdown: filter closes
  [8, leadClosed],     // rebuild: bass + closed lead
  [8, leadBuild],      // build: filter opens, kick enters when done
  [8, leadFull],       // drop 2
)

kick$: arrange(
  [8, silence],        // intro
  [8, kick],           // drop 1
  [4, silence],        // breakdown
  [8, silence],        // rebuild
  [4, silence],        // build: snare rolls in
  [4, kick],           // build: kick drops when snare done
  [8, kick],           // drop 2
)

bassline$: arrange(
  [8, silence],              // intro
  [8, basslineFull],         // drop 1
  [4, basslineBreakdown],    // breakdown: filter closes, bass stays
  [8, basslineFull],         // rebuild: bass carries
  [8, basslineFull],         // build: bass carries
  [8, basslineFull],         // drop 2
)

snare$: arrange(
  [28, silence],             // intro + drop 1 + breakdown + rebuild (8+8+4+8)
  [4, snareFadeIn],          // build: fades in on 16ths
  [12, silence],             // kick drops, snare gone (4 + drop 2)
)
