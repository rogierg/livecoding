// @title Breaking Ties
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// Load local samples (if you use a local sample server, otherwise Strudel falls back to online defaults)
// samples('http://localhost:5432')

setCpm(135/4)

// 2. ARPEGGIO
$: n("[~ <0!4 1!4> ~ 3 ~ 5 ~ <7!4 8!4>]")
  .scale("D4:phrygian")
  .sound("gm_lead_2_sawtooth")
  .decay(0.1)
  .sustain(0)
  .rlpf(slider(0.657499999999999, 0.05, 0.95))
  .room(0.6)
  .delay(0.8)
  .delaytime(1/3)
  .delayfeedback(0.6)
  .orbit(2)

// 3. SUPERSAW CHORDS — frisson-tuned progression
// Gm7 → Eb^7 (♭VI) → Bb^7 → D7 (V7): Eb and D7 are primary frisson triggers
$: chord("<Gm7 Eb^7 BbM7 D7>").dict('ireal')
  .voicing()
  .s("supersaw")
  .slow(4)
  .seg(16)
  .detune(0.4)
  .rlpf(slider(0.949999999999999, 0.05, 0.95))
  .room(2)
  .delay(0.4)
  .delaytime(1/4)
  .delayfeedback(0.4)
  .gain(0.35)
  .orbit(1)
  //.trancegate(1.5, 45, 1) //uncomment to gate/pump the chords

// 4. OFFBEAT BASS (Optional for extra SwitchAngel trance drive)
$: n("~ 0 ~ 0 ~ 0 ~ 0")
  .add("<-14!4 -13!2>")
  .scale("g:minor")
  .add(note(-12))
  .sound("square")
  .decay(0.2)
  .rlpf(slider(0.4461, 0.05, 0.9))
  .gain(0.7)
  .orbit(3)

$: s("rolandtr909_bd:2!4").gain(1.2)._scope()  .orbit(0)
