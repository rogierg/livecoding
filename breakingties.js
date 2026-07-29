// arpeggio
$: note("[~ <d4!4 ds4!2> ~ g4 ~ bb4 ~ <d5!4 ds5!2>]")
  .sound("piano")
  .decay(0.1)
  .sustain(0)
  .room(0.6)
  .delay(0.5)
  .delaytime(1/8)
  .delayfeedback(0.6)
  .orbit(2)

// strings
$: note("<[g3,bb3,d4] [g3,bb3,eb4]>")
  .sound("gm_tremolo_strings")
  .slow(4)
  .lpf(900)
  .room(2)
  .delay(0.4)
  .delaytime(1/4)
  .delayfeedback(0.4)
  .gain(0.5)
  .orbit(1)

// kick
$: s("[bd]*4").bank("tr909").dec(0.6).shape(0.4).gain(1.3).compressor("-15:40:10:.001:.01").orbit(0)
