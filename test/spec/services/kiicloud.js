'use strict';

describe('Service: Kiicloud', function () {

  // load the service's module
  beforeEach(module('enqApp'));

  // instantiate service
  var Kiicloud;
  beforeEach(inject(function (_Kiicloud_) {
    Kiicloud = _Kiicloud_;
  }));

  it('should do something', function () {
    expect(!!Kiicloud).toBe(true);
  });

});
