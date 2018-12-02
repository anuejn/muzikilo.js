import React from 'react';
import MonacoEditor from 'react-monaco-editor';

export class FileDropZone extends React.Component {
  constructor() {
    super();

    this.state = {
      hovered: false,
    };
  }

  render() {
    return (
      <div
        ref={ref => (this.ref = ref)}
        style={{
          transition: 'background .2s',
          background: this.state.hovered ? '#3E3E3E' : '#1E1E1E',
          height: '100%',
          width: '100%',
          display: 'flex',
        }}
      >
        <label>
          Drop Audio Samples here
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={ev => {
              this.openFile(ev.target.files[0]);
            }}
          />
        </label>
      </div>
    );
  }

  componentDidMount() {
    this.ref.addEventListener('dragenter', ev => this.setState({ hovered: true }));
    this.ref.addEventListener('dragleave', ev => this.setState({ hovered: false }));

    this.ref.addEventListener('drop', ev => {
      ev.preventDefault();
      console.log(ev);
    });
  }

  openFile(file) {
    const audioContext = new AudioContext();
    var reader = new FileReader();
    reader.onload = () =>
      audioContext.decodeAudioData(reader.result, decoded =>
        this.props.onAdd('asdf', decoded.getChannelData(0))
      );
    reader.readAsArrayBuffer(file);
  }
}
