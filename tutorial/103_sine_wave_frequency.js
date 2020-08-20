//////////////////////////////////////////////////////////////////////
// Welcome to the muzikilo.js tutorial chapter one                  //
// This tutorial will walk you through the very basics of making    //
// noise / music with javascript & muzikilo.js. Have fun :)         //
//////////////////////////////////////////////////////////////////////

//////////////////////// Chapter One Part Three //////////////////////
// Generates a sine wave.
// The frequency and volume can be controlled by knobs.

this.t += 1 / 44100

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

// Computes a frequency between min and max, depending on the given knob.
//
// For a given tone, the tone one octave higher has twice the frequency.
// Therefore, for a frequency knob, the linear range of the knob with
// values like 0, 0.25, 0.5, 0.75, 1 is transformed to an exponential
// range, for example 200, 282, 400, 566, 800.
function expScale(knob, min, max) {
  return min * Math.exp(knob * Math.log(max / min))
}

// The frequency can be adjusted over two octaves.
//
// See https://en.wikipedia.org/wiki/Scale_(music)
// See https://en.wikipedia.org/wiki/C_(musical_note)#Designation_by_octave
const frequency = expScale(knobs['Frequency'], 261.626, 1046.502)

return knobs['Master volume'] * sin(frequency * this.t)

// When changing the Frequency knob, the loud speaker makes a crackling noise.
// This is because the phase of the sine curve may be completely different.
//
// As an example, assume that after 3 seconds of playing, the knob changes from
// 0.50 to 0.49.
//
// Knob value    Frequency   Argument to sin   Value of sin
// -----------------------------------------------------------
//       0.50   523.251499   1569.754499       -0.999
//       0.49   516.047751   1548.143255       +0.7833
//
// Normally, the sine wave changes very smoothly between -1 and +1. In this
// case though, the output signal changes abruptly from almost -1 to almost +1.
// This produces a cracking sound. Combine several of them, and you have an
// explosion.
//
// The follow-up example program will correct this problem by keeping track
// of the current phase of the sine wave instead of the total elapsed time.


//////////////////////////////////////////////////////////////////////
// -> now move on to the next chapter                               //
// (http://anuejn.github.io/muzikilo.js/?load=https://raw.githubusercontent.com/anuejn/muzikilo.js/master/tutorial/104_sine_wave_phase.js)
//////////////////////////////////////////////////////////////////////

