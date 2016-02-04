/**
 * Created by chen on 16/2/4.
 */
var homeApp = angular.module('homeApp',['ngRoute']);

homeApp.controller('fileController', function($scope, $http){

});


homeApp.controller('videoController', function($scope, $http){

});

//homeApp.controller('navController', function($scope, $location){
//    $scope.menus = [
//        {
//            lable:'Video',
//            path:'/video'
//        },
//        {
//            lable:'File',
//            path:'/'
//        }
//    ];
//    $scope.navObject = {item: 0};
//
//});

homeApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            controller: 'fileController',
            templateUrl: '/static/partials/fileSystem.html'

        })
        .when('/video',{
            controller: 'videoController',
            templateUrl: '/static/partials/video.html'

        })
        .otherwise({redirectTo:'/'});
});
