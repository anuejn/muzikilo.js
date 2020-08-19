import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import { CodeEditor } from './CodeEditor';
import Keyboard from './Keyboard';
import Knobs from './Knobs';

const audioWorklet = require('fs').readFileSync(__dirname + '/../audioWorklet.js', 'utf-8');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      initialized: false,
      knobs: {},
      keys: [],
      error: '',
    };

    this.port = {
      postMessage: payload =>
        console.warn(
          'Message to webaudio worklet is discarded since it is not yet initialized. Payload was: ',
          payload
        ),
    };
  }

  render() {
    const overlay = (
      <div
        className={'play_overlay'}
        onClick={() => {
          this.startAudio();
          this.setState({ initialized: true });
        }}
      >
        &#9658;
      </div>
    );

    return (
      <>
        {this.state.initialized ? <></> : overlay}
        <SplitterLayout vertical percentage secondaryInitialSize={20}>
          <SplitterLayout percentage secondaryInitialSize={25}>
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
      </>
    );
  }

  updateNote = (note, value) => {
    if (value) {
      this.setState(state => ({ keys: [...state.keys, note] }));
    } else {
      this.setState(state => ({ keys: state.keys.filter(key => key !== note) }));
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
      func: `(
        function(knobs, keys) {
          const random = () => Math.random() * 2 - 1;
          const {sin, floor, round, pow} = Math;
          const TAU = 2 * Math.PI;
          this.t += 1/44100;
          const t = this.t;

          ${code}\n
        }
      )`,
    });
  }

  startAudio() {
    const audioContext = new AudioContext();

    if (!(audioContext && audioContext.audioWorklet)) {
      alert('You need chrome 66+ to use muzikilo.js!');
    }

    audioContext.createBuffer(1, 128, 44100);
    const workletCodeUrl = URL.createObjectURL(
      new Blob([audioWorklet], { type: 'text/javascript' })
    );
    audioContext.audioWorklet.addModule(workletCodeUrl).then(() => {
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
