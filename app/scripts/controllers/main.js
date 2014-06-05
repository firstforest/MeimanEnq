'use strict';

angular.module('enqApp')
    .controller('MainCtrl', function ($scope, Kiicloud) {
        $scope.votes = [];

        $scope.plusfunc = function () {
            $scope.votes.push({number: 0, p_evaluation: 3, s_evaluation: 3, impression: ""});
        };

        $scope.minusfunc = function () {
            $scope.votes.pop();
        };

        for (var i = 0; i < 4; i++) {
            $scope.plusfunc();
        }

        $scope.post = function () {
            Kiicloud.post($scope);
        };
    });
