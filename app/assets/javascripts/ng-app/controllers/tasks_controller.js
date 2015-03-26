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
  .controller("tasksController", ["$rootScope", "$scope", "$http", "$resource", "$state", "Task", "$modal", 
    function ($rootScope, $scope, $http, $resource, $state, Task, $modal) {
      Task.query(function(data){
      $rootScope.tasks = data; // $rootScope allows the the tasks array method to be accessed in the second controller in order to have the created task show right away
    });

    $scope.deleteTask = function(task) { // function that deletes a task
      if (confirm("Are you sure you want to delete this task?")) {
        task.$delete(function(){
          Task.query(function(data){
            $rootScope.tasks = data;
          });
        });
      }
    }

    $scope.openAddTask = function() { // modal that creates new tasks
      $modal.open({
        templateUrl: 'tasks/new.html',
        controller: 'newTaskController',
        windowClass: 'addModal'
      });
    };
    $scope.openShowTask = function(id) { // modal that shows a specific task
      $modal.open({
        templateUrl: 'tasks/show.html',
        controller: 'showTasksController',
        windowClass: 'addModal',
        resolve: {
          task_id: function () {
            return id;
          }
        }
      });
    };   

    $scope.overdue = function(task) { // code to turn complete by to the color red if its overdue
      return Date.parse(task.complete_by) < Date.now(); 

    }

  }]);

angular // controller to get a specifict task
.module("tabulaApp")
.controller("showTasksController", ["$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", "task_id", 
  function ($scope, $http, $state, $resource, $stateParams, Task, $modalInstance, task_id){
    $scope.task = Task.get({ id: task_id });

       $scope.overdue = function(task) { // code to turn complete by to the color red if its overdue
        return Date.parse(task.complete_by) < Date.now(); 

      }

    }]);



angular // controller that creates a new task
.module("tabulaApp")
.controller("newTaskController", ["$rootScope", "$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", 
  function ($rootScope, $scope, $http, $state, $resource, $stateParams, Task, $modalInstance){

    $scope.createTask = function(){

      new Task (
        $scope.task
        ).$save(function(data) {
        $modalInstance.dismiss('created'); // closes the modal after task is created
        $rootScope.tasks.push(data);
      }, function(error){
        $scope.errorMessage = "task already exists"; // error message if user tries to duplicate task name 
      });
      };
    }]);









