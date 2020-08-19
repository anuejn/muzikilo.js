import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { monaco } from '@monaco-editor/react';

const initialCode = require('fs').readFileSync(
  __dirname + '/../../examples/initial_editor_content.js',
  'utf-8'
);

export class CodeEditor extends React.Component {
  constructor() {
    monaco.config({
      paths: {
        vs: './monaco/',
      },
    });

    super();
  }

  render() {
    return (
      <ControlledEditor
        language="javascript"
        theme="vs-dark"
        value={initialCode}
        onChange={(event, newValue) => {
          this.props.onChange(newValue);
        }}
      />
    );
  }
}
