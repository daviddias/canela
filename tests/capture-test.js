var eventEmitter2 = require('eventemitter2').EventEmitter2;
var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();

var experiment = lab.experiment;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

var canela = require('./../index.js');

experiment('pich of canela: ', function () {

  var tracerOne;
  var tracerTwo;

  before(function (done) {
    done();
  });

  after(function (done) {
    done();
  });

  test('create a tracer', function (done) {
    tracerOne = canela.createTracer({});

    expect(tracerOne.agentId).to.be.an.string();
    expect(tracerOne.tags).to.be.an.array();
    expect(tracerOne.emitter).to.be.an.object();
    expect(tracerOne.capture).to.be.a.function();
    done();
  });

  test('create a custom tracer', function (done) {
    var options = {
      agentId: 'custom tracer',
      tags: ['*'],
      emitter: new eventEmitter2({ wildcard: true, newListener: false, maxListeners: 10 })
    };

    tracerTwo = canela.createTracer(options);

    expect(tracerTwo.agentId).to.be.an.string();
    expect(tracerTwo.agentId).to.equal(options.agentId);
    expect(tracerTwo.tags).to.be.an.array();
    expect(tracerTwo.tags).to.deep.equal(options.tags);
    expect(tracerTwo.emitter).to.be.an.object();
    expect(tracerTwo.emitter).to.equal(options.emitter);
    expect(tracerTwo.capture).to.be.a.function();
    done();
  });
  test('verify that both tracers have different ID', function (done) {
    expect(tracerOne.agentId).to.not.equal(tracerTwo.agentId);
    done();
  });

  test('capture', function (done) {
    var data = { a: 5, b: { c: 6 } };

    tracerOne.emitter.on('trace', function(trace){
      console.log(trace);
      expect(trace.agentId).to.be.an.string();
      expect(trace.agentId).to.equal(tracerOne.agentId);
      expect(trace.description).to.be.an.string();
      expect(trace.tag).to.equal('example-tag');
      expect(trace.data).to.deep.equal(data);
      expect(new Date(trace.time)).to.be.a.date();  
      done();
    });

    tracerOne.capture({tag: 'example-tag', id: 1, description: 'a trace', data: data});
  });

  test('capture with custom tracer', function (done){
    var data = { a: 8, b: { c: 10 } };
    tracerTwo.emitter.on('trace', function(trace) {
      expect(trace.agentId).to.be.an.string();
      expect(trace.agentId).to.equal(tracerTwo.agentId);
      expect(trace.description).to.be.an.string();
      expect(trace.tag).to.equal('another-tag');
      expect(trace.data).to.deep.equal(data);
      expect(new Date(trace.time)).to.be.a.date();  
      done();
    });

    tracerTwo.capture({tag: 'another-tag', id: 4, description: 'another trace', data: data});
  });
});