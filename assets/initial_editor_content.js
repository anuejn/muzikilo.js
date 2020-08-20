/**
 * A "sound shader" for github.com/anuejn/muzikilo.js
 * 
 * This piece of javascript is a function, that is executed for every sample. The return value of the function
 * defines the position of the speaker membrane from [-1 to +1] directly, and can therefore create sound and music.
 * 
 * The 'this' value can be used to store persistant data across multiple calls (ie. 'this.x += 1' builds a counter).
 * Fields of the 'knobs' variable (ie. 'knobs.volume') are interactive manipulatable inputs in the range [0 to 1].
 * Those can be mapped to midi controller inputs by clicking the corresponding knob on the right and moving a midi controller knob.
 * The 'keys' array holds the midi note numbers of all the keys that are pressed.
 * 
 * To get you started there is a nice Tutorial at https://github.com/anuejn/muzikilo.js/tree/master/tutorial
 */

this.t += 1/44100;

return 0 // Make some sound? -> replace with 'return Math.sin(2 * Math.PI * 440 * this.t)'
