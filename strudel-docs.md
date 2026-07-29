# Strudel Workshop Documentation

Source: https://strudel.cc/workshop/getting-started/

---

## Getting Started

### Welcome

Welcome to the Strudel documentation pages!
You've come to the right place if you want to learn how to make music with code.

### What is Strudel?

With Strudel, you can expressively write dynamic music pieces.
It is an official port of the Tidal Cycles pattern language to JavaScript.
You don't need to know JavaScript or Tidal Cycles to make music with Strudel.
This interactive tutorial will guide you through the basics of Strudel.
The best place to actually make music with Strudel is the [Strudel REPL](https://strudel.cc/).

### What can you do with Strudel?

- live code music: make music with code in real time
- algorithmic composition: compose music using tidal's unique approach to pattern manipulation
- teaching: focussing on a low barrier of entry, Strudel is a good fit for teaching music and code at the same time
- integrate into your existing music setup: either via MIDI or OSC, you can use Strudel as a really flexible sequencer

### Example

```js
// "coastline" @by eddyflux
// @version 1.0
samples('github:eddyflux/crate')
setcps(.75)
let chords = chord("<Bbm9 Fm9>/4").dict('ireal')
stack(
  stack( // DRUMS
    s("bd").struct("<[x*<1 2> [~@3 x]] x>"),
    s("~ [rim, sd:<2 3>]").room("<0 .2>"),
    n("[0 <1 3>]*<2!3 4>").s("hh"),
    s("rd:<1!3 2>*2").mask("<0 0 1 1>/16").gain(.5)
  ).bank('crate')
  .mask("<[0 1] 1 1 1>/16".early(.5))
  , // CHORDS
  chords.offset(-1).voicing().s("gm_epiano1:1")
  .phaser(4).room(.5)
  , // MELODY
  n("<0!3 1*2>").set(chords).mode("root:g2")
  .voicing().s("gm_acoustic_bass"),
  chords.n("[0 <4 3 <2 5>>*2](<3 5>,8)")
  .anchor("D5").voicing()
  .segment(4).clip(rand.range(.4,.8))
  .room(.75).shape(.3).delay(.25)
  .fm(sine.range(3,8).slow(8))
  .lpf(sine.range(500,1000).slow(8)).lpq(5)
  .rarely(ply("2")).chunk(4, fast(2))
  .gain(perlin.range(.6, .9))
  .mask("<0 1 1 0>/16")
)
.late("[0 .01]*4").late("[0 .01]*2").size(4)
```

---

## First Sounds

This is the first chapter of the Strudel Workshop.

### Code Fields

Press `ctrl+enter` to play, change a value and press `ctrl+enter` to update, press `ctrl+.` to stop.

```js
sound("casio")
```

Try out sounds: `insect wind jazz metal east crow casio space numbers`

### Change Sample Number with `:`

One sound can contain multiple samples. Select by appending `:` followed by a number:

```js
sound("casio:1")
```

### Drum Sounds

```js
sound("bd hh sd oh")
```

- `bd` = bass drum
- `sd` = snare drum
- `rim` = rimshot
- `hh` = hi hat
- `oh` = open hihat
- `lt` = low tom
- `mt` = middle tom
- `ht` = high tom
- `rd` = ride cymbal
- `cr` = crash cymbal

Change the drum machine with `bank`:

```js
sound("bd hh sd oh").bank("RolandTR909")
```

Other banks: `AkaiLinn`, `RhythmAce`, `RolandTR808`, `RolandTR707`, `ViscoSpaceDrum`

### Sequences

Play multiple sounds in a sequence by separating with a space:

```js
sound("bd hh sd hh")
```

The longer the sequence, the faster it runs. All content is squished into one **cycle** (2s by default).

### One per cycle with `< .. >`

```js
sound("<bd bd hh bd rim bd hh bd>")
```

Plays only one sound per cycle — tempo stays constant when adding/removing elements.

Speed it up with `*`:

```js
sound("<bd bd hh bd rim bd hh bd>*8")
```

### Setting tempo with `setcpm`

```js
setcpm(90/4)
sound("<bd hh rim hh>*8")
```

`cpm` = cycles per minute. Default is 30 cpm (1 cycle every 2 seconds).

### Rests with `-` or `~`

```js
sound("bd hh - rim - bd hh rim")
```

### Sub-Sequences with `[brackets]`

```js
sound("bd [hh hh] sd [hh bd] bd - [hh sd] cp")
```

### Multiplication

```js
sound("bd hh*2 rim hh*3 bd [- hh*2] rim hh*2")
sound("bd [hh rim]*2 bd [hh rim]*1.5")
sound("bd hh*32 rim hh*16")
```

### Sub-Sub-Sequences with `[[brackets]]`

```js
sound("bd [[rim rim] hh] bd cp")
```

### Play in parallel with comma

```js
sound("hh hh hh, bd casio")
sound("hh hh hh, bd bd, - casio")
sound("hh hh hh, bd [bd,casio]")
```

### Multiple lines with backticks

```js
sound(`bd*2, - cp, 
- - - oh, hh*4,
[- casio]*2`)
```

### Using `n` for sample numbers

```js
n("0 1 [4 2] 3*2").sound("jazz")
```

### Mini-Notation Recap

| Concept | Syntax | Example |
|---|---|---|
| Sequence | space | `sound("bd bd sd hh")` |
| Sample Number | `:x` | `sound("hh:0 hh:1 hh:2 hh:3")` |
| Rests | `- or ~` | `sound("metal - jazz jazz:1")` |
| Alternate | `<>` | `sound("<bd hh rim oh bd rim>")` |
| Sub-Sequences | `[]` | `sound("bd wind [metal jazz] hh")` |
| Sub-Sub-Sequences | `[[]]` | `sound("bd [metal [jazz [sd cp]]]")` |
| Speed up | `*` | `sound("bd sd*2 cp*3")` |
| Parallel | `,` | `sound("bd*2, hh*2 [hh oh]")` |

### Functions

| Name | Description | Example |
|---|---|---|
| `sound` | plays the sound of the given name | `sound("bd sd [- bd] sd")` |
| `bank` | selects the sound bank | `sound("bd sd").bank("RolandTR909")` |
| `setcpm` | sets the tempo in cycles per minute | `setcpm(45); sound("bd sd")` |
| `n` | select sample number | `n("0 1 4 2").sound("jazz")` |

### Examples

```js
// Basic rock beat
setcpm(100/4)
sound("[bd sd]*2, hh*8").bank("RolandTR505")

// Classic house
sound("bd*4, [- cp]*2, [- hh]*4").bank("RolandTR909")

// We Will Rock You
setcpm(81/2)
sound("bd*2 cp").bank("RolandTR707")

// Yellow Magic Orchestra - Firecracker
setcpm(120/2)
sound("bd sd, - - - hh - hh - -, - perc - perc:1*2")
.bank("RolandCompurhythm1000")

// 16-step sequencer imitation
setcpm(90/4)
sound(`
[-  -  oh - ] [-  -  -  - ] [-  -  -  - ] [-  -  -  - ],
[hh hh -  - ] [hh -  hh - ] [hh -  hh - ] [hh -  hh - ],
[-  -  -  - ] [cp -  -  - ] [-  -  -  - ] [cp -  -  - ],
[bd -  -  - ] [-  -  -  bd] [-  -  bd - ] [-  -  -  bd]
`)
```

---

## First Notes

### Play notes with numbers

```js
note("48 52 55 59").sound("piano")
```

### Play notes with letters

```js
note("c e g b").sound("piano")
```

Add flats or sharps:

```js
note("db eb gb ab bb").sound("piano")
note("c# d# f# g# a#").sound("piano")
```

Play in different octaves:

```js
note("c2 e3 g4 b5").sound("piano")
```

### Changing the sound

```js
note("36 43, 52 59 62 64").sound("piano")
```

Try: `gm_electric_guitar_muted`, `gm_acoustic_bass`, `gm_voice_oohs`, `gm_blown_bottle`, `sawtooth`, `square`, `triangle`

Switch between sounds:

```js
note("48 67 63 [62, 58]")
.sound("piano gm_electric_guitar_muted")
```

Stack multiple sounds:

```js
note("48 67 63 [62, 58]")
.sound("piano, gm_electric_guitar_muted")
```

### Slow down with `/`

```js
note("[36 34 41 39]/4").sound("gm_acoustic_bass")
```

`/4` plays the sequence over 4 cycles.

### One per cycle with `< ... >`

```js
note("<36 34 41 39>").sound("gm_acoustic_bass")
```

Note: `<a b c>` = `[a b c]/3`

### Alternating patterns

```js
note("60 <63 62 65 63>")
.sound("gm_xylophone")
```

### Scales

```js
setcpm(60)
n("0 2 4 <[6,8] [7,9]>")
.scale("C:minor").sound("piano")
```

Try scales: `C:major`, `A2:minor`, `D:dorian`, `G:mixolydian`, `A2:minor:pentatonic`, `F:major:pentatonic`

Automate scales:

```js
setcpm(60)
n("<0 -3>, 2 4 <[6,8] [7,9]>")
.scale("<C:major D:mixolydian>/4")
.sound("piano")
```

### Elongate with `@`

```js
note("c@3 eb").sound("gm_acoustic_bass")
```

`@1` is the default. `c@3` means c is 3 units long.

### Replicate with `!`

```js
note("c!2 [eb,<g a bb a>]").sound("piano")
```

### Notes Recap

| Concept | Syntax | Example |
|---|---|---|
| Slow down | `/` | `note("[c a f e]/2")` |
| Alternate | `<>` | `note("c a f <e g>")` |
| Elongate | `@` | `note("c@3 e")` |
| Replicate | `!` | `note("c!3 e")` |

| Name | Description | Example |
|---|---|---|
| `note` | set pitch as number or letter | `note("b g e c").sound("piano")` |
| `scale` | interpret `n` as scale degree | `n("6 4 2 0").scale("C:minor").sound("piano")` |
| `$:` | play patterns in parallel | `$: s("bd sd")` |

### Playing multiple patterns with `$:`

```js
$: note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("gm_synth_bass_1").lpf(800)

$: n(`<
[~ 0] 2 [0 2] [~ 2]
[~ 0] 1 [0 1] [~ 1]
[~ 0] 3 [0 3] [~ 3]
[~ 0] 2 [0 2] [~ 2]
>*4`).scale("C4:minor")
.sound("gm_synth_strings_1")

$: sound("bd*4, [~ <sd cp>]*2, [~ hh]*4")
.bank("RolandTR909")
```

Use `_$:` to mute a part.

---

## First Effects

### Low-pass filter (`lpf`)

```js
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf(800)
```

`lpf` = low pass filter. Low value (~200) = muffled, high value (~5000) = bright.

Pattern the filter:

```js
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth").lpf("200 1000 200 1000")
```

### Vowel

```js
note("<[c3,g3,e4] [bb2,f3,d4] [a2,f3,c4] [bb2,g3,eb4]>")
.sound("sawtooth").vowel("<a e i o>")
```

### Gain

```js
$: sound("hh*16").gain("[.25 1]*4")
$: sound("bd*4,[~ sd:1]*2")
```

### ADSR Envelope

```js
note("c3 bb2 f3 eb3")
.sound("sawtooth").lpf(600)
.attack(.1)
.decay(.1)
.sustain(.25)
.release(.2)
```

- `attack`: time to fade in
- `decay`: time to fade to sustain level
- `sustain`: level after decay
- `release`: time to fade out after note ends

Short notation:

```js
.adsr(".1:.1:.5:.2")
```

### Delay

```js
$: note("[~ [<[d3,a3,f4]!2 [d3,bb3,g4]!2> ~]]*2")
.sound("gm_electric_guitar_muted").delay(.5)
```

`delay("a:b:c")`: a = delay volume, b = delay time, c = feedback

### Room (reverb)

```js
n("<4 [3@3 4] [<2 0> ~@16] ~>")
.scale("D4:minor").sound("gm_accordion:2")
.room(2)
```

### Pan

```js
sound("numbers:1 numbers:2 numbers:3 numbers:4")
.pan("0 0.3 .6 1")
```

### Speed

```js
sound("bd rim [~ bd] rim").speed("<1 2 -1 -2>").room(.2)
```

### Fast and slow

```js
sound("bd*4,~ rim ~ cp").slow(2)
sound("bd*4,~ rim ~ cp").fast(2)
```

Inside Mini-Notation: `fast` = `*`, `slow` = `/`

### Signals (modulation)

```js
sound("hh*16").gain(sine)
```

Basic waveforms: `sine`, `saw`, `square`, `tri`
Random signals: `rand`, `perlin`

Set a range:

```js
sound("hh*16").lpf(saw.range(500, 2000))
```

Change modulation speed:

```js
note("<[c2 c3]*4 [bb1 bb2]*4 [f2 f3]*4 [eb2 eb3]*4>")
.sound("sawtooth")
.lpf(sine.range(100, 2000).slow(4))
```

### Effects Recap

| Name | Example |
|---|---|
| `lpf` | `note("c2 c3").s("sawtooth").lpf("<400 2000>")` |
| `vowel` | `note("c3 eb3").s("sawtooth").vowel("<a e i o>")` |
| `gain` | `s("hh*16").gain("[.25 1]*2")` |
| `delay` | `s("bd rim bd cp").delay(.5)` |
| `room` | `s("bd rim bd cp").room(.5)` |
| `pan` | `s("bd rim bd cp").pan("0 1")` |
| `speed` | `s("bd rim bd cp").speed("<1 2 -1 -2>")` |
| signals | `s("hh*16").gain(saw)` |
| `range` | `s("hh*16").lpf(saw.range(200,4000))` |

---

## Pattern Effects

### Reverse with `rev`

```js
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").rev()
```

### Split left/right with `jux`

```js
n("0 1 [4 3] 2 0 2 [~ 3] 4").sound("jazz").jux(rev)
```

Plays the original on the left and modified version on the right.

### Multiple tempos

```js
note("c2, eb3 g3 [bb3 c4]").sound("piano").slow("0.5,1,1.5")
```

### Add

```js
setcpm(60)
note("c2 [eb3,g3]".add("<0 <1 -1>>"))
.sound("gm_acoustic_bass").room(.5)
```

Adding a number to a note treats the note as a number and shifts it.

Add with scale:

```js
n("0 [2 4] <3 5> [~ <4 1>]".add("<0 [0,2,4]>"))
.scale("C5:minor").sound("gm_xylophone")
```

### Ply

```js
sound("hh hh, bd rim [~ cp] rim").bank("RolandTR707").ply(2)
```

Speeds up each event n times (like writing `*2` on every element).

### Off

```js
n("0 [4 <3 2>] <2 3> [~ 1]"
.off(1/16, x=>x.add(4))
).scale("<C5:minor Db5:mixolydian>/2")
.s("triangle").room(.5)
```

`.off(1/16, x=>x.add(4))`: copy the pattern, offset it by 1/16 of a cycle, and apply `.add(4)` to the copy.

### Pattern Effects Recap

| Name | Description | Example |
|---|---|---|
| `rev` | reverse | `n("0 2 4 6").scale("C:minor").rev()` |
| `jux` | split left/right, modify right | `n("0 2 4 6").scale("C:minor").jux(rev)` |
| `add` | add numbers / notes | `n("0 2 4 6".add("<0 1 2 1>")).scale("C:minor")` |
| `ply` | speed up each event n times | `s("bd sd").ply("<1 2 3>")` |
| `off` | copy, shift time & modify | `s("bd sd, hh*8").off(1/16, x=>x.speed(2))` |

---

## Full Recap

### Mini Notation

| Concept | Syntax | Example |
|---|---|---|
| Sequence | space | `sound("bd bd sd hh bd cp sd hh")` |
| Sample Number | `:x` | `sound("hh:0 hh:1 hh:2 hh:3")` |
| Rests | `~` | `sound("metal ~ jazz jazz:1")` |
| Sub-Sequences | `[]` | `sound("bd wind [metal jazz] hh")` |
| Sub-Sub-Sequences | `[[]]` | `sound("bd [metal [jazz sd]]")` |
| Speed up | `*` | `sound("bd sd*2 cp*3")` |
| Parallel | `,` | `sound("bd*2, hh*2 [hh oh]")` |
| Slow down | `/` | `note("[c a f e]/2")` |
| Alternate | `<>` | `note("c <e g>")` |
| Elongate | `@` | `note("c@3 e")` |
| Replicate | `!` | `note("c!3 e")` |

### Sounds

| Name | Description | Example |
|---|---|---|
| `sound` | plays the sound of the given name | `sound("bd sd")` |
| `bank` | selects the sound bank | `sound("bd sd").bank("RolandTR909")` |
| `n` | select sample number | `n("0 1 4 2").sound("jazz")` |

### Notes

| Name | Description | Example |
|---|---|---|
| `note` | set pitch as number or letter | `note("b g e c").sound("piano")` |
| `n + scale` | set note in scale | `n("6 4 2 0").scale("C:minor").sound("piano")` |
| `$:` | play patterns in parallel | `$: s("bd sd")` / `$: note("c eb g")` |

### Audio Effects

| Name | Example |
|---|---|
| `lpf` | `note("c2 c3").s("sawtooth").lpf("400 2000")` |
| `vowel` | `note("c3 eb3").s("sawtooth").vowel("<a e i o>")` |
| `gain` | `s("hh*16").gain("[.25 1]*4")` |
| `delay` | `s("bd rim bd cp").delay(.5)` |
| `room` | `s("bd rim bd cp").room(.5)` |
| `pan` | `s("bd rim bd cp").pan("0 1")` |
| `speed` | `s("bd rim bd cp").speed("<1 2 -1 -2>")` |
| `range` | `s("hh*32").lpf(saw.range(200,4000))` |

### Pattern Effects

| Name | Description | Example |
|---|---|---|
| `setcpm` | sets tempo in cycles per minute | `setcpm(45); sound("bd sd")` |
| `fast` | speed up | `sound("bd sd").fast(2)` |
| `slow` | slow down | `sound("bd sd").slow(2)` |
| `rev` | reverse | `n("0 2 4 6").scale("C:minor").rev()` |
| `jux` | split left/right, modify right | `n("0 2 4 6").scale("C:minor").jux(rev)` |
| `add` | add numbers / notes | `n("0 2 4 6".add("<0 1 2 1>")).scale("C:minor")` |
| `ply` | speed up each event n times | `s("bd sd").ply("<1 2 3>")` |
| `off` | copy, shift time & modify | `s("bd sd, hh*4").off(1/8, x=>x.speed(2))` |
## Making Sound: Samples


































































Samples

Samples are the most common way to make sound with tidal and strudel.
A sample is a (commonly short) piece of audio that is used as a basis for sound generation, undergoing various transformations.
Music that is based on samples can be thought of as a collage of sound.
Read more about Sampling

Strudel allows loading samples in the form of audio files of various formats (wav, mp3, ogg) from any publicly available URL.

Default Samples

By default, strudel comes with a built-in “sample map”, providing a solid base to play with.

s("bd sd [~ bd] sd,hh*16, misc")

Here, we are using the
s
function to play back different default samples (
bd
,
sd
,
hh
and
misc
) to get a drum beat.

For drum sounds, strudel uses the comprehensive
tidal-drum-machines
library, with the following naming convention:

Drum

Abbreviation

Bass drum, Kick drum

bd

Snare drum

sd

Rimshot

rim

Clap

cp

Closed hi-hat

hh

Open hi-hat

oh

Crash

cr

Ride

rd

High tom

ht

Medium tom

mt

Low tom

lt

original von Pbroks13

More percussive sounds:

Source

Abbreviation

Shakers (and maracas, cabasas, etc)

sh

Cowbell

cb

Tambourine

tb

Other percussions

perc

Miscellaneous samples

misc

Effects

fx

Furthermore, strudel also loads instrument samples from
VCSL
by default.

To see which sample names are available, open the
sounds
tab in the
REPL
.

You can also create custom aliases for existing sounds using the
soundAlias
function:

soundAlias('RolandTR808_bd', 'kick')
s("kick")

Note that only the sample maps (mapping names to URLs) are loaded initially, while the audio samples themselves are not loaded until they are actually played.
This behaviour of loading things only when they are needed is also called
lazy loading
.
While it saves resources, it can also lead to sounds not being audible the first time they are triggered, because the sound is still loading.
This might be fixed in the future

Sound Banks

If we open the
sounds
tab and then
drum-machines
, we can see that the drum samples are all prefixed with drum machine names:
RolandTR808_bd
,
RolandTR808_sd
,
RolandTR808_hh
etc..

We
could
use them like this:

s("RolandTR808_bd RolandTR808_sd,RolandTR808_hh*16")

… but thats obviously a bit much to write. Using the
bank
function, we can shorten this to:

s("bd sd,hh*16").bank("RolandTR808")

You could even pattern the bank to switch between different drum machines:

s("bd sd,hh*16").bank("<RolandTR808 RolandTR909>")

Behind the scenes,
bank
will just prepend the drum machine name to the sample name with
_
to get the full name.
This of course only works because the name after
_
(
bd
,
sd
etc..) is standardized.
Also note that some banks won’t have samples for all sounds!

Selecting Sounds

If we open the
sounds
tab again, followed by tab
drum machines
, there is also a number behind each name, indicating how many individual samples are available.
For example
RolandTR909_hh(4)
means there are 4 samples of a TR909 hihat available.
By default,
s
will play the first sample, but we can select the other ones using
n
, starting from 0:

s("hh*8").bank("RolandTR909").n("0 1 2 3")

Numbers that are too high will just wrap around to the beginning

s("hh*8").bank("RolandTR909").n("0 1 2 3 4 5 6 7")

Here, 0-3 will play the same sounds as 4-7, because
RolandTR909_hh
only has 4 sounds.

Selecting sounds also works inside the mini notation, using “
:
” like this:

s("bd*4,hh:0 hh:1 hh:2 hh:3 hh:4 hh:5 hh:6 hh:7")
.bank("RolandTR909")

Loading Custom Samples

You can load a non-standard sample map using the
samples
function.

Loading samples from file URLs

In this example we assign names
bassdrum
,
hihat
and
snaredrum
to specific audio files on a server:

samples({
bassdrum: 'bd/BT0AADA.wav',
hihat: 'hh27/000_hh27closedhh.wav',
snaredrum: ['sd/rytm-01-classic.wav', 'sd/rytm-00-hard.wav'],
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

s("bassdrum snaredrum:0 bassdrum snaredrum:1, hihat*16")

You can freely choose any combination of letters for each sample name. It is even possible to override the default sounds.
The names you pick will be made available in the
s
function.
Make sure that the URL and each sample path form a correct URL!

In the above example,
bassdrum
will load:

https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/bd/BT0AADA.wav
|----------------------base path --------------------------------|--sample path-|

Note that we can either load a single file, like for
bassdrum
and
hihat
, or a list of files like for
snaredrum
!
As soon as you run the code, your chosen sample names will be listed in
sounds
->
user
.

Loading Samples from a strudel.json file

The above way to load samples might be tedious to write out / copy paste each time you write a new pattern.
To avoid that, you can simply pass a URL to a
strudel.json
file somewhere on the internet:

samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
s("bd sd bd sd,hh*16")

The file is expected to define a sample map using JSON, in the same format as described above.
Additionally, the base path can be defined with the
_base
key.
The last section could be written as:

{
"_base"
:
"https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/"
,
"bassdrum"
:
"bd/BT0AADA.wav"
,
"snaredrum"
:
"sd/rytm-01-classic.wav"
,
"hihat"
:
"hh27/000_hh27closedhh.wav"
}

Please note that browsers will often cache
strudel.json
on first load, and keep using the cached
version even if the orginal has been updated. If this bites you (for example while developing a new
sample pack), you can force the browser to download a new copy by i.e. changing capitalization of one
character in the URL, or adding a URL attribute, such as:

samples
(
'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json?version=2'
);

that gets ignored by GitHub (but changes the URL, forcing the browser to reload every time we increase
the version number).

It is also possible, of course, to just remove it from cache (deleting cache in browser Privacy settings,
or from the dev console if you’re technically minded, or by using a cache deleting extension).

Generating strudel.json

You can use
@strudel/sampler
to generate a strudel.json file for you, by running:

npx
--yes
@strudel/sampler
--json
>
strudel.json

See other uses of strudel/sampler further below, under “From Disk via @strudel/sampler”.

Github Shortcut

Because loading samples from github is common, there is a shortcut:

samples('github:tidalcycles/dirt-samples')
s("bd sd bd sd,hh*16")

The format is
samples('github:<user>/<repo>/<branch>')
. If you omit
branch
(like above), the
main
branch will be used.
It assumes a
strudel.json
file to be present at the root of the repository:

https://raw.githubusercontent.com/<user>/<repo>/<branch>/strudel.json

From Disk via “Import Sounds Folder”

If you don’t want to upload your samples to the internet, you can also load them from your local disk.
Go to the
sounds
tab in the REPL and open the
import-sounds
tab below the search bar.
Press the “import sounds folder” button and select a folder that contains audio files.
The folder you select can also contain subfolders with audio files.
Example:

└─ samples
├─ swoop
│  ├─ swoopshort.wav
│  ├─ swooplong.wav
│  └─ swooptight.wav
└─ smash
├─ smashhigh.wav
├─ smashlow.wav
└─ smashmiddle.wav

In the above example the folder
samples
contains 2 subfolders
swoop
and
smash
, which contain audio files.
If you select that
samples
folder, the
user
tab (next to the
import-sounds
tab) will then contain 2 new sounds:
swoop(3) smash(3)
The individual samples can the be played normally like
s("swoop:0 swoop:1 smash:2")
.
The samples within each sound use zero-based indexing in alphabetical order.

From Disk via @strudel/sampler

Instead of loading your samples into your browser with the “import sounds folder” button, you can also serve the samples from a local file server.
The easiest way to do this is using
@strudel/sampler
:

cd
samples
npx
@strudel/sampler

Then you can load it via:

samples('http://localhost:5432/');

n("<0 1 2>").s("swoop smash")

The handy thing about
@strudel/sampler
is that it auto-generates the
strudel.json
file based on your folder structure.
You can see what it generated by going to
http://localhost:5432
with your browser.

Note: You need
NodeJS
installed on your system for this to work.

Specifying Pitch

To make sure your samples are in tune when playing them with
note
, you can specify a base pitch like this:

samples({
'gtr': 'gtr/0001_cleanC.wav',
'moog': { 'g3': 'moog/005_Mighty%20Moog%20G3.wav' },
}, 'github:tidalcycles/dirt-samples');
note("g3 [bb3 c4] <g4 f4 eb4 f3>@2").s("gtr,moog").clip(1)
.gain(.5)

We can also declare different samples for different regions of the keyboard:

setcpm(60)
samples({
'moog': {
  'g2': 'moog/004_Mighty%20Moog%20G2.wav',
  'g3': 'moog/005_Mighty%20Moog%20G3.wav',
  'g4': 'moog/006_Mighty%20Moog%20G4.wav',
}}, 'github:tidalcycles/dirt-samples')

note("g2!2 <bb2 c3>!2, <c4@3 [<eb4 bb3> g4 f4]>")
.s('moog').clip(1)
.gain(.5)

The sampler will always pick the closest matching sample for the current note!

Note that this notation for pitched sounds also works inside a
strudel.json
file.

Shabda

If you don’t want to select samples by hand, there is also the wonderful tool called
shabda
.
With it, you can enter any sample name(s) to query from
freesound.org
. Example:

samples('shabda:bass:4,hihat:4,rimshot:2')

$: n("0 1 2 3 0 1 2 3").s('bass')
$: n("0 1*2 2 3*2").s('hihat').clip(1)
$: n("~ 0 ~ 1 ~ 0 0 1").s('rimshot')

You can also generate artificial voice samples with any text, in multiple languages.
Note that the language code and the gender parameters are optional and default to
en-GB
and
f

samples('shabda/speech:the_drum,forever')
samples('shabda/speech/fr-FR/m:magnifique')

$: s("the_drum*2").chop(16).speed(rand.range(0.85,1.1))
$: s("forever magnifique").slow(4).late(0.125)

Sampler Effects

Sampler effects are functions that can be used to change the behaviour of sample playback.

begin

end

The same as .begin, but cuts off the end off each sample.

length
(
number|Pattern
):
1 = whole sample, .5 = half sample, .25 = quarter sample etc..

s("bd*2,oh*4").end("<.1 .2 .5 1>").fast(2)

loop

Loops the sample.
Note that the tempo of the loop is not synced with the cycle tempo.
To change the loop region, use loopBegin / loopEnd.

on
(
number|Pattern
):
If 1, the sample is looped

s("casio").loop(1)

loopBegin
Synonyms:
loopb

Begin to loop at a specific point in the sample (inbetween
begin
and
end
).
Note that the loop point must be inbetween
begin
and
end
, and before
loopEnd
!
Note: Samples starting with wt_ will automatically loop! (wt = wavetable)

time
(
number|Pattern
):
between 0 and 1, where 1 is the length of the sample

s("space").loop(1)
.loopBegin("<0 .125 .25>")._scope()

loopEnd
Synonyms:
loope

End the looping section at a specific point in the sample (inbetween
begin
and
end
).
Note that the loop point must be inbetween
begin
and
end
, and after
loopBegin
!

time
(
number|Pattern
):
between 0 and 1, where 1 is the length of the sample

s("space").loop(1)
.loopEnd("<1 .75 .5 .25>")._scope()

cut

In the style of classic drum-machines,
cut
will stop a playing sample as soon as another samples with in same cutgroup is to be played. An example would be an open hi-hat followed by a closed one, essentially muting the open.

group
(
number|Pattern
):
cut group number

s("[oh hh]*4").cut(1)

clip
Synonyms:
legato

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

factor
(
number|Pattern
):
= 0

note("c a f e").s("piano").clip("<.5 1 2>")

loopAt

Makes the sample fit the given number of cycles by changing the speed.

samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes").loopAt(2)

fit

Makes the sample fit its event duration. Good for rhythmical loops like drum breaks.
Similar to
loopAt
.

samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes/2").fit()

chop

Cuts each sample into the given number of parts, allowing you to explore a technique known as 'granular synthesis'.
It turns a pattern of samples into a pattern of parts of samples.

samples({ rhodes: 'https://cdn.freesound.org/previews/132/132051_316502-lq.mp3' })
s("rhodes")
 .chop(4)
 .rev() // reverse order of chops
 .loopAt(2) // fit sample into 2 cycles

striate

Cuts each sample into the given number of parts, triggering progressive portions of each sample at each loop.

s("numbers:0 numbers:1 numbers:2").striate(6).slow(3)

slice

Chops samples into the given number of slices, triggering those slices with a given pattern of slice numbers.
Instead of a number, it also accepts a list of numbers from 0 to 1 to slice at specific points.

samples('github:tidalcycles/dirt-samples')
s("breaks165").slice(8, "0 1 <2 2*2> 3 [4 0] 5 6 7".every(3, rev)).slow(0.75)

samples('github:tidalcycles/dirt-samples')
s("breaks125").fit().slice([0,.25,.5,.75], "0 1 1 <2 3>")

splice

Works the same as slice, but changes the playback speed of each slice to match the duration of its step.

samples('github:tidalcycles/dirt-samples')
s("breaks165")
.splice(8,  "0 1 [2 3 0]@2 3 0@2 7")

scrub

Allows you to scrub an audio file like a tape loop by passing values that represents the position in the audio file
in the optional array syntax ex: "0.5:2", the second value controls the speed of playback

samples('github:switchangel/pad')
s("swpad:0").scrub("{0.1!2 .25@3 0.7!2 <0.8:1.5>}%8")

samples('github:yaxu/clean-breaks/main');
s("amen/4").fit().scrub("{0@3 0@2 4@3}%8".div(16))

speed

Changes the speed of sample playback, i.e. a cheap way of changing pitch.

speed
(
number|Pattern
):
inf to inf, negative numbers play the sample backwards.

s("bd*6").speed("1 2 4 1 -2 -4")

speed("1 1.5*2 [2 1.1]").s("piano").clip(1)

After samples, let’s see what
Synths
afford us.




































---

## Making Sound: Synths


































































Synths

In addition to the sampling engine, strudel comes with a synthesizer to create sounds on the fly.

Basic Waveforms

The basic waveforms are
sine
,
sawtooth
,
square
and
triangle
, which can be selected via
sound
(or
s
):

note("c2 <eb2 <g2 g1>>".fast(2))
.sound("<sawtooth square triangle sine>")
._scope()

If you don’t set a
sound
but a
note
the default value for
sound
is
triangle
!

Noise

You can also use noise as a source by setting the waveform to:
white
,
pink
or
brown
. These are different
flavours of noise, here written from hard to soft.

sound("<white pink brown>")._scope()

Here’s a more musical example of how to use noise for hihats:

sound("bd*2,<white pink brown>*8")
.decay(.04).sustain(0)._scope()

Some amount of pink noise can also be added to any oscillator by using the
noise
paremeter:

note("c3").noise("<0.1 0.25 0.5>")._scope()

You can also use the
crackle
type to play some subtle noise crackles. You can control noise amount by using the
density
parameter:

s("crackle*4").density("<0.01 0.04 0.2 0.5>".slow(2))._scope()

Additive Synthesis

Periodic waveforms are composed of several
harmonics
above a fundamental frequency, lying at integer multiples. These overtones combine to give a sound its unique timbral quality.

For the basic waveforms, we offer you control over these harmonics with the
partials
and
phases
functions.

Partials

partials
refers to the magnitude of each harmonic relative to the fundamental frequency. They can thus be used to spectrally filter these waveforms and tame some of their harshness:

note("c2 <eb2 <g2 g1>>".fast(2))
.sound("sawtooth")
.partials([1, 1, "<1 0>", "<1 0>", "<1 0>", "<1 0>", "<1 0>"])
._scope()

partials
can also be used to construct
new
waveforms not present in our basic set with the ‘user’ sound source:

note("c2 <eb2 <g2 g1>>".fast(2))
.sound("user")
.partials([1, 0, 0.3, 0, 0.1, 0, 0, 0.3])
._scope()

We may algorithmically construct lists of magnitudes with Javascript code like:

const numHarmonics = 22;
note("c2 <eb2 <g2 g1>>".fast(2))
.sound("saw")
.partials(new Array(numHarmonics).fill(1))
._scope()

which acts as a spectral filter. Or:

note("c2 <eb2 <g2 g1>>").fast(2)
.sound("user")
.partials(new Array(50).fill(0)
.map((_, idx) => ((-1) ** (idx + 1)) / (idx + 1))
)
._scope()

which recovers a familiar waveform.

partials
is also compatible with pattern functions designed to produce lists, like
randL
or
binaryL
:

note("c2 <eb2 <g2 g1>>").fast(2)
.sound("user")
.partials(randL(10))
._scope()

and with lists
of
patterns:

note("c2 <eb2 <g2 g1>>".fast(4))
.sound("user")
.partials([1, 0, "0 1", "0 1 0.3", rand])
._scope()

Note that the first value in the
partials
array controls the magnitude of the fundamental harmonic rather than the DC offset, which is fixed at 0.

Phases

Earlier, we mentioned that periodic waveforms can be broken into a set of harmonics above a fundamental frequency. Each harmonic has two defining properties: its magnitude (how loud it is) and its phase, which determines where in its cycle that sine wave starts when the waveform is built.

These phases too can be declared in Strudel and can give your sounds interesting depth.

s("saw").seg(16).n(irand(12)).scale("F1:minor")
.penv(48).panchor(0).pdec(0.05)
.delay(0.25).room(0.25)
.compressor(-20).vib(0.3)
.partials(randL(200))
.phases(randL(200))

Vibrato

vib
Synonyms:
vibrato, v

Applies a vibrato to the frequency of the oscillator.

frequency
(
number|Pattern
):
of the vibrato in hertz

note("a e")
.vib("<.5 1 2 4 8 16>")
._scope()

// change the modulation depth with ":"
note("a e")
.vib("<.5 1 2 4 8 16>:12")
._scope()

vibmod
Synonyms:
vmod

Sets the vibrato depth in semitones. Only has an effect if
vibrato
|
vib
|
v
is is also set

depth
(
number|Pattern
):
of vibrato (in semitones)

note("a e").vib(4)
.vibmod("<.25 .5 1 2 12>")
._scope()

// change the vibrato frequency with ":"
note("a e")
.vibmod("<.25 .5 1 2 12>:8")
._scope()

FM Synthesis

FM Synthesis is a technique that changes the frequency of a basic waveform rapidly to alter the timbre.

You can use fm with any of the above waveforms, although the below examples all use the default triangle wave.

fm

fmh

Sets the Frequency Modulation Harmonicity Ratio.
Controls the timbre of the sound.
Whole numbers and simple ratios sound more natural,
while decimal numbers and complex ratios sound metallic.

A number may be added afterwards to control the harmonicity of
any of the 8 individual FMs (e.g.
fmh2
)

harmonicity
(
number|Pattern
):

note("c e g b g e")
.fm(4)
.fmh("<1 2 1.5 1.61>")
._scope()

fmattack
Synonyms:
fmatt

Attack time for the FM envelope: time it takes to reach maximum modulation

A number may be added afterwards to control the attack of the envelope of
any of the 8 individual FMs (e.g.
fmatt5
)

time
(
number|Pattern
):
attack time

note("c e g b g e")
.fm(4)
.fmattack("<0 .05 .1 .2>")
._scope()

fmdecay
Synonyms:
fmdec

Decay time for the FM envelope: seconds until the sustain level is reached after the attack phase.

A number may be added afterwards to control the decay of the envelope of
any of the 8 individual FMs (e.g.
fmdec6
)

time
(
number|Pattern
):
decay time

note("c e g b g e")
.fm(4)
.fmdecay("<.01 .05 .1 .2>")
.fmsustain(.4)
._scope()

fmsustain
Synonyms:
fmsus

Sustain level for the FM envelope: how much modulation is applied after the decay phase

A number may be added afterwards to control the sustain of the envelope of
any of the 8 individual FMs (e.g.
fmsus7
)

level
(
number|Pattern
):
sustain level

note("c e g b g e")
.fm(4)
.fmdecay(.1)
.fmsustain("<1 .75 .5 0>")
._scope()

fmenv
Synonyms:
fme

Ramp type of fm envelope. Exp might be a bit broken..

A number may be added afterwards to control the envelope of
any of the 8 individual FMs (e.g.
fmenv4
)

type
(
number|Pattern
):
lin | exp

note("c e g b g e")
.fm(4)
.fmdecay(.2)
.fmsustain(0)
.fmenv("<exp lin>")
._scope()

Wavetable Synthesis

Strudel can also use the sampler to load custom waveforms as a replacement of the default waveforms used by WebAudio for the base synth. A default set of more than 1000 wavetables is accessible by default (coming from the
AKWF
set). You can also import/use your own. A wavetable is a one-cycle waveform, which is then repeated to create a sound at the desired frequency. It is a classic but very effective synthesis technique.

Any sample preceded by the
wt_
prefix will be loaded as a wavetable. This means that the
loop
argument will be set to
1
by default. You can scan over the wavetable by using
loopBegin
and
loopEnd
as well.

samples('bubo:waveforms');
note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>")
.n("<1 2 3 4 5 6 7 8 9 10>/2").room(0.5).size(0.9)
.s('wt_flute').velocity(0.25).often(n => n.ply(2))
.release(0.125).decay("<0.1 0.25 0.3 0.4>").sustain(0)
.cutoff(2000).cutoff("<1000 2000 4000>").fast(4)
._scope()

ZZFX

The “Zuper Zmall Zound Zynth”
ZZFX
is also integrated in strudel.
Developed by
Frank Force
, it is a synth and FX engine originally intended to be used for size coding games.

It has 20 parameters in total, here is a snippet that uses all:

note("c2 eb2 f2 g2") // also supports freq
.s("{z_sawtooth z_tan z_noise z_sine z_square}%4")
.zrand(0) // randomization
// zzfx envelope
.attack(0.001)
.decay(0.1)
.sustain(.8)
.release(.1)
// special zzfx params
.curve(1) // waveshape 1-3
.slide(0) // +/- pitch slide
.deltaSlide(0) // +/- pitch slide (?)
.noise(0) // make it dirty
.zmod(0) // fm speed
.zcrush(0) // bit crush 0 - 1
.zdelay(0) // simple delay
.pitchJump(0) // +/- pitch change after pitchJumpTime
.pitchJumpTime(0) // >0 time after pitchJump is applied
.lfo(0) // >0 resets slide + pitchJump + sets tremolo speed
.tremolo(0.5) // 0-1 lfo volume modulation amount
//.duration(.2) // overwrite strudel event duration
//.gain(1) // change volume
._scope() // vizualise waveform (not zzfx related)

Note that you can also combine zzfx with all the other audio fx (next chapter).

Next up:
Audio Effects
…























---

## Making Sound: Audio Effects


































































Audio Effects

Whether you’re using a synth or a sample, you can apply any of the following built-in audio effects.
As you might suspect, the effects can be chained together, and they accept a pattern string as their argument.

Signal chain

The signal chain in Strudel is as follows:

An sound-generating event is triggered by a pattern

This has a start time and a duration, which is usually
controlled by the note length and ADSR parameters

If we exceed the max polyphony, old sounds begin to die off

Muted sounds (one whose
s
value is
-
,
~
, or
_
) are skipped

A sound is produced (through, say, a sample or an oscillator)

This is where detune-based effects (like
detune
,
penv
, etc. occur)

The following will occur
in order
and only if they’ve been called in the pattern. Note that all of these are
single use effects, meaning that multiple occurrences of them in a pattern will simply override the values
(e.g. you can’t do
s("bd").lpf(100).distort(2).lpf(800)
to lowpass, distort, and then lowpass
again)

Phase vocoder (
stretch
)

Gain is applied (
gain
)

This is where the main (volume) ADSR happens

A lowpass filter (
lpf
)

A highpass filter (
hpf
)

A bandpass filter (
bandpass
)

A vowel filter (
vowel
)

Sample rate reduction (
coarse
)

Bit crushing (
crush
)

Waveshape distortion (
shape
)

Normal distortion (
distort
)

Tremolo (
tremolo
)

Compressor (
compressor
)

Panning (
pan
)

Phaser (
phaser
)

Postgain (
post
)

The sound is then split into multiple destinations

Dry output (amount controlled by
dry
parameter)

The sends

Analyzers

These are used for tooling like
scope
and
spectrum
and their setup usually happens behind the scenes

Delay (amount controlled by
delay
parameter)

Reverb (amount controlled by
room
parameter)

The dry output, delay, and reverb are joined into what is called the “orbit” of the pattern (see more in the section below)

The
duck
effect affects the volume of all signals in the orbit

The orbit is then sent to the mixer

Orbits

Orbits are the way in which outputs are handled in Strudel. They also prescribe which delay and reverb to associate with the dry signal.
By default, all orbits are mixed down to channels
1
and
2
in stereo, however with the “Multi Channel Orbits” setting
(under Settings at the right) you can use them as individual 2 channel stereo outs (orbit
i
will be mapped to
to channels
2i
and
2i + 1
). You can then use routers like Blackhole 16 to retrieve and record all of the channels in a DAW for later processing.

The default orbit is
1
and it is set with
orbit
. You may send a sound to multiple orbits via mininotation

s("white").orbit("2,3,4").gain(0.2)

but please be careful as this will create three copies of the sound behind the scenes, meaning that if they are mixed
down to a single output, they will triple the volume. We’ve reduced the gain here to save your ears.

⚠️ There is only one delay and reverb per orbit, so please be aware that if you attempt to change the parameters on two
patterns pointing to the same orbit, it can lead to unpredictable results. Compare, for example, this pretty pluck
with a large reverb:

$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10)

versus the same pluck with a muted kick drum coming in and overwriting the
roomsize
value:

$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10)

$: s("bd*4").room(0.01).roomsize(0.01).postgain(0)

This is due to them sharing the same orbit: the default of
1
. It can be corrected simply by updating the orbits to be
distinct:

$: s("triangle*4").decay(0.5).n(irand(12)).scale('C minor')
.room(1).roomsize(10).orbit(2)

$: s("bd*4").room(0.01).roomsize(0.01).postgain(0)

Continuous changes

As all of the above is triggered by a
sound occurring
, it is often the case that parameters may not be
modified continuously in time. For example,

s("supersaw").lpf(tri.range(100, 5000).slow(2))

Will not produce a continually LFO’d low-pass filter due to the
tri
only being sampled every time the note hits
(in this case the default of once per cycle). You can fake it by introducing more sound-generating events, e.g.:

s("supersaw").seg(16).lpf(tri.range(100, 5000).slow(2))

Some parameters
do
induce continuous variations in time, though:

The ADSR curve (governed by
attack
,
sustain
,
decay
,
release
)

The pitch envelope curve (governed by
penv
and its associated ADSR)

The FM curve (
fmenv
)

The filter envelopes (
lpenv
,
hpenv
,
bpenv
)

Tremolo (
tremolo
)

Phaser (
phaser
)

Vibrato (
vib
)

Ducking (
duckorbit
)

Filters

Filters are an essential building block of
subtractive synthesis
.
Strudel comes with 3 types of filters:

low-pass filter: low frequencies may
pass
, high frequencies are cut off

high-pass filter: high frequencies may
pass
, low frequencies are cut off

band-pass filters: only a frequency band may
pass
, low and high frequencies around are cut off

Each filter has 2 parameters:

cutoff: the frequency at which the filter starts to work. e.g. a low-pass filter with a cutoff of 1000Hz allows frequencies below 1000Hz to pass.

q-value: Controls the resonance of the filter. Higher values sound more aggressive. Also see
Q-Factor

lpf
Synonyms:
cutoff, ctf, lp

Applies the cutoff frequency of the
l
ow-
p
ass
f
ilter.

When using mininotation, you can also optionally add the 'lpq' parameter, separated by ':'.

frequency
(
number|Pattern
):
audible between 0 and 20000

s("bd sd [~ bd] sd,hh*6").lpf("<4000 2000 1000 500 200 100>")

s("bd*16").lpf("1000:0 1000:10 1000:20 1000:30")

lpq
Synonyms:
resonance

Controls the
l
ow-
p
ass
q
-value.

q
(
number|Pattern
):
resonance factor between 0 and 50

s("bd sd [~ bd] sd,hh*8").lpf(2000).lpq("<0 10 20 30>")

hpf
Synonyms:
hp, hcutoff

Applies the cutoff frequency of the
h
igh-
p
ass
f
ilter.

When using mininotation, you can also optionally add the 'hpq' parameter, separated by ':'.

frequency
(
number|Pattern
):
audible between 0 and 20000

s("bd sd [~ bd] sd,hh*8").hpf("<4000 2000 1000 500 200 100>")

s("bd sd [~ bd] sd,hh*8").hpf("<2000 2000:25>")

hpq
Synonyms:
hresonance

Controls the
h
igh-
p
ass
q
-value.

q
(
number|Pattern
):
resonance factor between 0 and 50

s("bd sd [~ bd] sd,hh*8").hpf(2000).hpq("<0 10 20 30>")

bpf
Synonyms:
bandf, bp

Sets the center frequency of the
b
and-
p
ass
f
ilter. When using mininotation, you
can also optionally supply the 'bpq' parameter separated by ':'.

frequency
(
number|Pattern
):
center frequency

s("bd sd [~ bd] sd,hh*6").bpf("<1000 2000 4000 8000>")

bpq
Synonyms:
bandq

Sets the
b
and-
p
ass
q
-factor (resonance).

q
(
number|Pattern
):
q factor

s("bd sd [~ bd] sd").bpf(500).bpq("<0 1 2 3>")

ftype

Sets the filter type. The ladder filter is more aggressive. More types might be added in the future.

type
(
number|Pattern
):
12db (0), ladder (1), or 24db (2)

note("{f g g c d a a#}%8").s("sawtooth").lpenv(4).lpf(500).ftype("<0 1 2>").lpq(1)

note("c f g g a c d4").fast(2)
.sound('sawtooth')
.lpf(200).fanchor(0)
.lpenv(3).lpq(1)
.ftype("<ladder 12db 24db>")

vowel

Formant filter to make things sound like vowels.

vowel
(
string|Pattern
):
You can use a e i o u ae aa oe ue y uh un en an on, corresponding to [a] [e] [i] [o] [u] [æ] [ɑ] [ø] [y] [ɯ] [ʌ] [œ̃] [ɛ̃] [ɑ̃] [ɔ̃]. Aliases: aa = å = ɑ, oe = ø = ö, y = ı, ae = æ.

note("[c2 <eb2 <g2 g1>>]*2").s('sawtooth')
.vowel("<a e i <o u>>")

s("bd sd mt ht bd [~ cp] ht lt").vowel("[a|e|i|o|u]")

Amplitude Modulation

Amplitude modulation changes the amplitude (gain) periodically over time.

am

tremolosync
Synonyms:
tremsync

Modulate the amplitude of a sound with a continuous waveform

cycles
(
number|Pattern
):
modulation speed in cycles

note("d d d# d".fast(4)).s("supersaw").tremolosync("4").tremoloskew("<1 .5 0>")

tremolodepth
Synonyms:
tremdepth

Depth of amplitude modulation

depth
(
number|Pattern
):

note("a1 a1 a#1 a1".fast(4)).s("pulse").tremsync(4).tremolodepth("<1 2 .7>")

tremoloskew
Synonyms:
tremskew

Alter the shape of the modulation waveform

amount
(
number|Pattern
):
between 0 &amp; 1, the shape of the waveform

note("{f a c e}%16").s("sawtooth").tremsync(4).tremoloskew("<.5 0 1>")

tremolophase
Synonyms:
tremphase

Alter the phase of the modulation waveform

offset
(
number|Pattern
):
the offset in cycles of the modulation

note("{f a c e}%16").s("sawtooth").tremsync(4).tremolophase("<0 .25 .66>")

tremoloshape
Synonyms:
tremshape

Shape of amplitude modulation

shape
(
number|Pattern
):
tri | square | sine | saw | ramp

note("{f g c d}%16").tremsync(4).tremoloshape("<sine tri square>").s("sawtooth")

Amplitude Envelope

The amplitude
envelope
controls the dynamic contour of a sound.
Strudel uses ADSR envelopes, which are probably the most common way to describe an envelope:


image link

attack
Synonyms:
att

Amplitude envelope attack time: Specifies how long it takes for the sound to reach its peak value, relative to the onset.

attack
(
number|Pattern
):
time in seconds.

note("c3 e3 f3 g3").attack("<0 .1 .5>")

decay
Synonyms:
dec

Amplitude envelope decay time: the time it takes after the attack time to reach the sustain level.
Note that the decay is only audible if the sustain value is lower than 1.

time
(
number|Pattern
):
decay time in seconds

note("c3 e3 f3 g3").decay("<.1 .2 .3 .4>").sustain(0)

sustain
Synonyms:
sus

Amplitude envelope sustain level: The level which is reached after attack / decay, being sustained until the offset.

gain
(
number|Pattern
):
sustain level between 0 and 1

note("c3 e3 f3 g3").decay(.2).sustain("<0 .1 .4 .6 1>")

release
Synonyms:
rel

Amplitude envelope release time: The time it takes after the offset to go from sustain level to zero.

time
(
number|Pattern
):
release time in seconds

note("c3 e3 g3 c4").release("<0 .1 .4 .6 1>/2")

adsr

ADSR envelope: Combination of Attack, Decay, Sustain, and Release.

time
(
number|Pattern
):
attack time in seconds

time
(
number|Pattern
):
decay time in seconds

gain
(
number|Pattern
):
sustain level (0 to 1)

time
(
number|Pattern
):
release time in seconds

note("[c3 bb2 f3 eb3]*2").sound("sawtooth").lpf(600).adsr(".1:.1:.5:.2")

Filter Envelope

Each filter can receive an additional filter envelope controlling the cutoff value dynamically. It uses an ADSR envelope similar to the one used for amplitude. There is an additional parameter to control the depth of the filter modulation:
lpenv
|
hpenv
|
bpenv
. This allows you to play subtle or huge filter modulations just the same by only increasing or decreasing the depth.

note("[c eb g <f bb>](3,8,<0 1>)".sub(12))
.s("<sawtooth>/64")
.lpf(sine.range(300,2000).slow(16))
.lpa(0.005)
.lpd(perlin.range(.02,.2))
.lps(perlin.range(0,.5).slow(3))
.lpq(sine.range(2,10).slow(32))
.release(.5)
.lpenv(perlin.range(1,8).slow(2))
.ftype('24db')
.room(1)
.juxBy(.5,rev)
.sometimes(add(note(12)))
.stack(s("bd*2").bank('RolandTR909'))
.gain(.5).fast(2)

There is one filter envelope for each filter type and thus one set of envelope filter parameters preceded either by
lp
,
hp
or
bp
:

lpattack
,
lpdecay
,
lpsustain
,
lprelease
,
lpenv
: filter envelope for the lowpass filter.

alternatively:
lpa
,
lpd
,
lps
,
lpr
and
lpe
.

hpattack
,
hpdecay
,
hpsustain
,
hprelease
,
hpenv
: filter envelope for the highpass filter.

alternatively:
hpa
,
hpd
,
hps
,
hpr
and
hpe
.

bpattack
,
bpdecay
,
bpsustain
,
bprelease
,
bpenv
: filter envelope for the bandpass filter.

alternatively:
bpa
,
bpd
,
bps
,
bpr
and
bpe
.

lpattack
Synonyms:
lpa

Sets the attack duration for the lowpass filter envelope.

attack
(
number|Pattern
):
time of the filter envelope

note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa("<.5 .25 .1 .01>/4")
.lpenv(4)

lpdecay
Synonyms:
lpd

Sets the decay duration for the lowpass filter envelope.

decay
(
number|Pattern
):
time of the filter envelope

note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd("<.5 .25 .1 0>/4")
.lpenv(4)

lpsustain
Synonyms:
lps

Sets the sustain amplitude for the lowpass filter envelope.

sustain
(
number|Pattern
):
amplitude of the lowpass filter envelope

note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpd(.5)
.lps("<0 .25 .5 1>/4")
.lpenv(4)

lprelease
Synonyms:
lpr

Sets the release time for the lowpass filter envelope.

release
(
number|Pattern
):
time of the filter envelope

note("c2 e2 f2 g2")
.sound('sawtooth')
.clip(.5)
.lpf(300)
.lpenv(4)
.lpr("<.5 .25 .1 0>/4")
.release(.5)

lpenv
Synonyms:
lpe

Sets the lowpass filter envelope modulation depth.

modulation
(
number|Pattern
):
depth of the lowpass filter envelope between 0 and n

note("c2 e2 f2 g2")
.sound('sawtooth')
.lpf(300)
.lpa(.5)
.lpenv("<4 2 1 0 -1 -2 -4>/4")

Pitch Envelope

You can also control the pitch with envelopes!
Pitch envelopes can breathe life into static sounds:

n("<-4,0 5 2 1>*<2!3 4>")
.scale("<C F>/8:pentatonic")
.s("gm_electric_guitar_jazz")
.penv("<.5 0 7 -2>*2").vib("4:.1")
.phaser(2).delay(.25).room(.3)
.size(4).fast(1.5)

You also create some lovely chiptune-style sounds:

n(run("<4 8>/16")).jux(rev)
.chord("<C^7 <Db^7 Fm7>>")
.dict('ireal')
.voicing().add(note("<0 1>/8"))
.dec(.1).room(.2)
.segment("<4 [2 8]>")
.penv("<0 <2 -2>>").patt(.02).fast(2)

Let’s break down all pitch envelope controls:

pattack
Synonyms:
patt

Attack time of pitch envelope.

time
(
number|Pattern
):
time in seconds

note("c eb g bb").pattack("0 .1 .25 .5").slow(2)

pdecay
Synonyms:
pdec

Decay time of pitch envelope.

time
(
number|Pattern
):
time in seconds

note("<c eb g bb>").pdecay("<0 .1 .25 .5>")

prelease
Synonyms:
prel

Release time of pitch envelope

time
(
number|Pattern
):
time in seconds

note("<c eb g bb> ~")
.release(.5) // to hear the pitch release
.prelease("<0 .1 .25 .5>")

penv

Amount of pitch envelope. Negative values will flip the envelope.
If you don't set other pitch envelope controls,
pattack:.2
will be the default.

semitones
(
number|Pattern
):
change in semitones

note("c")
.penv("<12 7 1 .5 0 -1 -7 -12>")

pcurve

Curve of envelope. Defaults to linear. exponential is good for kicks

type
(
number|Pattern
):
0 = linear, 1 = exponential

note("g1*4")
.s("sine").pdec(.5)
.penv(32)
.pcurve("<0 1>")

panchor

Sets the range anchor of the envelope:

anchor 0: range = [note, note + penv]

anchor 1: range = [note - penv, note]
If you don't set an anchor, the value will default to the psustain value.

anchor
(
number|Pattern
):
anchor offset

note("c c4").penv(12).panchor("<0 .5 1 .5>")

Dynamics

gain

Controls the gain by an exponential amount.

amount
(
number|Pattern
):
gain.

s("hh*8").gain(".4!2 1 .4!2 1 .4 1").fast(2)

velocity
Synonyms:
vel

Sets the velocity from 0 to 1. Is multiplied together with gain.

s("hh*8")
.gain(".4!2 1 .4!2 1 .4 1")
.velocity(".4 1")

compressor

Dynamics Compressor. The params are
compressor("threshold:ratio:knee:attack:release")
More info
here

s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02")

postgain

Gain applied after all effects have been processed.

s("bd sd [~ bd] sd,hh*8")
.compressor("-20:20:10:.002:.02").postgain(1.5)

xfade

Cross-fades between left and right from 0 to 1:

0 = (full left, no right)

.5 = (both equal)

1 = (no left, full right)

xfade(s("bd*2"), "<0 .25 .5 .75 1>", s("hh*8"))

Panning

jux

The jux function creates strange stereo effects, by applying a function to a pattern, but only in the right-hand channel.

s("bd lt [~ ht] mt cp ~ bd hh").jux(rev)

s("bd lt [~ ht] mt cp ~ bd hh").jux(press)

s("bd lt [~ ht] mt cp ~ bd hh").jux(iter(4))

juxBy
Synonyms:
juxby

Jux with adjustable stereo width. 0 = mono, 1 = full stereo.

s("bd lt [~ ht] mt cp ~ bd hh").juxBy("<0 .5 1>/2", rev)

pan

Sets position in stereo.

pan
(
number|Pattern
):
between 0 and 1, from left to right (assuming stereo), once round a circle (assuming multichannel)

s("[bd hh]*2").pan("<.5 1 .5 0>")

s("bd rim sd rim bd ~ cp rim").pan(sine.slow(2))

Waveshaping

coarse

Fake-resampling for lowering the sample rate. Caution: This effect seems to only work in chromium based browsers

factor
(
number|Pattern
):
1 for original 2 for half, 3 for a third and so on.

s("bd sd [~ bd] sd,hh*8").coarse("<1 4 8 16 32>")

crush

Bit crusher effect.

depth
(
number|Pattern
):
between 1 (for drastic reduction in bit-depth) to 16 (for barely no reduction).

s("<bd sd>,hh*3").fast(2).crush("<16 8 7 6 5 4 3 2>")

distort
Synonyms:
dist

Wave shaping distortion. CAUTION: it can get loud.
Second option in optional array syntax (ex: ".9:.5") applies a postgain to the output. Third option sets the waveshaping type.
Most useful values are usually between 0 and 10 (depending on source gain). If you are feeling adventurous, you can turn it up to 11 and beyond ;)

