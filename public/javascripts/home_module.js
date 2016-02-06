/**
 * Created by chen on 16/2/4.
 */
var homeApp = angular.module('homeApp',['ngRoute']);

homeApp.controller('fileController', function($scope, $http, $window){
    $scope.currRoot = '/var';
    $scope.currPath = '';
    $scope.lastPath = '';
    $scope.selectFile = {item: 0};

    $scope.listDirectory = function(path){
        $http({
            method: 'GET',
            url: '/api/listDir/' + path,
            data: $.param(path),
            processData: false,
            responseType: "json",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            console.log(data);
            $scope.fileList = data;
            $scope.lastPath = $scope.currPath;
            $scope.currPath = path;
        });

    };

    $scope.openPath = function(name, isDir){
        if(isDir == 'true'){
            $scope.listDirectory(name);
        }else{
            console.log('try open file');
            $window.location.href = '/static/name';
        }
    };
    $scope.listDirectory($scope.currPath);
});


homeApp.controller('videoController', function($scope, $http){

});

homeApp.controller('navController', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

});

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
