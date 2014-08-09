ImmediateStorage
================

An angular module for accessing the localStorage as standard object.

You can create, change and delete properties on this object, and the changes will be saved in the local storage immediately.
Next time your app will run, the object will be filled with all the properties from the last run.

***Using Object.observe()!***

How to use?
================

Controller:

    angular.module('myApp', ['ImmediateStorage'])
        .controller('myController', function(ImmediateStorageService, $scope) {
            var myStorage = new ImmediateStorageService('myStorage');
    
            myStorage.someKey = 'some value';               // saved to localStorage!
            myStorage.someOtherKey = 'some other value';    // saved to localStorage!
            myStorage.someKey = 'some value2';              // changed in localStorage!
            delete myStorage.someKey;                       // deleted from localStorage!
    
            $scope.storage = myStorage;
       });

View:
    <div ng-app="myApp" ng-controller="myController">
      <pre>{{ storage | json }}</pre>
    </div>

Next time we ask for:

    new ImmediateStorageService('myStorage');

it will be full!
