import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';

import {CodeEditor} from './CodeEditor';
import {Oszi} from './Oszi';
import {Inputs} from './Inputs';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      
    }
  }

  render() {
    return (
      <SplitterLayout vertical percentage secondaryInitialSize={35}>
        <SplitterLayout percentage secondaryInitialSize={35}>
          <CodeEditor />
          <Oszi />
        </SplitterLayout>
        <Inputs />
      </SplitterLayout>
    );
  }
}
