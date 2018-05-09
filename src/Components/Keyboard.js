import React from 'react';

export function Keyboard(props) {
  const {keys, onChange} = props;

  const octave = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
  const keyPatternList = Array.from(Array(octave.length * 6).keys()).map(x => octave[x % octave.length])

  return(
      <div className='keyboard'>
        {keyPatternList.map((x, i) => <div className={x ? 'black' : 'white'} key={i}/>)}
      </div>
  )
}
