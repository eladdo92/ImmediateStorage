ImmediateStorage
================

An angular module for accessing the localStorage as standard object.

How to use?
================

Controller:

    angular.module('myApp', ['ImmediateStorage'])
        .controller('myController', function(ImmediateStorageService, $scope) {
            var myStorage = new ImmediateStorageService('myStorage');
    
            myStorage.someKey = 'some value';
            myStorage.someOtherKey = 'some other value';
    
            $scope.storage = myStorage;
       });
   
View:


    <div ng-app="myApp" ng-controller="myController">
      <pre>{{ storage | json }}</pre>
    </div>



Next time we ask for:

    new ImmediateStorageService('myStorage');
  
it will be full.
