import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/github';
import 'brace/ext/language_tools';

export class CodeEditor extends React.Component {
  onChange(newValue) {
    console.log('change',newValue);
  }
  
  // Render editor
  render() {
    return <AceEditor
      mode="javascript"
      theme="github"
      onChange={this.onChange}
      editorProps={{$blockScrolling: true}}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  };
}
