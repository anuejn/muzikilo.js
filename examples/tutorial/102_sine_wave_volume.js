// Generates a sine wave, which is a simple, soft sound.

this.t += 1 / 44100

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

// To make the sound generation interactive, the panel on the right side
// displays some knobs.
//
// To define a knob, write knobs['The name of the knob'].
// Such an expression returns a value between 0.0 and 1.0.
return knobs['Master volume'] * sin(440 * this.t)
