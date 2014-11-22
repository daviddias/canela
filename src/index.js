var eventEmitter2 = require('eventemitter2').EventEmitter2;

exports = module.exports;

exports.createTracer = function(options) {
  return new Tracer(options);
};

function Tracer (options) {
  this.agentId = options.agentId || idGen();
  this.tags = options.tags || ['*'];
  this.emitter = options.emitter || new eventEmitter2({
    wildcard: true,
    newListener: false,
    maxListeners: 200
  });

  var isTracerActive = options.active || true;
  var self = this;

  this.c = this.capture = function(options) {
    if (!isTracerActive) {
      return;
    }
    if (!isTagEnabled(self.tags, options.tag)) {
      return;
    }

    self.emitter.emit('trace', {
      agentId: self.agentId,
      tag: options.tag,
      traceId: options.id,
      description: options.description,
      data: options.data,
      time: Date.now()
    });
  };

  return this;
}

function idGen () {
  return (~~(Math.random() * 1e9)).toString(36) + Date.now();
}

function isTagEnabled (tags, tag) {
  if (tags.indexOf('*') > -1 || tag === undefined) {
    return true;
  }
  return tags.indexOf(tag) > -1;
}
