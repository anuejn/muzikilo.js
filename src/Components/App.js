import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import audioWorklet from '!file-loader!./audioWorklet.js';

import {CodeEditor} from './CodeEditor';
import Keyboard from './Keyboard';
import Knobs from './Knobs';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      knobs: {
          lol: 0.5,
          lol1: 0.5,
          lol2: 0.5,
          lol3: 0.5,
      },
      keys: [],
      error: '',
    }

    this.port = null;
    this.startAudio();
  }

  render() {
    return (
      <SplitterLayout vertical percentage secondaryInitialSize={20}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <div className='editorWithError'>
            <CodeEditor
              onChange={newValue => this.updateCode(newValue)}
            />
            {this.state.error ? <div className='errorField error'>{this.state.error}</div> : <div className='errorField sucess'/>}
          </div>
          <Knobs
            knobs={this.state.knobs}
            onChange={this.updateKnob}
          />
        </SplitterLayout>
        <Keyboard
          keys={this.state.keys}
          onChange={this.updateNote}
        />
      </SplitterLayout>
    );
  }

  updateNote = (note, value) => {
    if (value) {
      this.setState({ keys: [...this.state.keys, note] })
    } else {
      this.setState({ keys: this.state.keys.filter(key => key !== note) })
    }

    this.port.postMessage({
      type: 'update_note',
      note,
      value,
    });
  }

  updateKnob = (name, value) => {
    this.setState({
      knobs: {
        ...this.state.knobs,
        [name]: value,
      }
    });

    this.port.postMessage({ type: 'update_knob', name, value });
  }

  updateCode(code) {
    this.port.postMessage({shaderFunc: `(() => function(knobs, keys) {${code}\n})()`});
  }

  startAudio() {
    const audioContext = new AudioContext();

    audioContext.audioWorklet.addModule(audioWorklet).then(() => {
      const audioWorklet = new AudioWorkletNode(audioContext, 'synth');
      this.port = audioWorklet.port;

      this.port.onmessage = event => {
        const {data} = event;

        if(data.hasOwnProperty('error')) {
          this.setState({error: data.error})
        }
      };

      audioWorklet.connect(audioContext.destination);
    });
  }
}
