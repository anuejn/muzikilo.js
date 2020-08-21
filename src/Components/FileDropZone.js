import React from 'react';
import { useDropzone } from 'react-dropzone';


export function FileDropZone({ files, onAdd }) {
  function openFile(file) {
    console.log(file)
    const audioContext = new AudioContext();
    const name = file.name.replace(/ /g, "_").toLowerCase().split(".")[0]
    var reader = new FileReader();
    reader.onload = () => {
      audioContext.decodeAudioData(reader.result, decoded => {
          onAdd(name, decoded.getChannelData(0))
        }
      );
    }
    reader.readAsArrayBuffer(file);
  }

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDrop: files => {
      files.forEach(f => openFile(f))
    }
  });

  return (
    <div
      {...getRootProps({className: 'dropzone'})}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <input {...getInputProps()} />
      <p
        style={{
          paddingTop: '30px',
          flexGrow: 1,
        }}
      >
        Drag 'n' drop some files here, or click to select files. <br/>You can then use them as files["filename"]
      </p>
      <div
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(files).map(name => (
          <span
            key={name}
            style={{
              padding: '15px',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
