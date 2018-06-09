export function subscribe2Midi(fn) {
  if (navigator.requestMIDIAccess) {
    navigator
      .requestMIDIAccess({
        sysex: false,
      })
      .then(onMIDISuccess, () => console.log('Midi Failure'));
  }

  function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = fn;
    }
  }
}
