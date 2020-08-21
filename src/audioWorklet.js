class Synth extends AudioWorkletProcessor {
  constructor() {
    super();

    // initialize with a silent shaderFunc
    this.funcs = [() => 0];

    // initialize the environment for the shaderFunc
    this.shaderEnv = new Proxy(
      {
        t: new Date() / 1000,
      },
      {
        get: (target, name) => {
          // when the target variable is not yet set, we just return numeric 0
          // this allows us for example to create a counter with 'this.i += 1' without special casing the first iteration.
          if (!target.hasOwnProperty(name)) {
            return 0;
          }

          // some values are most likely temporary mistakes.
          // we filter them out and return 0 instead, to save the developer some frustration.
          if (
            target[name] == null ||
            (typeof target[name] == 'number' && !isFinite(target[name]))
          ) {
            return 0;
          }

          // if the value seems legit, we just return it
          return target[name];
        },
      }
    );

    this.knobUsages = {};
    this.knobs = new Proxy(
      {},
      {
        get: (target, name) => {
          this.knobUsages[name] = Math.min(1, (this.knobUsages[name] || 0) + 1 / 44100);
          return target.hasOwnProperty(name) ? target[name] : 0.5;
        },
      }
    );

    this.keys = [];
    this.files = {}

    // allow updating of arbitrary things from the main thread
    this.port.onmessage = event => {
      let { data } = event;

      switch (data.type) {
        case 'lower_usage':
          Object.keys(this.knobUsages).forEach(
            key => (this.knobUsages[key] = this.knobUsages[key] - 0.05)
          );
          Object.keys(this.knobUsages)
            .filter(key => this.knobUsages[key] <= 0)
            .forEach(key => {
              delete this.knobUsages[key];
            });
          this.port.postMessage({
            type: 'require_knobs',
            knobs: Object.keys(this.knobUsages).filter(key => this.knobUsages[key] > 0.25),
          });
          break;

        case 'shader_function':
          try {
            this.funcs.push(eval(
              `(
                  function(knobs, keys, files) {
                    ${data.code}\n
                  }
                )`
            ));
            this.update = true;
          } catch (e) {
            this.port.postMessage({
              type: 'error',
              error: `${e}`,Q
            });
          }
          break;

        case 'update_knob':
          this.knobs[data.name] = data.value;
          break;

        case 'update_file':
          this.files[data.name] = new Proxy(
            data.value,
            {
              get: (target, key) => target[Math.round((key * 44100) % target.length)],
            })
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

    output.set(
      output.map(() => {
        let val = null;
        let error = '';
        let firstTry = true;
        while (true) {
          try {
            val = this.funcs[this.funcs.length - 1].apply(this.shaderEnv, [this.knobs, this.keys, this.files]);
          } catch (e) {
            // in addition to this exception, val will still be null
            error += `${e}\n\n`;
          }

          if (typeof val === 'number' && isFinite(val)) {
            // we are having a nice value
            if (firstTry && this.update) {
              // clear the error message, when everything ran successfully
              this.port.postMessage({
                type: 'error',
                error: '',
              });
            }

            this.update = false;
            return val;
          } else {
            // whops... something failed
            error += error ? '' : `function returned: some illegal value. the returned value needs to be a number`;
            this.funcs.pop();
            this.port.postMessage({
              type: 'error',
              error,
            });
            firstTry = false;
          }
        }
      })
    );
    return true;
  }
}

registerProcessor('synth', Synth);
