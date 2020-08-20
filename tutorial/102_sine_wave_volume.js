//////////////////////////////////////////////////////////////////////
// Welcome to the muzikilo.js tutorial chapter one                  //
// This tutorial will walk you through the very basics of making    //
// noise / music with javascript & muzikilo.js. Have fun :)         //
//////////////////////////////////////////////////////////////////////

//////////////////////// Chapter One Part Two ////////////////////////
// Generates a sine wave, which is a simple, soft sound.

this.t += 1 / 44100

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

// To make the sound generation interactive, the panel on the right side
// displays some knobs.
//
// To define a knob, write knobs['The name of the knob'].
// Such a knob expression always returns a value between 0.0 and 1.0.
return knobs['Master volume'] * sin(440 * this.t)

//////////////////////////////////////////////////////////////////////
// -> now move on to the next chapter                               //
// (http://anuejn.github.io/muzikilo.js/?load=https://raw.githubusercontent.com/anuejn/muzikilo.js/master/tutorial/103_sine_frequency.js)
//////////////////////////////////////////////////////////////////////

