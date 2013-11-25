'use strict';

describe('Service: Staticmaps', function () {

  // load the service's module
  beforeEach(module('webApp'));

  // instantiate service
  var staticMaps;
  beforeEach(inject(function (_staticMaps_) {
    staticMaps = _staticMaps_;
  }));

  it('should have `url` function', function () {
    expect(typeof(staticMaps.url)).toEqual('function');
  });

});
