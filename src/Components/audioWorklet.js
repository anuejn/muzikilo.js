class Synth extends AudioWorkletProcessor {
  constructor() {
    super();

    // initialize with a silent shaderFunc
    this.funcs = [() => 0];

    // initialize the environment for the shaderFunc
    this.shaderEnv = new Proxy({}, {
      get: (target, name) => target.hasOwnProperty(name) ? target[name] : 0,
    });

    this.knobs = new Proxy({}, {
      get: (target, name) => target.hasOwnProperty(name) ? target[name] : 0.5,
    });

    this.keys = [];

    // allow updating of arbitrary things from the main thread
    this.port.onmessage = (event) => {
      let {data} = event;

      if(data.shaderFunc) {
        try {
          this.funcs.push(eval(data.shaderFunc));
          this.update = true;
        } catch(e) {
          this.port.postMessage({error: `${e}`});
        }
        console.log(this.funcs);
      }

      switch (data.type) {
        case 'update_knob':
          this.knobs[data.name] = data.value;
          break;

        case 'update_note':
          if (data.value) {
            this.keys = [...this.keys, data.note];
          } else {
            this.keys = this.keys.filter(key => key !== data.note);
          }
          break;

      }
    };
  }

  process(inputs, outputs) {
    let [output] = outputs[0];
    output.set(output.map(() => {
      let val = null;
      let error = '';
      let firstTry = true;
      while(true) {
        try {
          val = this.funcs[this.funcs.length - 1].call(this.shaderEnv, this.knobs, this.keys);
        } catch(e) {
          // in adition to this, val will still be null
          error += `${e}\n\n`;
        }

        if(typeof(val) === 'number' && isFinite(val)) {
          // we are having a nice value
          if(firstTry && this.update) {
            // clear the error message, when everything ran sucessfully
            this.port.postMessage({error: ''});
          }

          this.update = false;
          return val
        } else {
          // whops... something failed
          error += error ? '' : `function returned: ${JSON.stringify(val)}`;
          this.funcs.pop();
          this.port.postMessage({error: error});
          firstTry = false;
        }
      }
    }));
    return true;
  }
}

registerProcessor('synth', Synth);
