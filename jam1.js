let chords = chord("<Cm9 Gm9 Cm9 Gm9>/4").dict('ireal')
stack(
  stack(
      // CHORDS
      chords.offset(-1).voicing().s("gm_epiano1:1")
      .phaser(4).room(.5)
  ),
  stack(
    note("[<c1 g1 eb1 g2>/4](<3 5>,8)")
    .s("bytebeat")
    .lpf(sine.range(400,800).slow(16))
    .lpq(cosine.range(1,6).slow(3))
    .lpenv(sine.mul(4).slow(4))
    .lpd(.2).lpa(.02)
    .ftype('24db')
    .rarely(add(note(12)))
    .room(.2).shape(.3).postgain(.5)
    .superimpose(x=>x.add(note(12)).delay(.4).bpf(1000))
  ),
  stack(
    s("bd*4").dist(1),
    s("hh*16").gain(saw.mul(saw.fast(2))).clip(sine).mask("<1@16>"),
    s("- cp").room(1)
  ).bank('RolandTR909')
)
