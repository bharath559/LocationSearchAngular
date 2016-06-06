var locationSearchApp = angular.module("LocationSearchApp", [
    "LocationSearchApp.services",
    "LocationSearchApp.controllers",
    "ui.bootstrap",
    "ngRoute"
]);
locationSearchApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "partials/search.html",
        controller: "SearchController"
    })
        .when("/locations/:placeId", {
            templateUrl: "partials/locationDetail.html",
            controller: "LocationDetailController"
        })
        .otherwise({
            redirectTo: "/"
        })
});
locationSearchApp.factory('ResultData', function () {
    return { searchdata: [] };
});

