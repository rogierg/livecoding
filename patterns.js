// @title Patterns
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// ARPEGGIO
$: n("[~ 0 ~ 3 ~ 5 ~ 7]")
  .scale("D4:minor")
  .sound("piano")
  .attack(0.01)
  .sustain(0.5)
  .release(0.2)
  .orbit(0)
  ._pianoroll()
