'use strict';

angular.module('enqApp')
    .service('Kiicloud', function Kiicloud($q) {
        Kii.initializeWithSite("4652cd79", "ecae25e177620fa0e0d9446756d72045", KiiSite.JP);
        var username = "2014meidai";
        var password = "2014meidai";
        var bucket;
        // Authenticate the user
        KiiUser.authenticate(username, password, {
            // Called on successful registration
            success: function (theUser) {
                // Print some info to the log
                console.log("User authenticated!");
                console.log(theUser);
                var user = Kii.getCurrentUser();
                bucket = user.bucketWithName("2014meidaiEnq");
            },
            // Called on a failed authentication
            failure: function (theUser, errorString) {
                // Print some info to the log
                console.log("Error authenticating: " + errorString);
            }
        });

        this.post = function ($scope) {
            getId(bucket).then(function (id) {
                var profile = bucket.createObject();
                profile.set("type", "profile");
                profile.set("id", id);
                profile.set("sex", $scope.sex);
                profile.set("occupation", $scope.occupation);
                profile.set("opinion", $scope.opinion);
                var callbacks = {
                    success: function (theObject) {
                        console.log("object saved");
                        console.log(theObject);
                    },
                    failure: function (o, e) {
                        console.log("error", o, e);
                    }
                };
                profile.save(callbacks);
                var vote;
                angular.forEach($scope.votes, function (v) {
                    var vote = bucket.createObject();
                    vote.set("type", "vote");
                    vote.set("profileid", id);
                    vote.set("number", v.number);
                    vote.set("p_evaluation", v.p_evaluation);
                    vote.set("s_evaluation", v.s_evaluation);
                    vote.set("impression", v.impression);
                    vote.save(callbacks);
                });
            });
        };

        function getId(bucket) {
            var deferred = $q.defer();
            var clause = KiiClause.equals("type", "profile");
            var query = KiiQuery.queryWithClause(clause);
            bucket.countWithQuery(query, {
                success: function (bucket, query, count) {
                    deferred.resolve(count);
                },
                failure: function (bucket, query, errorString) {
                    console.log("Execution failed by : " + errorString);
                    deferred.reject(-1);
                }
            });
            return deferred.promise;
        }

    });
