// @title 2. Patterns
// @author Electronic Samurai

// ARPEGGIO
$: note("[0 1 2 3]".add(62))                            // mechanical (chromatic)
  //note("[0 2 4 7]".add(62))                            // familiar (major feel)
  //note("[0 3 7 10]".add(62))                           // more interesting
  //note("[~ 0 ~ 5 ~ 8 ~ 12]".add(62))                  // musical (rests add groove)
  //note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62)) // alternates every 4 bars
  .sound("supersaw")
  .attack(0.01)
  .decay(0.5)
  .release(0.1)
  ._pianoroll({height: 200})
