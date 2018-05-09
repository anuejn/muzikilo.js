import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: `
// given are t, keys and knobs

const timer = (name, speed) => {
    this[name] = typeof(this[name]) === 'number' ? this[name] + 1/44100 * speed : 0; 
    return this[name];
}

const osc = (name, freq) => {
    return Math.sin(timer(name, freq))
}


return (
    osc('1', 4400 * knobs.fa * (osc('freqa', 10 * knobs.freqa) + 1)) * Math.round(osc('mod1', 100 * knobs.mod))
    + osc('1', 4400 * knobs.fb)
)      
      `
    }
  }

  render() {
    return (
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={this.state.code}
        onChange={(newValue) => {this.setState({code: newValue}); this.props.onChange(newValue)}}
        editorDidMount={(editor) => {
          editor.focus();
          setTimeout(() => this.props.onChange(this.state.code), 0);
        }}
        options={{automaticLayout: true}}
      />
    );
  }
}