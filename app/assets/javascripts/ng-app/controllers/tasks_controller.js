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
  .controller("tasksController", ["$scope", "$http", "$resource", "$state", "Task", "$modal", function ($scope, $http, $resource, $state, Task, $modal) {
   Task.query(function(data){
    $scope.tasks = data;
   });

   $scope.openAddTask = function() {
        $modal.open({
      templateUrl: 'tasks/new.html',
      controller: 'newTaskController'

 });
  }
}]);


angular
  .module("tabulaApp")
  .controller("newTaskController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", function ($scope, $http, $state, $resource, $stateParams, Task, $modalInstance){

    $scope.createTask = function(){
      new Task (
        $scope.task
      ).$save(function(data) {
        $modalInstance.dismiss('created');
      });
    };
  }]);









