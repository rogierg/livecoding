// @title Rythm patterns
// Examples focused on rhythmic ideas using Strudel mini-notation

// Basic beats
setcpm(130/4)
$: sound("bd hh sd hh").bank("RolandTR909")._pianoroll({height: 150})

// Sub-sequences and tuplets
_$: sound("bd [hh hh] sd [hh bd] bd - [hh sd]").bank("RolandTR505")._pianoroll({height: 150})

// Rarely / random variations for humanized beats
_$: sound("bd hh sd hh").bank("RolandTR909").rarely(ply("4"))._pianoroll({height: 150})

// Off-beat and ghost notes — small transient events for groove
_$: sound("bd ~ sd:1 ~ hh*8").bank("RolandTR707").gain(.8)._pianoroll({height: 150})

// Euclidean rhythms — (hits, steps) distributes hits as evenly as possible
// Classic patterns used in world music and electronic music
_$: sound("bd(3,8)").bank("RolandTR909")._pianoroll({height: 150})          // tresillo — 3 hits over 8 steps
_$: sound("hh(5,8)").bank("RolandTR909")._pianoroll({height: 150})          // bossa nova feel
_$: sound("sd(7,16)").bank("RolandTR909")._pianoroll({height: 150})         // minimal techno snare
_$: sound("bd(3,8), hh(5,8), sd(2,8)").bank("RolandTR909")._pianoroll({height: 150}) // stacked euclidean groove

