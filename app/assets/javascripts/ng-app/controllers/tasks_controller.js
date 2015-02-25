angular
  .module('tabulaApp')
  .factory("Task", TasksFactory);

  function TasksFactory($resource) {
    return $resource('api/tasks/:id', {id: '@id'},
      {
        'update': { method: 'PUT'}
      }

      );
  }

  angular 
  .module("tabulaApp")
  .controller("tasksController", tasksController);

  function tasksController ($scope, $http, $resource, $state, Task) {
   Task.query(function(data){
    $scope.tasks = data;
   });
}


angular
  .module("tabulaApp")
  .controller("newTaskController", newTaskController);

  function newTaskController($scope, $http, $state, $resource, $stateParams, Task){

    $scope.createTask = function(){
      new Task (
        $scope.task
      ).$save(function(data) {
        $state.go("");
      });
    };
  }









