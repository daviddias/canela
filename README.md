![](/img/logo.jpg)

> **canela** is a tracing tool for distributed applications

# Badgers
[![NPM](https://nodei.co/npm/canela.png?downloads=true&stars=true)](https://nodei.co/npm/canela/)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/diasdavid/canela?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) 
[![Dependency Status](https://david-dm.org/diasdavid/canela.svg)](https://david-dm.org/diasdavid/canela)
[![Build Status](https://travis-ci.org/diasdavid/canela.svg)](https://travis-ci.org/diasdavid/canela)

# What is canela, why does it exist






# How to use

```
var canela = require('canela');

var options = {
  agentId: '', // [optional] this tracer agentID, if not passed, a random will be generated
  tags: ['*'], // [optional] an array of the active trace tags 
  emitter: <EventEmitter2 Obj>, //[optional] attacht the trace events to an existing emitter,
  active: true // if the trace captures are active or not  
}

var tracer = canela.createTracer(options)

var ee = tracer.emitter;

ee.on('trace', function (trace) {
  { 
    agentId: '82mu9d1416085771023',
    tag: 'a',
    traceId: 1,
    description: 'a trace',
    data: ,
    time: 1416085771028 
  }
});

tracer.capture({
  tag: 'a',
  id: 1,
  description: 'a trace', 
  data: { a: 5, b: { c: 6 } } 
});
```







