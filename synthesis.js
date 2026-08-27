// @title Synthesis
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// ARPEGGIO
$: note("[~ d4 ~ g4 ~ bb4 ~ d5]")
  .sound("piano")
  .attack(0.01)
  .sustain(0.5)
  .release(0.2)
  .rlpf(slider(0.869899999999999, 0.05, 0.95))
  //.room(0.6)
  //.delay(0.8)
  //.delaytime(1/3)
  //.delayfeedback(0.6)
  .orbit(0)
  ._spectrum({height: 300, width: 800})
