import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { monaco } from '@monaco-editor/react';

const initialCode = require('fs').readFileSync(
  __dirname + '/../../assets/initial_editor_content.js',
  'utf-8'
);

export class CodeEditor extends React.Component {
  constructor() {
    super();

    monaco.config({
      paths: {
        vs: './monaco/',
      },
    });

    const params = new URLSearchParams(window.location.search);
    const to_load = params.get("load");
    if (to_load) {
      this.state = {initialCode: null}
      fetch(to_load)
        .then(response => response.text())
        .then(text => {
          this.setState({initialCode: text});
          this.props.onChange(text);
        })
        .catch((error) => {
          alert(`url '${to_load}' could not be loaded`)
          this.setState({initialCode})
        });
    } else {
      this.state = {initialCode}
    }
  }

  render() {
    if (this.state.initialCode) {
      return (
        <ControlledEditor
          language="javascript"
          theme="vs-dark"
          value={this.state.initialCode}
          onChange={(event, newValue) => {
            this.props.onChange(newValue);
          }}
        />
      );
    } else {
      return <div />
    }

  }
}
