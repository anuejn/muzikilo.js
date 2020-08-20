// Generates a sine wave, which is a simple, soft sound.

this.t += 1 / 44100

function sin(phi) {
  return Math.sin(2 * Math.PI * phi)
}

return 1 * sin(440 * this.t)
