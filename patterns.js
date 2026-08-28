// @title Patterns
// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// ARPEGGIO
$: n("[0 1 2 3]")              // +1 +1 +1 boring
  //n("[0 2 4 6]")             // +2 +2 +2 more interesting
  //n("[~ 0 ~ 2 ~ 4 ~ 6]")    // add rests
  //n("[~ 0 ~ 3 ~ 5 ~ 7]")                    // +3 +2 +2 musical
  //n("[~ <0!4 1!4> ~ 3 ~ 5 ~ <7!4 8!4>]")  // alternates every 4 bars
  .scale("D4:minor")
  .sound("piano")
  .attack(0.01)
  .decay(0.5)
  .release(0.1)
  // EFFECTS — uncomment one at a time
  //.rlpf(slider(0.87, 0.05, 0.95)) // filter
  //.room(0.6)                       // reverb
  //.delay(0.5).delaytime(1/3).delayfeedback(0.5) // delay
  .orbit(0)
  ._pianoroll()