distortion
(
number|Pattern
):
amount of distortion to apply

volume
(
number|Pattern
):
linear postgain of the distortion

type
(
number|string|Pattern
):
type of distortion to apply

s("bd sd [~ bd] sd,hh*8").distort("<0 2 3 10:.5>")

note("d1!8").s("sine").penv(36).pdecay(.12).decay(.23).distort("8:.4")

s("bd:4*4").bank("tr808").distort("3:0.5:diode")

Global Effects

Local vs Global Effects

While the above listed “local” effects will always create a separate effects chain for each event,
global effects use the same chain for all events of the same orbit:

orbit
Synonyms:
o

An
orbit
is a global parameter context for patterns. Patterns with the same orbit will share the same global effects.

number
(
number|Pattern
):

stack(
  s("hh*6").delay(.5).delaytime(.25).orbit(1),
  s("~ sd ~ sd").delay(.5).delaytime(.125).orbit(2)
)

Delay

delay

Sets the level of the delay signal.

When using mininotation, you can also optionally add the 'delaytime' and 'delayfeedback' parameter,
separated by ':'.

level
(
number|Pattern
):
between 0 and 1

s("bd bd").delay("<0 .25 .5 1>")

s("bd bd").delay("0.65:0.25:0.9 0.65:0.125:0.7")

