angular.module("LocationSearchApp.services", [ ])
.service("GetSearchResults", function ($http) {
	
	var zipCode;
	var self = this;
	this.getPlacesForZipCode = function(lat,long){
				
		var url = "/places/"+lat+"/"+long
		
    	return $http.
		get(url).
        	then(function(response) {
            	return response;
        	}, function(response) {
            	alert("Error finding data");
       	 	});
	};
	
	this.setZipCode = function(zipCode){
		
		self.zipCode = zipCode;
	};
	
	this.getZipCode = function(){
		
		return self.zipCode ;
	}
	

	this.getPlaceDetails = function(placeId){
				
		var url = "/placeDetail/"+placeId;
	
    	return $http.
		get(url).
        	then(function(response) {
            	return response;
        	}, function(response) {
            	alert("Error finding data");
       	 	});
	}
	
})