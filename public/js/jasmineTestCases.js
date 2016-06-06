
describe("Sample Test Suite", function() {
  
   beforeEach(function(){
	   angular.mock.module('LocationSearchApp');
	   angular.mock.module('LocationSearchApp.controllers');
	  
   });
   it("Checking for saving zipcode",inject(["GetSearchResults", function(GetSearchResults) {
	   GetSearchResults.setZipCode(23508);
	   var zipCode = GetSearchResults.getZipCode();
       expect(zipCode).toEqual(23508);
    }])
  );
 
});