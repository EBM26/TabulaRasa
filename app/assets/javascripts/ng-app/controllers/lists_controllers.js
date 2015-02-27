angular
    .module("tabulaApp")
    .factory("List", ["$resource", function ($resource) {
    return $resource('api/lists/:id', {id: '@id'},
        {
          'update': { method: 'PUT'}
        }
      );
  }]);


angular
  .module("tabulaApp")
  .controller("listsController", ["$scope", "$http", "$resource", "$state", "List", "$modal", function ($scope, $http, $resource, $state, List, $modal) {
    List.query(function(data){
        $scope.lists = data;

    });
      $scope.openAddItem = function(id) {
        $modal.open({
      templateUrl: 'items/new.html',
      controller: 'newItemController',
       resolve: {
        list_id: function () {
          return id;
        }
      }
       });
    }

      $scope.openShowItem = function(id) {
        $modal.open({
          templateUrl: 'items/show.html',
          controller: 'itemsController',
          resolve: {
            list_id: function(){
              return id;
            }
          }
        });
      };
      
   
  }]);

  angular
    .module("tabulaApp")
    .controller("newListController", ["$scope", "$http", "$state", "$resource", "$stateParams", "List", function ($scope, $http, $state, $resource, $stateParams, List){

      $scope.createList = function() {
        new List (
          $scope.list
        ).$save(function(data) {
          $state.go("");
        });
      }
    }]);


 