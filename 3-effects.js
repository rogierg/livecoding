// @title 3. Effects
// @by Electronic Samurai

// ARPEGGIO — with effects
$: note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62))
  .sound("gm_lead_2_sawtooth")
  .attack(0.01)
  .decay(0.5)
  .release(0.1)
  .rlpf(slider(0.5, 0.05, 0.95))
  //.rlpf(sine.range(0.5, 0.7).slow(8))               // LFO on resonant filter — movement
  //.room(0.6)                                        // reverb
  //.delay(0.8).delaytime(1/3).delayfeedback(0.6)     // delay
  //.tremsync(12).tremoloshape("square")               // rhythmic chopper on 8ths
  ._pianoroll({height: 200})
