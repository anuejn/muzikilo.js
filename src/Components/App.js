import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import {CodeEditor} from './CodeEditor';
import {Keyboard} from './Keyboard';
import Knobs from './Knobs';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fns: [],
      knobs: {
        volume: .5,
        envelope: .5,
        sustain: .5,
        decay: .5,
        distortion: .5,
      },
      keys: [],
    }

    this.startAudio();
  }

  render() {
    return (
      <SplitterLayout vertical percentage secondaryInitialSize={20}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <CodeEditor 
            onChange={newValue => {
              try {
                const fnString = `(t, keys, knobs, state) => {\n${newValue}\n}`
                const fn = eval(fnString);
                this.setState({fns: this.state.fns.concat([fn])});
                console.warn('code compiled!');
              } catch(e) {
                console.warn('code did not compile!');
              }
            }}
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

  startAudio() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const node = audioCtx.createScriptProcessor(2048, 1, 1);

    // set variables up
    window.context = this;
    const persistancy = {};

    node.onaudioprocess = function (e) {
      const {outputBuffer} = e;
      outputBuffer.copyToChannel(outputBuffer.getChannelData(0).map((_, i) => {
        const t = (e.playbackTime + i / e.outputBuffer.sampleRate);
        let sample = null;
        const fns = window.context.state.fns;

        while((typeof(sample) !== 'number' || isNaN(sample)) && fns.length > 0) {
          try {
            sample = fns[fns.length-1](t, [], window.context.state.knobs, persistancy);
            if(typeof(sample) !== 'number' || isNaN(sample)){
              console.warn('code didnt output number!');
              fns.pop();
            }
          } catch (e) {
            console.warn('code didnt work!');
            fns.pop();
          }
        }

        return sample ? sample : 0;
        
      }), 0)
    };

    node.connect(audioCtx.destination);
  }
}
