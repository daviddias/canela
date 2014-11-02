var eventEmitter2 = require('eventemitter2').EventEmitter2;

exports = module.exports;

exports.createTracer = function (options) {
  return new tracer(options);
};

function tracer (options) {
  this.agentId = options.agentId || idGen();
  this.activeTags = options.activeTags || []; 
  this.emitter = options.emitter || new eventEmitter2({ wildcard: true, newListener: false, maxListeners: 200 }); // attach to an existing event emitter
  // this.windowTraces = {};
  var that = this;

  this.capture = function (data, traceTag) {
    if (!isTraceActive(that.activeTags, traceTag)) {
      return;
    }
    var trace = createTrace(that.agentId, data, traceTag);
    that.emitter.emit('trace', trace);
  };

  // 
  // NOT IMPLEMENTED YET - WILL BE (running on tight schedule, my apologies :))
  // 
  // this.start = function (traceTag, data, traceId) {
  //   if (traceId === undefined) { 
  //     traceId = idGen();
  //   }
  //   // Store this trace (with data.now) on window.tracess
  //   return traceId;
  // };

  // this.end = function (traceTag, data, traceId) {
  //   if (traceId === undefined) { 
  //     // Fetch the oldest trace with same tags and close it
  //   } else {
  //     // Pick the exact trace, and close it
  //   }

  //   that.emitter.emit('trace', {info:'all of the things'});
  // };

  return this;
}



function idGen () {
  return (~~(Math.random() * 1e9)).toString(36) + Date.now();
}

function createTrace(agentId, data, traceTag, traceId) {
  return new trace(agentId, data, traceTag, traceId);
}

function trace (agentId, data, traceTag, traceId) {
  this.trace = {
    agentId: agentId,
    tag: traceTag || undefined,
    data: data,
    traceId: traceId || undefined,
    time: Date.now(),

  };
  return this.trace;
}

function isTraceActive (activeTags, tag) {
  if (tag === undefined) { return true; }
  return activeTags.indexOf(tag) > -1;
}