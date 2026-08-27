// @title Rythm patterns
// Examples focused on rhythmic ideas using Strudel mini-notation

// 1. LOAD PREBAKE SCRIPT (SwitchAngel helpers)
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// Quick notes:
// - use `setcpm` to change the cycle/tempo.
// - `*` speeds up, `/` slows down, `~` or `-` are rests.
// - `[]` creates subsequences, `<>` forces one-per-cycle alternation.
// - `,` plays patterns in parallel (polyrhythms).
// - `ply`, `off`, and `mask` are useful for rhythmic variation.

// Basic beats
setcpm(90/4)
$: sound("bd hh sd hh").bank("RolandTR909")

// One-per-cycle (keeps tempo constant when adding/removing elements)
$: sound("<bd bd hh bd rim bd hh bd>").bank("RolandTR707")

// Speed up with `*` — short patterns repeated inside a cycle
$: sound("<bd hh rim oh>*8").bank("RolandTR909")

// Rests and syncopation with `~` and nested subsequences
$: sound("bd [~ hh] sd [~ hh]*2, [- cp]*2").bank("RolandTR808")

// Sub-sequences and tuplets
$: sound("bd [hh hh] sd [hh bd] bd - [hh sd]").bank("RolandTR505")

// Polyrhythm example: 3 against 4
setcpm(60)
$: sound("bd*3").bank("RolandTR909").gain(.9)
$: sound("hh*4").bank("RolandTR909").gain(.6)

// Parallel patterns on one line with comma — creates polyrhythms
// left channel: slower bd pattern, right channel: faster hihat
$: sound("bd*3, hh*8").bank("RolandTR707")

// Shuffle/swing feel by offsetting duplicated copies using `.off` and `.add` or by slight delay
$: sound("bd*4, hh*16").bank("RolandTR909")
  .off(1/16, x => x.speed(1))

// Using `ply` to create per-event multiplication (like writing *2 on every element)
$: sound("hh hh, bd rim [~ cp] rim").bank("RolandTR707").ply(2)

// 16-step sequencer imitation (long multiline mini-notation)
setcpm(90/4)
$: sound(`
[-  -  oh - ] [-  -  -  - ] [-  -  -  - ] [-  -  -  - ],
[hh hh -  - ] [hh -  hh - ] [hh -  hh - ] [hh -  hh - ],
[-  -  -  - ] [cp -  -  - ] [-  -  -  - ] [cp -  -  - ],
[bd -  -  - ] [-  -  -  bd] [-  -  bd - ] [-  -  -  bd]
`).bank("RolandTR808")

// Accent patterns with `gain` or `mask`
$: sound("bd*4, [~ sd cp]*2, [~ hh]*4").bank("RolandTR909").gain("[1 0.6 0.8 1]*4")

// Using `n` for sample numbers to alternate samples inside a rhythm
$: n("0 1 0 1").sound("hh").bank("RolandTR909").ply(2)

// Rarely / random variations for humanized beats
$: sound("bd hh sd hh").bank("RolandTR909").rarely(ply("4"))

// Off-beat and ghost notes — small transient events for groove
$: sound("bd ~ sd:1 ~ hh*8").bank("RolandTR707").gain(.8)

// Multi-tempo example: play notes with different slow values (feel like changing subdivisions)
setcpm(60)
$: sound("bd bd bd bd").bank("RolandTR808")
$: sound("hh*16").bank("RolandTR808").slow("0.5,1,1.5")

// Layered groove using stack (drums + percussion)
$: stack(
  sound("bd*4, [- cp]*2").bank("RolandTR707"),
  sound("hh*16").bank("RolandTR909").gain(.5),
  sound("sh sh sh sh").bank("RolandTR707").gain(.3)
)

// Swing by delaying every second 16th using mask and off
setcpm(120/4)
$: sound("hh*16").bank("RolandTR909").mask("[1 0 1 0]*4").off(1/32, x => x)

// Tips: try combining `mask`, `ply`, `off`, `slow` and `fast` to sculpt grooves.
// Save and modify this file during a live coding session to experiment with the feel.