delaytime
Synonyms:
delayt, dt

Sets the time of the delay effect in seconds.

delay
(
number|Pattern
):
in seconds

note("d d a# a".fast(2))
.s("sawtooth")
.delay(.8)
.delaytime(1/2)
.delayspeed("<2 .5 -1 -2>")

delayfeedback
Synonyms:
delayfb, dfb

Sets the level of the signal that is fed back into the delay.
Caution: Values >= 1 will result in a signal that gets louder and louder! Don't do it

feedback
(
number|Pattern
):
between 0 and 1

s("bd").delay(.25).delayfeedback("<.25 .5 .75 1>")

Reverb

room

Sets the level of reverb.

When using mininotation, you can also optionally add the 'size' parameter, separated by ':'.

level
(
number|Pattern
):
between 0 and 1

s("bd sd [~ bd] sd").room("<0 .2 .4 .6 .8 1>")

s("bd sd [~ bd] sd").room("<0.9:1 0.9:4>")

roomsize
Synonyms:
rsize, sz, size

Sets the room size of the reverb, see
room
.
When this property is changed, the reverb will be recaculated, so only change this sparsely..

size
(
number|Pattern
):
between 0 and 10

s("bd sd [~ bd] sd").room(.8).rsize(1)

s("bd sd [~ bd] sd").room(.8).rsize(4)

roomfade
Synonyms:
rfade

Reverb fade time (in seconds).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

seconds
(
number
):
for the reverb to fade

s("bd sd [~ bd] sd").room(0.5).rlp(10000).rfade(0.5)

s("bd sd [~ bd] sd").room(0.5).rlp(5000).rfade(4)

roomlp
Synonyms:
rlp

Reverb lowpass starting frequency (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

frequency
(
number
):
between 0 and 20000hz

s("bd sd [~ bd] sd").room(0.5).rlp(10000)

s("bd sd [~ bd] sd").room(0.5).rlp(5000)

roomdim
Synonyms:
rdim

Reverb lowpass frequency at -60dB (in hertz).
When this property is changed, the reverb will be recaculated, so only change this sparsely..

frequency
(
number
):
between 0 and 20000hz

s("bd sd [~ bd] sd").room(0.5).rlp(10000).rdim(8000)

s("bd sd [~ bd] sd").room(0.5).rlp(5000).rdim(400)

iresponse
Synonyms:
ir

Sets the sample to use as an impulse response for the reverb.

sample
(
string|Pattern
):
to use as an impulse response

s("bd sd [~ bd] sd").room(.8).ir("<shaker_large:0 shaker_large:2>")

Phaser

phaser
Synonyms:
ph

Phaser audio effect that approximates popular guitar pedals.

speed
(
number|Pattern
):
speed of modulation

n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser("<1 2 4 8>")

phaserdepth
Synonyms:
phd, phasdp

The amount the signal is affected by the phaser effect. Defaults to 0.75

depth
(
number|Pattern
):
number between 0 and 1

n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phaserdepth("<0 .5 .75 1>")

phasercenter
Synonyms:
phc

The center frequency of the phaser in HZ. Defaults to 1000

centerfrequency
(
number|Pattern
):
in HZ

n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasercenter("<800 2000 4000>")

phasersweep
Synonyms:
phs

The frequency sweep range of the lfo for the phaser effect. Defaults to 2000

phasersweep
(
number|Pattern
):
most useful values are between 0 and 4000

n(run(8)).scale("D:pentatonic").s("sawtooth").release(0.5)
.phaser(2).phasersweep("<800 2000 4000>")

Duck

duckorbit
Synonyms:
duck

Modulate the amplitude of an orbit to create a "sidechain" like effect.

Can be applied to multiple orbits with the ':' mininotation, e.g.
duckorbit("2:3")

orbit
(
number|Pattern
):
target orbit

$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth(1)

$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth(1)

duckattack
Synonyms:
duckatt, datt

The time required for the ducked signal(s) to return to their normal volume.

Can vary across orbits with the ':' mininotation, e.g.
duckonset("0:0.003")
.
Note: this requires first applying the effect to multiple orbits with e.g.
duckorbit("2:3")
.

time
(
number|Pattern
):
The attack time in seconds

sound: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack("<0.2 0 0.4>").duckdepth(1)

moreduck: n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2)
lessduck: s("hh*16").orbit(5)
ducker: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:5").duckattack("0.4:0.1")

duckdepth

The amount of ducking applied to target orbit

Can vary across orbits with the ':' mininotation, e.g.
duckdepth("0.3:0.1")
.
Note: this requires first applying the effect to multiple orbits with e.g.
duckorbit("2:3")
.

depth
(
number|Pattern
):
depth of modulation from 0 to 1

stack( n(run(8)).scale("c:minor").s("sawtooth").delay(.7).orbit(2), s("bd:4!4").beat("0,4,8,11,14",16).duckorbit(2).duckattack(0.2).duckdepth("<1 .9 .6 0>"))

$: n(run(16)).scale("c:minor:pentatonic").s("sawtooth").delay(.7).orbit(2)
$: s("hh*16").orbit(3)
$: s("bd:4!4").beat("0,4,8,11,14",16).duckorbit("2:3").duckattack(0.2).duckdepth("1:0.5")

Next, we’ll look at input / output via
MIDI, OSC and other methods
.



















































































---

## Making Sound: MIDI & OSC


































































MIDI, OSC and MQTT

Normally, Strudel is used to pattern sound, using its own ‘
web audio
’-based synthesiser called
SuperDough
.

It is also possible to pattern other things with Strudel, such as software and hardware synthesisers with MIDI, other software using Open Sound Control/OSC (including the
SuperDirt
synthesiser commonly used with Strudel’s sibling
TidalCycles
), or the MQTT ‘internet of things’ protocol.

MIDI

Strudel supports MIDI without any additional software (thanks to
webmidi
), just by adding methods to your pattern:

midin(inputName?)

MIDI input: Opens a MIDI input port to receive MIDI control change messages.

The output is a function that accepts a midi cc value to query as well as (optionally) a midi channel

input
(
string|number
):
MIDI device name or index defaulting to 0

const cc = await midin('IAC Driver Bus 1')
note("c a f e").lpf(cc(0).range(0, 1000)).lpq(cc(1).range(0, 10)).sound("sawtooth")

const allCC = await midin('IAC Driver Bus 1')
const cc = (ccNum) => allCC(ccNum, 2) // just channel 2
note("c a f e").s("saw")
  .when(cc(0).gt(0), x => x.postgain(0))

midikeys(inputName?)

MIDI keyboard: Opens a MIDI input port to receive MIDI keyboard messages.

The note length is fixed as Superdough is not currently set up for undetermined
note durations

The 'midichan' control value contains the number of the channel the note is coming from
so it could be filtered or manipulated further in the chain.

input
(
string|number
):
MIDI device name or index defaulting to 0

const kb = await midikeys('Arturia KeyStep 32')
kb().s("tri").lpf(80).lpe(6).lpd(0.1).room(2).delay(0.35)

const kb = await midikeys('Arturia KeyStep 32')
kb("0.5 1")
  .s("saw")
  .add(note(rand.mul(0.3)))
  .lpf(1000).lpe(2).room(0.5)

// discard all notes not coming out from midi channel 2
const kb = await midikeys('Arturia KeyStep 32')
kb().filterValues(v=>v.midichan==2).s("tri")

midi(outputName?,options?)

Either connect a midi device or use the IAC Driver (Mac) or Midi Through Port (Linux) for internal midi messages.
If no outputName is given, it uses the first midi output it finds.

$: chord("<C^7 A7 Dm7 G7>").voicing().midi('IAC Driver')

In the console, you will see a log of the available MIDI devices as soon as you run the code,
e.g.

`Midi connected! Using "Midi Through Port-0".`

The
.midi()
function accepts an options object with the following properties:

$: note("d e c a f").midi('IAC Driver', { isController: true, midimap: 'default'})
Available Options

Option

Type

Default

Description

isController

boolean

false

When true, disables sending note messages. Useful for MIDI controllers

latencyMs

number

34

Latency in milliseconds to align MIDI with audio engine

noteOffsetMs

number

10

Offset in milliseconds for note-off messages to prevent glitching

midichannel

number

1

Default MIDI channel (1-16)

velocity

number

0.9

Default note velocity (0-1)

gain

number

1

Default gain multiplier for velocity (0-1)

midimap

string

’default’

Name of MIDI mapping to use for control changes

midiport

string/number

-

MIDI device name or index

midiport(outputName)

Selects the MIDI output device to use, pattern can be used to switch between devices.

$
:
midiport
(
'IAC Driver'
);
$
:
note
(
'c a f e'
).
midiport
(
'<0 1 2 3>'
).
midi
();

MIDI port: Sets the MIDI port for the event.

port
(
number|Pattern
):
MIDI port

note("c a f e").midiport("<0 1 2 3>").midi()

midichan(number)

Selects the MIDI channel to use. If not used,
.midi
will use channel 1 by default.

midicmd(command)

midicmd
sends MIDI system real-time messages to control timing and transport on MIDI devices.

It supports the following commands:

clock
/
midiClock
- Sends MIDI timing clock messages

start
- Sends MIDI start message

stop
- Sends MIDI stop message

continue
- Sends MIDI continue message

// You can control the clock with a pattern and ensure it starts in sync when the repl begins.
// Note: It might act unexpectedly if MIDI isn’t set up initially.

$:stack(
midicmd("clock*48,<start stop>/2").midi('IAC Driver')
)

control, ccn && ccv

control
sends MIDI control change messages to your MIDI device.

ccn
sets the cc number. Depends on your synths midi mapping

ccv
sets the cc value. normalized from 0 to 1.

note("c a f e").control([74, sine.slow(4)]).midi()

note("c a f e").ccn(74).ccv(sine.slow(4)).midi()

In the above snippet,
ccn
is set to 74, which is the filter cutoff for many synths.
ccv
is controlled by a saw pattern.
Having everything in one pattern, the
ccv
pattern will be aligned to the note pattern, because the structure comes from the left by default.
But you can also control cc messages separately like this:

$: note("c a f e").midi()
$: ccv(sine.segment(16).slow(4)).ccn(74).midi()

Instead of setting
ccn
and
ccv
directly, you can also create mappings with
midimaps
:

midimaps

Adds midimaps to the registry. Inside each midimap, control names (e.g. lpf) are mapped to cc numbers.

midimaps({ mymap: { lpf: 74 } })
$: note("c a f e")
.lpf(sine.slow(4))
.midimap('mymap')
.midi()

