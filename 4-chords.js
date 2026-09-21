// @title 4. Chords
// @by Electronic Samurai

// BUILD A CHORD — root, then add intervals one by one
$: note("g3")
  //note("[g3, d4]")              // + fifth
  //note("[g3, bb3, d4]")         // + minor third = minor chord
  //note("[g3, bb3, d4, f4]")     // + seventh = Gm7
  .sound("supersaw")
  .slow(4)
  .room(1)
  .gain(0.6)
  ._pianoroll({height: 200})

// CHORD PROGRESSION — 4 chords, each 4 bars
_$: note("<[g3,bb3,d4] [eb4,g4,bb4] [bb3,d4,f4] [d4,f4,a4]>")
  .sound("supersaw")
  .slow(4)
  .detune(0.4)
  .room(1)
  .gain(0.6)
  ._pianoroll({height: 200})

// ARPEGGIO — from breakingties, on top of the progression
_$: note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62))
  .sound("gm_lead_2_sawtooth")
  .decay(0.1)
  .sustain(0)
  .room(0.6)
  .delay(0.8).delaytime(1/3).delayfeedback(0.6)
  ._pianoroll({height: 200})
