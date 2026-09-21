// @title 0. Intro
// @by Electronic Samurai

// LOAD PREBAKE SCRIPT
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

await samples('github:bubobubobubobubo/dough-waveforms')
await samples('github:rogierg/livecoding')

setCpm(135/4)

// PATTERNS
const kick  = s("rolandtr909_bd:2!4").gain(1.2).orbit(0)._scope()
const hats  = s("[rolandtr909_hh rolandtr909_hh](3,8)").gain(0.5)
              .delay(0.5).delaytime(1/3).delayfeedback(0.3)._scope()

const chords = note("<[g3,d4] [eb4,bb4]>")
  .s("supersaw").decay(0.1).sustain(0)
  .slow(4).struct("[~ 1][~ [1 1]] ~ ~")
  .detune(0.4).rlpf(0.55).room(1).gain(0.6).orbit(1)._scope()

const bass = n("<3@3 4 5 @3 6>".add("-14, -21")).scale("D4:phrygian")
  .s("z_sawtooth").decay(0.2).sustain(0)
  .trancegate(1.5, 45, 1).struct("[1@2 1 1]*4")
  .lpenv(2).rlpf(sine.range(0.3, 0.4).slow(8)).orbit(3)._scope()

const arp = note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62))
  .sound("gm_lead_2_sawtooth").decay(0.1).sustain(0)
  .rlpf(0.74).room(0.6)
  .delay(0.8).delaytime(1/3).delayfeedback(0.6).orbit(2)._scope()

// ARRANGEMENT: 4 drums → 4 + chords → 8 + bass → 16 + arp
kick$:   arrange([4, kick],    [4, kick],    [8, kick],    [32, kick])
hats$:   arrange([4, hats],    [4, hats],    [8, hats],    [32, hats])
chords$: arrange([4, silence], [4, chords],  [8, chords],  [32, chords])
bass$:   arrange([4, silence], [4, silence], [8, bass],    [32, bass])
arp$:    arrange([4, silence], [4, silence], [8, silence], [32, arp])