midimaps({ mymap: {
  lpf: { ccn: 74, min: 0, max: 20000, exp: 0.5 }
}})
$: note("c a f e")
.lpf(sine.slow(2).range(400,2000))
.midimap('mymap')
.midi()

defaultmidimap

configures the default midimap, which is used when no "midimap" port is set

defaultmidimap({ lpf: 74 })
$: note("c a f e").midi();
$: lpf(sine.slow(4).segment(16)).midi();

progNum (Program Change)

progNum
sends MIDI program change messages to switch between different presets/patches on your MIDI device.
Program change values should be numbers between 0 and 127.

// Switch between programs 0 and 1 every cycle
progNum("<0 1>").midi()

// Play notes while changing programs
note("c3 e3 g3").progNum("<0 1 2>").midi()

Program change messages are useful for switching between different instrument sounds or presets during a performance.
The exact sound that each program number maps to depends on your MIDI device’s configuration.

sysex, sysexid && sysexdata (System Exclusive Message)

sysex
sends MIDI System Exclusive (SysEx) messages to your MIDI device.
ysEx messages are device-specific commands that allow deeper control over synthesizer parameters.
The value should be an array of numbers between 0-255 representing the SysEx data bytes.

// Send a simple SysEx message
let id = 0x43; //Yamaha
//let id = "0x00:0x20:0x32"; //Behringer ID can be an array of numbers
let data = "0x79:0x09:0x11:0x0A:0x00:0x00"; // Set NSX-39 voice to say "Aa"
$: note("c a f e").sysex(id, data).midi();
$: note("c a f e").sysexid(id).sysexdata(data).midi();

The exact format of SysEx messages depends on your MIDI device’s specification.
Consult your device’s MIDI implementation guide for details on supported SysEx messages.

midibend && miditouch

midibend
sets MIDI pitch bend (-1 - 1)
miditouch
sets MIDI key after touch (0-1)

note("c a f e").midibend(sine.slow(4).range(-0.4,0.4)).midi()

note("c a f e").miditouch(sine.slow(4).range(0,1)).midi()

OSC/SuperDirt/StrudelDirt

In TidalCycles, sound is usually generated using
SuperDirt
, which runs inside SuperCollider. Strudel also supports using SuperDirt, although it requires installing some additional software.

There is also
StrudelDirt
which is SuperDirt with some optimisations for working with Strudel. (A longer term aim is to merge these optimisations back into mainline SuperDirt)

Prequisites

To get SuperDirt to work with Strudel, you need to

install SuperCollider + sc3 plugins, see
Tidal Docs
(Install Tidal) for more info.

install SuperDirt, or the
StrudelDirt
fork which is optimised for use with Strudel

install
node.js

download
Strudel Repo
(or git clone, if you have git installed)

run
pnpm i
in the strudel directory

run
pnpm run osc
to start the osc server, which forwards OSC messages from Strudel REPL to SuperCollider

Now you’re all set!

Usage

Start SuperCollider, either using SuperCollider IDE or by running
sclang
in a terminal

Open the
Strudel REPL

…or test it here:

If you now hear sound, congratulations! If not, you can get help on the
#strudel channel in the TidalCycles discord
.

Note: if you have the ‘Audio Engine Target’ in settings set to ‘OSC’, you do not need to add .osc() to the end of your pattern.

Pattern.osc

Sends each hap as an OSC message, which can be picked up by SuperCollider or any other OSC-enabled software.
For more info, read
MIDI & OSC in the docs

SuperDirt Params

Please refer to
Tidal Docs
for more info.

But can we use Strudel
offline
?

MQTT

MQTT is a lightweight network protocol, designed for ‘internet of things’ devices. For use with strudel, you will
need access to an MQTT server known as a ‘broker’ configured to accept secure ‘websocket’ connections. You could
run one yourself (e.g. by running
mosquitto
), although getting an SSL certificate that
your web browser will trust might be a bit tricky for those without systems administration experience.
Alternatively, you can use
a public broker
.

Strudel does not yet support receiving messages over MQTT, only sending them.

Usage

The following example shows how to send a pattern to an MQTT broker:

Other software can then receive the messages. For example using the
mosquitto
commandline client tools:

> mosquitto_sub -h mqtt.eclipseprojects.io -p 1883 -t "/strudel-pattern"
> hello
> world
> hello
> world
> ...

Control patterns will be encoded as JSON, for example:

Will send messages like the following:

{"s":"sax","speed":2}
{"s":"sax","speed":2}
{"s":"sax","speed":3}
{"s":"sax","speed":2}
...

Libraries for receiving MQTT are available for many programming languages.





























---

## More: FAQ


































































Frequently Asked Questions

This page contains frequently asked questions, with answers. Usually, the topic is explained in more detail in a section which is linked in the answer.

Is Strudel/Tidal free?

Yes - there is no charge, this is a collective open source project, and the music you make with it is your own. However if you can, please make a one-off or regular donation to our
opencollective fund
, that supports the software and cultural development of Strudel and other Uzu languages.

While there is no charge there are some caveats, e.g.:

the source code must stay free, i.e. you cannot distribute strudel or tidal as part of projects with incompatible licenses - see the
license
for details.

the contributed examples and tracks are also separately licensed, and must not e.g. be used to train AI models without permission.

How do I try out the latest features?

The main, stable strudel website is
strudel.cc
. There is also
warm.strudel.cc
, known as “warm strudel”, which has the latest development features. You might find warm strudel has bug fixes and features that the main website doesn’t, but it will often be less stable and probably not suitable for important performances.

Alternatively, you can run strudel locally to try out the latest features. You can find development-oriented
instructions for that here
.

You can see the
latest changes here
, as ‘pull requests’.

How to record or export audio?

Strudel is not a digital audio workstation and does not operate following the same principles shared by most traditional audio softwares. However, there are multiple ways to record the audio — and video — output of Strudel:

Use the ‘export’ tab to render and download as an audio file.

capture the raw stereo signal coming out of your web browser. You will need an external audio editor/DAW such as Reaper/Audacity/Ardour, etc.

use the alternative SuperDirt audio engine. Read
this page
to know more about it.

capture the audio/video stream using a capture tool such as
OBS
, which is designed for live streaming, but also works very well for recording.

don’t record anything and code it again in front of your friends.

Can I use strudel with my IDE?

Yes you can. There are experimental modes, made by community members, for several IDEs such as:

VS Code:
Strudel VS
: an experimental mode for Microsoft VSCode. A revived version of
TidalStrudel
, which is defunct.

nvim:
strudel.nvim

How can I use my own samples?

There are multiple ways to load your sample collection. Some methods are good for quick experimentation, some others are good to share your audio collection with other musicians:

Import folders
from the interface
. These are stored locally in your web browser, and not uploaded.

Serve a folder of samples locally using the
strudel ‘sampler’ commandline tool
. This can be most reliable method, but requires
nodejs
to be installed.

Host your sound library online on the web and
load them from an URL

Can I use Strudel with AI/LLM tools?

You are free to do what you like with Strudel, within the terms of the free/open source AGPLv3 license.
However as a community we are interested in exploring human creativity. AI is
way
over-hyped right now,
including by people with very shady motives. Many in the community are very wary of people training models
on their tunes that they’ve poured their love into. So please keep discussion and questions around AI and
LLMs to channels dedicated to the topic and be fully respectful of other people’s work.

Furthermore, tools like ChatGPT generally give wrong answers. Please don’t ask the community to fix those
answers for you, as generally they will be timewasting nonsense.

Human questions are always welcome!

Where can I download loads of patterns to train my LLM?

You cannot, as there is no such place. For details regarding our stance towards AI/LLM, see
above

How to run offline?

Strudel works offline just fine! There are multiple techniques for this, see
this explanation
.

How to change tempo? How do I translate BPM to cpm?

Strudel works in cycles, rather than beats, but if you assume a certain number of beats per cycle, you can convert between them.

For example, if you have your tempo in beats per minute and use 4 beats per cycle (e.g. if your track is in 4/4ths) then you can do
setcpm(BPM/4)
where BPM is your beats per minute.

If you have a different number of beats per bar or are using more or less beats per cycle (e.g. If you want to put only half a bar or
two bars into one cycle), adjust accordingly.

Where can I see all the functions?

If you pop open the sidetab of strudel.cc (small white < on the right hand side), there is a tab “reference” which lists all the functions of strudel.

Where can I see all the samples and synths?

If you pop open the sidetab of strudel.cc (small white < on the right hand side), there is a tab “sounds” which lists all the drum machines, samples and synths currently loaded.

How do I use this exactly like a DAW?

Strudel has different design aims for a DAW, and so treating it like one will likely be frustrating. DAWs are geared towards
sequencing notes over time in predictable ways, whereas Strudel and similar Uzu languages are geared towards combining and
transforming patterns in ways that can be hard to predict.

If you want to emulate the functionality of a DAW in Strudel, you’ll have to identify the operations
executed by the DAW (sequencing, repeating, applying filters and envelopes) and write code that is equivalent to these
operations. For example in Strudel, the ‘arrange’ and ‘pick’ methods are useful for sequencing patterns over time (see question on these later in this document).

You might still find that the typical DAW workflow is not really adapted to live coding because, despite
both being ways of making music on the computer, they are two very different tools. You could then adapt your way of proceeding
to the medium of code, which might mean leaving more place to serendipity and writing code that you don’t predict the output of.

Why doesn’t everyone just use a DAW?

There is no easy answer to this question. Here are some thoughts:


Live coding tools such as Strudel are excellent for improvising music and visuals using a computer. DAWs are valuable and robust companions for other activities such as producing, mastering and mixing audio, among other usages. Using a tool does not exclude from using any another tool, just build a toolbox.


Live coding has developed over decades as a distinct creative practice. For example, live coding artists like to show their screens while playing in front of an audience. It is an essential part of what they do, of the way they share their activity with everybody.


Code is a human language, it is made for other humans to read it. You can read the code and enjoy the music too. It has meaning, value, and there might even be something poetic/important about it! - Strudel is free and open source, you can inspect the code, reshape it, contribute to it if you can/want. It is not opaque and this matters for many people. There is no black box, no obscure abstractions, no business model, no user tracking or hidden features. We need open tools in the arts! - Live coders don’t all shy away from using DAWs. Many use them all of the time, especially when it makes their life easier for… live coding!


Code is an artistic material like any other. There is something valuable in the process of making music through code. More generally speaking, it is nice to tackle creative problems through the use of a programming language: creative thinking, building up your own solutions, DIY approach to music-making, unexpected outcome of algorithms, funny human errors, etc.


There are pianos and trumpets in your DAW: why do people continue playing the piano or the trumpet? Think of live coding tools as instruments that you activate through the act of programming.

How can I interface Strudel with my favorite music software? What can I do with it?

Strudel can send
MIDI and OSC
, which are protocols for communicating musical information.

Other music software (or hardware!) can then listen to these messages and process them according to its capabilities.

A simple example would be to send livecoded audio to a DAW like Ardour on different tracks and then use it to mix them.

You could also send the MIDI of a sequenced pattern to Musescore and then have it transcribe your livecoded work as a musical score.

You could also send MIDI to your hardware synths, if you like their sound.

How do I use this in my closed source webgame or other software?

You don’t. You need to license your game to a free/open source license fulfill the
AGPLv3 license
Strudel is distributed under.

How to play different patterns simultaneously?

Using the $ operator, several patterns can be played at once:

$: s("bd*4").bank("tr707")
$: s("- sd").bank("tr909")

See also
stack

Is it possible to mute a pattern?

With an additional underscore, a pattern can be muted.

$: s("bd*4").bank("tr707")
_$: s("- sd").bank("tr909")

See also
hush

How can I arrange in Strudel using
mask
?

With mini-notation, using the
<>
and
!
operators, you can try something like

.mask("<0!24 1!40>")

It mutes a pattern for 24 cycles and plays it for 40. You would gain 64 cycles total, a multiple of 2/4/8 commonly used in western music.

If each cycle is a bar, as a starting point, you could write a mask like that for any pattern:

.mask("<0!16 0!16 0!16 0!16 0!16 0!10>")

It mutes it throughout.

For arranging, you could add the same mask to each part and replace some zeroes with ones in your different masks to make parts play.

If you use
.mask()
on different patterns mess up your counting, then patterns do not align anymore.
On the other hand, doing that on purpose is one of the things that could be considered a strength of tidalcycles and Strudel.
You can make things quite lively and more organic with a little (controlled) interference, according to your own taste.
And you are free to arrange in cycles like 3, 6 or 9 too.

To modify everything at once, you could try all and when, for example:

all(x=>x.when("<0!7 1>", x=>x.lpf(saw.range(200, 2000))))

This would lowpass filter sweep everything every 8 cycles.

How can I arrange in Strudel using
arrange
or
pick
?

Take
Pachelbel’s Canon in D
as an example which has 4 voices (one cello and 3 violins) which have repeating patterns, as seen in the link above.

The following snipped defines the patterns as constants which can then be used for the different voices.
arrange
takes multiple arguments, which are each a number of cycles and a pattern which is played for the number of cycles, wrapped in
[]
If the pattern is shorter than the number, it is repeated.

const cello = note(
"<[d3 a2 b2 f#2] [g2 d3 g2 a2]>")
.color("grey").sound("gm_tremolo_strings:3")
const violin_p1 = note(
"<[f#5 e5 d5 c#5] [b4 a4 b4 c#5]>")
.color("blue")
const violin_p2 = note(
"<[d5 c#5 b4 a4] [ g4 f#4 g4 f#4]>")
.color("green")
const violin_p3 = note(
"<[d4 f#4 a4 g4 f#4 d4 f#4 e4] [d4 b3 d4 a4 g4 b4 a4 g4]>")
.color("purple")
const violin_p4 = note(
"<[f#4 d4 e4 c#5 d5 f#5 a5 a4] [b4 g4 a4 f#4 d4 d5 [d5@3 c#5]@2]>")
.color("red")

cello$: arrange(
[2, silence],
[18,cello])
violin1$: arrange(
[4,silence],
[2,violin_p1], [2,violin_p2],
[2,violin_p3], [2,violin_p4],
[2,violin_p1], [2,violin_p2],
[2,violin_p3], [2,violin_p4]
).sound("gm_tremolo_strings:0")
violin2$: arrange(
[6,silence], [2,violin_p1], 
[2,violin_p2], [2,violin_p3], 
[2,violin_p4], [2,violin_p1], 
[2,violin_p2], [2,violin_p3] 
).sound("gm_tremolo_strings:1")
violin3$: arrange(
[8,silence],
[2,violin_p1], [2,violin_p2],
[2,violin_p3], [2,violin_p4],
[2,violin_p1], [2,violin_p2]
).sound("gm_tremolo_strings:2")

  all(x => x.release(.2))

Alternatively, you can also put the different patterns for the violins into one single array (
const violins = [violin_p1, violin_p2, violin_p3, violin_p4]
) and use a pattern as an index to
pick
the nth element of that array. This replaces the voices defined above. Here you use
0@2
to specifiy that the first item (i.e. with index
0
) is played for
2
cycles.

pick
has better highlighting than
arrange
:

const cello = note(
"<[d3 a2 b2 f#2] [g2 d3 g2 a2]>")
.color("grey").sound("gm_tremolo_strings:3")
const violin_p1 = note(
"<[f#5 e5 d5 c#5] [b4 a4 b4 c#5]>")
.color("blue")
const violin_p2 = note(
"<[d5 c#5 b4 a4] [ g4 f#4 g4 f#4]>")
.color("green")
const violin_p3 = note(
"<[d4 f#4 a4 g4 f#4 d4 f#4 e4] [d4 b3 d4 a4 g4 b4 a4 g4]>")
.color("purple")
const violin_p4 = note(
"<[f#4 d4 e4 c#5 d5 f#5 a5 a4] [b4 g4 a4 f#4 d4 d5 [d5@3 c#5]@2]>")
.color("red")

const violins = [violin_p1, violin_p2, violin_p3, violin_p4]

cello$: "<~@2 0@18>".pick([cello])
violin1$: "<~@4 0@2 1@2 2@2 3@2 0@2 1@2 2@2 3@2>".pick(violins)
.sound("gm_tremolo_strings:0")
violin2$: "<~@6 0@2 1@2 2@2 3@2 0@2 1@2 2@2>".pick(violins)
.sound("gm_tremolo_strings:1")
violin3$: "<~@8 0@2 1@2 2@2 3@2 0@2 1@2 >".pick(violins)
.sound("gm_tremolo_strings:2")
all(x => x.release(.2))

The
pick
method also works with jsons which have named elements, which makes it easier to read, see the
here
.
pickRestart
restarts the pattern upon picking it which can make a difference if the duration of the pick indexes doesn’t line up with the patterns which are picked - which is not the case here.

Try adding
.punchcard()
after the
release(.2)
for a visualization.

I saw Switch Angel using functions which I cannot find in the reference (e.g.
trancegate
). How do I make it work?

Methods like
trancegate()
,
rlpf()
and
acidenv()
are currently not pattern methods which come natively with strudel.

They are part of a script/prebake for strudel which was written by Switch Angel and published
here

You can find the instructions how to use that script in the readme.md there.

Is there difference between
n
and
note
?

They are not aliases of each other, in contrast to
s
and
sound
.

The method
note
is used to reference a certain note (either as its name, such as
c
or
b2
or the midi number
69
, for example
note("c3 e3 g3")
).

On the other hand,
n
is a way to reference the nth index of something. This something can be a scale (eg
n("0 2 4").scale("C:major")
) , but it can also be a particular note in a chord (see
https://strudel.cc/recipes/recipes/#arpeggios
for an example) .

The method
n
can also be used for something completely unrelated to notes, in particular the nth sample from a sample map
s("hh*8").bank("RolandTR909").n("0 1 2 3")
.

n("<[0 1 2 3@3 -@2] [3 2 1 0@3 -@2] >")
      .scale("A:minor:pentatonic")
      .s("gm_acoustic_guitar_steel").n("<0 1 2 3>/2")

Note that
n
is not the only way that functions use indices, some take numbered patterns instead.

Is there a cheat sheet for all symbols?

Yes!

