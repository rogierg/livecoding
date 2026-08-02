await fetch('https://raw.githubusercontent.com/switchangel/strudel-scripts/refs/heads/main/prebake.strudel')
  .then(r => r.text())
  .then(code => eval(code))

//samples('http://localhost:5432')
setCpm(140/4)

$: s("rolandtr909_bd:2!4")._scope()

$: n("<3@3 4 5 @3 6>*2".add("-14, -21")).scale("g:minor")
  .s("supersaw")
  .trancegate(1.5,45,1).o(2)
  .seg(16)
  .rlpf(slider(0.789)).lpenv(2)

$: n("0@2 <-7 [-5 -2]>@3 <0 -3 2 1>@3".add(7)
    .add("<5 4 0 <0 2>>")
    )
  .scale("g:minor")
  .s("supersaw").trancegate(1.5,45,1).o(3)
  .delay(.7).pan(rand)
  .rlpf(slider(0.593)).lpenv(2)._pianoroll()

_$: s("pulse!16").decay(.1).o(4)

_$: s("jt:6").note("e2").delay(.8)
