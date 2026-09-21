// @title 1. Synthesis
// @by Electronic Samurai

// SINGLE NOTE
$: note("[62 ~]")
  .sound("sine")
  //.sound("sawtooth")
  //.sound("triangle")
  //.sound("square")
  //.attack(0.5)
  //.release(0.5)
  .lpf(slider(5000, 100, 5000))
  ._scope({height: 200})

// PIANO — triangle, instant attack, decays quickly; slight pitch drop on strike
_$: note("[62 ~]")
  .sound("triangle")
  .attack(0.001).decay(0.5).release(0.4)
  .lpf(2500)
  ._scope({height: 200})

// STRINGS — sawtooth, slow attack, high sustain; gentle pitch swell as bow catches
_$: note("[62 ~]")
  .sound("sawtooth")
  .attack(0.2).decay(0.1).sustain(0.9).release(0.6)
  .lpf(900)
  .jux(x => x.detune(15))
  ._scope({height: 200})

// GUITAR — sawtooth, instant attack, fast decay; sharp pitch bend that settles (plucked)
_$: note("[62 ~]")
  .sound("sawtooth")
  .attack(0.001).decay(0.25).sustain(0).release(0.1)
  .penv(3).pdecay(0.12)
  .lpf(3500)
  ._scope({height: 200})

// KICK — sine, instant attack, fast decay; big pitch drop from high to low (the "thump")
_$: note("[62 ~]")
  .sound("sine")
  .attack(0.001).decay(0.3).sustain(0).release(0.1)
  .penv(24).pdecay(0.08).pcurve(1)
  ._scope({height: 200})