'   marks start and end of strings, is different from "
"   marks start and end of single line patterns in mini notation, is different from '
`   marks start and end of patterns with line breaks in mini notation, is different from '
[]  used for patterns in mini notation, each item in it has the same length
<>  used for patterns, alternates between items each cycle
{}  historically used for polyrhythmic patterns. {a b c}%4 is the same as <a b c>*4.
@3  elongates the item by a factor of 3 (other numbers work too, even non-integer, but for numbers between 0 and 1 you need a leading zero like this: @0.5)
@   after an item: elongates the item once (multiple @ work too c @ @ is the same as c@3)
_   after an item: also elongates an item once (multiple _ work too c _ _ is the same as c@3), see below for a different usage.
.   this divides equal parts of a pattern and is called a foot. Can be used instead of [] like this: "1 6 7 8 . 2 . 3 . 4" is the same as "[1 6 7 8] 2 3 4"
-   silence
~   also silence
x   not silence (for the use in struct, any non-silence symbol works there)
b   decrease by one semitone, i.e. flat, works for steps of scales, note names (but not midi numbers) and chord names
s   increase by one semitone, i.e. sharp, works for steps of scales, note names (but not midi numbers) but not chord names
#   increase by one semitone, i.e. sharp works for steps of scales, note names (but not midi numbers) and chord names
#   also used in mondo notation
*3  play the sample or pattern at thrice the speed, fast(3)
!3  play the sample or pattern three times
/2  play the sample or pattern at half speed, slow(2)
?   play the pattern sometimes
|   once per cycle, choose randomly a pattern of those separated by i.e. chooseCycles()
,   play all items separated by it at the same time, i.e. stack()
:   is used to separate multiple parameters, such as adsr(".1:.1:.5:.2"), this is is an operator which creates a list of these objects.
$:  at the start of a line, defines a member of the stack. is the only stack name that should occur multiple names
_   before a stack name: mutes the stack, i.e. hush(), for example _$: s("bd"), see above for a different usage.






























---

## More: Mini-Notation


































































Mini-notation

Just like
Tidal Cycles
, Strudel uses a so called “Mini-Notation”, which is a custom language that is designed for writing rhythmic patterns using little amounts of text.

Note

This page just explains the entirety of the Mini-Notation syntax.
If you are just getting started with Strudel, you can learn the basics of the Mini-Notation in a more practical manner in the
workshop
.
After that, you can come back here if you want to understand every little detail.

Example

Before diving deeper into the details, here is a flavour of how the Mini-Notation looks like:

note(`<
[e5 [b4 c5] d5 [c5 b4]]
[a4 [a4 c5] e5 [d5 c5]]
[b4 [~ c5] d5 e5]
[c5 a4 a4 ~]
[[~ d5] [~ f5] a5 [g5 f5]]
[e5 [~ c5] e5 [d5 c5]]
[b4 [b4 c5] d5 e5]
[c5 a4 a4 ~]
,
[[e2 e3]*4]
[[a2 a3]*4]
[[g#2 g#3]*2 [e2 e3]*2]
[a2 a3 a2 a3 a2 a3 b1 c2]
[[d2 d3]*4]
[[c2 c3]*4]
[[b1 b2]*2 [e2 e3]*2]
[[a1 a2]*4]
>`)

Mini Notation Format

The snippet above is enclosed in backticks (`), which allows you to write multi-line strings.

You can also use regular double quotes (
"
) for single line mini-notation, as we have done already.

If you do just want to get a regular string that is
not
parsed as mini-notation, use single quotes (
'
).

Sequences of events in a cycle

We can play more notes by separating them with spaces:

note("c e g b")

Here, those four notes are squashed into one cycle, so each note is a quarter second long.
Try adding or removing notes and notice how the tempo changes!

note("c d e f g a b")

Note that the overall duration of time does not change, and instead each note length decreases.
This is a key idea, as it illustrates the ‘Cycle’ in TidalCycles!

Each space-separated note in this sequence is an
event
.
The time duration of each event is based on the speed or tempo of the cycle, and how many events are present.
Taking the two examples above, we have four and eight events respectively, and since they have the same cycle duration, they each have to fit their events inside the same amount of time.

This is perhaps counter-intuitive if you are used to adding notes in a sequencer or piano roll and the overall length increasing.
But, it will begin to make sense as we go through more elements of mini-notation.

Multiplication

A sequence can be sped up by multiplying it by a number using the asterisk symbol (
*
):

note("[e5 b4 d5 c5]*2")

The multiplication by two here means that the sequence will play twice per cycle.

Multiplications can also be decimal (
*2.75
):

note("[e5 b4 d5 c5]*2.75")

Division

Contrary to multiplication, division can slow the sequence down by enclosing it in brackets and dividing it by a number (
/2
):

note("[e5 b4 d5 c5]/2")

The division by two means that the sequence will be played over the course of two cycles.
You can also use decimal numbers for any tempo you like (
/2.75
).

note("[e5 b4 d5 c5]/2.75")

Angle Brackets

Using angle brackets
<>
, we can define the sequence length based on the number of events:

note("<e5 b4 d5 c5>")

The above snippet is the same as:

note("[e5 b4 d5 c5]/4")

The advantage of the angle brackets, is that we can add more events without needing to change the number at the end.

note("<e5 b4 d5 c5 e5>")

note("<e5 b4 d5 c5 e5 b4>")

This is more similar to traditional music sequencers and piano rolls, where adding a note increases the perceived overall duration.
We can also play a certain number of notes per cycle by using angle brackets with multiplication:

note("<e5 b4 d5 c5 a4 c5>*8")

Now we are playing 8 notes per cycle!

Subdividing time with bracket nesting

To create more interesting rhythms, you can
nest
or
enclose
sequences (put sequences inside sequences) with brackets
[]
, like this:

Compare the difference between the following:

note("e5 b4 c5 d5 c5 b4")

note("e5 [b4 c5] d5 c5 b4")

note("e5 [b4 c5] d5 [c5 b4]")

note("e5 [b4 c5] d5 [c5 b4 d5 e5]")

note("e5 [b4 c5] d5 [c5 b4 [d5 e5]]")

What’s going on here? When we nest/enclose multiple events inside brackets (
[]
), their duration becomes the length of one event in the outer sequence.

This is a very simple change to make, but it has profound consequences.
Remember what we said earlier about how the cycles in tidal stay the same length, and the individual event lengths are divided up in this cycle?
Well, what this means is that in TidalCycles, not only can you divide time any way you want, and you can also subdivide time any way you want!

Rests

The ”~” represents a rest, and will create silence between other events:

note("[b4 [~ c5] d5 e5]")

Alternatively, ”-” can be used instead of ”~”. It means the same thing.

Parallel / polyphony

Using commas, we can play chords.
The following are the same:

note("[g3,b3,e4]")

note("g3,b3,e4")

But to play multiple chords in a sequence, we have to wrap them in brackets:

note("<[g3,b3,e4] [a3,c3,e4] [b3,d3,f#4] [b3,e4,g4]>*2")

Elongation

With the ”@” symbol, we can specify temporal “weight” of a sequence child:

note("<[g3,b3,e4]@2 [a3,c3,e4] [b3,d3,f#4]>*2")

Here, the first chord has a weight of 2, making it twice the length of the other chords. The default weight is 1.

Replication

Using ”!” we can repeat without speeding up:

note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>*2")

Randomness

Events with a ”?” placed after them will have a 50% chance of being removed from the pattern:

note("[g3,b3,e4]*8?")

Adding a number between 0 and 1 after the ”?” will affect the likelihood of the event being removed. For example, events with “?0.1” placed after them will have a 10% chance of being removed:

note("[g3,b3,e4]*8?0.1")

Events separated by a ”|” will be chosen from at random:

note("[g3,b3,e4] | [a3,c3,e4] | [b3,d3,f#4]")

Mini-notation review

To recap what we’ve learned so far, compare the following patterns:

note("<g3 b3 e4 [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4] [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4]/2 [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4]*2 [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4] _ [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4]@2 [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3,b3,e4]? [a3,c3,e4] [b3,d3,f#4]>*2")

note("<[g3|b3|e4] [a3,c3,e4] [b3,d3,f#4]>*2")

Euclidian rhythms

Using round brackets after an event, we can create rhythmical sub-divisions based on three parameters:
beats
,
segments
and
offset
.
This algorithm can be found in many different types of music software, and is often referred to as a
Euclidean rhythm
sequencer, after computer scientist Godfriend Toussaint.
Why is it interesting? Well, consider the following simple example:

s("bd(3,8,0)")

Sound familiar?
This is a popular Euclidian rhythm going by various names, such as “Pop Clave”.
These rhythms can be found in all musical cultures, and the Euclidian rhythm algorithm allows us to express them extremely easily.
Writing this rhythm out in full require describing:

s("bd ~ ~ bd ~ ~ bd ~")

But using the Euclidian rhythm notation, we only need to express “3 beats over 8 segments, starting on position 1”.

This makes it easy to write patterns with interesting rhythmic structures and variations that still sound familiar:

note("e5(2,8) b4(3,8) d5(2,8) c5(3,8)").slow(2)

Note that since the example above does not use the third
offset
parameter, it can be written simply as
"(3,8)"
.

s("bd(3,8)")

Let’s look at those three parameters in detail.

Beats

beats
: the first parameter controls how may beats will be played.
Compare these:

s("bd(2,8)")

s("bd(5,8)")

s("bd(7,8)")

Segments

segments
: the second parameter controls the total amount of segments the beats will be distributed over:

s("bd(3,4)")

s("bd(3,8)")

s("bd(3,13)")

Offsets

offset
: the third (optional) parameter controls the starting position for distributing the beats.
We need a secondary rhythm to hear the difference:

s("bd(3,8,0), hh cp")

s("bd(3,8,3), hh cp")

s("bd(3,8,5), hh cp")

Mini-notation exercise

The most fun thing about the mini-notation, is that everything you have just learned can be combined in various ways!

Starting with this one
n
, can you make a
pattern string
that uses every single mini-notation element above?

n("60")

Next: How do
Samples
play into this?



























---

## More: Visual Feedback


































































Visual Feedback

There are several function that add visual feedback to your patterns.

Mini Notation Highlighting

When you write mini notation with “double quotes” or `backticks`, the active parts of the mini notation will be highlighted:

n("<0 2 1 3 2>*8")
.scale("<A1 D2>/4:minor:pentatonic")
.s("supersaw").lpf(300).lpenv("<4 3 2>*4")

You can change the color as well, even pattern it:

n("<0 2 1 3 2>*8")
.scale("<A1 D2>/4:minor:pentatonic")
.s("supersaw").lpf(300).lpenv("<4 3 2>*4")
.color("cyan magenta")

Global vs Inline Visuals

The following functions all come with in 2 variants.

Without prefix
: renders the visual to the background of the page:

note("c a f e").color("white").punchcard()

With
_
prefix
: renders the visual inside the code. Allows for multiple visuals

note("c a f e").color("white")._punchcard()

Here we see the 2 variants for
punchcard
. The same goes for all others below.
To improve readability the following demos will all use the inline variant.

Punchcard / Pianoroll

These 2 functions render a pianoroll style visual.
The only difference between the 2 is that
pianoroll
will render the pattern directly,
while
punchcard
will also take the transformations into account that occur afterwards:

note("c a f e").color("white")
._punchcard()
.color("cyan")

Here, the
color
is still visible in the visual, even if it is applied after
_punchcard
.
On the contrary, the color is not visible when using
_pianoroll
:

note("c a f e").color("white")
._pianoroll()
.color("cyan")

punchcard
is less resource intensive because it uses the same data as used for the mini notation highlighting.

The visual can be customized by passing options. Those options are the same for both functions.

What follows is the API doc of all the options you can pass:
Synonyms:
punchcard

Visualises a pattern as a scrolling 'pianoroll', displayed in the background of the editor. To show a pianoroll for all running patterns, use
all(pianoroll)
. To have a pianoroll appear below
a pattern instead, prefix with
_
, e.g.:
sound("bd sd")._pianoroll()
.

options
(
Object
):
Object containing all the optional following parameters as key value pairs:

cycles
(
integer
):
number of cycles to be displayed at the same time - defaults to 4

playhead
(
number
):
location of the active notes on the time axis - 0 to 1, defaults to 0.5

vertical
(
boolean
):
displays the roll vertically - 0 by default

labels
(
boolean
):
displays labels on individual notes (see the label function) - 0 by default

flipTime
(
boolean
):
reverse the direction of the roll - 0 by default

flipValues
(
boolean
):
reverse the relative location of notes on the value axis - 0 by default

overscan
(
number
):
lookup X cycles outside of the cycles window to display notes in advance - 1 by default

hideNegative
(
boolean
):
hide notes with negative time (before starting playing the pattern) - 0 by default

smear
(
boolean
):
notes leave a solid trace - 0 by default

fold
(
boolean
):
notes takes the full value axis width - 0 by default

active
(
string
):
hexadecimal or CSS color of the active notes - defaults to #FFCA28

inactive
(
string
):
hexadecimal or CSS color of the inactive notes - defaults to #7491D2

background
(
string
):
hexadecimal or CSS color of the background - defaults to transparent

playheadColor
(
string
):
hexadecimal or CSS color of the line representing the play head - defaults to white

fill
(
boolean
):
notes are filled with color (otherwise only the label is displayed) - 0 by default

fillActive
(
boolean
):
active notes are filled with color - 0 by default

stroke
(
boolean
):
notes are shown with colored borders - 0 by default

strokeActive
(
boolean
):
active notes are shown with colored borders - 0 by default

hideInactive
(
boolean
):
only active notes are shown - 0 by default

colorizeInactive
(
boolean
):
use note color for inactive notes - 1 by default

fontFamily
(
string
):
define the font used by notes labels - defaults to 'monospace'

minMidi
(
integer
):
minimum note value to display on the value axis - defaults to 10

maxMidi
(
integer
):
maximum note value to display on the value axis - defaults to 90

autorange
(
boolean
):
automatically calculate the minMidi and maxMidi parameters - 0 by default

note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
.pianoroll({ labels: 1 })

Spiral

Displays a spiral visual.

options
(
Object
):
Object containing all the optional following parameters as key value pairs:

stretch
(
number
):
controls the rotations per cycle ratio, where 1 = 1 cycle / 360 degrees

size
(
number
):
the diameter of the spiral

thickness
(
number
):
line thickness

cap
(
string
):
style of line ends: butt (default), round, square

inset
(
string
):
number of rotations before spiral starts (default 3)

playheadColor
(
string
):
color of playhead, defaults to white

playheadLength
(
number
):
length of playhead in rotations, defaults to 0.02

playheadThickness
(
number
):
thickness of playheadrotations, defaults to thickness

padding
(
number
):
space around spiral

steady
(
number
):
steadyness of spiral vs playhead. 1 = spiral doesn't move, playhead does.

activeColor
(
number
):
color of active segment. defaults to foreground of theme

inactiveColor
(
number
):
color of inactive segments. defaults to gutterForeground of theme

colorizeInactive
(
boolean
):
wether or not to colorize inactive segments, defaults to 0

fade
(
boolean
):
wether or not past and future should fade out. defaults to 1

logSpiral
(
boolean
):
wether or not the spiral should be logarithmic. defaults to 0

note("c2 a2 eb2")
.euclid(5,8)
.s('sawtooth')
.lpenv(4).lpf(300)
._spiral({ steady: .96 })

Scope
Synonyms:
tscope

Renders an oscilloscope for the time domain of the audio signal.

config
(
object
):
optional config with options:

align
(
boolean
):
if 1, the scope will be aligned to the first zero crossing. defaults to 1

color
(
string
):
line color as hex or color name. defaults to white.

thickness
(
number
):
line thickness. defaults to 3

scale
(
number
):
scales the y-axis. Defaults to 0.25

pos
(
number
):
y-position relative to screen height. 0 = top, 1 = bottom of screen

trigger
(
number
):
amplitude value that is used to align the scope. defaults to 0.

s("sawtooth")._scope()

Pitchwheel

Renders a pitch circle to visualize frequencies within one octave

hapcircles
(
number
):

circle
(
number
):

edo
(
number
):

root
(
string
):

thickness
(
number
):

hapRadius
(
number
):

mode
(
string
):

margin
(
number
):

n("0 .. 12").scale("C:chromatic")
.s("sawtooth")
.lpf(500)
._pitchwheel()

Spectrum

Renders a spectrum analyzer for the incoming audio signal.

config
(
object
):
optional config with options:

thickness
(
integer
):
line thickness in px (default 3)

speed
(
integer
):
scroll speed (default 1)

min
(
integer
):
min db (default -80)

max
(
integer
):
max db (default 0)

n("<0 4 <2 3> 1>*3")
.off(1/8, add(n(5)))
.off(1/5, add(n(7)))
.scale("d3:minor:pentatonic")
.s('sine')
.dec(.3).room(.5)
._spectrum()

markcss

Overrides the css of highlighted events. Make sure to use single quotes!

note("c a f e")
.markcss('text-decoration:underline')
















---

## More: Mondo Notation


































































Mondo Notation

“Mondo Notation” is a new kind of notation that is similar to
Mini Notation
, but with enough abilities to make it work as a standalone pattern language.
Here’s an example:

$ note (c2 # euclid <3 6 3> <8 16>) # *2 
# s "sine" # add (note [0 <12 24>]*2)
# dec(sine # range .2 2) 
# room .5
# lpf (sine/3 # range 120 400)
# lpenv (rand # range .5 4)
# lpq (perlin # range 5 12 # * 2)
# dist 1 # fm 4 # fmh 5.01 # fmdecay <.1 .2>
# postgain .6 # delay .1 # clip 5

$ s [bd bd bd bd] # bank tr909 # clip .5

# ply <1 [1 [2 4]]>

$ s oh*4 # press # bank tr909 # speed.8

# dec (<.02 .05>*2 # add (saw/8 # range 0 1))

Mondo in the REPL

For now, you can only use mondo in the repl like this:

mondo`s hh*8`

The rest of this site will only use the mondo notation itself.
In the future, the REPL might get a way to use mondo notation directly.

Calling Functions

Compared to Mini Notation, the most notable feature of Mondo Notation is the ability to call functions using round brackets:

(s hh*8)

The first element inside the brackets is the function name. In JS, this would look like:

s("hh*8")

The outermost parens are not needed, so we can drop them:

s hh*8

Mini Notation Features

Besides function calling with round parens, Mondo Notation has a lot in common with Mini Notation:

Brackets

[]
for 1-cycle sequences

<>
for multi-cycle sequences

{}
for stepped sequences (more on that later)

Infix Operators

* =>
fast

/ =>
slow

! =>
extend

@ =>
expand

% =>
pace

? =>
degradeBy
(currently requires right operand)

: => tail (creates a list)

.. => range (between numbers)

, =>
stack

| =>
chooseIn

Example

note <
[e5 [b4 c5] d5 [c5 b4]]
[a4 [a4 c5] e5 [d5 c5]]
[b4 [~ c5] d5 e5]
[c5 a4 a4 ~]
[[~ d5] [~ f5] a5 [g5 f5]]
[e5 [~ c5] e5 [d5 c5]]
[b4 [b4 c5] d5 e5]
[c5 a4 a4 ~]
>

Chaining Functions

Similar to how ”.” works in javascript (JS), we can chain functions calls with the ”#” operator:

n <0 2 4 [3 1] -1>*4 
# scale C4:minor 
# jux rev 
# dec .2
# delay .5

Here’s the same written in JS:

n("<0 2 4 [3 1] -1>*4")
.scale("C4:minor")
.jux(rev)
.dec(.2)
.delay(.5)

Chaining Functions Locally

A function can be applied to a single element by wrapping it in round parens:

s [bd hh bd (cp # delay .6)] # bank tr909

in this case,
delay .6
will only be applied to
cp
. compare this with the JS version:

s(seq("bd", "hh", "bd", "cp".delay(.6))).bank('tr909')

here we can see how much we can save when there’s no boundary between mini notation and function calls!

Chaining Infix Operators

Infix operators exist as regular functions, so they can be chained as well:

s [bd hh] # bank tr909 # *2

In this case, the *2 will be applied to the whole pattern.

Lambda Functions

Some functions in strudel expect a function as input, for example:

n("0 .. 7").scale("C:minor").sometimes(x=>x.dec(.1))

in mondo, the
x=>x.
can be shortened to:

n 0..7 # scale C:minor # sometimes (# dec .1)

chaining works as expected:

n 0..7 # scale C:minor # sometimes (# dec .1 # jux rev)

Strings

You can use “double quotes” and ‘single quotes’ to get a string:

n 0..7 # scale 'C minor'

Multiple Patterns

The
$
sign can be used to separate multiple patterns:

$ s [bd rim [~ bd] rim] # bank tr707
$ chord <Dm9!3 Db7> # voicing
# struct[x ~ ~ x ~ x ~ ~] # delay .5

The
$
sign is an alias for
,
so it will create a stack behind the scenes.

variables

using the
def
keyword, you can define variables:

$ def melody [0 1 2 3]
$ n melody # scale C:minor





















---

## More: Music Metadata


































































Music metadata

You can optionally add some music metadata in your Strudel code, by using tags in code comments:

// @title My Cool Song
// @by John Doe
// @license CC-BY-SA-4.0

Like other comments, those are ignored by Strudel, but it can be used by other tools to retrieve some information about the music.

Alternative syntax

You can also use comment blocks:

/*
@title My Cool Song
@by John Doe
@license CC-BY-SA-4.0
*/

Or define multiple tags in one line:

// @title My Cool Song @by John Doe @license CC-BY-SA-4.0

The
title
tag has an alternative syntax using quotes (must be defined at the very begining):

// "My Cool Song" @by John Doe

Tags list

Available tags are:

@title
: music title

@by
: music author(s), separated by comma, eventually followed with a link in
<>
(ex:
@by John Doe <https://example.com>
)

@license
: music license(s), separated by comma. Each license should be specified by using the correct identifier in the [
https://spdx.org/licenses/](SPDX
License List). Example: CC-BY-SA-4.0. Unsure?
Choose a Creative Commons license here
.

@details
: some additional information about the music

@url
: web page(s) related to the music (git repository, Soundcloud link, etc.)

@genre
: music genre(s) (pop, jazz, etc.)

@album
: music album name

@tag
: custom tag

Note to tool authors:
Never
trust that a song has filled those fields with syntactically correct values; make sure your software is robust enough it doesn’t break if it encounters bad values

Multiple values

Some of them accepts several values, using the comma or new line separator, or duplicating the tag:

/*
@by John Doe
Jane Doe
@genre pop, jazz
@url https://example.com
@url https://example.org
*/

You can also add optional prefixes and use tags where you want:

/*
song @by John Doe
samples @by Jane Doe
*/
...
note
(
"a3 c#4 e4 a4"
)
// @by Sandy Sue

Multiline

If a tag doesn’t accept a list, it can take multi-line values:

/*
@details I wrote this song in February 19th, 2023.
It was around midnight and I was lying on
the sofa in the living room.
*/

Searching meta-data in the online repl

Meta-data can be used in the search field of the patterns tab in the online repl.

For example to search for all patterns by a specific author use the search term

by: Ada L

or search for patterns with a specific genre like

genre: unicorns

Hint: If no meta-data property is provided in the search all patterns with a
@title
,
@by
or
@tag
matching the search term will be shown.













---

## More: Hydra


































































Using Hydra inside Strudel

You can write
hydra
code in strudel! All you have to do is to call
await initHydra()
at the top:

H patterns

There is a special function
H
that allows you to use a pattern as an input to hydra:

detectAudio

To use hydra audio capture, call
initHydra
with
{detectAudio:true}
configuration param:

You might now be able to see this properly here:
open in REPL

Similar to
detectAudio
, all the
available hydra options
can be passed to
initHydra
.

feedStrudel

Using the
feedStrudel
option, you can transform strudel visualizations with hydra:











---

## More: Input Devices


































































Input Devices

Strudel supports various input devices like Gamepads and MIDI controllers to manipulate patterns in real-time.

Gamepad

The Gamepad module allows you to integrate gamepad input functionality into your musical patterns. This can be particularly useful for live performances or interactive installations where you want to manipulate sounds using a game controller.

Getting Started

Initialize a gamepad by calling the gamepad() function with an optional index parameter.

// Initialize gamepad (optional index parameter, defaults to 0)
const gp = gamepad(0)
note("c a f e").mask(gp.a)

Available Controls

The gamepad module provides access to buttons and analog sticks as normalized signals (0-1) that can modulate your patterns.

Buttons

Type

Controls

Face Buttons

a
,
b
,
x
,
y
(or uppercase
A
,
B
,
X
,
Y
)


Toggle versions:
tglA
,
tglB
,
tglX
,
tglY

Shoulder Buttons

lb
,
rb
,
lt
,
rt
(or uppercase
LB
,
RB
,
LT
,
RT
)


Toggle versions:
tglLB
,
tglRB
,
tglLT
,
tglRT

D-Pad

up
,
down
,
left
,
right
(or
u
,
d
,
l
,
r
or uppercase)


Toggle versions:
tglUp
,
tglDown
,
tglLeft
,
tglRight
(or
tglU
,
tglD
,
tglL
,
tglR
)

Stick Buttons

l3
, ‘r3’ (or
ls
,
rs
)


Toggle versions:
tglL3
, ‘tglR3’ (or
tglLs
,
tglRs
)

System Buttons

start
,
back
(or uppercase
START
,
BACK
)


Toggle versions:
tglStart
,
tglBack
(or
tglSTART
,
tglBACK
)

Analog Sticks

Stick

Controls

Left Stick

x1
,
y1
(0 to 1 range)


x1_2
,
y1_2
(-1 to 1 range)

Right Stick

x2
,
y2
(0 to 1 range)


x2_2
,
y2_2
(-1 to 1 range)

Button Sequence

Stick

Controls

Button Sequence

btnSequence()
,
btnSeq()
,
btnseq()

Using Gamepad Inputs

Once initialized, you can use various gamepad inputs in your patterns. Here are some examples:

Button Inputs

You can use button inputs to control different aspects of your music, such as gain or triggering events.

const gp = gamepad(0)
setcpm(120) 
// Use button values to control amplitude
$: stack(
s("[[hh hh] oh hh oh]/2").mask(gp.tglX).bank("RolandTR909"), // X btn for HH
 s("cr*1").mask(gp.Y).bank("RolandTR909"), // LB btn for CR
s("bd").mask(gp.tglA).bank("RolandTR909"), // A btn for BD
s("[ht - - mt - - lt - ]/2").mask(gp.tglB).bank("RolandTR909"), // B btn for Toms
s("sd*4").mask(gp.RB).bank("RolandTR909"), // RB btn for SD
)

Analog Stick Inputs

Analog sticks can be used for continuous control, such as pitch shifting or panning.

const gp = gamepad(0)
setcpm(120)
// Use analog stick for continuous control
$: note("c4 d3 a3 e3").sound("sawtooth") 
.lpf(gp.x1.range(100,4000)) 
.lpq(gp.y1.range(5,30))
.decay(gp.y2.range(0.1,2))
.lpenv(gp.x2.range(-5,5))

Button Sequences

You can define button sequences to trigger specific actions, like playing a sound when a sequence is detected.

const gp = gamepad(0)
setcpm(120)
// Define button sequences
const HADOUKEN = [
'd',               // Down
'r',               // Right
'a',               // A
]
const KONAMI = 'uuddlrlrba' //Konami Code ↑↑↓↓←→←→BA

// Check butto-n sequence (returns 1 while detected, 0 when not within last 1 second)
$: s("free_hadouken -").slow(2)
.mask(gp.btnSequence(HADOUKEN)).room(1)

// hadouken.wav by Syna-Max
//https://freesound.org/people/Syna-Max/sounds/67674/
samples({free_hadouken: 'https://cdn.freesound.org/previews/67/67674_111920-lq.mp3'})

Multiple Gamepads

Strudel supports multiple gamepads. You can specify the gamepad index to connect to different devices.

const pad1 = gamepad(0);  // First gamepad
const pad2 = gamepad(1);  // Second gamepad








---

## Pattern Functions: Introduction


































































Pattern Functions

Let’s learn all about functions to create and modify patterns.
At the core of Strudel, everything is made of functions.

For example, everything you can do with the Mini-Notation can also be done with a function.
This Pattern in Mini Notation:

is equivalent to this Pattern without Mini Notation:

Similarly, there is an equivalent function for every aspect of the mini notation.

Which representation to use is a matter of context. As a rule of thumb, functions
are better suited in a larger context, while mini notation is more practical for individual rhythms.

Limits of Mini Notation

While the Mini Notation is a powerful way to write rhythms concisely, it also has its limits. Take this example:

stack(
note("c2 eb2(3,8)").s('sawtooth').cutoff(800),
s("bd(5,8), hh*8")
)

Here, we are using mini notation for the individual rhythms, while using the function
stack
to mix them.
While stack is also available as
,
in mini notation, we cannot use it here, because we have different types of sounds.

Combining Patterns

You can freely mix JS patterns, mini patterns and values! For example, this pattern:

cat(
stack("g3","b3","e4"),
stack("a3","c3","e4"),
stack("b3","d3","fs4"),
stack("b3","e4","g4")
).note()

…is equivalent to:

cat(
"g3,b3,e4",
"a3,c3,e4",
"b3,d3,f#4",
"b3,e4,g4"
).note()

… as well as:

While mini notation is almost always shorter, it only has a handful of modifiers: * / ! @.
When using JS patterns, there is a lot more you can do.

Next, let’s look at how you can
create patterns










---

## Pattern Functions: Creating Patterns


































































Creating Patterns

The following functions will return a pattern.
These are the equivalents used by the Mini Notation:

function

mini

cat(x, y)

"<x y>"

seq(x, y)

"x y"

stack(x, y)

"x,y"

stepcat([3,x],[2,y])

"x@3 y@2"

polymeter([a, b, c], [x, y])

"{a b c, x y}"

polymeterSteps(2, x, y, z)

"{x y z}%2"

silence

"~"

cat
Synonyms:
slowcat

The given items are con
cat
enated, where each one takes one cycle.

items
(
any
):
The items to concatenate

cat("e5", "b4", ["d5", "c5"]).note()
// "<e5 b4 [d5 c5]>".note()

// As a chained function:
s("hh*4").cat(
   note("c4(5,8)")
)

seq
Synonyms:
fastcat

Like
cat
, but the items are crammed into one cycle.

seq("e5", "b4", ["d5", "c5"]).note()
// "e5 b4 [d5 c5]".note()

// As a chained function:
s("hh*4").seq(
  note("c4(5,8)")
)

stack
Synonyms:
polyrhythm, pr

The given items are played at the same time at the same length.

stack("g3", "b3", ["e4", "d4"]).note()
// "g3,b3,[e4 d4]".note()

// As a chained function:
s("hh*4").stack(
  note("c4(5,8)")
)

stepcat
Synonyms:
timeCat, timecat

'Concatenates' patterns like
fastcat
, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias
timecat
.

stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()

stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()

arrange

Allows to arrange multiple patterns together over multiple cycles.
Takes a variable number of arrays with two elements specifying the number of cycles and the pattern to use.

arrange(
  [4, "<c a f e>(3,8)"],
  [2, "<g a>(5,8)"]
).note()

polymeter
Synonyms:
pm

Experimental

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

// The same as note("{c eb g, c2 g2}%6")
polymeter("c eb g", "c2 g2").note()

polymeterSteps

silence

Does absolutely nothing..

silence // "~"

run

A discrete pattern of numbers from 0 to n-1

n(run(4)).scale("C4:pentatonic")
// n("0 1 2 3").scale("C4:pentatonic")

binary

Creates a binary pattern from a number.

n
(
number
):
input number to convert to binary

"hh".s().struct(binary(5))
// "hh".s().struct("1 0 1")

binaryN

Creates a binary pattern from a number, padded to n bits long.

n
(
number
):
input number to convert to binary

nBits
(
number
):
pattern length, defaults to 16

"hh".s().struct(binaryN(55532, 16))
// "hh".s().struct("1 1 0 1 1 0 0 0 1 1 1 0 1 1 0 0")

After Pattern Constructors, let’s see what
Time Modifiers
are available.



















---

## Pattern Functions: Time Modifiers


































































Time Modifiers

The following functions modify a pattern temporal structure in some way.
Some of these have equivalent operators in the Mini Notation:

function

mini

"x".slow(2)

"x/2"

"x".fast(2)

"x*2"

"x".euclid(3,8)

"x(3,8)"

"x".euclidRot(3,8,1)

"x(3,8,1)"

slow
Synonyms:
sparsity

Slow down a pattern over the given number of cycles. Like the "/" operator in mini notation.

factor
(
number|Pattern
):
slow down factor

s("bd hh sd hh").slow(2) // s("[bd hh sd hh]/2")

fast
Synonyms:
density

Speed up a pattern by the given factor. Used by "*" in mini notation.

factor
(
number|Pattern
):
speed up factor

s("bd hh sd hh").fast(2) // s("[bd hh sd hh]*2")

early

Nudge a pattern to start earlier in time. Equivalent of Tidal's <~ operator

cycles
(
number|Pattern
):
number of cycles to nudge left

"bd ~".stack("hh ~".early(.1)).s()

late

Nudge a pattern to start later in time. Equivalent of Tidal's ~> operator

cycles
(
number|Pattern
):
number of cycles to nudge right

"bd ~".stack("hh ~".late(.1)).s()

clip / legato
Synonyms:
legato

Multiplies the duration with the given number. Also cuts samples off at the end if they exceed the duration.

factor
(
number|Pattern
):
= 0

note("c a f e").s("piano").clip("<.5 1 2>")

euclid

Changes the structure of the pattern to form an Euclidean rhythm.
Euclidean rhythms are rhythms obtained using the greatest common
divisor of two numbers.  They were described in 2004 by Godfried
Toussaint, a Canadian computer scientist.  Euclidean rhythms are
really useful for computer/algorithmic music because they can
describe a large number of rhythms with a couple of numbers.

pulses
(
number
):
the number of onsets/beats

steps
(
number
):
the number of steps to fill

// The Cuban tresillo pattern.
note("c3").euclid(3,8)

euclidRot

Like
euclid
, but has an additional parameter for 'rotating' the resulting sequence.

pulses
(
number
):
the number of onsets/beats

steps
(
number
):
the number of steps to fill

rotation
(
number
):
offset in steps

// A Samba rhythm necklace from Brazil
note("c3").euclidRot(3,16,14)

euclidLegato

Similar to
euclid
, but each pulse is held until the next pulse,
so there will be no gaps.

pulses
(
number
):
the number of onsets/beats

steps
(
number
):
the number of steps to fill

rotation
(
):
offset in steps

pat
(
):

note("c3").euclidLegato(3,8)

rev

Reverse all cycles in a pattern. See also
revv
for reversing a whole pattern.

note("c d e g").rev()

palindrome

Applies
rev
to a pattern every other cycle, so that the pattern alternates between forwards and backwards.

note("c d e g").palindrome()

iter

Divides a pattern into a given number of subdivisions, plays the subdivisions in order, but increments the starting subdivision each cycle. The pattern wraps to the first subdivision after the last subdivision is played.

note("0 1 2 3".scale('A minor')).iter(4)

iterBack
Synonyms:
iterback

Like
iter
, but plays the subdivisions in reverse order. Known as iter' in tidalcycles

note("0 1 2 3".scale('A minor')).iterBack(4)

ply

The ply function repeats each event the given number of times.

s("bd ~ sd cp").ply("<1 2 3>")

segment
Synonyms:
seg

Samples the pattern at a rate of n events per cycle. Useful for turning a continuous pattern into a discrete one.

segments
(
number
):
number of segments per cycle

note(saw.range(40,52).segment(24))

compress

Compress each cycle into the given timespan, leaving a gap

cat(
  s("bd sd").compress(.25,.75),
  s("~ bd sd ~")
)

zoom

Plays a portion of a pattern, specified by the beginning and end of a time span. The new resulting pattern is played over the time period of the original pattern:

s("bd*2 hh*3 [sd bd]*2 perc").zoom(0.25, 0.75)
// s("hh*3 [sd bd]*2") // equivalent

linger

Selects the given fraction of the pattern and repeats that part to fill the remainder of the cycle.

fraction
(
number
):
fraction to select

s("lt ht mt cp, [hh oh]*2").linger("<1 .5 .25 .125>")

fastGap
Synonyms:
fastgap

speeds up a pattern like fast, but rather than it playing multiple times as fast would it instead leaves a gap in the remaining space of the cycle. For example, the following will play the sound pattern "bd sn" only once but compressed into the first half of the cycle, i.e. twice as fast.

s("bd sd").fastGap(2)

inside

Carries out an operation 'inside' a cycle.

"0 1 2 3 4 3 2 1".inside(4, rev).scale('C major').note()
// "0 1 2 3 4 3 2 1".slow(4).rev().fast(4).scale('C major').note()

outside

Carries out an operation 'outside' a cycle.

"<[0 1] 2 [3 4] 5>".outside(4, rev).scale('C major').note()
// "<[0 1] 2 [3 4] 5>".fast(4).rev().slow(4).scale('C major').note()

cpm

Plays the pattern at the given cycles per minute.

s("<bd sd>,hh*2").cpm(90) // = 90 bpm

ribbon
Synonyms:
rib

Loops the pattern inside an
offset
for
cycles
.
If you think of the entire span of time in cycles as a ribbon, you can cut a single piece and loop it.

offset
(
number
):
start point of loop in cycles

cycles
(
number
):
loop length in cycles

note("<c d e f>").ribbon(1, 2)

// Looping a portion of randomness
n(irand(8).segment(4)).scale("c:pentatonic").ribbon(1337, 2)

// rhythm generator
s("bd!16?").ribbon(29,.5)

swingBy

The function
swingBy x n
breaks each cycle into
n
slices, and then delays events in the second half of each slice by the amount
x
, which is relative to the size of the (half) slice. So if
x
is 0 it does nothing,
0.5
delays for half the note duration, and 1 will wrap around to doing nothing again. The end result is a shuffle or swing-like rhythm

subdivision
(
number
):

offset
(
number
):

s("hh*8").swingBy(1/3, 4)

swing

Shorthand for swingBy with 1/3:

subdivision
(
number
):

s("hh*8").swing(4)
// s("hh*8").swingBy(1/3, 4)

Apart from modifying time, there are ways to
Control Parameters
.
































---

## Pattern Functions: Control Parameters


































































Control Parameters

Besides functions that control time, we saw earlier that functions like
note
and
cutoff
control different parameters (short params) of an event.
Let’s now look more closely at how these
param(eter) functions
work.

Parameter Functions

A very powerful feature of tidal patterns is that each parameter can be controlled independently:

In this example, the parameters
note
,
cutoff
,
gain
and
s
are controlled independently by either patterns or plain values (numbers / text).
After pressing play, we can observe the time and parameter values of each event (hap) in the output created by
.log()
.

Plain vs Parameterized Values

Patterns that are not wrapped inside a param function will contain unlabeled
plain values
:

This will not generate any sound output, because Strudel could only guess which param is meant by these letters.

Now compare that to the version wrapped in
note
:

Now it is clear that these letters are meant to be played as notes.
Under the hood, the
note
function (as well as all other param functions)
will wrap each plain value in an object. If the note function did not exist, we would need to write:

This will have the same output, though it is rather unwieldy to read and write.

Wrapping Parameter Functions

To avoid too much nesting, param functions can also be chained like this:

This is equivalent to
note(cat('c','e','g')).log()
.

You can use this with any function that declares a type (like
n
,
s
,
note
,
freq
etc), just make sure to leave the parens empty!

Plain Value Modification

Patterns of plain values can be modified with any of the following operators:

Here, the add function modifies the numbers on the left.
Again, there is no output because these numbers have no meaning without a param.

Param Value Modification

To modify a parameter value, you can either:


Use the operator on the plain value pattern, inside the param function:


Similarly, use the operator on the plain value pattern and wrap it later:


Specify which param should be modified inside the operator function:

Remember the execution of the chained functions goes from left to right.

Operators

This group of functions allows to modify the value of events.

add

Assumes a pattern of numbers. Adds the given number to each item in the pattern.

// Here, the triad 0, 2, 4 is shifted by different amounts
n("0 2 4".add("<0 3 4 0>")).scale("C:major")
// Without add, the equivalent would be:
// n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")

// You can also use add with notes:
note("c3 e3 g3".add("<0 5 7 0>"))
// Behind the scenes, the notes are converted to midi numbers:
// note("48 52 55".add("<0 5 7 0>"))

sub

Like add, but the given numbers are subtracted.

n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
// See add for more information.

mul

Multiplies each number by the given factor.

"<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()

div

Divides each number by the given factor.

round

Assumes a numerical pattern. Returns a new pattern with all values rounded
to the nearest integer.

n("0.5 1.5 2.5".round()).scale("C:major")

floor

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical floor. E.g.
3.7
replaced with to
3
, and
-4.2
replaced with
-5
.

note("42 42.1 42.5 43".floor())

ceil

Assumes a numerical pattern. Returns a new pattern with all values set to
their mathematical ceiling. E.g.
3.2
replaced with
4
, and
-4.2
replaced with
-4
.

note("42 42.1 42.5 43".ceil())

range

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1.
Returns a new pattern with values scaled to the given min/max range.
Most useful in combination with continuous patterns.

s("[bd sd]*2,hh*8")
.cutoff(sine.range(500,4000))

rangex

Assumes a numerical pattern, containing unipolar values in the range 0 .. 1
Returns a new pattern with values scaled to the given min/max range,
following an exponential curve.

s("[bd sd]*2,hh*8")
.cutoff(sine.rangex(500,4000))

range2

Assumes a numerical pattern, containing bipolar values in the range -1 .. 1
Returns a new pattern with values scaled to the given min/max range.

s("[bd sd]*2,hh*8")
.cutoff(sine2.range2(500,4000))

ratio

Allows dividing numbers via list notation using ":".
Returns a new pattern with just numbers.

ratio("1, 5:4, 3:2").mul(110)
.freq().s("piano")

as

Sets properties in a batch.

mapping
(
String|Array
):
the control names that are set

"c:.5 a:1 f:.25 e:.8".as("note:clip")

"{0@2 0.25 0 0.5 .3 .5}%8".as("begin").s("sax_vib").clip(1)

Custom Parameters

You can also create your own parameters:

Multiple params can also be created in a more consice way, using
createParams
:

Note that these params will not do anything until you give them meaning in your custom output!

From modifying parameters we transition to the concept of
Signals
.



























---

## Pattern Functions: Signals


































































Continuous Signals

Signals are patterns with continuous values, meaning they have theoretically infinite steps.
They can provide streams of numbers that can be sampled at discrete points in time.

saw

A sawtooth signal between 0 and 1.

note("<c3 [eb3,g3] g2 [g3,bb3]>*8")
.clip(saw.slow(2))

n(saw.range(0,8).segment(8))
.scale('C major')

sine

A sine signal between 0 and 1.

n(sine.segment(16).range(0,15))
.scale("C:minor")

cosine

A cosine signal between 0 and 1.

n(stack(sine,cosine).segment(16).range(0,15))
.scale("C:minor")

tri

A triangle signal between 0 and 1.

n(tri.segment(8).range(0,7)).scale("C:minor")

square

A square signal between 0 and 1.

n(square.segment(4).range(0,7)).scale("C:minor")

rand

A continuous pattern of random numbers, between 0 and 1.

// randomly change the cutoff
s("bd*4,hh*8").cutoff(rand.range(500,8000))

Ranges from -1 to 1

There is also
saw2
,
sine2
,
cosine2
,
tri2
,
square2
and
rand2
which have a range from -1 to 1!

perlin

Generates a continuous pattern of
perlin noise
, in the range 0..1.

// randomly change the cutoff
s("bd*4,hh*8").cutoff(perlin.range(500,8000))

irand

A continuous pattern of random integers, between 0 and n-1.

n
(
number
):
max value (exclusive)

// randomly select scale notes from 0 - 7 (= C to C)
n(irand(8)).struct("x x*2 x x*3").scale("C:minor")

brand

A continuous pattern of 0 or 1 (binary random)

s("hh*10").pan(brand)

brandBy

A continuous pattern of 0 or 1 (binary random), with a probability for the value being 1

probability
(
number
):
a number between 0 and 1

s("hh*10").pan(brandBy(0.2))

mouseX

The mouse's x position value ranges from 0 to 1.

n(mousex.segment(4).range(0,7)).scale("C:minor")

mouseY

The mouse's y position value ranges from 0 to 1.

n(mousey.segment(4).range(0,7)).scale("C:minor")

Next up:
Random Modifiers





















---

## Pattern Functions: Random Modifiers


































































Random Modifiers

These methods add random behavior to your Patterns.

choose

Chooses randomly from the given list of elements.

xs
(
any
):
values / patterns to choose from.

note("c2 g2!2 d2 f1").s(choose("sine", "triangle", "bd:6"))

wchoose

Chooses randomly from the given list of elements by giving a probability to each element

pairs
(
any
):
arrays of value and weight

note("c2 g2!2 d2 f1").s(wchoose(["sine",10], ["triangle",1], ["bd:6",1]))

chooseCycles
Synonyms:
randcat

Picks one of the elements at random each cycle.

chooseCycles("bd", "hh", "sd").s().fast(8)

s("bd | hh | sd").fast(8)

wchooseCycles
Synonyms:
wrandcat

Picks one of the elements at random each cycle by giving a probability to each element

wchooseCycles(["bd",10], ["hh",1], ["sd",1]).s().fast(8)

wchooseCycles(["c c c",5], ["a a a",3], ["f f f",1]).fast(4).note()

// The probability can itself be a pattern
wchooseCycles(["bd(3,8)","<5 0>"], ["hh hh hh",3]).fast(4).s()

degradeBy

Randomly removes events from the pattern by a given amount.
0 = 0% chance of removal
1 = 100% chance of removal

amount
(
number
):
a number between 0 and 1

s("hh*8").degradeBy(0.2)

s("[hh?0.2]*8")

//beat generator
s("bd").segment(16).degradeBy(.5).ribbon(16,1)

degrade

Randomly removes 50% of events from the pattern. Shorthand for
.degradeBy(0.5)

s("hh*8").degrade()

s("[hh?]*8")

undegradeBy

Inverse of
degradeBy
: Randomly removes events from the pattern by a given amount.
0 = 100% chance of removal
1 = 0% chance of removal
Events that would be removed by degradeBy are let through by undegradeBy and vice versa (see second example).

amount
(
number
):
a number between 0 and 1

s("hh*8").undegradeBy(0.2)

s("hh*10").layer(
  x => x.degradeBy(0.2).pan(0),
  x => x.undegradeBy(0.8).pan(1)
)

undegrade

Inverse of
degrade
: Randomly removes 50% of events from the pattern. Shorthand for
.undegradeBy(0.5)
Events that would be removed by degrade are let through by undegrade and vice versa (see second example).

s("hh*8").undegrade()

s("hh*10").layer(
  x => x.degrade().pan(0),
  x => x.undegrade().pan(1)
)

sometimesBy

Randomly applies the given function by the given probability.
Similar to
someCyclesBy

probability
(
number|Pattern
):
a number between 0 and 1

function
(
function
):
the transformation to apply

s("hh*8").sometimesBy(.4, x=>x.speed("0.5"))

sometimes

Applies the given function with a 50% chance

function
(
function
):
the transformation to apply

s("hh*8").sometimes(x=>x.speed("0.5"))

someCyclesBy

Randomly applies the given function by the given probability on a cycle by cycle basis.
Similar to
sometimesBy

probability
(
number|Pattern
):
a number between 0 and 1

function
(
function
):
the transformation to apply

s("bd,hh*8").someCyclesBy(.3, x=>x.speed("0.5"))

someCycles

Shorthand for
.someCyclesBy(0.5, fn)

s("bd,hh*8").someCycles(x=>x.speed("0.5"))

often

Shorthand for
.sometimesBy(0.75, fn)

s("hh*8").often(x=>x.speed("0.5"))

rarely

Shorthand for
.sometimesBy(0.25, fn)

s("hh*8").rarely(x=>x.speed("0.5"))

almostNever

Shorthand for
.sometimesBy(0.1, fn)

s("hh*8").almostNever(x=>x.speed("0.5"))

almostAlways

Shorthand for
.sometimesBy(0.9, fn)

s("hh*8").almostAlways(x=>x.speed("0.5"))

never

Shorthand for
.sometimesBy(0, fn)
(never calls fn)

s("hh*8").never(x=>x.speed("0.5"))

always

Shorthand for
.sometimesBy(1, fn)
(always calls fn)

s("hh*8").always(x=>x.speed("0.5"))

Next up:
Conditional Modifiers


























---

## Pattern Functions: Conditional Modifiers


































































Conditional Modifiers

lastOf

Applies the given function every n cycles, starting from the last cycle.

n
(
number
):
how many cycles

func
(
function
):
function to apply

note("c3 d3 e3 g3").lastOf(4, x=>x.rev())

firstOf

Applies the given function every n cycles, starting from the first cycle.

n
(
number
):
how many cycles

func
(
function
):
function to apply

note("c3 d3 e3 g3").firstOf(4, x=>x.rev())

when

Applies the given function whenever the given pattern is in a true state.

binary_pat
(
Pattern
):

func
(
function
):

"c3 eb3 g3".when("<0 1>/2", x=>x.sub("5")).note()

chunk
Synonyms:
slowChunk, slowchunk

Divides a pattern into a given number of parts, then cycles through those parts in turn, applying the given function to each part in turn (one part per cycle).

"0 1 2 3".chunk(4, x=>x.add(7))
.scale("A:minor").note()

chunkBack
Synonyms:
chunkback

Like
chunk
, but cycles through the parts in reverse order. Known as chunk' in tidalcycles

"0 1 2 3".chunkBack(4, x=>x.add(7))
.scale("A:minor").note()

fastChunk
Synonyms:
fastchunk

Like
chunk
, but the cycles of the source pattern aren't repeated
for each set of chunks.

"<0 8> 1 2 3 4 5 6 7"
.scale("C2:major").note()
.fastChunk(4, x => x.color('red')).slow(2)

arp

Selects indices in in stacked notes.

note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arp("0 [0,2] 1 [0,2]")

arpWith 🧪

Selects indices in in stacked notes.

note("<[c,eb,g]!2 [c,f,ab] [d,f,ab]>")
.arpWith(haps => haps[2])

struct

Applies the given structure to the pattern:

note("c,eb,g")
  .struct("x ~ x ~ ~ x ~ x ~ ~ ~ x ~ x ~ ~")
  .slow(2)

mask

Returns silence when mask is 0 or "~"

note("c [eb,g] d [eb,g]").mask("<1 [0 1]>")

reset

Resets the pattern to the start of the cycle for each onset of the reset pattern.

s("[<bd lt> sd]*2, hh*8").reset("<x@3 x(5,8)>")

restart

Restarts the pattern for each onset of the restart pattern.
While reset will only reset the current cycle, restart will start from cycle 0.

s("[<bd lt> sd]*2, hh*8").restart("<x@3 x(5,8)>")

hush

Silences a pattern.

stack(
  s("bd").hush(),
  s("hh*3")
)

invert
Synonyms:
inv

Swaps 1s and 0s in a binary pattern.

s("bd").struct("1 0 0 1 0 0 1 0".lastOf(4, invert))

pick

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to
inhabit
, but maintains the structure of the original patterns.

pat
(
Pattern
):

xs
(
*
):

note("<0 1 2!2 3>".pick(["g a", "e f", "f g f g" , "g c d"]))

sound("<0 1 [2,0]>".pick(["bd sd", "cp cp", "hh hh"]))

sound("<0!2 [0,1] 1>".pick(["bd(3,8)", "sd sd"]))

s("<a!2 [a,b] b>".pick({a: "bd(3,8)", b: "sd sd"}))

pickmod

The same as
pick
, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

pat
(
Pattern
):

xs
(
*
):

pickF

pickF lets you use a pattern of numbers to pick which function to apply to another pattern.

pat
(
Pattern
):

lookup
(
Pattern
):
a pattern of indices or names

lookup
(
Array.<function()>|object
):
the array or lookup object of functions from which to pull

s("bd [rim hh]").pickF("<0 1 2>", [rev,jux(rev),fast(2)])

note("<c2 d2>(3,8)").s("square")
.pickF("<0 2> 1", [jux(rev), fast(2), x=>x.lpf(800)])

note("<c2 d2>(3,8)").s("square")
.pickF("<jr l> f", { jr:jux(rev), f:fast(2), l:x=>x.lpf(800) })

pickmodF

The same as
pickF
, but if you pick a number greater than the size of the functions list,
it wraps around, rather than sticking at the maximum value.

pat
(
Pattern
):

lookup
(
Pattern
):
a pattern of indices or names

lookup
(
Array.<function()>|object
):
the array or lookup object of functions from which to pull

pickRestart

Similar to
pick
, but the choosen pattern is restarted when its index is triggered.

pat
(
Pattern
):

xs
(
*
):

pickmodRestart

The same as
pickRestart
, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

pat
(
Pattern
):

xs
(
*
):

"<a@2 b@2 c@2 d@2>".pickRestart({
        a: n("0 1 2 0"),
        b: n("2 3 4 ~"),
        c: n("[4 5] [4 3] 2 0"),
        d: n("0 -3 0 ~")
      }).scale("C:major").s("piano")

pickReset

Similar to
pick
, but the choosen pattern is reset when its index is triggered.

pat
(
Pattern
):

xs
(
*
):

pickmodReset

The same as
pickReset
, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.

pat
(
Pattern
):

xs
(
*
):

inhabit
Synonyms:
pickSqueeze

Picks patterns (or plain values) either from a list (by index) or a lookup table (by name).
Similar to
pick
, but cycles are squeezed into the target ('inhabited') pattern.

pat
(
Pattern
):

xs
(
*
):

let a = s("bd(3,8)")
let b = s("cp sd")
"<a b [a,b]>".inhabit({ a, b })

s("a@2 [a b] a"
.inhabit({a: "bd(3,8)", b: "sd sd"}))
.slow(4)

inhabitmod
Synonyms:
pickmodSqueeze

The same as
inhabit
, but if you pick a number greater than the size of the list,
it wraps around, rather than sticking at the maximum value.
For example, if you pick the fifth pattern of a list of three, you'll get the
second one.

pat
(
Pattern
):

xs
(
*
):

squeeze

Pick from the list of values (or patterns of values) via the index using the given
pattern of integers. The selected pattern will be compressed to fit the duration of the selecting event

pat
(
Pattern
):

xs
(
*
):

note(squeeze("<0@2 [1!2] 2>", ["g a", "f g f g" , "g a c d"]))

After Conditional Modifiers, let’s see what
Accumulation Modifiers
have to offer.

































---

## Pattern Functions: Accumulation


































































Accumulation Modifiers

superimpose

Superimposes the result of the given function(s) on top of the original pattern:

"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .superimpose(x=>x.add(2))
  .scale('C minor').note()

layer

Layers the result of the given function(s). Like
superimpose
, but without the original pattern:

"<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
  .layer(x=>x.add("0,2"))
  .scale('C minor').note()

off

Superimposes the function result on top of the original pattern, delayed by the given time.

time
(
Pattern|number
):
offset time

func
(
function
):
function to apply

"c3 eb3 g3".off(1/8, x=>x.add(7)).note()

echo

Superimpose and offset multiple times, gradually decreasing the velocity

times
(
number
):
how many times to repeat

time
(
number
):
cycle offset between iterations

feedback
(
number
):
velocity multiplicator for each iteration

s("bd sd").echo(3, 1/6, .8)

echoWith
Synonyms:
echowith, stutWith, stutwith

Superimpose and offset multiple times, applying the given function each time.

times
(
number
):
how many times to repeat

time
(
number
):
cycle offset between iterations

func
(
function
):
function to apply, given the pattern and the iteration index

"<0 [2 4]>"
.echoWith(4, 1/8, (p,n) => p.add(n*2))
.scale("C:minor").note()

stut

Deprecated. Like echo, but the last 2 parameters are flipped.

times
(
number
):
how many times to repeat

feedback
(
number
):
velocity multiplicator for each iteration

time
(
number
):
cycle offset between iterations

s("bd sd").stut(3, .8, 1/6)

There are also
Tonal Functions
.














---

## Pattern Functions: LFOs


































































Low frequency oscillators (LFO)

A low frequency oscillator (or short LFO) is a common way on synthesizers to continuously modulate various signals.

This documentation is an interactive version of glossing’s tutorial
https://www.youtube.com/watch?v=11frBA9L638

Signals vs LFOs

In Strudel, there are two ways to modulate:

signals
for pattern-level modulation

lfo
(this page) for audio-level modulation

Applying an LFO

Here, the LFO will change the frequency of the
saw
. Put a comment like this
//.lfo()
to see and hear how it changes, and remove the comment again.

s("saw").lfo() 
.lpf(800)
._spectrum({height: 300, width: 800})

By default, the LFO will modulate the control parameter which is right before
.lfo()
:

s("saw")
.lpf(800).lfo() 
._spectrum({height: 300, width: 800})

Here, the LFO will modulate the low pass filter
.lpf
.

Moving away from the default

The following sections explain how pass parameters to
.lfo
. Similar to
._spectrum
above, almost all the configuration of
lfo
lives inside a json object, starting with
{
and ending with
}
.
All the parameters (except
id
) are written as
key: value
inside and separated by
,
.

The reference refers to them as
config.key
, i.e. for the following one as
config.control
but you use them like below.

Control

control
determines which parameter will be modulated. This allows you to place your
lfo
at different places,
not necessarily immediately after the controlled parameter.

Here, we place
lfo
after the
s
, but it modulates the low pass filter.

s("saw")
.lfo({control:'lpf'})
.lpf(800)
._spectrum({height: 300, width: 800})

You can even influence parameters which are always present, even if you haven’t explicitly written them, like
gain
.

s("saw")
.lfo({control:'gain'})
.lpf(800)
._spectrum({height: 300, width: 800})

control
has an alias
c
.

Rate

rate
determines how often the
lfo
oscillates per second:

s("saw")
.lfo({c:'gain', rate:"<2 4>"})
.lpf(800)
._spectrum({height: 300, width: 800})

The alias of
rate
is
r
.

Sync

Instead of controlling the frequency with
rate
by setting a frequency in Hz, you can use
sync
to snychronize your lfo with your other patterns.

sync
expresses this frequency as “times per cycle”

Try removing the
sync: "<2 4 8 0.5 >"
from the pattern and notice that there is something not in sync.

$: s("bd*4").bank("TR909").postgain(0.5)
$: s("saw")
.lpf(800)
.lfo({sync: "<2 4 8 0.5 >"})
._spectrum({height: 300, width: 800})

You can put patterns into the parameters of
lfo
if you want them to change over time, as seen above.

Relative Depth

.depth
is relative depth, a value of 1 (the default) means that
the value goes above and below by half of the value which is being modulated

E.g. for depth
1
, it modulates the frequency to oscillate between 32 = (64/2) and 96 (= 64 + 64/2).

s("saw").freq(64)
.lfo({r: 2, depth: "<1 2 3>"})
.lpf(800)
._spectrum({height: 300, width: 800})

The
freq
is not needed here, as this is the default frequency, it’s just for instructive purposes.

The aliases of
depth
are
dr
and
dep
.

Absolute Depth

depthabs
controls the absolute modulation depth. For example you can modulate
the low pass filter by exactly 250 Hz up and below:

s("saw")
.lpf(800)
.lfo({r: 2, depthabs: "250"})

The alias of
depthabs
is
da
.

DC offset

If you don’t want to go up or down by the same amount with your modulation, then you can shift the center of the modulation with
dcoffset
.
The default value is -0.5, which is the middle point between:
“dcoffset = 0: All modulations increase the control parameter (or keep it constant)”
“dcoffset = -1: All modulations decrease the control parameter (or keep it constant)”

Other values will work as well.

s("saw")
.lpf(600)
.lfo({r: 2, da: "200", dcoffset: "<-0.5 -1 -0.5 0>"})

The marvellous alias of
dcoffset
is
dc
.

Shape

You can change the shape of the modulation with
shape
. The default is
triangle
, but other shapes are available too:

s("saw")
.lpf(800)
.lfo({r: 2, shape: "<triangle sine ramp saw square>"})

You can add
._spectrum()
to see the shape of the modulations in the spectrum.

You can also get these shapes by using numbers:

Shape

number

triangle

0

sine

1

ramp

2

saw

3

square

4

this way, you can use a function like
irand
to generate numbers:

s("saw")
.lpf(800)
.lfo({r: 2, shape: irand(4)})

The alias of
shape
is
sh
.

Skewing some shapes

You can influence some of the shapes (
triangle
and
square
) in more detail.

The default skew is 0.5, it does different things for these two.

For
triangle
, it skews the top of the triangle to the left or right,
where 0 makes it look like
saw
and 1 makes it look like
ramp
.

For
square
, the skew influences the pulse width (see reference for
pulse
and
.pw
):

s("saw")
.lpf(800)
.lfo({r: 2, sh: "<triangle square>/5", 
  skew: "<0 0.25 0.5 0.75 1>"})

The alias of
skew
is
sk
.

Curve

You can change the curves of your lfo and can make it more intense.
The default value is 1. Writing numbers greater than one can make it more intense,
numbers between 0 and 1 will make it less intense.
This will raise the lfo to the power of curve, so larger numbers (such as 10) can have very unexpected results.

s("saw")
.lpf(800)
.lfo({r: 2, sh: "<triangle>", curve: "<1.3 1 0.75 1>"})

Referencing your lfos with id

All the lfos are numbered from the first starting with 0, the second having an
id
of 1 and so on.

You can refer to this in a later call if you want to modify a specific
lfo
.

The
id
is outside of the config json (which is different from the other parameters of
lfo()

Try out how the sound changes when you replace the 0 with a 1.

s("saw").lfo().lpf(800)
.lfo({s: "<4 8 0.5>"})
.sometimes(x => x.lfo({dr: "4"},0))

You can also name your lfos and refer to them by name, using the
id
parameter

s("saw").lfo({}, "lfo_freq_saw").lpf(800)
.lfo({s: "<4 8 0.5>"}, "lfo_lpf")
.sometimes(x => x.lfo({dr: "4"},"<lfo_lpf lfo_freq_saw>"))

FX index

If you are using
FX()
to reorder your effects, you dont need to write your lfos inside the
FX
,
but instead can refer to them by their FX index (starting with 0)

s("saw").FX(
distort(3),
gain(0.3), // this has the fx index 1
lpf(400)
).lfo({s: 16, dr:2, c:"gain", fxi: 1})

Modulating other LFOs with Sub-control

LFOs can modulate other lfos and will modulate their frequency (given by
r
or
s
):

s("saw").lpf(400).gain(0.8)
.lfo({s: 16, dr:2, c:"gain"})
.lfo({s: 0.3, dc:-1, dr: 0.8})

To modulate other parameters of the first lfo (like
skew
,
depth
and so on), we can specify this with
subControl
or
its alias
sc

s("saw").lpf(400).gain(0.8)
.lfo({s: 4, dr:2, c:"gain"})
.lfo({s: 0.3, sc: "skew"})























---

## Pattern Functions: Tonal Functions


































































Tonal Functions

These functions use
tonaljs
to provide helpers for musical operations.

voicing()

Turns chord symbols into voicings. You can use the following control params:

chord
: Note, followed by chord symbol, e.g. C Am G7 Bb^7

dict
: voicing dictionary to use, falls back to default dictionary

anchor
: the note that is used to align the chord

mode
: how the voicing is aligned to the anchor

below
: top note <= anchor

duck
: top note <= anchor, anchor excluded

above
: bottom note >= anchor

offset
: whole number that shifts the voicing up or down to the next voicing

n
: if set, the voicing is played like a scale. Overshooting numbers will be octaved

All of the above controls are optional, except
chord
.
If you pass a pattern of strings to voicing, they will be interpreted as chords.

n("0 1 2 3").chord("<C Am F G>").voicing()

Here’s an example of how you can play chords and a bassline:

chord("<C^7 A7b13 Dm7 G7>*2")
.dict('ireal').layer(
x=>x.struct("[~ x]*2").voicing()
,
x=>n("0*4").set(x).mode("root:g2").voicing()
.s('sawtooth').cutoff("800:4:2")
)

scale(name)

Turns numbers into notes in the scale (zero indexed) or quantizes notes to a scale.

When describing notes via numbers, note that negative numbers can be used to wrap backwards
in the scale as well as sharps or flats to produce notes outside of the scale.

Also sets scale for other scale operations, like
Pattern#scaleTranspose
.

A scale consists of a root note (e.g.
c4
,
c
,
f#
,
bb4
) followed by semicolon (':') and then a
scale type
.

The scale name must be written without spaces (because it would be interpreted as a multi-step pattern otherwise).
If your scale name includes spaces, replace them with colons.

The root note defaults to octave 3, if no octave number is given.

scale
(
string
):
Name of scale

n("0 2 4 6 4 2").scale("C:major")

n("[0,7] 4 [2,7] 4")
.scale("C:<major minor>/2")
.s("piano")

n(rand.range(0,12).segment(8))
.scale("C:ritusen")
.s("piano")

n("<[0,7b] [-4# -4] [-2,7##] 4 [0,7] [-4# -4b] [-2,7###] 4b>*4")
.scale("C:<major minor>/2")
.s("piano")

note("C1*16").transpose(irand(36)).scale('Cb2 major').scaleTranspose(3)

n("[0 0] [1 2] [3 4] [5 6]").scale("C:major:blues")

transpose(semitones)

Transposes all notes to the given number of semitones:

This method gets really exciting when we use it with a pattern as above.

Instead of numbers, scientific interval notation can be used as well:

scaleTranspose(steps)

Transposes notes inside the scale by the number of steps:

"[-8 [2,4,6]]*2"
.scale('C4 bebop major')
.scaleTranspose("<0 -1 -2 -3 -4 -5 -6 -4>*2")
.note()

rootNotes(octave = 2)

Turns chord symbols into root notes of chords in given octave.

Together with layer, struct and voicings, this can be used to create a basic backing track:

"<C^7 A7b13 Dm7 G7>*2".layer(
x => x.voicings('lefthand').struct("[~ x]*2").note(),
x => x.rootNotes(2).note().s('sawtooth').cutoff(800)
)













---

## Pattern Functions: Stepwise Functions


































































Stepwise patterning (experimental)

This is a developing area of strudel, and behaviour might change or be renamed in future versions. Feedback and ideas are welcome!

Introduction

Usually in strudel, the only reference point for most pattern transformations is the
cycle
. Now it is possible to also work with
steps
, via a growing range of functions.

For example usually when you
fastcat
two patterns together, the cycles will be squashed into half a cycle each:

fastcat("bd hh hh", "bd hh hh cp hh").sound()

With the new stepwise
stepcat
function, the steps of the two patterns will be evenly distributed across the cycle:

stepcat("bd hh hh", "bd hh hh cp hh").sound()

By default, steps are counted according to the ‘top level’ in mini-notation. For example
"a [b c] d e"
has five events in it per cycle, but is counted as four steps, where
[b c]
is counted as a single step.

However, you can mark a different metrical level to count steps relative to, using a
^
at the start of a sub-pattern. If we do this to the subpattern in our example:
"a [^b c] d e"
, then the pattern is now counted as having
eight
steps. This is because ‘b’ and ‘c’ are each counted as single steps, and the events in the pattern are twice as long, and so counted as two steps each.

Pacing the steps

Some stepwise functions don’t appear to do very much on their own, for example these two examples of the
expand
function sound exactly the same despite being expanded by different amounts:

"c a f e".expand(2).note().sound("folkharp")

"c a f e".expand(4).note().sound("folkharp")

The number of steps per cycle is being changed behind the scenes, but on its own, that doesn’t do anything. You will hear a difference however, once you use another stepwise function with it, for example
stepcat
:

stepcat("c a f e".expand(2), "g d").note()
.sound("folkharp")

stepcat("c a f e".expand(4), "g d").note()
.sound("folkharp")

You should be able to hear that
expand
increases the duration of the steps of the first subpattern, proportionally to the second one.

You can also change the speed of a pattern to match a given number of steps per cycle, with the
pace
function:

stepcat("c a f e".expand(2), "g d").note()
.sound("folkharp")
.pace(8)

stepcat("c a f e".expand(4), "g d").note()
.sound("folkharp")
.pace(8)

The first example has ten steps, and the second example has 18 steps, but are then both played a rate of 8 steps per cycle.

The argument to
expand
can also be patterned, and will be treated in a stepwise fashion. This means that the patterns from the changing values in the argument will be
stepcat
ted together:

note("c a f e").sound("folkharp").expand("3 2 1 1 2 3")

This results in a dense pattern, because the different expanded versions are squashed into a single cycle.
pace
is again handy here for slowing down the pattern to a particular number of steps per cycle:

note("c a f e").sound("folkharp").expand("3 2 1 1 2 3").pace(8)

Earlier versions of many of these functions had
s_
prefixes, and the
pace
function was previously known as
steps
. These still exist as aliases, but may have changed behaviour and will soon be removed. Please update your patterns!

Stepwise functions

pace

Experimental

Speeds a pattern up or down, to fit to the given number of steps per cycle.

sound("bd sd cp").pace(4)
// The same as sound("{bd sd cp}%4") or sound("<bd sd cp>*4")

stepcat
Synonyms:
timeCat, timecat

'Concatenates' patterns like
fastcat
, but proportional to a number of steps per cycle.
The steps can either be inferred from the pattern, or provided as a [length, pattern] pair.
Has the alias
timecat
.

stepcat([3,"e3"],[1, "g3"]).note()
// the same as "e3@3 g3".note()

stepcat("bd sd cp","hh hh").sound()
// the same as "bd sd cp hh hh".sound()

stepalt

Experimental

Concatenates patterns stepwise, according to an inferred 'steps per cycle'.
Similar to
stepcat
, but if an argument is a list, the whole pattern will alternate between the elements in the list.

stepalt(["bd cp", "mt"], "bd").sound()
// The same as "bd cp bd mt bd".sound()

expand

Experimental

Expands the step size of the pattern by the given factor.

sound("tha dhi thom nam").bank("mridangam").expand("3 2 1 1 2 3").pace(8)

contract

Experimental

Contracts the step size of the pattern by the given factor. See also
expand
.

sound("tha dhi thom nam").bank("mridangam").contract("3 2 1 1 2 3").pace(8)

extend

Experimental

extend
is similar to
fast
in that it increases its density, but it also increases the step count
accordingly. So
stepcat("a b".extend(2), "c d")
would be the same as
"a b a b c d"
, whereas
stepcat("a b".fast(2), "c d")
would be the same as
"[a b] [a b] c d"
.

stepcat(
  sound("bd bd - cp").extend(2),
  sound("bd - sd -")
).pace(8)

take

Experimental

Takes the given number of steps from a pattern (dropping the rest).
A positive number will take steps from the start of a pattern, and a negative number from the end.

"bd cp ht mt".take("2").sound()
// The same as "bd cp".sound()

"bd cp ht mt".take("1 2 3").sound()
// The same as "bd bd cp bd cp ht".sound()

"bd cp ht mt".take("-1 -2 -3").sound()
// The same as "mt ht mt cp ht mt".sound()

drop

Experimental

Drops the given number of steps from a pattern.
A positive number will drop steps from the start of a pattern, and a negative number from the end.

"tha dhi thom nam".drop("1").sound().bank("mridangam")

"tha dhi thom nam".drop("-1").sound().bank("mridangam")

"tha dhi thom nam".drop("0 1 2 3").sound().bank("mridangam")

"tha dhi thom nam".drop("0 -1 -2 -3").sound().bank("mridangam")

polymeter
Synonyms:
pm

Experimental

Aligns the steps of the patterns, creating polymeters. The patterns are repeated until they all fit the cycle. For example, in the below the first pattern is repeated twice, and the second is repeated three times, to fit the lowest common multiple of six steps.

// The same as note("{c eb g, c2 g2}%6")
polymeter("c eb g", "c2 g2").note()

shrink

Experimental

Progressively shrinks the pattern by 'n' steps until there's nothing left, or if a second value is given (using mininotation list syntax with
:
),
that number of times.
A positive number will progressively drop steps from the start of a pattern, and a negative number from the end.

"tha dhi thom nam".shrink("1").sound()
.bank("mridangam")

"tha dhi thom nam".shrink("-1").sound()
.bank("mridangam")

"tha dhi thom nam".shrink("1 -1").sound().bank("mridangam").pace(4)

note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .shrink("1 -1").pace(8)

grow

Experimental

Progressively grows the pattern by 'n' steps until the full pattern is played, or if a second value is given (using mininotation list syntax with
:
),
that number of times.
A positive number will progressively grow steps from the start of a pattern, and a negative number from the end.

"tha dhi thom nam".grow("1").sound()
.bank("mridangam")

"tha dhi thom nam".grow("-1").sound()
.bank("mridangam")

"tha dhi thom nam".grow("1 -1").sound().bank("mridangam").pace(4)

note("0 1 2 3 4 5 6 7".scale("C:ritusen")).sound("folkharp")
   .grow("1 -1").pace(8)

tour

Experimental

Inserts a pattern into a list of patterns. On the first repetition it will be inserted at the end of the list, then moved backwards through the list
on successive repetitions. The patterns are added together stepwise, with all repetitions taking place over a single cycle. Using
pace
to set the
number of steps per cycle is therefore usually recommended.

"[c g]".tour("e f", "e f g", "g f e c").note()
   .sound("folkharp")
   .pace(8)

zip

Experimental

'zips' together the steps of the provided patterns. This can create a long repetition, taking place over a single, dense cycle.
Using
pace
to set the number of steps per cycle is therefore usually recommended.

zip("e f", "e f g", "g [f e] a f4 c").note()
   .sound("folkharp")
   .pace(8)
























---

## Understand: Coding Syntax


































































Coding Syntax

Let’s take a step back and understand how the syntax in Strudel works.

Take a look at this simple example:

note("c a f e").s("piano")

We have a word
note
which is followed by some brackets
()
with some words/letters/numbers inside, surrounded by quotes
"c a f e"

Then we have a dot
.
followed by another similar piece of code
s("piano")
.

We can also see these texts are
highlighted
using colours: word
note
is purple, the brackets
()
are grey, and the content inside the
""
are green. (The colors could be different if you’ve changed the default theme)

What happens if we try to ‘break’ this pattern in different ways?

note(c a f e).s(piano)

note("c a f e")s("piano")

note["c a f e"].s{"piano"}

Ok, none of these seem to work…

s("piano").note("c a f e")

This one does work, but now we only hear the first note…

So what is going on here?

Functions, arguments and chaining

So far, we’ve seen the following syntax:

xxx("foo").yyy("bar")

Generally,
xxx
and
yyy
are called
functions
, while
foo
and
bar
are called function
arguments
or
parameters
.
So far, we’ve used the functions to declare which aspect of the sound we want to control, and their arguments for the actual data.
The
yyy
function is called a
chained
function
, because it is preceded with a dot (
.
).

Generally, the idea with chaining is that code such as
a("this").b("that").c("other")
allows
a
,
b
and
c
functions to happen in a specified order, without needing to write them as three separate lines of code.
You can think of this as being similar to chaining audio effects together using guitar pedals or digital audio effects.

Strudel makes heavy use of chained functions. Here is a more sophisticated example:

note("a3 c#4 e4 a4")
.s("sawtooth")
.cutoff(500)
//.delay(0.5)
.room(0.5)

Write your own chained function

You can write your own chained function using
register
. Here’s the above chain but registered as a reusable, chained function.

const effectChain = register('effectChain', (pat) => pat
  .s("sawtooth")
  .cutoff(500)
  //.delay(0.5)
  .room(0.5)
)
note("a3 c#4 e4 a4").effectChain()

Try adding
.rev()
after
effectChain()
to hear further effects added.

Comments

The
//
in the example above is a line comment, resulting in the
delay
function being ignored.
It is a handy way to quickly turn code on and off.
Try uncommenting this line by deleting
//
and refreshing the pattern.
You can also use the keyboard shortcut
cmd-/
to toggle comments on and off.

You might noticed that some comments in the REPL samples include some words starting with a ”@”, like
@by
or
@license
.
Those are just a convention to define some information about the music. We will talk about it in the
Music metadata
section.

Strings

Ok, so what about the content inside the quotes (e.g.
"c a f e"
)?
In JavaScript, as in most programming languages, this content is referred to as being a
string
.
A string is simply a sequence of individual characters.
In TidalCycles, double quoted strings are used to write
patterns
using the mini-notation, and you may hear the phrase
pattern string
from time to time.
If you want to create a regular string and not a pattern, you can use single quotes, e.g.
'C minor'
will not be parsed as Mini Notation.

The good news is, that this covers most of the JavaScript syntax needed for Strudel!












---

## Understand: Pitch


































































Understanding Pitch

Let’s learn how pitch works! The slider below controls the
frequency
of an oscillator, producing a pitch:
220
Hz

Drag the slider to hear a pitch

Move the slider to change the pitch

Observe how the Hz number changes

Caution
: The higher frequencies could be disturbing for children or animals!

The Hz number is the frequency of the pitch you’re hearing.
The higher the frequency, the higher the pitch and vice versa.
A pitch occurs whenever something is vibrating / oscillating at a frequency, in this case it’s your speaker.
The unit
Hz
describes how many times that oscillation happens per second.
Our eyes are too slow to actually see the oscillation on the speaker, but we can
see it in slow motion
.

The hearing range of a newborn is said to be between 20Hz and 20000Hz.
The upper limit decreases with age. What’s your upper limit?

In Strudel, we can play frequencies directly with the
freq
control:

freq("<200 [300,500] 400 [500,<600 670 712 670>]>*8")

Frequency vs Pitch Perception

Maybe you have already noticed that the
frequency slider
is “lopsided”,
meaning the pitch changes more in the left region and less in the right region.
To make that more obvious, let’s add a
pitch slider
that controls the frequency on a different scale:
220
Hz
=
55
Hz * 2
2
Frequency Sweep
Pitch Sweep

Try out the buttons above to sweep through the frequency range in 2 different ways:

Frequency Sweep:
frequency rises linear
,
pitch rises logarithmic

Pitch Sweep:
frequency rises exponential
,
pitch rises linear

Don’t be scared of these mathematical terms:

“logarithmic” is just a fancy way of saying “it starts fast and slows down”

“exponential” is just a fancy way of saying “it starts slow and gets faster”

Most of the time, we might want to control pitch in a way that matches our perception,
which is what the
pitch slider
does.

From Hz to Semitones

Because Hz does not match our perception, let’s try to find a unit for pitch that matches.
To approach that unit of pitch, let’s look at how frequency behaves when it is doubled:
220
Hz
=
55
Hz * 2
2

Use the now stepped pitch slider above

Can you hear how these pitches seem related to each other?

In musical terms, a pitch with double the frequency of another is an
octave
higher.

Because octaves are pretty far apart, octaves are typically divided into 12 smaller parts:
440
Hz
=
440
Hz * 2
0

This step is also called a semitone, which is the most common division of pitched music.
For example, the keys on a piano keyboard are also divided into semitones.

In Strudel, we could do that with
freq
like this:

freq(
"0 4 7 12"
.fmap(n => 440 * 2**(n/12))
)

Of course, this can be written shorter with note, as we will see below.

From Semitones to MIDI numbers

Now we know what the distance of a semitone is.
Above, we used an arbitrary base frequency of 440Hz, which means the exponent 0 is equal to 440Hz.
Typically, 440Hz is standardized to the number 69, which leads to this calculation:
440
Hz
=
440
Hz * 2
(
69
-
69
)/12

The yellow number is now a MIDI number, covering more than the whole human hearing range with numbers from 0 to 127.
In Strudel, we can use MIDI numbers inside
note
:

note("69 73 76 81")

From MIDI numbers to notes

In western music theory, notes are used instead of numbers.
For each midi number, there is at least one note label:
440
Hz
=
440
Hz * 2
(
69
-
69
)/12
=
A4
A4
A4

A full note label consists of a letter (A-G), 0 or more accidentals (b | #) and an octave number.
This system is also known as
Scientific Pitch Notation
.
In Strudel, these note labels can also be used inside
note
as an alternative to midi numbers:

note("A4 C#5 E5 A5").piano()

Open Questions

Now that we have learned about different representations of pitch, there are still open questions:

Why 12 notes? What about different divisions of the octave?

Why are notes labeled as they are? Why only 7 letters?

Are there other labeling systems?

What about Just Intonation Systems?

What about Timbre?

All those questions are important to ask and will be answered in another article.

Definition

At first, I wanted to start this article with a definition, but then thought it might be a good idea to focus on intuitive exploration.
Maybe you now understand this definition much better:

From
wikipedia
: “Pitch is a perceptual property of sounds that allows their ordering on a frequency-related scale, or more commonly, pitch is the quality that makes it possible to judge sounds as “higher” and “lower” in the sense associated with musical melodies.”














---

## Understand: Cycles


































































Understanding Cycles

The concept of cycles is very central to be able to understand how Strudel works.
Strudel’s mother language, TidalCycles, even has it in its name.

Cycles and BPM

In most music software, the unit BPM (beats per minute) is used to set the tempo.
Strudel expresses tempo as CPS (cycles per second), with a default of 0.5 CPS:

s("bd")

Here we can hear the 0.5CPS in action: The kick repeats once every two seconds.
Let’s make it 4 kicks:

s("bd bd bd bd")

Now we have 4 kicks per cycle, but the whole pattern still plays at 0.5CPS.
In terms of BPM, most musicians would tell you this is playing at 120bpm.
What about this one:

s("bd hh bd hh")

Because the second sound is now a hihat, the tempo feels slower again.
This brings us to an important realization:

Tempo is based on perception.
The choice of sounds also has an impact on the tempo feel.
This is why the same CPS can produce different perceived tempos.

Setting CPM

If you’re familiar with BPM, you can use the
setcpm
method to set the global tempo in cycles per minute:

setcpm(110)
s("bd hh")

If you want to add more beats per cycle, you might want to divide the cpm:

setcpm(110/4)
s("bd sd bd rim, hh*8")

Or using 2 beats per cycle:

setcpm(110/2)
s("bd sd, hh*4")

You can use the
setcps
method to set the global tempo in cycles per second.
setcpm(x)
is the same as
setcps(x / 60)
.

To set a specific bpm, use
setcpm(bpm/bpc)

bpm: the target beats per minute

bpc: the number of perceived beats per cycle

Cycles and Bars

Also in most music software, multiple beats form a bar (or measure).
The so called time signature specifies how many beats are in each bar.
In many types of music, it is common to use 4 beats per bar, also known as 4/4 time.
Many music programs use it as a default.

Strudel does not a have concept of bars or measures, there are only cycles.
How you use them is up to you. Above, we’ve had this example:

setcpm(110/4)
s("bd sd bd rim, hh*8")

This could be interpreted as 4/4 time with a tempo of 110bpm.
We could write out multiple bars like this:

setcpm(110/4)
s(`<
[bd sd bd rim, hh*8] 
[bd sd bd rim*2, hh*8]
>`)

Instead of writing out each bar separately, we could express this much shorter:

setcpm(110/2)
s("bd <sd rim*<1 2>>,hh*4")

Here we can see that thinking in cycles rather than bars simplifies things a lot!
These types of simplifications work because of the repetitive nature of rhythm.
In computational terms, you could say the former notation has a lot of redundancy.

Time Signatures

To get a time signature, just change the number of elements per bar. Here is a rhythm with 7 beats:

s("bd ~ rim bd bd rim ~")

or with 5:

s("bd hh hh bd hh hh bd rim bd hh")

We could also write multiple bars with different time signatures:

setcpm(110*2)
s(`<
[bd hh rim]@3
[bd hh rim sd]@4
>`)

Here we switch between 3/4 and 4/4, keeping the same tempo.

If we don’t specify the length, we get what’s called a metric modulation:

setcpm(110/2)
s(`<
[bd hh rim]
[bd hh rim sd]
>`)

Now the 3 elements get the same time as the 4 elements, which is why the tempo changes.












---

## Understand: Voicings


































































Understanding Chords and Voicings

Let’s dig deeper into how chords and voicings work in strudel.
I’ll try to keep theory jargon to a minimum, so hopefully this is approachable for anyone interested.

What is a chord

Playing more than one note at a time is generally called a
chord
. Here’s an example:

note("<[c3,eb3,g3] [f3,a3,c4]>").room(.5)

Here’s the same with midi numbers:

note("<[48,51,55] [53,57,60]>").room(.5)

Here, we have two 3-note chords played in a loop.
You could already stop here and write chords in this style, which is totally fine and gives you control over individual notes.
One downside is that it can be difficult to find good sounding chords and maybe you’re yearning for a way to organize chords in some other way.

Labeling Chords

Chords are typically given different labels depending on the relationship of the notes within.
In the number example above, we have
48,51,55
and
53,57,60
.

To analyze the relationship of those notes, they are typically compared to some
root
, which is often the lowest note.
In our case, the
roots
would be
48
(=
c3
) and
53
(=
f3
).
We can express the same chords relative to those
roots
like this:

note("<[0,3,7] [0,4,7]>".add("<48 53>")).room(.5)

Now within each chord, each number represents the distance from the root.
A distance between pitches is typically called
interval
, but let’s stick to distance for now.

Now we can see that our 2 chords are actually quite similar, as the only difference is the middle note (and the root of course).
They are part of a group of chords called
triads
which are chords with 3 notes.

Triads

These 4 shapes are the most common types of
triads
you will encounter:

shape

label

0,4,7

major

0,3,7

minor

0,3,6

diminished

0,4,8

augmented

Here they are in succession:

note("<[0,4,7] [0,3,7] [0,3,6] [0,4,8]>".add("60"))
.room(.5)._pitchwheel()

Many types of music often only use minor and major chords, so we already have the knowledge to accompany songs. Here’s one:

note(`<
[0,3,7] [0,4,7] [0,4,7] [0,4,7]
[0,3,7] [0,4,7] [0,3,7] [0,4,7]
>`.add(`<
a c d f
a e a e
>`)).room(.5)

These are the chords for “The House of the Rising Sun” by The Animals.
So far, it doesn’t sound too exciting, but at least it’s recognizable.

Voicings

A
voicing
is one of many ways a certain chord shape can be arranged.
The term comes from choral music, where chords can be sung in different ways by assigning different notes to each voice.
For example we could add 12 semitones to one or more notes in the chord:

note("<[0,3,7] [12,3,7] [12,15,7] [12,15,19]>".add("48"))
.room(.5)

Notes that are 12 semitone steps apart (= 1
octave
) are considered to be equal in a harmonic sense, which is why they get the same note letter.
Here’s the same example with note letters:

note("<[c3,eb3,g3] [c4,eb3,g3] [c4,eb4,g3] [c4,eb4,g4]>")
.room(.5)

These types of voicings are also called
inversions
. There are many other ways we could
voice
this minor chord:

note("<[0,3,7,12] [0,15,24] [0,3,12]>".add("48"))
.room(.5)

Here we are changing the flavour of the chord slightly by

doubling notes 12 steps higher,

using very wide distances

omitting notes

Voice Leading

When we want to meaningfully connect chords in a sequence, the chosen voicings affect the way each chord transitions to the next.
Let’s revisit “The House of the Rising Sun”, this time using our newly acquired voicing techniques:

note(`<
[0,3,7] [7,12,16] [0,7,16] [4,7,12]
[0,3,7] [4,7,12] [0,3,7] [4,7,12]
>`.add(`<
a c d f
a e a e
>`)).room(.5)

These voicings make the chords sound more connected and less jumpy, compared to the earlier version, which didn’t focus on voicing.
The way chords interact is also called
voice leading
, reminiscent of how an
individual choir voice would move through a sequence of chords.

For example, try singing the top voice in the above example. Then try the same
on the example not focusing on voice leading. Which one’s easier?

Naturally, there are many ways a progression of chords could be voiced and there is no definitive right or wrong.

Chord Symbols

Musicians playing chord-based music often use a
lead sheet
, which is a simplified notation for a piece of music.
These sheets condense the essential elements, such as chords, into symbols that make the music easy to read and follow.
For example, a lead sheet for “The House of the Rising Sun” might include chords written like this:

Am | C | D  | F
Am | E | Am | E

Here, each symbol consists of the
root
of the chord and optionally an
m
to signal it’s a minor chord (just the root note means it’s major).
We could mirror that notation in strudel using the
pick
function:

"<Am C D F Am E Am E>"
.pick({
  Am: "57,60,64",
  C: "55,60,64",
  D: "50,57,66",
  F: "57,60,65",
  E: "56,59,64",
})
.note().room(.5)

The voicing function

Coming up with good sounding voicings that connect well can be a difficult and time consuming process.
The
chord
and
voicing
functions can be used to automate that:

chord("<Am C D F Am E Am E>").voicing().room(.5)

Here we’re also using chord symbols but the voicings will be automatically generated with smooth
voice leading
, minimizing jumps.
It is inspired by the way a piano or guitar player would pick chords to accompany a song.

Voicing Dictionaries

The voicing function internally uses so called
voicing dictionaries
, which can also be customized:

addVoicings('house', {
'': ['7 12 16', '0 7 16', '4 7 12'],
'm': ['0 3 7']
})
chord("<Am C D F Am E Am E>")
.dict('house').anchor(66)
.voicing().room(.5)

In a
voicing dictionary
, each chord symbol is assigned one or more voicings.
The
voicing
function then picks the voicing that is closest to the
anchor
(defaults to
c5
).

The handy thing about this approach is that a
voicing dictionary
can be used to play any chord progression with automated voice leading!

The default dictionary

When using the default dictionary, you can use these chord symbols:

2 5 6 7 9 11 13 69 add9
o h sus ^ - ^7 -7 7sus
h7 o7 ^9 ^13 ^7#11 ^9#11
^7#5 -6 -69 -^7 -^9 -9
-add9 -11 -7b5 h9 -b6 -#5
7b9 7#9 7#11 7b5 7#5 9#11
9b5 9#5 7b13 7#9#5 7#9b5
7#9#11 7b9#11 7b9b5 7b9#5
7b9#9 7b9b13 7alt 13#11
13b9 13#9 7b9sus 7susadd3
9sus 13sus 7b13sus
aug M m M7 m7 M9 M13
M7#11 M9#11 M7#5 m6 m69
m^7 -M7 m^9 -M9 m9 madd9
m11 m7b5 mb6 m#5 mM7 mM9

The available chords and the format is very much inspired by
ireal pro chords
.
Some symbols are synonymous:

”-” is the same as “m”, for example C-7 = Cm7

”^” is the same as “M”, for example C^7 = CM7

”+” is the same as “aug”

You can decide which ones you prefer. There is no international standard for these symbols.
To get a full chord, the symbols have to be prefixed with a root pitch, e.g. D7#11 is the 7#11 chord relative to the pitch D.

Here are all possible chords with root C:

chord(`<
C2 C5 C6 C7 C9 C11 C13 C69
Cadd9 Co Ch Csus C^ C- C^7 
C-7 C7sus Ch7 Co7 C^9 C^13 
C^7#11 C^9#11 C^7#5 C-6 C-69 
C-^7 C-^9 C-9 C-add9 C-11 
C-7b5 Ch9 C-b6 C-#5 C7b9 
C7#9 C7#11 C7b5 C7#5 C9#11 
C9b5 C9#5 C7b13 C7#9#5 C7#9b5 
C7#9#11 C7b9#11 C7b9b5 C7b9#5 
C7b9#9 C7b9b13 C7alt C13#11 
C13b9 C13#9 C7b9sus C7susadd3 
C9sus C13sus C7b13sus C Caug 
CM Cm CM7 Cm7 CM9 CM13 CM7#11 
CM9#11 CM7#5 Cm6 Cm69 Cm^7 
C-M7 Cm^9 C-M9 Cm9 Cmadd9 
Cm11 Cm7b5 Cmb6 Cm#5
>`).voicing().room(.5)

Note that the default dictionary contains multiple ways (=
voicings
) to play each chord symbol.
By default, the
voicing
function tries to minimize jumps.
You can alter the picked voicings in various ways, which are now explained in further detail:

anchor

The
anchor
is a note that is used to align the voicings to:

anchor("<c4 g4 c5 g5>").chord("C").voicing().room(.5)

By default, the anchor is the highest possible note the voicing can contain.
When deciding which voicing of the dictionary to pick for a certain chord, the voicing with a top note closest to the anchor wins.

Note that the anchors in the above example match up with the top notes in the pianoroll.
Like
note
, anchor accepts either midi numbers or note names.

mode

With
mode
, you can change the way the voicing relates to the
anchor
:

mode("<below above duck root>").chord("C").anchor("c5").voicing().room(.5)

The modes are:

below
: the top note of the voicing is lower than or equal to the anchor (default)

above
: the bottom note of the voicing is higher than or equal to the anchor

duck
: the top note of the voicing is lower than the anchor

root
: the bottom note of the voicing is always the root note closest to the anchor

The
anchor
can also be set from within the
mode
function:

mode("<below above duck root>:c5").chord("C").voicing().room(.5)

n

The
n
control can be used with
voicing
to select individual notes:

n("0 3 1 2").chord("<C <Fm Db>>").voicing()
.clip("4 3 2 1").room(.5)

Example

Here’s an example of a Jazz Blues in F:

let chords = chord(`<
F7 Bb7 F7 [Cm7 F7]
Bb7 Bo F7 [Am7 D7]
Gm7 C7 [F7 D7] [Gm7 C7]
>`)
$: n("7 8 [10 9] 8").set(chords).voicing().dec(.2)
$: chords.struct("- x - x").voicing().room(.5)
$: n("0 - 1 -").set(chords).mode("root:g2").voicing()

The chords are reused for melody, chords and bassline of the tune.





















---

## Understand: Pattern Alignment


































































Pattern Alignment & Combination

One core aspect of Strudel, inherited from Tidal, is the flexible way that patterns can be combined, irrespective of their structure. Its declarative approach means a live coder does not have to think about the details of
how
this is done, only
what
is to be done.

As a simple example, consider two number patterns
"0 [1 2] 3"
, and
"10 20"
. The first has three contiguous steps of equal lengths, with the second step broken down into two substeps, giving four events in total. There are a very large number of ways in which the structure of these two patterns could be combined, but the default method in both Strudel and Tidal is to line up the cycles of the two patterns, and then take events from the first pattern and match them with those in the second pattern. Therefore, the following two lines are equivalent:

'0 [1 2] 3'
.
add
(
'10 20'
);
(
'10 [11 22] 23'
);

Where the events only partially overlap, they are treated as fragments
of the event in the first pattern. This is a little difficult to
conceptualise, but lets start by comparing the two patterns in the
following example:

'0 1 2'
.
add
(
'10 20'
);
(
'10 [11 21] 22'
);

They are similar to the previous example in that the number
1
is split in two, with its two halves added to
10
and
20
respectively. However, the
11
‘remembers’ that it is a fragment of that original
1
event, and so is treated as having a duration of a third of a cycle, despite only being active for a sixth of a cycle. Likewise, the
21
is also a fragment of that original
1
event, but a fragment of its second half. Because the start of its event is missing, it wouldn’t actually trigger a sound (unless it underwent further pattern transformations/combinations).

In practice, the effect of this default, implicit method for combining two patterns is that the second pattern is added
in
to the first one, and indeed this can be made explicit:

'0 1 2'
.add.
in
(
'10 20'
);

This makes way for other ways to align the pattern, and several are already defined, in particular:

in
- as explained above, aligns cycles, and applies values from the pattern on the right
in
to the pattern on the left.

out
- as with
in
, but values are applied
out
of the pattern on the left (i.e.
in
to the one on the right).

mix
- structures from both patterns are combined, so that the new events are not fragments but are created at intersections of events from both sides.

squeeze
- cycles from the pattern on the right are squeezed into events on the left. So that e.g.
"0 1 2".add.squeeze("10 20")
is equivalent to
"[10 20] [11 21] [12 22]"
.

squeezeout
- as with
squeeze
, but cycles from the left are squeezed into events on the right. So,
"0 1 2".add.squeezeout("10 20")
is equivalent to
[10 11 12] [20 21 22]
.

reset
is similar to
squeezeout
in that cycles from the right are aligned with events on the left. However those cycles are not ‘squeezed’, rather they are truncated to fit the event. So
"0 1 2 3 4 5 6 7".add.reset("10 [20 30]")
would be equivalent to
10 11 12 13 20 21 30 31
. In effect, events on the right ‘reset’ cycles on the left.

restart
is similar to
reset
, but the pattern is ‘restarted’ from its very first cycle, rather than from the current cycle.
reset
and
restart
therefore only give different results where the leftmost pattern differs from one cycle to the next.

We will save going deeper into the background, design and practicalities of these alignment functions for future publications. However in the next section, we take them as a case study for looking at the different design affordances offered by Haskell to Tidal, and JavaScript to Strudel.

Ok, so how do Strudel and Tidal
compare
?








---

## Understand: Strudel vs Tidal


































































Comparing Strudel and Tidal

This page is dedicated to exisiting tidal users, giving an overview of all the differences between Strudel and Tidal.

Language

Strudel is written in JavaScript, while Tidal is written in Haskell.

Example

This difference is most obvious when looking at the syntax:

iter
4
$
every
3
(
||+
n
"10 20"
)
$
(n
"0 1 3"
)
#
s
"triangle"
#
crush
4

One
could
express that pattern to Strudel like so:

iter(4, every(3, add.squeeze("10 20"), n("0 1 3").s("triangle").crush(4)))

The
$
operator does not exist, so the
iter
function has to wrap everything in parens.

Custom operators like
||+
are explicit function calls,
add.squeeze
in this case

The
#
operator is replaced with a chained function call
# crush 4
=>
.crush(4)

Unlike Haskell, JavaScript lacks the ability to define custom infix
operators, or change the meaning of existing ones.

Before you discard Strudel as an unwieldy paren monster, look at this alternative way to write the above:

n("0 1 3").every(3, add.squeeze("10 20")).iter(4).s("triangle").crush(4)

By reordering calls, the parens are much less nested.
As a general rule by thumb, you could say that everything Tidal does with
$
is reversed in Strudel:

iter 4 $ every 3 (||+ n "10 20") $ (n "0 1 3")

becomes

n("0 1 3").every(3, add.squeeze("10 20")).iter(4)

Simply put,
foo x $ bar x
becomes
bar(x).foo(x)
.

Operators

The
custom operators of tidal
are normal functions in strudel:

function

tidal

strudel

add

|+ n

.add(n)

subtract

|- n

.sub(n)

multiply

|* n

.mul(n)

divide

|/ n

.div(n)

modulo

|% n

.mod(n)

left values

|< n

.set(n)

The above list only displays the operators taking the structure comes from the
left
.
For each of those, a
right
and
both
variant also exists.
As this directional thinking only works with code, strudel calls these
in
/
out
/
mix
:

direction

tidal

strudel

left

|+ n

.add.in(n)

right

+| n

.add.out(n)

both

|+| n

.add.mix(n)

Instead of
+
/
add
, you can use any of the available operators of the first list.

Function Compatibility

This issue
tracks which Tidal functions are implemented in Strudel.
The list might not be 100% up to date and probably also misses some functions completely..
Feel encouraged to search the source code for a function you’re looking for.
If you find a function that’s not on the list, please tell!

Control Params

As seen in the example, the
#
operator (shorthand for
|>
) is also just a function call in strudel.
So
note "c5" # s "gtr"
becomes
note("c5").s('gtr')
.

This file
lists all available control params.
Note that not all of those work in the Webaudio Output of Strudel.
If you find a tidal control that’s not on the list, please tell!

Sound

Tidal is commonly paired with Superdirt / Supercollider for sound generation.
While Strudel also has a way of
communicating with Superdirt
,
it aims to provide a standalone live coding environment that runs entirely in the browser.

Audio Effects

Many of SuperDirt’s effects have been reimplemented in Strudel, using the Web Audio API.
You can find a
list of available effects here
.

Sampler

Strudel’s sampler supports
a subset
of Superdirt’s sampler.
Also, samples are always loaded from a URL rather than from the disk, although
that might be possible in the future
.

Evaluation

The Strudel REPL does not support
block based evaluation
yet.
You can use labeled statements and
_
to mute:

$: n("[0 .. 8]*8/9").scale("C:minor:pentatonic")

_$: s("bd*4").bank('RolandTR909')

Tempo

Strudels tempo is 1 cycle per second, while tidal defaults to
0.5625
.
You can get the same tempo as tidal with:

note("c a f e").fast(.5625);

Next up: the
REPL


















---

