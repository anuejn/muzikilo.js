import React from 'react';
import { subscribe2Midi } from './midi';

export default class Keyboard extends React.Component {
  constructor() {
    super();

    const freq = noteNumber => (440 / 32) * (2 ^ ((noteNumber - 9) / 12));

    subscribe2Midi(e => {
      const { data } = e;
      const [cmd, key, value] = data;

      if (cmd === 144) {
        //note on
        this.props.onChange(key, value > 0);
      } else if (cmd === 128) {
        // note off
        this.props.onChange(key, false);
      }
    });
  }

  componentDidMount() {
    this.ref.scrollLeft = 100000000; // scrollLeft will clip at its width
    this.ref.scrollLeft /= 2;
  }

  render() {
    const { keys, onChange } = this.props;

    const octave = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
    const keyPatternList = Array.from(Array(octave.length * 10).keys()).map(
      x => octave[x % octave.length]
    );

    return (
      <div className="keyboard" ref={ref => this.ref = ref}>
        {keyPatternList.map((x, i) => 
          <div 
            key={i} 
            className={(x ? 'black' : 'white') + ' ' + (keys.includes(i) ? 'active' : 'passive')} 
            onMouseDown={() => onChange(i, true)} 
            onMouseEnter={e => e.buttons === 1 ? onChange(i, true) : null} 
            onMouseUp={() => onChange(i, false)}
            onMouseLeave={() => onChange(i, false)}
          >
            <span>{i}</span>
          </div>
        )}
      </div>
    );
  }
}
