// @title Synthesis
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// SINGLE NOTE
$: note("d4")
  .sound("sine")
  .attack(0.5)
  .decay(0.5)
  .orbit(0)
  ._scope()
