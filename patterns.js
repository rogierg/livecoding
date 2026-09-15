// @title Patterns

// ARPEGGIO
$: note("[0 1 3 5]".add(62))                           // boring
  //note("[0 3 7 10]".add(62))                          // +2 more interesting
  //note("[~ 0 ~ 3 ~ 7 ~ 10]".add(62))                  // add rests
  //note("[~ 0 ~ 5 ~ 8 ~ 12]".add(62))                  // musical
  //note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62)) // alternates every 4 bars
  .sound("supersaw")
  .attack(0.01)
  .decay(0.5)
  .release(0.1)
  ._pianoroll({height: 200})