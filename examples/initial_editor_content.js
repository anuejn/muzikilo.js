/**
 * A "sound shader" for github.com/anuejn/muzikilo.js
 * 
 * This pice of javascript is a function, that is executed for every sample. The return value of the function
 * defines the position of the speaker membrane from [-1 to +1] directly, and can therefore creade sound and music.
 * 
 * The 'this' value can be used to store persistant data across multiple calls (ie. 'this.x +=1' builds a counter).
 * Some functions and values, that are handy for sound synthesis like 'random()' [-1 to +1], TAU (2*PI) and 'sin(x)'
 * are in the local scope, but of course all js standart functions (ie. 'Math.cos(x)') can be used.
 * 
 * Children of the 'knobs' variable (ie. 'knobs.volume') are interactive manipulatable inputs in the range [0 to 1].
 * The 'keys' array holds the midi note numbers of all the keys that are pressed.
 * The float 't' holds the current time in seconds and should be equal on all computers at any given point of time.
 */

return 0 // Make some sound? -> replace with 'return sin(TAU * 440 * t)'
