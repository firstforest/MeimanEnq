'use strict';

angular.module('enqApp')
  .service('Kiicloud', function Kiicloud() {
    Kii.initializeWithSite("4652cd79", "ecae25e177620fa0e0d9446756d72045", KiiSite.JP);
   	var username = "2014meidai";
		var password = "2014meidai";
		var bucket;
		// Authenticate the user
		KiiUser.authenticate(username, password, {
		  // Called on successful registration
		  success: function(theUser) {
		    // Print some info to the log
		    console.log("User authenticated!");
		    console.log(theUser);
		    var user = Kii.getCurrentUser();
		  	bucket = user.bucketWithName("2014meidaiEnq");
		  },
		  // Called on a failed authentication
		  failure: function(theUser, errorString) {
		    // Print some info to the log
		    console.log("Error authenticating: " + errorString);
		  }
		});

    this.post = function($scope) {
      var obj = bucket.createObject();
  		obj.set("sex", $scope.sex);
  		obj.set("occupation", $scope.occupation);
  		obj.set("votes", $scope.votes);
  		obj.set("opinion", $scope.opinion);
  		obj.save({
  			success: function(theObject){
  				console.log("object saved");
  				console.log(theObject);
  			},
      		failure: function(o, e){
      			console.log("error", o, e);
      		}
    		}
    	)
	  }
  });
