// Four-to-the-floor kick with a high G piano accent on every other offbeat.
setcpm(120 / 4)

$: sound("bd*4")
$: note("[~ g5]*2").sound("piano")
