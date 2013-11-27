'use strict';

describe('Service: loops', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var loops;
  beforeEach(inject(function (_loops_) {
    loops = _loops_;
  }));

  it('should have `go` function', function () {
    expect(typeof(loops.go)).toEqual('function');
  });

  it('should have `url` function', function () {
    expect(typeof(loops.url)).toEqual('function');
  });

});
