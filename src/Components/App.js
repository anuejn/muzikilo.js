import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import audioWorklet from '!file-loader!./audioWorklet.js';

import { CodeEditor } from './CodeEditor';
import Keyboard from './Keyboard';
import Knobs from './Knobs';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      knobs: {},
      keys: [],
      error: '',
    };

    this.port = null;
    this.startAudio();
  }

  render() {
    return (
      <SplitterLayout vertical percentage secondaryInitialSize={20}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <div className="editorWithError">
            <CodeEditor onChange={newValue => this.updateCode(newValue)} />
            {this.state.error ? (
              <div className="errorField error">{this.state.error}</div>
            ) : (
              <div className="errorField sucess" />
            )}
          </div>
          <Knobs knobs={this.state.knobs} onChange={this.updateKnob} />
        </SplitterLayout>
        <Keyboard keys={this.state.keys} onChange={this.updateNote} />
      </SplitterLayout>
    );
  }

  updateNote = (note, value) => {
    if (value) {
      this.setState({ keys: [...this.state.keys, note] });
    } else {
      this.setState({ keys: this.state.keys.filter(key => key !== note) });
    }

    this.port.postMessage({
      type: 'update_note',
      note,
      value,
    });
  };

  updateKnob = (name, value) => {
    this.setState({
      knobs: {
        ...this.state.knobs,
        [name]: value,
      },
    });

    this.port.postMessage({
      type: 'update_knob',
      name,
      value,
    });
  };

  updateCode(code) {
    this.port.postMessage({
      type: 'shader_function',
      func: `(() => function(knobs, keys) {${code}\n})()`,
    });
  }

  startAudio() {
    const audioContext = new AudioContext();

    audioContext.audioWorklet.addModule(audioWorklet).then(() => {
      const audioWorklet = new AudioWorkletNode(audioContext, 'synth');
      this.port = audioWorklet.port;

      setInterval(() => {
        this.port.postMessage({
          type: 'lower_usage',
        });
      }, 100);

      this.port.onmessage = event => {
        const { data } = event;

        switch (data.type) {
          case 'error':
            this.setState({ error: data.error });
            break;

          case 'require_knobs':
            let knobs = {};

            data.knobs.forEach(name => {
              knobs[name] = this.state.knobs.hasOwnProperty(name) ? this.state.knobs[name] : 0.5;
            });

            this.setState({ knobs });
            break;
        }
      };

      audioWorklet.connect(audioContext.destination);
    });
  }
}
