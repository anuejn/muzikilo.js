import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import {CodeEditor} from './CodeEditor';
import {Keyboard} from './Keyboard';
import Knobs from './Knobs';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      knobs: {},
      keys: [],
    }

    this.audioWorklet = null;
    this.audioContext = null;
    this.iteration = 0;

    this.startAudio();
  }

  render() {
    this.updateParams()

    return (
      <SplitterLayout vertical percentage secondaryInitialSize={20}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <CodeEditor 
            onChange={newValue => this.updateCode(newValue)}
          />
          <Knobs
            knobs={this.state.knobs} 
            onChange={newKnobs => this.setState({knobs: newKnobs})}
          />
        </SplitterLayout>
        <Keyboard
          keys={this.state.keys}
          onChange={newKeys => this.setState({keys: newKeys})}
        />
      </SplitterLayout>
    );
  }

  updateParams() {
    Object.keys(this.state.knobs).forEach(knob => {
      try {
        let param = this.audioWorklet.parameters.get(knob);
        param.linearRampToValueAtTime(this.state.knobs[knob], this.audioContext.currentTime + .05);
      } catch (e) {
      }
    })
  }

  updateCode(code) {
    this.iteration++;

    let knobs = code.match(/knobs\.([a-z]+)/g);
    knobs = knobs ? knobs : [];
    knobs = knobs.map(match => match.match(/knobs\.([a-z]+)/)[1])

    knobs.forEach(knob => {
      code = code.replace(`knobs.${knob}` , `parameters.${knob}[0]`)
    });

    let knobsObject = {}
    knobs.forEach(knob => knobsObject[knob] = this.state.knobs[knob] ? this.state.knobs[knob] : .5)

    this.setState({knobs: knobsObject})

    const workletStr = `
      class Synth extends AudioWorkletProcessor {
        static get parameterDescriptors() {
          return [
            ${knobs.map(knob => `{name: '${knob}', defaultValue: 0.5, minValue: 0, maxValue: 1}`)}
          ];
        }

        process(inputs, outputs, parameters) {
          let [output] = outputs[0];

          output.set(output.map((x, i) => {
            ${code}
          }))

          return true;
        }
      }

      registerProcessor('synth${this.iteration}', Synth);
    `;

    console.log(workletStr);
    
    this.audioContext.audioWorklet.addModule(URL.createObjectURL(new Blob([workletStr], {type: 'application/javascript'}))).then(() => {
      if(this.audioWorklet) {
        this.audioWorklet.disconnect();
      }
      this.audioWorklet = new AudioWorkletNode(this.audioContext, 'synth' + this.iteration);
      this.updateParams()
      this.audioWorklet.connect(this.audioContext.destination);
    });
  }

  startAudio() {
    this.audioContext = new AudioContext();
  }
}
