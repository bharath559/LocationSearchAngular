angular.module("LocationSearchApp.controllers", [ ])
.controller("SearchController", ['$scope', '$location', '$routeParams','GetSearchResults','ResultData',
    function ($scope, $location, $routeParams,GetSearchResults,ResultData) {
   
		
		if(ResultData.searchdata.length != 0){
			
			var zipCode = GetSearchResults.getZipCode();
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({address: zipCode},
			    function(results_array, status) { 
			   	
					var lat = results_array[0].geometry.location.lat();
					var lng = results_array[0].geometry.location.lng();
					
					$scope.ajaxLoader = true;
					
					GetSearchResults.getPlacesForZipCode(lat,lng).then(function(response){
						$scope.searchData = response.data.results;
						$scope.ajaxLoader= !$scope.ajaxLoader;
						ResultData.searchdata = $scope.searchData;
						console.log("places",$scope.searchData);
					});
			});
		}
			
			$scope.searchZipCode = function(zipCode){
			
			GetSearchResults.setZipCode(zipCode);
			
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({address: zipCode},
			    function(results_array, status) { 
				   	
					var lat = results_array[0].geometry.location.lat();
					var lng = results_array[0].geometry.location.lng();
					
					$scope.ajaxLoader = true;
					
					GetSearchResults.getPlacesForZipCode(lat,lng).then(function(response){
						$scope.ajaxLoader= !$scope.ajaxLoader;
						$scope.searchData = response.data.results;
						ResultData.searchdata = $scope.searchData;
						console.log("places",$scope.searchData);
					});
			});
		}
}])
.controller("LocationDetailController", ['$scope', '$location', '$routeParams','GetSearchResults',
    function ($scope, $location, $routeParams,GetSearchResults) {
   
	
		var zipCode = GetSearchResults.getZipCode();
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({address: zipCode},
		    function(results_array, status) { 
			   	
				var lat = results_array[0].geometry.location.lat();
				var lng = results_array[0].geometry.location.lng();
				var mapOptions = {
					zoom: 10,
					center: new google.maps.LatLng(lat, lng),
					mapTypeId: google.maps.MapTypeId.TERRAIN
				};

				$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		});
		
	$scope.infoWindow = new google.maps.InfoWindow();
	var placeId = $routeParams.placeId;
	
	GetSearchResults.getPlaceDetails(placeId).then(function(response){
		
		var place = response.data.result;
		console.log("place", place);
		var marker = new google.maps.Marker({
		              map: $scope.map,
		              position: place.geometry.location
		 });
		 
		 $scope.infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
         	'Place ID: ' + place.place_id + '<br>' +
         	place.formatted_address + '</div>');
		 $scope.infoWindow.open($scope.map, marker);
		 
		 
		 google.maps.event.addListener(marker, 'click', function() {
		       $scope.infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' +
		                'Contact Number: ' + place.international_phone_number + '<br>' +
		                place.formatted_address + '</div>');
		       $scope.infoWindow.open($scope.map, this);
		 });
	 });
	 
}])
.directive("loadList", function ($http) {
     return {
		 	restrict: 'A',
           templateUrl: 'partials/list.html',
     };
});
