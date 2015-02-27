angular
  .module('tabulaApp') // the factory that creates all the code for task
  .factory("Task", ["$resource", function ($resource) {
    return $resource('api/tasks/:id', {id: '@id'},
      {
        'update': { method: 'PUT'}
      }

      );
  }]);

  angular // controller that shows the index of tasks
  .module("tabulaApp")
  .controller("tasksController", ["$scope", "$http", "$resource", "$state", "Task", "$modal", function ($scope, $http, $resource, $state, Task, $modal) {
    Task.query(function(data){
      $scope.tasks = data;
    });

    $scope.deleteTask = function(task) { // function that deletes a task
      task.$delete(function(){
        Task.query(function(data){
          $scope.tasks = data;
        });
      });
    }

    $scope.openAddTask = function() { // modal that creates new tasks
      $modal.open({
        templateUrl: 'tasks/new.html',
        controller: 'newTaskController',
        windowClass: 'addTaskModal'
      });
    };
    $scope.openShowTask = function(id) { // modal that shows a specific task
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

angular // controller to get a specifict task
    .module("tabulaApp")
    .controller("showTasksController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", "task_id", function ($scope, $http, $state, $resource, $stateParams, Task, $modalInstance, task_id){
      $scope.task = Task.get({ id: task_id });


    }]);



angular // controller that creates a new task
  .module("tabulaApp")
  .controller("newTaskController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", function ($scope, $http, $state, $resource, $stateParams, Task, $modalInstance){

    $scope.createTask = function(){
      new Task (
        $scope.task
      ).$save(function(data) {
        $modalInstance.dismiss('created'); // closes the modal after task is created
      });
    };
  }]);









