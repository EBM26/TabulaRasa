angular
  .module('tabulaApp')
  .factory("Task", ["$resource", function ($resource) {
    return $resource('api/tasks/:id', {id: '@id'},
      {
        'update': { method: 'PUT'}
      }

      );
  }]);

  angular 
  .module("tabulaApp")
  .controller("tasksController", ["$scope", "$http", "$resource", "$state", "Task", function ($scope, $http, $resource, $state, Task) {
   Task.query(function(data){
    $scope.tasks = data;
   });
}]);


angular
  .module("tabulaApp")
  .controller("newTaskController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", function ($scope, $http, $state, $resource, $stateParams, Task){

    $scope.createTask = function(){
      new Task (
        $scope.task
      ).$save(function(data) {
        $state.go("");
      });
    };
  }]);









