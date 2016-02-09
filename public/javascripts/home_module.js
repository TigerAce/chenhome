/**
 * Created by chen on 16/2/4.
 */
var homeApp = angular.module('homeApp',['ngRoute','ngFileUpload']);

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
    $scope.currRoot = '/var/video';
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

homeApp.controller('navController', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

});


homeApp.controller('uploadController', ['$scope', 'Upload','$timeout', function($scope, Upload, $timeout){
    //$scope.username = "peter";
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (!file.$error) {
                    Upload.upload({
                        url: '/api/upload',
                        data: {
                            //username: $scope.username,
                            file: file
                        }
                    }).then(function (resp) {
                        $timeout(function() {
                            $scope.log = 'file: ' +
                                resp.config.data.file.name +
                                ', Response: ' + JSON.stringify(resp.data) +
                                '\n' + $scope.log;
                        });
                    }, null, function (evt) {
                        var progressPercentage = parseInt(100.0 *
                            evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage +
                            '% ' + evt.config.data.file.name + '\n' +
                            $scope.log;
                    });
                }
            }
        }
    };
}]);

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
        .when('/upload',{
            controller:'uploadController',
            templateUrl:'/static/partials/upload.html'
        })
        .otherwise({redirectTo:'/'});
});


