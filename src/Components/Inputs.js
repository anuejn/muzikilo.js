import React from 'react';
import Knob from 'react-canvas-knob';

export function Keyboard(props) {
  const {keys, onChange} = props;

  return(
    <div style={{height:'100%'}}>
      <div className='keyboardNav'>{'<'}</div>
      <div className='keyboard'>
        {[0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0].map((x, i) => <div className={x ? 'black' : 'white'} key={i}/>)}
      </div>
      <div className='keyboardNav'>{'>'}</div>
    </div>
  )
}

export function Knobs(props) {
  const {knobs, onChange} = props;
  console.log(Object.keys(knobs))
  
  return (
    <div className='knobs'>
      {Object.keys(knobs).map((name, i) => {
        return (
          <div key={i} className='knob'>
            <Knob
              width={100}
              height={100}
              min={0}
              max={1}
              step={1/127}
              angleArc={270}
              angleOffset={-135}
              onChange={newValue => {
                props.knobs[name] = newValue
                onChange(props.knobs)
              }}
              value={knobs[name]}
              displayInput={false}
              displayCustom={() => <span>{knobs[name].toFixed(2)}</span>}
            />
            <label>{name}</label>
          </div>
        );
      })}
    </div>
  )
}
