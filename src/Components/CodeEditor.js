import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export class CodeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      code: '// given are t, keys and knobs\nreturn Math.random() * .1'
    }
  }

  render() {
    return (
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        value={this.state.code}
        onChange={(newValue) => {this.setState({code: newValue}); this.props.onChange(newValue)}}
        editorDidMount={(editor) => editor.focus()}
        options={{automaticLayout: true}}
      />
    );
  }
}