// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// Load local samples (if you use a local sample server, otherwise Strudel falls back to online defaults)
// samples('http://localhost:5432')

setCpm(135/4)

// 2. ORIGINAL PIANO ARPEGGIO (Unchanged)
$: note("[~ <d4!4 ds4!2> ~ g4 ~ bb4 ~ <d5!4 ds5!2>]")
  .sound("piano")
  .decay(0.1)
  .sustain(0)
  .room(0.6)
  .delay(0.5)
  .delaytime(1/8)
  .delayfeedback(0.6)
  .orbit(2)

// 3. SUPERSAW STRINGS (With filter + slider & trancegate)
$: note("<[g3,bb3,d4] [g3,bb3,eb4]>")
  .sound("supersaw")             // Changed sound to supersaw
  .slow(4)
  .rlpf(slider(0.8167, 0.05, 0.9)) // Low-pass filter with interactive slider for sweeps!
  .lpenv(1.5)                    // Filter envelope from the prebake script
  // .trancegate(1.5, 45, 1)     // Uncomment if you want to gate/pump the strings
  .room(2)
  .delay(0.4)
  .delaytime(1/4)
  .delayfeedback(0.4)
  .gain(0.4)
  .orbit(1)

// 4. OFFBEAT BASS (Optional for extra SwitchAngel trance drive)
$: n("~ 0 ~ 0 ~ 0 ~ 0")
  .add("<-14!4 -13!2>")
  .scale("g:minor")
  .sound("sawtooth")
  .decay(0.2)
  .lpf(700)
  .gain(0.7)
  .orbit(3)

$: s("rolandtr909_bd:2!4").gain(1.2)._scope()  .orbit(0)
