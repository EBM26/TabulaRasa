angular
    .module("tabulaApp")
    .factory("List", ["$resource", function ($resource) { // factory that makes the list code
    return $resource('api/lists/:id', {id: '@id'}, // using the $resource to get the list api from rails
        {
          'update': { method: 'PUT'}
        }
      );
  }]);


angular // controller that shows the list index. The array of arguments with quotations is so the angular code will not break when midified
  .module("tabulaApp")
  .controller("listsController", ["$scope", "$http", "$resource", "$state", "List", "$modal", function ($scope, $http, $resource, $state, List, $modal) {
    List.query(function(data){
        $scope.lists = data;
    });

    $scope.deleteList = function(list) {
      list.$delete(function(){
        List.query(function(data){
          $scope.lists = data;
        });
      });
    }

    $scope.openAddList = function() {
      $modal.open({
        templateUrl: 'lists/new.html',
        controller: "newListController"
      });
    };

      $scope.openAddItem = function(id) { // modal code that opens and creates new items
        $modal.open({
      templateUrl: 'items/new.html', // the modal template
      controller: 'newItemController', // the controller the modal is using
       resolve: {
        list_id: function () {
          return id;
        }
      }
       });
    };

      $scope.openShowItem = function(id) { // modal code that shows the items inside each list
        $modal.open({
          templateUrl: 'items/show.html', // the modal template
          controller: 'itemsController', // the controller the modal is using
          resolve: {
            list_id: function(){
              return id;
            }
          }
        });
      };
      
   
  }]);

  angular // controller that creates a new list
    .module("tabulaApp")
    .controller("newListController", ["$scope", "$http", "$state", "$resource", "$stateParams", "List", "$modalInstance", function ($scope, $http, $state, $resource, $stateParams, List, $modalInstance){

      $scope.createList = function() {
        new List (
          $scope.list
        ).$save(function(data) {
          $modalInstance.dismiss('created');
        });
      }
    }]);


 