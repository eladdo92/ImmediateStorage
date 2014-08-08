angular.module('myApp', ['ImmediateStorage']).controller('myController',
    function(ImmediateStorageService, $scope) {
        var myStorage = new ImmediateStorageService('myStorage');

        myStorage.someKey = 'some value';
        myStorage.someOtherKey = 'some other value';

        $scope.storage = myStorage;
   });