//////////////////////////////////////////////////////////////////////
// Welcome to the muzikilo.js tutorial chapter one                  //
// This tutorial will walk you through the very basics of making    //
// noise / music with javascript & muzikilo.js. Have fun :)         //
//////////////////////////////////////////////////////////////////////

//////////////////////// Chapter One Part One ////////////////////////
// Generates a sine wave, which is a simple, soft sound.
// -> See https://en.wikipedia.org/wiki/Sine
// (you can follow links by holding down ctrl and clicking them)

// This code is called 44100 times a second.
// 44100 Hz is a common sampling frequency for high-quality audio.
// -> See https://en.wikipedia.org/wiki/44,100_Hz

// Each time this code is called, the fraction 1 / 44100 is added
// to the variable t. Since this code is called 44100 times per second,
// the variable t always contains the total elapsed time in seconds.
// In computer music, t is a well-known abbreviation for the elapsed time.

// All variables of the form "this.X = ..." are remembered permanently.
// By contrast, variables of the form "const X = ..." are only available
// for generating a single sample, and are thrown away afterwards.
this.t += 1 / 44100

// The sine function generates a wave curve that sounds soft and is gentle
// to the loud speaker. (There are other, more aggressive functions
// out there, to be introduced later.)
// -> Again, see https://en.wikipedia.org/wiki/Sine

// In school, the sine function is often introduced as sin(degree), where
// degree varies from 0 degrees to 360 degrees for generating one full wave.
// In computing, a different range is used. It goes from 0 to 2 * π.
// Finally, when generating music, it is most convenient to use the range
// from 0 to 1, because these numbers are so simple and universal.

// Therefore, the sin function defined here uses the convenient range,
// converting it to the range that the classical sine function expects.
function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

// To generate a sine wave, the time that has elapsed until now is multiplied
// by the frequency of the tone. The higher the frequency, the higher the
// tone sounds.
// -> See the table in https://en.wikipedia.org/wiki/Pitch_(music)#Labeling_pitches

// To control the volume, replace the 1 with a 0 (off) or 0.2 (quiet).
return 1 * sin(440 * this.t)

//////////////////////////////////////////////////////////////////////
// -> now move on to the next chapter                               //
// (http://anuejn.github.io/muzikilo.js/?load=https://raw.githubusercontent.com/anuejn/muzikilo.js/master/tutorial/102_sine_wave_volume.js)
//////////////////////////////////////////////////////////////////////
