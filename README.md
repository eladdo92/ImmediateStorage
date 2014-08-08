ImmediateStorage
================

An angular module for accessing the localStorage as standard object.

How to use?
================

Controller:

    angular.module('myApp', ['ImmediateStorage']).controller('myController',
        function(ImmediateStorageService, $scope) {
            var myStorage = new ImmediateStorageService('myStorage');
    
            myStorage.someKey = 'some value';
            myStorage.someOtherKey = 'some other value';
    
            $scope.storage = myStorage;
       });
   
View:

    <body ng-app="myApp" ng-controller="myController">
      <div>
          <pre>{{ storage | json }}</pre>
      </div>
    </body>


Next time we ask for:

    new ImmediateStorageService('myStorage');
  
it will be full.
