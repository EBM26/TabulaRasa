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
      task.$delete(function(){
        Task.query(function(data){
          $rootScope.tasks = data;
        });
      });
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

    }]);



angular // controller that creates a new task
  .module("tabulaApp")
  .controller("newTaskController", ["$rootScope", "$scope", "$http", "$state", "$resource", "$stateParams", "Task", "$modalInstance", 
                                    function ($rootScope, $scope, $http, $state, $resource, $stateParams, Task, $modalInstance){

    $scope.createTask = function(){

      if ($scope.task.name == null) { // error code for task name field that cant be left empty
          $scope.nameFlash =  "name field cannot be left empty";
         }

      else if ($scope.task.description == null) { // error code for task description field that cant be left empty 
          $scope.descFlash = "description field cannot be left empty";

         }

      else if ($scope.task.est_complete_time == null) { // error code for task estimated completioin time field that cant be left empty
          $scope.compFlash = "estimated completion time cannot be lef empty"
      }  

      else if ($scope.task.complete_by == null) { // error code for task complete by time field that cant be left empty
          $scope.dateFlash = "complete by time cannot be left empty"
      }

      new Task (
        $scope.task
      ).$save(function(data) {
        $modalInstance.dismiss('created'); // closes the modal after task is created
        $rootScope.tasks.push(data);
      });
    };
  }]);

 







