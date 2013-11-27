'use strict';

describe('Service: loops', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var api;
  beforeEach(inject(function (_api_) {
    api = _api_;
  }));

  it('should have `loopOrders` function', function () {
    expect(typeof(api.loopOrders)).toEqual('function');
  });

  it('should have `reset` function', function () {
    expect(typeof(api.reset)).toEqual('function');
  });

});
