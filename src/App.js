import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import {CodeEditor} from './CodeEditor';
import {Oszi} from './Oszi';
import {Inputs} from './Inputs';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fn: () => 0,
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
      <SplitterLayout vertical percentage secondaryInitialSize={35}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <CodeEditor 
            onChange={newValue => {
              try {
                const fnString = `(t, keys, knobs, state) => {\n${newValue}\n}`
                const fn =  eval();
                this.setState({fn: fn});
              } catch(e) {
                console.warn('code in input did not compile!');
              }
            }}
          />
          <Oszi />
        </SplitterLayout>
        <Inputs 
          knobs={this.state.knobs} 
          onChangeKnobs={newKnobs => this.setState({knobs: newKnobs})}

          keys={this.state.keys}
          onChangeKeys={newKeys => this.setState({keys: newKeys})}
        />
      </SplitterLayout>
    );
  }


  startAudio() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const node = audioCtx.createScriptProcessor(1024, 1, 1);
    window.context = this;
    const state = {};
    node.onaudioprocess = function (e) {
      const {outputBuffer} = e;
      outputBuffer.copyToChannel(outputBuffer.getChannelData(0).map((_, i) => {
        const t = (e.playbackTime + i / e.outputBuffer.sampleRate);
        return window.context.state.fn(t, state);
      }), 0)
    };

    node.connect(audioCtx.destination);
  }
}
