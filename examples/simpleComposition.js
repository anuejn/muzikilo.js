this.t += 1/44100

const fs = [440, 660, 330, 440, 220, 330, 660, 0]
const melody = Math.sin(
        this.t * Math.PI * 2
        * fs[Math.floor(this.t*2 % fs.length)] // pick the right frequency
    )
    * (1-this.t*3%1) // modulate the volume

const beatPattern = 'xx x xxx'
const beat = Math.random()
    * (1-(this.t + (1/3))*3%1) // modulate the volume
    * (beatPattern[Math.floor(this.t * 3 % beatPattern.length)] === 'x' ? 1 : 0) // do the beat or not according to the pattern


return melody + beat
