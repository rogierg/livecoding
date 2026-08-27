// @title Patterns
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

setCpm(135/4)

// ARPEGGIO
$: note("[~ <d4 ds4> ~ g4 ~ bb4 ~ <d5 ds5>]")
  .sound("gm_lead_2_sawtooth")
  .decay(0.1)
  .sustain(0)
  .rlpf(slider(0.657499999999999, 0.05, 0.95))
  .room(0.6)
  // .delay(0.8)
  // .delaytime(1/3)
  // .delayfeedback(0.6)
  .orbit(2)
