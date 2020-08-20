//////////////////////////////////////////////////////////////////////
// Welcome to the muzikilo.js tutorial chapter one                  //
// This tutorial will walk you through the very basics of making    //
// noise / music with javascript & muzikilo.js. Have fun :)         //
//////////////////////////////////////////////////////////////////////

//////////////////////// Chapter One Part Four ///////////////////////
// Demonstrates how different wave shapes sound.
// The sine wave sounds soft, while the sawtooth and square waves
// sounds sharp.

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

// The sawtooth wave starts at -1, slowly goes up to 1, and then
// instantly jumps back to -1. This creates a sharp sound.
//
// See https://en.wikipedia.org/wiki/Sawtooth_wave
function sawtooth(phi) {
  return 2 * phi - 1
}

// The square wave also creates a sharp sound, but sounds
// totally different than the sawtooth wave.
//
// See https://en.wikipedia.org/wiki/Square_wave
function square(phi) {
  if (phi < 0.5) {
    return -1
  } else {
    return +1
  }
}

function expScale(knob, min, max) {
  return min * Math.exp(knob * Math.log(max / min))
}

const frequency = expScale(knobs['Frequency'], 261.626, 1046.502)

this.phase = (this.phase + frequency / 44100) % 1

const sineOut     =      sin(this.phase) * knobs['Sine volume']
const sawtoothOut = sawtooth(this.phase) * knobs['Sawtooth volume']
const squareOut   =   square(this.phase) * knobs['Square volume']

// Sounds can be mixed by simply adding them.
//
// When you turn up the volumes, you will hear strange effects.
// This is because the value that is returned here must always
// be between -1 and 1, and when adding the waves, the value
// may become too small or too large.
//
// See https://en.wikipedia.org/wiki/Clipping_(audio)
//
const out = sineOut + sawtoothOut + squareOut

// The factor 2 in the below formula increases the clipping.
return 2 * out * knobs['Master volume']

//////////////////////////////////////////////////////////////////////
// You are done with the first chapter of the muzikilo.js tutorial  //
// Currently, there is only one chapter ;). Feel free to write the //
// next or just explore :)                                         //
// (https://github.com/anuejn/muzikilo.js/wiki)                    //
//////////////////////////////////////////////////////////////////////
