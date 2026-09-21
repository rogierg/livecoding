// @title Rythm patterns
// Examples focused on rhythmic ideas using Strudel mini-notation

// Basic beats
setcpm(130/4)
$: sound("bd hh sd hh").bank("RolandTR909")._pianoroll({height: 150})

// Rarely / random variations for humanized beats
//$: sound("bd hh sd hh").bank("RolandTR909").rarely(ply("4"))._pianoroll({height: 150})

// Off-beat and ghost notes — small transient events for groove
//$: sound("bd ~ sd:1 ~ hh*8").bank("RolandTR707").gain(.8)._pianoroll({height: 150})

// Euclidean rhythms — (hits, steps) distributes hits as evenly as possible
// $: sound("bd(3,8)").bank("RolandTR909")._pianoroll({height: 150})           // tresillo — 3 hits over 8 steps
// $: sound("hh(5,8)").bank("RolandTR909")._pianoroll({height: 150})           // bossa nova hi-hat
// $: sound("~ oh ~ oh ~ oh ~ oh").bank("RolandTR909").decay(0.2)._pianoroll({height: 150})
// $: sound("sd(7,16)").bank("RolandTR909")._pianoroll({height: 150})          // techno snare
