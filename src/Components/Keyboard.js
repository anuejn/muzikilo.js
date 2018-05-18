import React from 'react';
import {subscribe2Midi} from './midi';

export default class Keyboard extends React.Component {
  constructor() {
    super();

    const freq = noteNumber => (440 / 32) * (2 ^ ((noteNumber - 9) / 12));

    subscribe2Midi(e => {
      const {data} = e;
      const [cmd, key, value] = data;


      if(cmd === 144) {
        //note on
      } else if (cmd === 128) {
        // note off
      }
      
      console.log(data);
    });
  }

  render() {
    const {keys, onChange} = this.props;

    const octave = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
    const keyPatternList = Array.from(Array(octave.length * 6).keys()).map(x => octave[x % octave.length])

    return(
        <div className='keyboard'>
          {keyPatternList.map((x, i) => <div className={x ? 'black' : 'white'} key={i}/>)}
        </div>
    )
  }
}