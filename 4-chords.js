// @title 4. Chords
// @by Electronic Samurai

// BUILD A CHORD — root, then add intervals one by one
$: note("-7".add(62))
  //note("[-7, 0]".add(62))              // + fifth
  //note("[-7, -4, 0]".add(62))          // + minor third = minor chord
  //note("[-7, -4, 0, 3]".add(62))       // + seventh = Gm7
  .sound("supersaw")
  .slow(4).room(1).gain(0.6)
  ._pianoroll({height: 200})

// CHORD PROGRESSION
_$: note("<[-7,-4,0] [1,5,8]>".add(62))
  .sound("supersaw")
  .slow(4).detune(0.4).room(1).gain(0.6)
  ._pianoroll({height: 200})

// ARPEGGIO — from breakingties, on top of the progression
_$: note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62))
  .sound("gm_lead_2_sawtooth")
  .decay(0.1).sustain(0).room(0.6)
  .delay(0.8).delaytime(1/3).delayfeedback(0.6)
  ._pianoroll({height: 200})
