// https://www.devtools.tech/questions/s/how-to-implement-event-emitter-in-javascript-or-facebook-interview-question---qid---J4fNqXImp6QIdGMc7SPF?utm_source=social-share

class Emitter {
  constructor() {
    this.eventToCallbacksMap = new Map();
  }

  subscribe(event_name, callback) {
    const callbacks = this.eventToCallbacksMap.get(event_name) ?? [];
    callbacks.push(callback);

    this.eventToCallbacksMap.set(event_name, callbacks);

    let releaseCount = 0;

    const emitter = this;

    return {
      release() {
        if (releaseCount > 0) {
          throw new TypeError("cannot release a sub multiple times");
        }
        const callbacks = emitter.eventToCallbacksMap.get(event_name) ?? [];
        emitter.eventToCallbacksMap.set(
          event_name,
          callbacks.filter((item) => item !== callback)
        );
        releaseCount++;
      },
    };
  }

  emit(event_name, ...args) {
    const callbacks = this.eventToCallbacksMap.get(event_name) ?? [];
    callbacks.forEach((callback) => {
      callback(...args);
    });
  }
}

const emitter = new Emitter();

const sub1 = emitter.subscribe("event_name", (...args) =>
  console.log("callback1", ...args)
);
const sub2 = emitter.subscribe("event_name", (...args) =>
  console.log("callback2", ...args)
);
sub1.release();
sub1.release();
emitter.emit("event_name", "foo", "bar");
