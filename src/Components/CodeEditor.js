import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import initial_code from '!raw-loader!../../examples/initial_editor_content.js'

export class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: initial_code,
    };
  }

  render() {
    return (
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={this.state.code}
        onChange={newValue => {
          this.setState({ code: newValue });
          this.props.onChange(newValue);
        }}
        editorDidMount={editor => {
          editor.focus();
          setTimeout(() => this.props.onChange(this.state.code), 0);
        }}
        options={{ automaticLayout: true }}
      />
    );
  }
}
