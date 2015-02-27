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

    $scope.deleteTask = function(task) {
      task.$delete(function(){
        Task.query(function(data){
          $scope.tasks = data;
        });
      });
    }

    $scope.openAddTask = function() {
      $modal.open({
        templateUrl: 'tasks/new.html',
        controller: 'newTaskController'
      });
    };
    $scope.openShowTask = function(id) {
      $modal.open({
        templateUrl: 'tasks/show.html',
        controller: 'showTasksController',
        resolve: {
          task_id: function () {
            return id;
          }
        }
      });
    };
  }]);

angular
    .module("tabulaApp")
    .controller("showTasksController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", "task_id", function ($scope, $http, $state, $resource, $stateParams, Task, $modalInstance, task_id){
      $scope.task = Task.get({ id: task_id });


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









