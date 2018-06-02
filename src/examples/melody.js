// library functions
const {sin, PI, pow} = Math;

const osc = (name, f) => sin(this[name] += 1/44100 * 2 * PI * f)
const lowPass = (name, v, amount) => {
    amount = amount ? amount : 1;
    const val = (this[name] * amount + v) / (amount + 1)
    this[name] = val;
    return val;
}

// define the pattern state
this.t += 1/44100

// build the melody
const freq = noteNumber => Math.pow(2, (noteNumber-69) / 12) * 440
const fs = [1, 3, 5, 3].map(x => x + (this.t * (1/8) % 1 > .5 ? 60: 52)).map(x => freq(x))
const melody = osc('melody', fs[Math.floor(this.t*2 % fs.length)])
    * lowPass('asfd', (1-this.t*3%1), 1000) // modulate the volume

// build the beat
const beatPattern = 'xxx  x x'
const beat = lowPass('asdf', 
    Math.random() 
    * (1-this.t*6%1) // modulate the volume
    * (beatPattern[Math.floor(this.t * 3 % beatPattern.length)] === 'x' ? 1 : 0) // do the beat or not according to the pattern
, 10)

// final mixing
return (
    melody 
    + beat * .5
)
