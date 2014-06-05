'use strict';

angular.module('enqApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/thanks', {
        templateUrl: 'views/thanks.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
