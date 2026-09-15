// @title Breaking Ties
// LIVE BUILD-UP ORDER:
// 1. Kick only
// 2. Chord stabs on beat 1 and 2
// 3. Choir pad comes in
// 4. Trance bass (dum dadumdum)
// 5. Arpeggio
// == CAN START BREAKDOWN FROM HERE ==
// Enable trancegate on chords, filter down arpeggio, kill bass, etc.

// LOAD PREBAKE SCRIPT
await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

// samples('http://localhost:5432')
samples('github:bubobubobubobubo/dough-waveforms')
samples('github:rogierg/livecoding')

setCpm(135/4)

// STEP 1: KICK
$: s("rolandtr909_bd:2!4").gain(1.2)._scope().orbit(0)
$: s("[rolandtr909_hh rolandtr909_hh](3,8)").gain(0.5)
  .delay(0.5).delaytime(1/3).delayfeedback(0.3)
_$:s("~ rolandtr909_oh").fast(4).gain(0.5).decay(0.08)

// STEP 2: CHORD STABS — hits on beat 1 and 2, enable by removing _
_$: chord("<Gm7 Eb^7 BbM7 D7>").dict('ireal')
  .voicing()
  .s("supersaw")
  .decay(0.1)
  .sustain(0)
  .slow(4).struct("[~ 1][~ [1 1]] ~ ~")
  .detune(0.4)
  .rlpf(slider(0.550399999999999, 0.05, 0.95))
  .room(1)
  .gain(0.6)
  .orbit(1)

// STEP 3: CHOIR PAD — soft layer, enable by removing _
_$: chord("<Gm7 Eb^7 BbM7 D7>").dict('ireal')
  .voicing()
  .s("wt_stringbox:7")
  .rhpf(slider(0.05, 0.05, 0.95))
  .slow(4).seg(16)
  .room(2)
  .gain(0.35)
  .orbit(4)

// STEP 4: TRANCE BASS — dum dadumdum, enable by removing _
_$: n("<3@3 4 5 @3 6>".add("-14, -21")).scale("D4:phrygian")
  .s("z_sawtooth")
  .decay(0.2)
  .sustain(0)
  .trancegate(1.5, 45, 1)
  .struct("[1@2 1 1]*4")
  .lpenv(2)
  .rlpf(slider(0.28885, 0.05, 0.9))
  .orbit(3)

// STEP 5: ARPEGGIO — enable by removing _
_$: note("[~ <0!4 1!4> ~ 5 ~ 8 ~ <12!4 13!4>]".add(62))
  .sound("gm_lead_2_sawtooth")
  .decay(0.1)
  .sustain(0)
  .rlpf(slider(0.738499999999999, 0.05, 0.95))
  //.rlpf(sine.range(0.5, 0.8).slow(8))
  .room(0.6)
  .delay(0.8)
  .delaytime(1/3)
  .delayfeedback(0.6)
  .orbit(2)

// VOCALS — each sample plays for 4 bars in order, enable by removing _
_$: s("<1_windblows 2_tothebone 3_youknow 4_notalone>")
  .slow(4)
  .room(0.6)
  .rhpf(slider(0.4199, 0.05, 0.95))
  .gain(0.8)

// == BREAKDOWN IDEAS ==
// - add .trancegate(1.5, 45, 1) to chords
// - filter arpeggio down with slider
// - disable bass (_$:)
// - disable chord stabs (_$:)
