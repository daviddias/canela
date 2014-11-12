var eventEmitter2 = require('eventemitter2').EventEmitter2;

exports = module.exports;

exports.createTracer = function (options) {
  return new tracer(options);
};

function tracer (options) {
  this.agentId = options.agentId || idGen();
  this.tags = options.tags || ['*']; 
  this.emitter = options.emitter || new eventEmitter2({ wildcard: true, newListener: false, maxListeners: 200 }); 
  
  var isTracerActive = options.active || true;
  var that = this;
  // this.windowTraces = {};
  
  this.c = this.capture = function (options) {
    if (!isTracerActive) { return; }
    if (!isTagEnabled(that.tags, options.tag)) { return; }
    
    that.emitter.emit('trace', {
      agentId: that.agentId,
      tag: options.tag,
      traceId: options.id,
      description: options.description,
      data: options.data,
      time: Date.now()    
    });
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

function idGen () {return (~~(Math.random() * 1e9)).toString(36) + Date.now();}

function isTagEnabled (tags, tag) {
  if (tags.indexOf('*') > -1 || tag === undefined) { return true; }
  return tags.indexOf(tag) > -1;
}