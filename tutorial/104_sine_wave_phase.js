//////////////////////////////////////////////////////////////////////
// Welcome to the muzikilo.js tutorial chapter one                  //
// This tutorial will walk you through the very basics of making    //
// noise / music with javascript & muzikilo.js. Have fun :)         //
//////////////////////////////////////////////////////////////////////

//////////////////////// Chapter One Part Four ///////////////////////
// Generates a sine wave. The frequency and amplitude can be controlled
// by knobs. In contrast to the previous example program, changing the
// frequency doesn't produce a cracking noise.

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

function expScale(knob, min, max) {
  return min * Math.exp(knob * Math.log(max / min))
}

const frequency = expScale(knobs['Frequency'], 261.626, 1046.502)

// The phase of the sine wave advances depending on the frequency.
// When changing the frequency via the knob, the phase stays the
// same, to avoid sudden changes in the output, which would cause
// a cracking noise.
//
// The higher the frequency, the faster the phase changes.
//
// The "% 1" at the end makes sure that the phase is always between
// 0 and 1. This range is convenient for the sine function above,
// and for many others.
this.phase = (this.phase + frequency / 44100) % 1

return sin(this.phase) * knobs['Master volume']

//////////////////////////////////////////////////////////////////////
// -> now move on to the next chapter                               //
// (http://anuejn.github.io/muzikilo.js/?load=https://raw.githubusercontent.com/anuejn/muzikilo.js/master/tutorial/105_different_shapes.js)
//////////////////////////////////////////////////////////////////////
