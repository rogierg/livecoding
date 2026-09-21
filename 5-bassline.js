// @title 5. Bassline
// @by Electronic Samurai

samples('github:bubobubobubobubo/dough-waveforms')
setCpm(135/4)

// SIMPLE BASS — single repeating note
$: note("g1")
  .s("z_sawtooth")
  .decay(0.2).sustain(0)
  .lpenv(2)
  .rlpf(slider(0.3, 0.05, 0.9))
  ._pianoroll({height: 150})

// STRUCT — syncopation: dum dadumdum
// [1@2 1 1] = long short short, *4 = repeat 4 times per bar
_$: note("g1")
  .s("z_sawtooth")
  .decay(0.2).sustain(0)
  .struct("[1@2 1 1]*4")
  .lpenv(2)
  .rlpf(slider(0.3, 0.05, 0.9))
  ._pianoroll({height: 150})

// TRANCE BASS — full version from breakingties
_$: n("<3@3 4 5 @3 6>".add("-14, -21")).scale("D4:phrygian")
  .s("z_sawtooth")
  .decay(0.2).sustain(0)
  .struct("[1@2 1 1]*4")
  .lpenv(2)
  .rlpf(slider(0.3, 0.05, 0.9))
  ._pianoroll({height: 150})
